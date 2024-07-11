<template>
  <div class="kanban-board">
    <div
      class="drop-zone to-do"
      @drop="dropItem($event, 1)"
      @dragover.prevent
      @dragenter.prevent
    >
      <h3>To Do</h3>
      <div class="input-form">
        <div @click="openDialog">new task</div>
        <dialog ref="dialog" class="dialog">
          <form method="dialog" @submit.prevent="handleFormSubmit">
            <div class="input">
              <input
                v-model="newTask"
                required
                placeholder="New Task"
                autofocus
              />
              <input
                v-model="estSession"
                required
                placeholder="Est. Sessions"
                type="number"
                name="quantity"
                min="1"
              />
            </div>
            <button class="close" type="submit">Submit</button>
          </form>
        </dialog>
      </div>
      <div
        v-for="item in store.taskList(1)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @dragstart="dragItem($event, item)"
      >
        <span>{{ item.title }}</span>
        <div style="float: right">{{ item.current }}/{{ item.est }}</div>
      </div>
    </div>
    <div
      class="drop-zone in-progress"
      @drop="dropItem($event, 2)"
      @dragover.prevent
      @dragenter.prevent
    >
      <h3>In Progress</h3>
      <div
        v-for="item in store.taskList(2)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @dragstart="dragItem($event, item)"
      >
        <span>{{ item.title }}</span>
        <div style="float: right">{{ item.current }}/{{ item.est }}</div>
      </div>
    </div>
    <div
      class="drop-zone done"
      @drop="dropItem($event, 3)"
      @dragover.prevent
      @dragenter.prevent
    >
      <h3>Done</h3>
      <div
        v-for="item in store.taskList(3)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @dragstart="dragItem($event, item)"
      >
        <span>{{ item.title }}</span>
        <div style="float: right">{{ item.current }}/{{ item.est }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/TaskStore";

const store = useTaskStore();

const id = ref(0);
const newTask = ref("");
const estSession = ref("");
const dialog = ref(null);

function openDialog() {
  dialog.value.showModal();
}

function handleFormSubmit() {
  addTask();
  dialog.value.close();
}

function dragItem(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.id);
}

function dropItem(event, list) {
  const itemID = event.dataTransfer.getData("itemID");
  const item = store.items.find((item) => item.id == itemID);
  item.list = list;
}

function addTask() {
  store.items.push({
    id: id.value++,
    title: newTask.value,
    list: 1,
    current: 0,
    est: estSession.value,
  });
  newTask.value = "";
  estSession.value = "";
}
</script>

<style scoped>
.kanban-board {
  display: flex;
}

h3 {
  text-align: center;
  margin: 0;
  font-weight: 400;
}

.input-form {
  margin: 15px 0;
  text-align: left;
  background: #2c1b1b;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
}

.input-form input:focus {
  outline: none;
}

.to-do {
  background-color: #311f1f;
  height: 100%;
}

.in-progress {
  background-color: #312e1f;
  height: 100%;
}

.done {
  background-color: #1a1f18;
  height: 100%;
}

.drop-zone {
  margin: 20px;
  width: 300px;
  min-height: 40px;
  border: 4px solid #ddd;
  border-radius: 15px;
  padding: 15px;
}

.drag-el {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin: 10px 0;
  border: 2px solid white;
  border-radius: 15px;
  text-align: left;
}

::backdrop {
  background: black;
  opacity: 0.75;
}

.input input {
  padding: 10px;
}

.input {
  display: flex;
  gap: 10px;
}
</style>

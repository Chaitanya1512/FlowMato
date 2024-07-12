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
            <button class="task-submit" type="submit">Submit</button>
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

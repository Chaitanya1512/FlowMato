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
            <div class="button-class">
              <button class="task-submit" type="submit">{{isEditing? "Update" : "Submit"}}</button>
              <button
                v-if="isEditing"
                class="task-submit"
                id="delete"
                type="button"
                @click="deleteTask"
              >Delete</button>
            </div>
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
        <div class="task-info">
          <span>{{ item.current }}/{{ item.est }}</span>
          <div class="edit-task" @click="editTask(item)">
            <img id="edit" src="../assets/img/edit.png" width="20px" />
          </div>
        </div>
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
        <div class="task-info">
          <span>{{ item.current }}/{{ item.est }}</span>
          <div class="edit-task" @click="editTask(item)">
            <img id="edit" src="../assets/img/edit.png" width="20px" />
          </div>
        </div>
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
        <div class="task-info">
          <span>{{ item.current }}/{{ item.est }}</span>
          <div class="edit-task" @click="editTask(item)">
            <img id="edit" src="../assets/img/edit.png" width="20px" />
          </div>
        </div>
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
const isEditing = ref(false);
const currentTask = ref(null);

function openDialog() {
  dialog.value.showModal();
}

function handleFormSubmit() {
  if (isEditing.value) {
    updateTask();
  } else {
    addTask();
  }
  resetForm();
  dialog.value.close();
}

function addTask() {
  store.items.push({
    id: id.value++,
    title: newTask.value,
    list: 1,
    current: 0,
    est: estSession.value,
  });
}

function editTask(item) {
  isEditing.value = true;
  currentTask.value = item;
  newTask.value = item.title;
  estSession.value = item.est;
  openDialog();
}

function updateTask() {
  const idx = getIdxById(currentTask.value.id);
  store.items[idx].title = newTask.value;
  store.items[idx].est = estSession.value;
}

function deleteTask() {
  const idx = getIdxById(currentTask.value.id);
  store.items.splice(idx, 1);
  dialog.value.close();
  resetForm()
}

function resetForm() {
  newTask.value = "";
  estSession.value = "";
  isEditing.value = false;
  currentTask.value = null;
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

function getIdxById(id) {
  return store.items.findIndex((item) => item.id == id);
}
</script>

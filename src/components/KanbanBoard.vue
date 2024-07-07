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
        <form @submit.prevent="addTask">
          <input v-model="newTask" required placeholder="New Task" />
          <button>Add</button>
        </form>
      </div>
      <div
        v-for="item in taskList(1)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @dragstart="dragItem($event, item)"
      >
        {{ item.title }}
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
        v-for="item in taskList(2)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @dragstart="dragItem($event, item)"
      >
        {{ item.title }}
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
        v-for="item in taskList(3)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @dragstart="dragItem($event, item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      items: [{ id: 1, title: "Task 1", list: 1 }],
    };
  },
  methods: {
    taskList(col) {
      return this.items.filter((item) => item.list === col);
    },
    dragItem(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item.id);
    },
    dropItem(event, list) {
      const itemID = event.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.list = list;
    },
    addTask() {
      this.items.push({
        id: this.id++,
        title: this.newTask,
        list: 1,
      });
      this.newTask = "";
    },
  },
};
</script>

<style>
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
}

.input-form input {
  border: 1px solid #dddddd50;
  border-radius: 15px 0 0 15px;
  width: 70%;
  padding: 10px;
  background: #2c1b1b;
  color: #ddd;
}

.input-form button {
  border: 1px solid #dddddd50;
  border-radius: 0 15px 15px 0;
  width: 20%;
  padding: 10px;
  background-color: #422020;
  color: #ddd;
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
  margin: 50px 20px;
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
}
</style>

<template>
  <div id="app">
    <div class="container">
      <div class="main">
      <PomodoroTimer />
      </div>
      <KanbanBoard />
    </div>
  </div>
</template>

<script>
import PomodoroTimer from "./components/PomodoroTimer.vue";
import KanbanBoard from "./components/KanbanBoard.vue";

export default {
  name: "App",
  components: {
    PomodoroTimer,
    KanbanBoard,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");
@import "./assets/styles/PomodoroTimer.css";
@import "./assets/styles/KanbanBoard.css";

#app {
  font-family: "Work Sans", Helvetica, Arial, sans-serif;
  text-align: center;
  color: white;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 1140px;
}
.main{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

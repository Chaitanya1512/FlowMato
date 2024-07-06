<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col col-sm-6 col-offset-sm-3">
          <PomodoroTimer />
        </div>
        <div>
          <KanbanBoard />
        </div>
      </div>
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
    KanbanBoard
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");
@import "./assets/styles/PomodoroTimer.css";

#app {
  font-family: "Work Sans", Helvetica, Arial, sans-serif;
  text-align: center;
  color: white;
  margin-top: 60px;
}

.container {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-sm-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.col-offset-sm-3 {
  margin-left: 25%;
}
</style>

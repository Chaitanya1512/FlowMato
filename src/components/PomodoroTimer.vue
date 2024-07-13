<template>
  <div class="card">
    <div class="tab-container">
      <div class="session" @click="clearSession">{{ store.session }}</div>
      <div class="slider-bar">
        <div class="slider-switch" :style="switchSlider"></div>
        <div
          class="slider-tab"
          v-for="session in sessions"
          :key="session.name"
          @click="changeSession(session.name)"
          :class="{ active: currentSession === session.name }"
        >
          {{ session.name }}
        </div>
      </div>

      <div class="settings"></div>
    </div>

    <div class="tabs-window">
      <div class="card-content">
        <div class="card-text">
          <h1 class="time">{{ minute }}:{{ second }}</h1>
          <div class="button-group">
            <button
              @click="reset(currentSession)"
              :disabled="inProgress"
              class="skip"
            >
              <img height="50px" src="../assets/img/reset.png" />
            </button>
            <button v-if="!inProgress" @click="start" class="btn btn-primary">
              Start
            </button>
            <button v-else @click="stop" class="btn btn-error">Stop</button>
            <button class="skip" @click="skip()">
              <img height="50px" src="../assets/img/skip.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useTaskStore } from "@/stores/TaskStore";

const store = useTaskStore();

const sessions = reactive([
  { name: "Pomodoro", duration: 25 * 60 },
  { name: "Short Break", duration: 5 * 60 },
  { name: "Long Break", duration: 15 * 60 },
]);

const totalDuration = ref(sessions[0].duration);
const currentSession = ref(sessions[0].name);
const interval = ref(null);
const inProgress = ref(false);

const switchSlider = computed(() => {
  const activeIndex = sessions.findIndex(
    (session) => session.name == currentSession.value
  );
  return {
    transform: `translateX(${activeIndex * 97.5}%)`,
  };
});

const minute = computed(() => {
  const minutes = Math.floor(totalDuration.value / 60);
  return minutes < 10 ? "0" + minutes : minutes;
});

const second = computed(() => {
  const seconds = totalDuration.value % 60;
  return seconds < 10 ? "0" + seconds : seconds;
});

function start() {
  stop();
  inProgress.value = true;
  interval.value = setInterval(() => {
    if (--totalDuration.value == 0) {
      stop();
      skip();
      start();
    }
  }, 1000);
}

function stop() {
  clearInterval(interval.value);
  inProgress.value = false;
}

function reset(sessionName) {
  stop();
  const session = sessions.find((session) => session.name === sessionName);
  totalDuration.value = session.duration;
}

function skip() {
  if (currentSession.value === "Pomodoro") {
    store.session++;
    store.taskList(2).forEach((task) => {
      task.current++;
    });
  }
  const currentIndex = sessions.findIndex(
    (session) => session.name === currentSession.value
  );
  changeSession(sessions[(currentIndex + 1) % 3].name);
}

function changeSession(sessionName) {
  currentSession.value = sessionName;
  reset(sessionName);
}

function clearSession() {
  store.session = 0;
}
</script>

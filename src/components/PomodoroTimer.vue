<template>
  <div class="card">
    <div class="tab-container">
      <div class="slider-bar">
        <div class="slider-switch" :style="switchStyle"></div>
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
    </div>

    <div class="tabs-window">
      <div class="card-content">
        <div class="card-text">
          <h1 class="time">{{ minute }}:{{ second }}</h1>
          <div class="button-group">
            <button v-if="!inProgress" @click="start" class="btn btn-primary">
              Start
            </button>
            <button v-else @click="stop" class="btn btn-error">Stop</button>
            <button
              @click="reset(this.currentSession)"
              :disabled="inProgress"
              class="btn"
            >
              Reset
            </button>
            <button class="skip" @click="skip()">
              <img height="50px" src="../assets/img/skip.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalDuration: 25 * 60,
      currentSession: "Pomodoro",
      interval: null,
      inProgress: false,
      sessions: [
        { name: "Pomodoro", duration: 25 * 60 },
        { name: "Short Break", duration: 5 * 60 },
        { name: "Long Break", duration: 15 * 60 },
      ],
    };
  },
  computed: {
    switchStyle() {
      const activeIndex = this.sessions.findIndex(
        (session) => session.name == this.currentSession
      );
      return {
        transform: `translateX(${activeIndex * 97.5}%)`,
      };
    },
    minute() {
      const minutes = Math.floor(this.totalDuration / 60);
      return minutes < 10 ? "0" + minutes : minutes;
    },
    second() {
      const seconds = this.totalDuration % 60;
      return seconds < 10 ? "0" + seconds : seconds;
    },
  },
  methods: {
    start() {
      this.stop();
      this.inProgress = true;
      this.interval = setInterval(() => {
        if (--this.totalDuration <= 0) {
          this.stop();
          return;
        }
      }, 1000);
    },
    stop() {
      clearInterval(this.interval);
      this.inProgress = false;
    },
    reset(sessionName) {
      this.stop();
      const session = this.sessions.find(
        (session) => session.name === sessionName
      );
      this.totalDuration = session.duration;
    },
    skip() {
      const currentIndex = this.sessions.findIndex(
        (session) => session.name === this.currentSession
      );
      this.changeSession(this.sessions[(currentIndex + 1) % 3].name);
    },
    changeSession(sessionName) {
      this.currentSession = sessionName;
      this.reset(sessionName);
    },
  },
};
</script>

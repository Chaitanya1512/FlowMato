import { ref, reactive } from "vue";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", () => {
  const session = ref(0);

  const items = reactive([]);

  function taskList(list) {
    return items.filter((item) => item.list === list);
  }

  return { session, items, taskList };
});

import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      username: 'sergeybatukov',
      name: 'Sergey',
      last_name: 'Batukov',
      pro: true
    }
  })
})
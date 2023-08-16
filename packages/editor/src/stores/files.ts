import { defineStore } from "pinia";

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: []
  }) 
})
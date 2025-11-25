import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Counter Store'
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
    countPlusOne(): number {
      return this.count + 1
    }
  },

  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    incrementBy(amount: number) {
      this.count += amount
    },
    reset() {
      this.count = 0
    }
  }
})

// stores/mainStore.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    isType: false,
    getPokemonType: [],
    pokemonlistfetch: true,
    pokemonPage: 0,
    disableNextType: false,
    disablePrevType: false,
    pageCache: {}
  }),
  getters: {
    totalPages: (state) => Math.ceil(state.pokemonPage / 9),  
    offset: (state) =>  (state.pokemonPage - 1) * 9 ,
  },
  actions: {
    next() {
      if(this.isType){
        this.pokemonPage += 1
      }else{
        this.pokemonlistfetch = false
        this.pokemonPage += 9;
      }
    },
    prev() {
      if(this.isType && this.pokemonPage > 0){
        this.pokemonPage--
      }else {
        this.pokemonlistfetch = false
        // this.pokemonPage <= 0 ? 0 : this.pokemonPage -= 9;
        // this.pokemonPage = Math.max(0, this.pokemonPage - 1)
        this.pokemonPage -= 9
      }
    },
  },
});

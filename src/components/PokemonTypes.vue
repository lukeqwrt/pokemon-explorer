<template>
    <div class="pokemon-types flex w-full justify-center gap-5 mb-5" v-if="types">
         <div  
             :class="['type text-white px-5 py-[5px] rounded-lg w-[120px] flex justify-center items-center gap-[6px]', getClassType(type)]" 
             v-for="type in pokemonTypes" :key="type"
             @end="onEnd">
             <img loading="lazy" width="18" :src="`./pokemon-type-svg/${type}.svg`" alt="grass">
             <p class="text-base font-bold uppercase">{{ type }}</p>
         </div >
     </div>
 </template>
 
 <script setup>
 import { computed } from 'vue';
 import draggable from 'vuedraggable';
 const props = defineProps(['types']);
const pokemonType = {
    normal: 'bg-normal',
    fire: 'bg-fire',
    water: 'bg-water',
    electric: 'bg-electric',
    grass: 'bg-grass',
    ice: 'bg-ice',
    fighting: 'bg-fighting',
    poison: 'bg-poison',
    ground: 'bg-ground',
    flying: 'bg-flying',
    psychic: 'bg-psychic',
    bug: 'bg-bug',
    rock: 'bg-rock',
    ghost: 'bg-ghost',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
    steel: 'bg-steel',
    fairy: 'bg-fairy',
};

 const pokemonTypes = computed(() => {
     if (props.types) {
         return props.types.map(res => res.type.name);
     }
 });
 
 const getClassType = (type) => {
     return pokemonType[type] || ''; // Use the imported pokemonType object
 };
 </script>
 
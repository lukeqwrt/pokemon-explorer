<template>
    <div class="relative  h-[385px] w-full bg-[primary] flex justify-end items-center flex-col font-primary rounded-3xl "
       :style="`background: ${gradientStyle.backgroundImage}`"
    >
        <div class="relative w-full h-full flex justify-center items-center">
            <div class="absolute -top-24 z-50">
                <img class="pokemon-image w-[280px] h-[280px]" :src="image" alt=""loading="lazy">
            </div>
            <div class="overflow-hidden h-full w-full flex flex-col items-center justify-end relative rounded-3xl p-[42px]">
                <img class="absolute top-1/2 left-0 -translate-y-1/2" src="../assets/image/half-pokeball.svg.png" alt="pokeball left icon">
                <div class="pokemon-name flex justify-center items-center gap-[6px] mb-3">
                    <Whitedot />
                    <h3 class="text-white text-center text-[31px] capitalize">{{ name }}</h3>
                    <Whitedot />
                </div>
                <div class="text-white">
                </div>
                <div class="details">
                    <!-- pokemon types component -->
                    <PokemonTypes :types="types" />
                    
                    <!-- pokemon stats component -->
                    <PokemonStats :height="height" :weight="weight" />
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import Whitedot from './ui/Whitedot.vue';
import PokemonTypes from './PokemonTypes.vue';
import PokemonStats from './PokemonStats.vue';
import { pokemonColorRGBA } from '../../utils/pokemonType';
import { computed } from 'vue';
const props = defineProps(['pokemon','checkPokemons'])

const { id, image, name, types, height, weight } = props.pokemon

const TypeStyle = computed(() => {
    const getFirstItem = types[0].name
    return pokemonColorRGBA[getFirstItem]
})

const gradientStyle = computed(() => {
    // const colorValue = pokemonType[types]
    return {
        backgroundImage: `radial-gradient(100% 100% at 50% 130%, ${TypeStyle.value}, rgba(6, 14, 32, 1))`,
        // backgroundImage: `radial-gradient(at center bottom, #56BC2B, #010101);`,

    }
})
console.log(props.pokemon)
</script>

<style scoped>
.pokemon-image{ 
    filter: saturate(1.9);
}


</style>

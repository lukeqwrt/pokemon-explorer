<template>
    <Transition name="bounce">
        <div v-if="pokemonDetails" class="relative h-[385px] w-full bg-primary flex justify-end items-center flex-col font-primary rounded-3xl "
            :style="`background: ${gradientStyle.backgroundImage}`"
        >
            <div class="relative w-full h-full flex justify-center items-center">
                    <div class="absolute -top-24 z-50 flex justify-center items-center">
                        <img class="pokemon-image w-[280px] h-[280px]" :src="pokemonDetails.image" alt="pokemon" loading="lazy">
                    </div>
                    <div class="overflow-hidden h-full w-full flex flex-col items-center justify-end relative rounded-3xl p-[42px]">
                        <img class="absolute top-1/2 left-0 -translate-y-1/2" src="../assets/image/half-pokeball.svg.png" alt="pokeball left icon">
                        <div v-if="pokemonDetails" class="pokemon-name flex justify-center items-center gap-[6px] mb-3">
                            <Whitedot />
                            <h3  class="text-white text-center text-[31px] capitalize">{{ name }}</h3>
                            <Whitedot />
                        </div>
                        <div class="text-white">
                        </div>
                        <div class="details">
                            <!-- pokemon types component -->
                            <PokemonTypes v-if="pokemonDetails" :types="pokemonDetails.types" />
                            
                            <!-- pokemon stats component -->
                            <PokemonStats v-if="pokemonDetails" :height="pokemonDetails.height" :weight="pokemonDetails.weight" />
                        </div>
                    </div>
            </div>
        </div>
    </Transition>

</template>

<script setup>
import Whitedot from './ui/Whitedot.vue';
import PokemonTypes from './PokemonTypes.vue';
import PokemonStats from './PokemonStats.vue';
import loading from './ui/loading.vue';
import { pokemonColorRGBA } from '../../utils/pokemonType';
import { watch, computed, onMounted, ref } from 'vue';
const props = defineProps(['pokemon'])

const { id, name, url } = props.pokemon

const pokemonDetails = ref()

const loadDetails = async () => {
    const res = await fetch(url)
    const data = await res.json()
    pokemonDetails.value = {
        types: data.types,
        height: data.height,
        weight: data.weight,
        image: data.sprites.other["official-artwork"].front_default
        // image: data.sprites.other["official-artwork"].front_default
    }
}

onMounted(() => {
    loadDetails()
})
const TypeStyle = computed(() => {
    if(pokemonDetails.value){
        const getFirstItem = pokemonDetails.value.types[0].type.name
        return pokemonColorRGBA[getFirstItem] 
    }
})

const gradientStyle = computed(() => {
    // const colorValue = pokemonType[types]
    return {
        backgroundImage: `radial-gradient(100% 100% at 50% 130%, ${TypeStyle.value}, rgba(6, 14, 32, 1))`,
        // backgroundImage: `radial-gradient(at center bottom, #56BC2B, #010101);`,

    }
})

</script>

<style scoped>
.pokemon-image{ 
    filter: saturate(1.9);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>

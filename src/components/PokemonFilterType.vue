<template>
    <div class="pokemon-type-filter w-full overflow-hidden ">
        <h1 class="text-lg text-white mb-2 font-primary">Choose Pokemon Types</h1>
        <div class="flex relative items-center overflow-hidden gap-[12px] bg-primary h-[50px] py-[5px] ps-[12px] rounded-xl border-2 border-[#333333]">
            <img class="cursor-pointer" @click="emit('passPokemonType','home')" src="../assets/image/icon-type-bg/Button → SVG.png" alt="">
            <swiper 
             class="mySwiper "
                :modules="modules"
                slidesPerView="auto"
                :spaceBetween="12"
                :loop="true"
                :autoplay="{
                    delay: 2000,
                    disableOnInteraction: false,
                }"
            >
            <!-- class="w-[0px] h-auto" -->
                <SwiperSlide
                    v-for="poke in pokemonTypes" 
                    :key="poke" 
                    alt="type svg"
                    class="w-[32.8462px] h-auto"
                >
                    <img 
                        class="type-image "  
                        @click="emit('passPokemonType', poke.type)"
                        :src="`./icon-type-bg/${poke.type} (1).svg`" 
                    >
                </SwiperSlide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
const emit = defineEmits(['passPokemonType'])
const modules = [Autoplay];
const pokemonTypes = [
    { type: 'normal' },
    { type: 'fire' },
    { type: 'water' },
    { type: 'electric' },
    { type: 'grass' },
    { type: 'ice' },
    { type: 'fighting' },
    { type: 'poison' },
    { type: 'ground' },
    { type: 'flying' },
    { type: 'psychic' },
    { type: 'bug' },
    { type: 'rock' },
    { type: 'ghost' },
    { type: 'dragon' },
    { type: 'dark' },
    { type: 'steel' },
    { type: 'fairy' },
];



</script>

<style scoped>
.type-image{
    @apply h-[30px] w-[30px] cursor-pointer
}
</style>
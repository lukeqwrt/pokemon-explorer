<template>
   <div class="pokemon-stats flex justify-center items-center gap-5 w-full">
        <div class="flex flex-col w-[120px] justify-center items-center text-white">
            <p class="font-bold text-2xl">
                {{ meterHeight }} M
            </p>
            <div class="flex">
                <img src="../assets/image/ruler.png" alt="">
                <p class="text-base">Height</p>
            </div>
        </div>
        <div class="flex flex-col w-[120px] justify-center items-center text-white">
            <p class="font-bold text-2xl ">
                {{ KgWeight }} kg
            </p>
            <div class="flex">
                <img src="../assets/image/weight.png" alt="">
                <p class="text-base">Weight</p>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['height', 'weight'])

const meterHeight = computed(() => {
    return parseFloat(props.height / 10)
})

const KgWeight = computed(() => {
    return parseFloat(props.weight / 10)
})
</script>

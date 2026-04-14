<template>
    <div class="main pt-10 pb-36 bg-[#111111] relative min-h-screen max-md:pt-8 max-md:pb-20">
        <!-- pokemon page -->
        <div class="px-2 md:px-5">
            <router-view />
        </div>

        <div v-if="store.paginateShow" class="fixed bottom-0 lef w-full h-[100px] z-[999] flex justify-center items-center ">
            <div class="prev_and_next rounded-[12px] px-5 flex justify-between items-center bg-primary opacity-[80%] border-2 border-white border-opacity-20 h-[50px] w-[226px]">
                <Icon 
                    icon="zondicons:minus-outline" 
                    class="h-[20px] w-[20px] cursor-pointer text-white" 
                    :class="[
                        (!store.pokemonlistfetch || store.totalPages === 0 || store.disablePrevType)
                        ? 'pointer-events-none !text-[#636363]'
                        : 'pointer-events-auto'
                        ]"
                    @click="store.prev()"
                />
                <div class="text-white text-lg font-bold font-primary flex justify-center items-center w-full ">
                    <input
                        @input="pageInputChanged"
                        v-model="pageinput"
                        oninput="this.value = this.value.slice(0, 10)"
                        maxlength="10"
                        style="background: none"
                        class="text-white bg-none outline-none border-none w-full max-w-[100px] text-center" 
                        type="number" 
                        :disabled="true"
                    >
                    <!-- :disabled="!store.pokemonlistfetch" -->
                </div>
                <Icon 
                    icon="octicon:plus-circle-16" 
                    class="h-[20px] w-[20px] cursor-pointer text-white" 
                    :class="{
                        'pointer-events-none !text-[#636363]': !store.pokemonlistfetch || store.disableNextType,
                        'pointer-events-auto': store.pokemonlistfetch && !store.disableNextType
                    }"
                    @click="store.next()"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useMainStore } from '../stores/pokemonStore.js'
import { Icon } from '@iconify/vue';
const store = useMainStore()
const pageinput = ref()

onMounted(() => pageChanged())

const pageChanged = () => {
    if(store.isType){
        pageinput.value = store.pokemonPage + 1
    }else {
        pageinput.value = store.totalPages + 1
    }
}


watch(
  () => store.pokemonPage,  // Pass a function that returns the value you want to watch
  () => pageChanged()  // Callback function when the watched value changes
);

const pageInputChanged = () => {
    if(store.isType){
        store.pokemonPage = pageinput.value
    }else {
        store.pokemonPage = pageinput.value * 9
    }
}
</script>


<style scoped>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
<template>
    <div class="search-pokemon w-full">
        <h1 class="text-lg font-primary text-white mb-2">Search Pokemon</h1>
        <form @submit.prevent="$emit('search', pokemonSearch)" class="search flex search-input">
            <input 
                type="text" 
                v-model="pokemonSearch" 
                placeholder="Search Pokemon"
                class="w-full outline-none border-0 font-primary"
                style="background: none;"
            >
            <button class="w-[90px] bg-[#ffffff30] flex justify-center items-center">
                <Icon icon="si:search-duotone" width="30px" height="30px"  style="color: white" />
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue';
const emit = defineEmits(['search'])
const pokemonSearch = ref()


</script>

<style scoped>
.search-input{
    @apply bg-primary h-[50px] w-full overflow-hidden ps-[10px] text-white rounded-xl outline-none border-2 border-[#333333]
}
</style>
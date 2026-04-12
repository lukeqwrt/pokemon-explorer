<template>
    <div class="loading-modal-backdrop z-[999] fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
        <div class="loading p-5 rounded-lg w-full flex justify-center items-center" :class="modalClass">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['width'])

const modalClass = computed(() => {
    if(props.width){
        return props.width
    }

    return 'max-w-[500px]'


})

</script>

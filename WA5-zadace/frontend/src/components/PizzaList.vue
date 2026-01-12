<script setup>
import { ref, onMounted, defineProps, watch } from "vue"
import { fetchAllPizze } from "../api/pizzeApi.js";
const pizzaList = ref([])
const props = defineProps({
  activeFilters: {
    type: Object,
    required: false
  }
})
onMounted(async () => {
  pizzaList.value = await fetchAllPizze()
})

watch(() => props.activeFilters,
  async (newFilters) => {
    pizzaList.value = await fetchAllPizze(newFilters)
  }, { deep: true })


</script>


<template>

  <div class="flex items-center gap-5 flex-wrap p-5">
    <div v-for="(value, index) in pizzaList"
      class="p-8 w-3xs border border-gray-300 shadow-md rounded-md flex flex-col gap-2 items-start">
      {{ value.naziv }}
      <hr class="w-full h-px border-none bg-gray-200" />
      <div class="w-full flex items-center gap-2 flex-wrap">
        <img v-for="(item, index) in value.sastojci" :src="item.url" class="w-4 " />
      </div>
      <div class="w-full flex items-center justify-between">
        <button class="p-1 border rounded-md cursor-pointer" @click="$emit('fetchPizza', value.naziv)">Saznaj
          više</button>
        <button class="p-1 border rounded-md cursor-pointer" @click="$emit('addToCart', value.naziv)">U
          košaricu</button>
      </div>
    </div>
  </div>

</template>

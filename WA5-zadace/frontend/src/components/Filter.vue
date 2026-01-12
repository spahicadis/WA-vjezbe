<script setup>
import { reactive, computed, watch, defineEmits, } from 'vue';
const emit = defineEmits(['dataUp'])
const filters = reactive({
  search: '',
  min_price: '',
  max_price: '',
  sort: '',
})
const isFilterActive = computed(() => {
  return Boolean(filters.search || filters.min_price || filters.max_price || filters.sort)
})

//Nebi bilo lose radit debounce, tako da se za svaki keydown prilikom searchanja ne radi request na backend
watch(() => filters, (newFilters) => {
  emit('dataUp', newFilters)
}, { deep: true })

const handleClearFilters = () => {
  filters.search = ''
  filters.min_price = ''
  filters.max_price = ''
  filters.sort = ''
}


</script>


<template>
  <div class="w-fit flex flex-col  gap-6 p-5">
    <input class="border border-gray-300 rounded-md cursor-pointer shadow-sm p-1 " type="search"
      placeholder="Tražite prema nazivu" v-model="filters.search"">
    <div class=" w-fit flex items-center gap-5">
    <select v-model="filters.min_price" class="cursor-pointer border border-gray-300 p-1 rounded-md">
      <option value="" disabled selected hidden>
        Odaberi minimalnu cijenu
      </option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
    <select v-model="filters.max_price" class="cursor-pointer border border-gray-300 p-1 rounded-md">
      <option value="" disabled selected hidden>
        Odaberi maksimalnu cijenu
      </option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>

  </div>
  <select v-model="filters.sort" class="cursor-pointer border border-gray-300 p-1 rounded-md">
    <option value="" disabled selected hidden>
      Sortiraj od
    </option>
    <option value="1">Najjeftinije</option>
    <option value="-1">Najskuplje</option>
  </select>
  <div v-if="isFilterActive">
    <span class="text-blue-500 cursor-pointer" @click="(handleClearFilters)">Očisti filtere</span>
  </div>

  </div>
</template>
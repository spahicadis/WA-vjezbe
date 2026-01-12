<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false
  }
})


</script>


<template>

  <div v-if="data" class="p-5 w-fit flex flex-col gap-3">
    <h3>Podatci o pojedinoj pizzi</h3>
    <div class="w-fit flex flex-col gap-3.5 items-center border  border-gray-300 rounded-md shadow-md p-5 min-w-xs">
      <p>{{ data.naziv }}</p>
      <ul class="flex gap-3 items-center flex-wrap justify-center">
        <li v-for="(item, index) in data.sastojci" class="flex gap-2 items-center"><img :src="item.url"
            class="w-4" /><span>{{
              item.naziv }}</span>
        </li>
      </ul>
      <ul class="flex gap-3 items-center flex-wrap justify-center">
        <li v-for="(key, index) of Object.entries(data.cijene)" class="flex items-center gap-2">{{ key[0] }}:{{ " " }}{{
          key[1]
          }}e
        </li>
      </ul>
    </div>
  </div>

</template>
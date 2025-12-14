<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  statusMsg: {
    type: Object,
    required: false
  }
})
</script>


<template>

  <div class="p-3 md:fit-w border border-gray-200 rounded-sm flex flex-col gap-3">
    <h3>Podatci o dostavi</h3>
    <div class="w-full flex flex-col gap-1">
      <label>Prezime</label>
      <input type="text" @input="$emit('handleDeliveryData', { prezime: $event.target.value })"
        class="border border-gray-200 rounded-sm cursor-pointer"></input>
    </div>
    <div class="w-full flex flex-col gap-1">
      <label>Adresa</label>
      <input type="text" @input="$emit('handleDeliveryData', { adresa: $event.target.value })"
        class="border border-gray-200 rounded-sm cursor-pointer"></input>
    </div>
    <div class="w-full flex flex-col gap-1">
      <label>Broj telefona</label>
      <input type="tel" @input="$emit('handleDeliveryData', { telefon: $event.target.value })"
        class="border border-gray-200 rounded-sm cursor-pointer"></input>
    </div>
    <button @click="$emit('handleCreateOrder')"
      class="p-2 border border-gray-200 rounded-md shadow-md cursor-pointer">Pošalji</button>
    <p :class="statusMsg.status === 'SUCCESSFUL' ? 'text-green-500 text-center' : 'text-red-500 text-center'">{{
      statusMsg.message }}</p>
  </div>

</template>
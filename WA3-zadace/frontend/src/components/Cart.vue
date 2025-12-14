<script setup>
import { defineProps, defineEmits } from 'vue';
import DeliveryDataForm from './DeliveryDataForm.vue';

const emit = defineEmits(['closeModal', 'handleSize', 'handleQuantity', 'handleDelete', 'dataUp', 'passCreateEmit'])

const props = defineProps({
  cart: {
    type: Array,
    required: false
  },

  isOpen: {
    type: Boolean,
    required: true
  },

  orderStatus: {
    type: Object,
    required: false
  }
})

const handleUpData = (data) => {
  emit('dataUp', data)
}

const passEmitUp = () => {
  emit('passCreateEmit')
}

</script>


<template>
  <div v-if="isOpen" class="fixed inset-0 flex justify-center items-center z-49">
    <div class="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
    <div v-if="cart.length > 0"
      class="relative rounded-md shadow-md bg-white z-50 p-5 md:w-auto flex flex-col gap-5 w-full mx-3">
      <div class="flex justify-between items-center">
        <h3>Sadržaj:</h3>
        <span class="cursor-pointer" @click="emit('closeModal', false)">❌</span>
      </div>
      <div class="w-full flex flex-col gap-3 items-start">
        <ul class="w-full flex flex-col gap-5">
          <li v-for="(value, index) in cart" :key="index"
            class="p-3 flex flex-wrap gap-3 items-center border border-gray-200 shadow-md rounded-md">
            <span>{{ value.naziv }}</span>
            <span>Veličina:</span>
            <select :value="value.velicina" @change="$emit('handleSize', { value: $event.target.value, index: index })"
              class="border border-gray-200 shadow-sm rounded-sm p-1 cursor-pointer">
              <option class="cursor-pointer" value="mala">Mala</option>
              <option class="cursor-pointer" value="srednja">Srednja</option>
              <option class="cursor-pointer" value="jumbo">Jumbo</option>
            </select>
            <span>Količina:</span>
            <input :value="value.kolicina"
              @input="$emit('handleQuantity', { value: Number($event.target.value), index: index })" type="
              number"
              class="w-15 border-gray-200 shadow-sm rounded-full p-1 flex items-center justify-center cursor-pointer" />
            <span @click="$emit('handleDelete', index)" class="cursor-pointer">🗑️</span>
          </li>
        </ul>
      </div>
      <DeliveryDataForm :status-msg="orderStatus" @handle-delivery-data="handleUpData"
        @handle-create-order="passEmitUp" />
    </div>
    <div v-else class="relative rounded-md shadow-md bg-white z-50 p-5 md:w-auto flex flex-col gap-5 w-full mx-3">
      <div class="flex justify-between items-center">
        <h3>Sadržaj:</h3>
        <span class="cursor-pointer" @click="$emit('closeModal', false)">❌</span>
      </div>
      <div>
        <p>Nema sadržaja za prikazati!</p>
      </div>
    </div>
  </div>
</template>
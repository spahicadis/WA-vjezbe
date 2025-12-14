<script setup>
import { ref, onMounted } from "vue"
import { fetchAllPizze } from "../api/pizzeApi.js";
import bosiljak from "../assets/bosiljak.png"
import crveni_luk from "../assets/crveni_luk.png"
import feferoni_ljuti from "../assets/feferoni_ljuti.png"
import gljive from "../assets/gljive.png"
import kulen from "../assets/kulen.png"
import panceta from "../assets/panceta.png"
import paprika from "../assets/paprika.png"
import rajcica from "../assets/rajcica.png"
import sir from "../assets/sir.png"
import sunka from "../assets/sunka.png"
import tuna from "../assets/tuna.png"
import vrhnje from "../assets/vrhnje.png"
const pizzaList = ref([])
const iconsData = {
  rajčica: rajcica,
  sir: sir,
  bosiljak: bosiljak,
  šunka: sunka,
  gljive: gljive,
  tunjevina: tuna,
  "crveni luk": crveni_luk,
  paprika: paprika,
  panceta: panceta,
  vrhnje: vrhnje,
  kulen: kulen,
  "feferoni ljuti": feferoni_ljuti,
}

onMounted(async () => {
  pizzaList.value = await fetchAllPizze()
})

</script>


<template>

  <div class="flex items-center gap-5 flex-wrap p-5">
    <div v-for="(value, index) in pizzaList"
      class="p-8 w-3xs border border-gray-300 shadow-md rounded-md flex flex-col gap-2 items-start">
      {{ value.naziv }}
      <hr class="w-full h-px border-none bg-gray-200" />
      <div class="w-full flex items-center gap-2 flex-wrap">
        <img v-for="(value_sastojci, index) in value.sastojci" :src="iconsData[value_sastojci]" class="w-4 " />
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

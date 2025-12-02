<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
let pizze = ref([])
let singlePizza = ref({})

const fetchAllPizze = async () => {
  try {
    const response = await axios.get("http://localhost:8080/pizze")
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}

const fetchSinglePizza = async (name) => {
  try {
    const response = await axios.get(`http://localhost:8080/pizze/${name}`)
    singlePizza.value = response.data;
  } catch (err) {
    console.log(err.message)
  }
}

onMounted(async () => {
  pizze.value = await fetchAllPizze()
})
</script>

<template>
  <div v-if="pizze.length === 0">
    <p>Nema podataka za prikazati</p>
  </div>
  <div v-else class="flex flex-row gap-5">
    <div v-for="pizza in pizze" class="border rounded-md shadow-md p-5">
      <p>{{ pizza.naziv }}</p>
      <button @click="fetchSinglePizza(pizza.naziv)" class="border p-2 rounded-md cursor-pointer">Dohvati podatke o
        pizzi</button>
    </div>
  </div>
  <div v-if="Object.keys(singlePizza).length === 0">
    Niste odabrali pizzu
  </div>
  <div v-else>
    <p>Podatci o odabranoj pizzi</p>
    <p>{{ singlePizza.naziv }}</p>
    <p>Cijene:</p>
    <ul>
      <li v-for="(key, item) of Object.entries(singlePizza.cijene)">{{ key[0] }}: {{ key[1] }}e</li>
    </ul>
    <p>Sastojci:</p>
    <ul>
      <li v-for="sastojci in singlePizza.sastojci">{{ sastojci }}</li>
    </ul>
  </div>
</template>

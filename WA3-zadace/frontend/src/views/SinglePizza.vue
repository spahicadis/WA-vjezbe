<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchSinglePizza } from '../api/pizzeApi';
import SinglePizza from '../components/SinglePizza.vue';

const route = useRoute()
const router = useRouter()
const data = ref(null)

onMounted(async () => {
  data.value = await fetchSinglePizza(route.params.naziv)
})

</script>



<template>
  <p class="text-blue-500 underline cursor-pointer p-1" @click="router.push({ path: '/' })">Natrag na popis</p>
  <div class="p-5" v-if="data">
    <SinglePizza :data="data" />
  </div>
  <div class="p-5" v-else>
    <p>Tražena pizza ne postoji</p>
  </div>

</template>
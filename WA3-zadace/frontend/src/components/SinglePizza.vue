<script setup>
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

const props = defineProps({
  data: {
    type: Object,
    required: false
  }
})

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
</script>


<template>

  <div v-if="data" class="p-5 w-fit flex flex-col gap-3">
    <h3>Podatci o pojedinoj pizzi</h3>
    <div class="w-fit flex flex-col gap-3.5 items-center border  border-gray-300 rounded-md shadow-md p-5 min-w-xs">
      <p>{{ data.naziv }}</p>
      <ul class="flex gap-3 items-center flex-wrap justify-center">
        <li v-for="(value, index) in data.sastojci" class="flex gap-2 items-center"><img :src="iconsData[value]"
            class="w-4" /><span>{{
              value }}</span>
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
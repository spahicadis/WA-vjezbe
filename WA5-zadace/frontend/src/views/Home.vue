<script setup>
import { ref } from "vue"
import Filter from "../components/Filter.vue";
import PizzaList from '../components/PizzaList.vue';
import SinglePizza from '../components/SinglePizza.vue';
import Cart from "../components/Cart.vue";
import { fetchSinglePizza } from '../api/pizzeApi';
import { createNarudzba } from "../api/narudzbeApi";
import cartIcon from "../assets/shopping-cart.png"

const singlePizza = ref(null)
const cart = ref([])
const delivery = ref({})
const orderStatus = ref({})
const isOpen = ref(false)
const acitveFilters = ref(null)

const handleFetch = async (e) => {
  const data = await fetchSinglePizza(e)
  singlePizza.value = data;
}

const handleAddToCart = (e) => {
  const check = cart.value.findIndex((item) => item.naziv.toLowerCase() === e.toLowerCase() && item.velicina === "mala")

  if (check !== -1) {
    cart.value[check] = {
      ...cart.value[check],
      kolicina: cart.value[check].kolicina + 1,
    }
    return;
  }

  cart.value.push({
    naziv: e,
    kolicina: 1,
    velicina: "mala"
  })
}

const handleQuantity = (data) => {
  if (data.value < 1 || isNaN(data.value)) {
    return
  }

  cart.value[data.index].kolicina = data.value
}

const handleSize = (data) => {
  cart.value[data.index].velicina = data.value
}

const handleDelete = (index) => {
  cart.value.splice(index, 1)
}

const handleModal = (e) => {
  isOpen.value = e
}

const handleDeliveryData = (e) => {
  delivery.value = { ...delivery.value, ...e }
}

const handleCreateOrder = async () => {
  const formKeys = Object.keys(delivery.value)
  const formValues = Object.values(delivery.value)

  if (formKeys.length < 3) {
    orderStatus.value.status = "ERROR"
    orderStatus.value.message = "Molimo ispunite sva polja za dostavu"
    return;
  }

  for (const value of formValues) {
    if (value === "") {
      orderStatus.value.status = "ERROR"
      orderStatus.value.message = "Molimo ispunite sva polja za dostavu"
      return;
    }
  }

  const response = await createNarudzba({ narudzba: cart.value, dostava: delivery.value })

  switch (response.status) {
    case 201: {
      orderStatus.value.status = "SUCCESSFUL"
      orderStatus.value.message = response.message
      setTimeout(() => {
        cart.value = []
        delivery.value = {}
        isOpen.value = false
        orderStatus.value = {}
      }, 1500)
      break;
    }
    case 400: {
      orderStatus.value.status = "ERROR"
      orderStatus.value.message = response.message
      break;
    }
    case 404: {
      orderStatus.value.status = "ERROR"
      orderStatus.value.message = response.message
      break;
    }
    default: {
      orderStatus.value.status = "ERROR"
      orderStatus.value.message = response.message
    }

  }
}

const handleFilters = (e) => {
  acitveFilters.value = e
}

</script>


<template>
  <div>
    <div class="absolute right-3 top-3 cursor-pointer" @click="handleModal(true)">
      <img :src="cartIcon" class="w-12" />
      <span class="absolute -top-1 -right-1
           min-w-5 h-5
           bg-red-500 text-white text-xs font-semibold
           rounded-full flex items-center justify-center
           shadow-md">
        {{ cart.length }}
      </span>
    </div>
    <Filter @data-up="handleFilters" />
    <PizzaList @fetch-pizza="handleFetch" @add-to-cart="handleAddToCart" :active-filters="acitveFilters" />
    <SinglePizza :data="singlePizza" />
    <Cart :cart="cart" :is-open="isOpen" :order-status="orderStatus" @close-modal="handleModal"
      @handle-quantity="handleQuantity" @handle-size="handleSize" @handle-delete="handleDelete"
      @data-up="handleDeliveryData" @pass-create-emit="handleCreateOrder" />
  </div>
</template>
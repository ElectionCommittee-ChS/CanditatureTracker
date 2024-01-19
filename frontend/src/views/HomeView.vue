<script setup lang="ts">
import axios from 'axios'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

interface Candidates {
  name: string
  candidates: number
}

interface divisions {
  [key: string]: number
}

interface colours {
  [key: string]: string
}

const colours_by_division: colours = {
  A: 'red',
  D: '#fa6607',
  DS: 'darkseagreen',
  E: 'yellow',
  F: 'black',
  GS: 'Teal',
  H: 'Orchid',
  I: 'Purple',
  IT: 'PaleTurquoise',
  K: 'LimeGreen',
  KfKb: 'DarkGreen',
  M: 'Brown',
  Sjö: 'DarkBlue',
  TD: 'DarkRed',
  Utomlandsstuderande: 'light-grey',
  V: 'Lightblue',
  Z: 'grey',
  TB: 'Beige',
  AE: 'Chartreuse'
}

async function get_vote_data() {
  let data: Candidates[] = []
  axios
    .get('/data.json')
    .then((res) => {
      data = res.data
      vote_data.value = data
    })
    .catch((err) => console.log(err))
}
const vote_data: Ref<Candidates[]> = ref([])

get_vote_data()

const total_votes: ComputedRef<number> = computed(() => {
  return vote_data.value.reduce((sum: number, div: Candidates) => sum + div.candidates, 0)
})
</script>

<template>
    <h1>FuM Candidature 2024 - Number of Candidates by Division</h1>
    <div class="division" v-for="(division, index) in vote_data" :key="division.name">
      <div class="position">{{ index + 1 }}.</div>
      <div class="candidates">{{ division.candidates }}</div>
      <div
        class="bar"
        :style="'width: ' +
          division.candidates * 3 +
                '%; background-color: ' +
        colours_by_division[division.name] +
        ';'
      "
    ></div>
    <div class="name">{{ division.name }}</div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bold;
}

.division > div {
  padding: 5px;
  margin-bottom: 5px;
  height: 34px;
}
.bar {
  background-color: var(--vt-c-red);
}

.total > .bar {
  background-color: var(--vt-c-blue);
}
.position {
  width: 26px;
  font-weight: bold;
}

.name {
  font-weight: bold;
}

.candidates {
  width: 50px;
  /* font-weight: bold; */
}

.division {
  width: 100%;
  display: inline-flex;
}
</style>

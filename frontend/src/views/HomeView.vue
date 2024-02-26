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
  A: '#cc0000',
  D: '#fa6607',
  DS: 'darkseagreen',
  E: '#ffff00',
  F: 'black',
  GS: '#efc26a',
  H: '#eb79ab',
  I: '#9F36A1',
  IT: '#09cdda',
  K: '#5c9143',
  KfKb: '#3D7620',
  M: '#795548',
  Sjö: '#1F2163',
  TD: '#600010',
  Utomlandsstuderande: 'light-grey',
  V: '#3d85c6',
  Z: '#6E6E6E',
  TB: 'Beige',
  AE: '#54ce59'
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
  <main>
    <hgroup>
      <h1>FuM Candidature 2024</h1>
      <h2>Number of Candidates by Division</h2>
      <h3>Apply now at <a href="https://fumval.se">fumval.se</a></h3>
    </hgroup>
    <div class="division" v-for="(division, index) in vote_data" :key="division.name">
      <div class="position">{{ index + 1 }}.</div>
      <div class="candidates">{{ division.candidates }}</div>
      <div class="bar" :style="'width: ' +
        division.candidates * 3 +
        '%; background-color: ' +
        colours_by_division[division.name] +
        ';'
        "></div>
      <div class="name">{{ division.name }}</div>
    </div>
    <img src="@/assets/logo.svg" alt="Logo for Fullmäktige Election 2024">
  </main>
</template>

<style scoped>
h1 {
  font-weight: bold;
}

hgroup {
  text-align: center;
  margin: 20px 0;
}

.division>div {
  padding: 5px;
  margin-bottom: 5px;
  height: 34px;
}

.bar {
  background-color: var(--vt-c-red);
}

.total>.bar {
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

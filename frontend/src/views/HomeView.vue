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

const total_candidates: ComputedRef<number> = computed(() => {
  return vote_data.value.reduce((sum: number, div: Candidates) => sum + div.candidates, 0)
})

</script>

<template>
  <main>
    <hgroup>
      <h1>FuM Candidature 2024</h1>
      <h2>There are Currently {{ total_candidates }} Candidates</h2>
      <h2>Percentage of Candidates by Division</h2>
      <h3>Apply now at <a href="https://fumval.se">Fumval.se</a></h3>
    </hgroup>
    <img src="@/assets/logo.svg" alt="Logo for Fullmäktige Election 2024">
    <div class="division-wrapper">
      <div class="division" v-for="(division, index) in vote_data" :key="division.name">
        <div class="candidates">{{ Math.round(division.candidates / total_candidates * 100) }}%</div>
        <div class="bar-desktop" :style="'height: ' +
        division.candidates * 8 +
        '%; background-color: ' +
        colours_by_division[division.name] +
        ';'
        "></div>
        <div class="bar-mobile" :style="'width: ' +
        division.candidates * 6 +
        '%; background-color: ' +
        colours_by_division[division.name] +
        ';'
        "></div>
        <!-- <div class="position">{{ index + 1 }}.</div> -->
        <div class="name">{{ division.name }}</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 1280px;
  padding: 3rem;
  font-weight: normal;
  background-color: white;
  border-radius: 10px;
  margin: 5px;
}

h1 {
  font-weight: 900;
  font-size: 3em;
  font-style: italic;
  filter: drop-shadow(5px 5px 0px #00ACFF11);
}

h2 {
  font-weight: bold;
  font-size: 2em;
}

h3 {
  font-size: 1.5em;
}

hgroup a {
  display: inline-block;
  font-style: italic;
  padding: 0px 10px;
  border-radius: 7px;
  background-color: #00acff;
  color: white;
  text-decoration: 0.5px underline;
  font-weight: bold;
  transition: 0.3s;
}

hgroup a:hover {
  background-color: #007fbe;
  text-decoration: none;
  filter: drop-shadow(3px 3px 0px #00ACFF11);
}

hgroup {
  margin-bottom: 20px;
}

.division>div {
  padding: 5px;
  margin-bottom: 5px;
}

.division-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin: 20px 0;
  height: 60vh;
}

.division {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 4vw;
  margin: 0 5px;
}

.candidates,
.name {
  font-size: 1.2em;
  font-weight: bold;
}

.bar-desktop {
  width: 100%;
  transition: height 0.3s ease;
}

.bar-mobile {
  display: none;
}

main>img {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  margin: 50px;
  transition: width 0.3s ease;
}

@media (max-width: 1000px) {
  main {
    padding: 2rem;
    min-width: 90vw;
  }

  .bar-desktop {
    display: none;
  }

  .bar-mobile {
    display: block;
    transition: width 0.3s ease;
  }

  .division-wrapper {
    flex-direction: column;
    height: 100%;
  }

  .division {
    flex-direction: row-reverse;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
  }

  .division>div {
    height: 40px;
  }

  .name {
    width: 55px;
    text-align: center;
  }

  main>img {
    top: initial;
    bottom: 0;
    width: 175px;
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.8em;
  }

  h2 {
    font-size: 1.2em;
  }

  h3 {
    font-size: 1.2em;
  }

  main>img {
    width: 100px;
  }
}
</style>

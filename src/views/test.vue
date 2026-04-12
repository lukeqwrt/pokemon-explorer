<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Pokemon from '../components/Pokemon.vue'
import { useMainStore } from '../stores/pokemonStore' 
const store = useMainStore()

const pokemons = ref([])

const getPokemon = async (page) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${page}`);
    const data = await res.json();
    pokemons.value = await Promise.all(
      data.results.map(async (res, index) => {
        const detailsRes = await fetch(res.url);
        const detailsData = await detailsRes.json();
        const types = detailsData.types.map(type => type.type)
        console.log()
        const spriteImage = detailsData.sprites.other["official-artwork"].front_default
        return {
          ...res,
          id: index + 1,
          image: spriteImage,
          types: types,
          height: detailsData.height,
          weight: detailsData.weight,
        };
      })
    );
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
};

watch(
  () => store.pokemonPage,  // Watch the page offset in the store
  (newPage) => {
    pokemons.value = []
    getPokemon(newPage);  // Fetch new Pokémon when the page changes
  }
);


onMounted(() => {
  getPokemon(store.pokemonPage);
})

const checkPokemons = computed(() => {
  return pokemons.value.length
})

</script>

<template>
    <div class="pokemon-wrapper container">
        <div v-for="pokemon in pokemons">
            <Pokemon
              :pokemon="pokemon"
              :checkPokemons="checkPokemons"
            />
        </div>
    </div>
</template>


<style scoped>
.container{
  @apply mx-auto max-w-[1285px] grid justify-between gap-x-5 gap-y-28 grid-cols-3;
}

.gradient-bg{
  /* background-image: linear-gradient(
    45deg,
    hsl(207deg 69% 53%) 0%,
    hsl(200deg 100% 45%) 7%,
    hsl(198deg 100% 46%) 14%,
    hsl(196deg 100% 47%) 20%,
    hsl(193deg 100% 47%) 26%,
    hsl(189deg 100% 46%) 32%,
    hsl(185deg 100% 44%) 38%,
    hsl(178deg 100% 42%) 45%,
    hsl(171deg 100% 44%) 52%,
    hsl(164deg 100% 45%) 59%,
    hsl(157deg 100% 46%) 68%,
    hsl(146deg 88% 53%) 80%,
    hsl(115deg 88% 67%) 100%
  ); */
  background-image: linear-gradient(
    0deg,
    hsl(0deg 0% 0%) 0%,
    hsl(344deg 0% 2%) 8%,
    hsl(344deg 0% 3%) 17%,
    hsl(344deg 0% 5%) 25%,
    hsl(344deg 0% 6%) 33%,
    hsl(344deg 0% 8%) 42%,
    hsl(344deg 0% 9%) 50%,
    hsl(344deg 0% 10%) 58%,
    hsl(344deg 0% 11%) 67%,
    hsl(344deg 0% 11%) 75%,
    hsl(344deg 0% 12%) 83%,
    hsl(344deg 0% 13%) 92%,
    hsl(0deg 0% 14%) 100%
  );
}
</style>
<script setup>
import { computed, onMounted, ref, watch, nextTick, onUnmounted } from 'vue';
import Pokemon from '../components/Pokemon.vue'
import loading from '@/components/ui/loading.vue';
import PokemonFilterType from '@/components/PokemonFilterType.vue';
import PokemonSearch from '@/components/PokemonSearch.vue';
import Alert from '@/components/ui/Alert.vue';
import { useMainStore } from '../stores/pokemonStore' 
import LoadingModal from '@/components/ui/LoadingModal.vue';
import { Icon } from '@iconify/vue'
const store = useMainStore()
const pokemons = ref([])
const pokemonPlaceholders = ref(Array.from({ length: 9 }, () => ({isLoading: true}) ))
const observerRefs = ref([]);
let debounceTimeout; 
const page = ref(0)
const pageSize = ref(9);
const isWithType = ref(false)
const skipWatch = ref(false)
const searchInput = ref()
const search = ref('')
// home default showing pokemons
const getPokemon = async (page) => {
  try {

    // if (store.pageCache[page]) {
    //   pokemons.value = store.pageCache[page];
    //   store.pokemonlistfetch = true;
    //   store.isType = false;
    //   return;
    // }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${page}`);
    // console.log(page)
    const data = await res.json();
    const results = data.results.map((res, index) => (
      {
        ...res,
        id: index + 1,
        name: res.name,
        url: res.url,
        isLoading: false
      }
    ))
    // store.pageCache[page] = results;
    store.isType = false
    setTimeout(() => {
      pokemons.value = results
      store.pokemonlistfetch = true  
      store.paginateShow = true
      search.value = ''
    }, 300);

  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
};

// Handle Pokémon visibility using Intersection Observer
const onIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const pokemonIndex = Number(entry.target.dataset.index);
      const pokemon = pokemons.value[pokemonIndex];
      if (!pokemon) {
        return; // Skip this iteration
      }

      pokemon.isVisible = true;
      pokemon.isLoading = false;
      observer.unobserve(entry.target);
    }
  });
};

// Initialize Intersection Observer
const setupObservers = async () => {
  const observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
  await nextTick(); // Wait for DOM updates
  observerRefs.value.forEach((ref, index) => {
    if (ref) observer.observe(ref); // Observe each Pokémon card
  });
};

// Watch for Pokémon list changes and re-setup observers
watch(
  () => pokemons.value,
  () => {
    observerRefs.value = pokemons.value.map(() => null); // Reset observer refs
    isWithType.value
    setupObservers();
  }
);


// when pokemon type is clicked
const passPokemonType = async (type) => {
  skipWatch.value = true
  store.pokemonlistfetch = false
  store.isType = true;
  store.getPokemonType = type
  store.paginateShow = true
  search.value = ''
  if(type === 'home'){
    pokemons.value = []
    pokemonPlaceholders.value = Array.from({ length: 9 }, () => ({isLoading: true}) )
    store.disableNextType = false
    store.isType = false
    if(store.pokemonPage == 0) {
      getPokemon(0)
    }else {
      store.pokemonPage = 0;
    }

    return
  }
  store.pokemonPage = 0;
  pokemons.value = []
  pokemonPlaceholders.value = Array.from({ length: 9 }, () => ({isLoading: true}) )

  const res = await fetch('https://pokeapi.co/api/v2/type/' + type)
  const data = await res.json()
  

  const getPokemonType = data.pokemon.map((res) => res.pokemon)
  const results = getPokemonType.map((res, index) => (
    {
      ...res,
      id: index + 1,
      name: res.name,
      url: res.url,
      isLoading: false
    }
  ))
  setTimeout(() => {
    pokemons.value = results.slice(0, 9);
    store.pokemonlistfetch = true  
    skipWatch.value = false
  }, 300);
}
const paginateType = async () => {
  search.value = ''
  const limit = 9;
  const page = store.pokemonPage;
  const start = page * limit;
  const end = start + limit;
  // fetch
  const res = await fetch('https://pokeapi.co/api/v2/type/' + store.getPokemonType);
  const data = await res.json();
  const getPokemontype = data.pokemon.map((res) => res.pokemon);
  const results = getPokemontype.map((res, index) => ({
    ...res,
    id: index + 1,
    name: res.name,
    url: res.url,
    isLoading: false
  }))
  const total = results.length;
  const maxPage = Math.ceil(total / limit) - 1;
  
  setTimeout(() => {
    pokemons.value = results.slice(start, end)
    store.pokemonlistfetch = true 
    store.paginateShow = true
    if(page == maxPage){
      store.disableNextType = true;
    } else {
      store.disableNextType = false;
    } 
  }, 300);
}

const errorSearch = ref()
const pokemonSearchLoading = ref(false)

const pokeSearch = async (name) => {
  searchInput.value = name

  if(!name){
    store.paginateShow = true
    getPokemon(0)
    return
  }

  try {
    pokemonSearchLoading.value = true
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data = await res.json();
    const filterPokemon = data.results.filter((pokemonChar) =>
      pokemonChar.name.toLowerCase().includes(name.toLowerCase())
    );

    setTimeout( async () => {
      if(filterPokemon && filterPokemon.length !== 0){
        store.paginateShow = false
        pokemons.value = []
        // pokemons.value = await filterPokemon.slice(0, 9);
        pokemons.value = await filterPokemon
        errorSearch.value = ''
        pokemonSearchLoading.value = false
        // handleScroll()
        return
      }
      
      errorSearch.value = 'cant find this shitssda'
      pokemonSearchLoading.value = false
      store.paginateShow = true
      setTimeout(() => {
        errorSearch.value = null
      }, 2000);
    }, 1000);
  
  } catch (error) {
    errorSearch.value = error
    pokemonSearchLoading.value = false
  } finally {
    // Set loading state to false after fetch completes
    pokemonPlaceholders.value = Array.from({ length: 9 }, () => ({ isLoading: false }));
  }
};


watch(
  () => store.pokemonPage, // Watch the page offset in the store
  (newPage) => {
    if(store.isType) {
      if(skipWatch.value){
        return
      }
      store.disableNextType = true;
      store.pokemonlistfetch = false 
      pokemons.value = [];
      debounceTimeout = setTimeout(async () => {
        await paginateType()
      }, 300);
    }else {
      clearTimeout(debounceTimeout); // Clear the previous timeout
      pokemons.value = []; // Clear the existing Pokémon while fetching
      debounceTimeout = setTimeout(async () => {
        await getPokemon(newPage); // Fetch new Pokémon after debounce delay
      }, 300); // 300ms debounce delay

    }
  }
);


onMounted(() => {
  getPokemon(store.pokemonPage);
})

const checkPokemons = computed(() => {
  return pokemons.value.length
})


const displayPokemons = computed(() => {
  return pokemons.value.length ? pokemons.value : pokemonPlaceholders.value ;
})


//  notes pages issues 
// conditional on what is the pages if it is getpokemon() or gettype()
</script>

<template>
  <Alert v-if="errorSearch"> 
    <Icon @click="errorSearch = null" class="cursor-pointer" icon="pepicons-pencil:times-circle" width="2rem" height="2rem"  style="color: white" />
    Can't find this pokemon
  </Alert>
  <LoadingModal v-if="pokemonSearchLoading">
    <span class="loader"></span>
  </LoadingModal>
  <div class="grid grid-cols-12 container gap-x-5 max-lg:grid-cols-1 max-lg:gap-y-5">
    <div class="col-span-6">
      <PokemonFilterType @passPokemonType="passPokemonType" />
    </div>
    <div class="col-span-6">
      <PokemonSearch v-model="search" @search="pokeSearch" />
    </div>
  </div>
  <div class="pokemon-wrapper container pokemon-col mt-12 max-lg:mt-8">
    <div v-for="(pokemon, index) in displayPokemons" :key="index" ref="observerRefs" :data-index="index">
      <div class="text-white">
      </div>
      <Pokemon
        v-if="pokemon.isVisible"
        :pokemon="pokemon"
      />
      
      <div v-else class="pokemon-tile-placeholder loading-gradient border-2 bg-primary rounded-3xl border-white border-opacity-20 relative h-[385px] w-full flex justify-center items-center">
            <div class="absolute top-[50%] translate-y-[-50%] z-[999]">
                <loading />
            </div>
      </div>
    </div>
  </div>
</template>


<style scoped>


.loading-gradient{
  background: radial-gradient(100% 100% at 50% 130%, #355db9, rgba(6, 14, 32, 1));
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

.loader {
  width: 60px;
  height: 60px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background: #FFF;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 0.8s linear infinite;
}
.loader::after {
  animation-delay: 0s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
    
</style>


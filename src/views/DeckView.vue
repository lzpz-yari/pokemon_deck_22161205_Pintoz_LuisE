<script setup>
import { ref, computed, onMounted } from 'vue'
import PokemonCard from '../components/PokemonCard.vue'
import { getRandomDeck, DECK_SIZE } from '../services/pokeApi'

const deck = ref([])
const loading = ref(false)
const error = ref('')

const statusText = computed(() =>
  loading.value ? 'Barajando cartas...' : `${deck.value.length} / ${DECK_SIZE} cartas`
)

async function loadDeck() {
  loading.value = true
  error.value = ''

  try {
    deck.value = await getRandomDeck(DECK_SIZE)
  } catch (err) {
    error.value = err.message
    deck.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadDeck)
</script>

<template>
  <main class="deck-view">
    <header class="deck-header">
      <div>
        <h1 class="deck-title">Pokémon Deck</h1>
        <p class="deck-subtitle">40 cartas aleatorias obtenidas de la PokeAPI</p>
      </div>

      <div class="deck-actions">
        <span class="deck-counter">{{ statusText }}</span>
        <button class="deck-button" :disabled="loading" @click="loadDeck">
          {{ loading ? 'Cargando...' : 'Generar nuevo deck' }}
        </button>
      </div>
    </header>

    <!-- Error -->
    <div v-if="error" class="deck-error">
      <p>{{ error }}</p>
      <button class="deck-button" @click="loadDeck">Reintentar</button>
    </div>

    <!-- Cargando: reverso de las cartas -->
    <section v-else-if="loading" class="deck-grid">
      <div v-for="n in DECK_SIZE" :key="n" class="card-back">
        <span class="card-back-ball"></span>
      </div>
    </section>

    <!-- Deck -->
    <section v-else class="deck-grid">
      <PokemonCard v-for="pokemon in deck" :key="pokemon.id" :pokemon="pokemon" />
    </section>
  </main>
</template>

<style scoped src="../styles/deck.css"></style>
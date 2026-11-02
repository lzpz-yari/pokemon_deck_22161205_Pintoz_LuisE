<script setup>
import { computed } from 'vue'
import { getTypeInfo } from '../utils/pokemonTypes'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})

const types = computed(() => props.pokemon.types.map(getTypeInfo))
const mainType = computed(() => types.value[0])

// Número con formato de Pokédex: 25 -> 0025
const formattedId = computed(() => String(props.pokemon.id).padStart(4, '0'))

// El color del tipo principal pinta la carta
const cardStyle = computed(() => ({
  '--type-color': mainType.value.color
}))

const characteristics = computed(() => [
  { label: 'Ataque', value: props.pokemon.stats.attack },
  { label: 'Defensa', value: props.pokemon.stats.defense },
  { label: 'Velocidad', value: props.pokemon.stats.speed }
])
</script>

<template>
  <article class="pokemon-card" :style="cardStyle">
    <div class="card-body">
      <!-- Encabezado: etapa, nombre, PS y tipo -->
      <header class="card-header">
        <span class="card-stage">BÁSICO</span>
        <h2 class="card-name">{{ pokemon.name }}</h2>
        <span class="card-hp"><small>PS</small>{{ pokemon.stats.hp }}</span>
        <span class="type-icon" :title="mainType.name">{{ mainType.icon }}</span>
      </header>

      <!-- Imagen -->
      <figure class="card-image">
        <img :src="pokemon.image" :alt="pokemon.name" loading="lazy" />
      </figure>

      <!-- Franja de datos del Pokédex -->
      <p class="card-strip">
        N.º {{ formattedId }} · Altura: {{ pokemon.height }} m · Peso: {{ pokemon.weight }} kg
      </p>

      <!-- Tipos -->
      <div class="card-types">
        <span
          v-for="type in types"
          :key="type.name"
          class="type-badge"
          :style="{ backgroundColor: type.color }"
        >
          {{ type.icon }} {{ type.name }}
        </span>
      </div>

      <!-- Habilidades -->
      <section class="card-abilities">
        <div v-for="ability in pokemon.abilities" :key="ability.name" class="ability">
          <div class="ability-title">
            <span class="ability-label">Habilidad</span>
            <h3>{{ ability.name }}</h3>
            <span v-if="ability.hidden" class="ability-hidden">Oculta</span>
          </div>
          <p class="ability-text">{{ ability.description }}</p>
        </div>
      </section>

      <!-- Características -->
      <footer class="card-stats">
        <div v-for="item in characteristics" :key="item.label" class="stat">
          <span class="stat-label">{{ item.label }}</span>
          <strong class="stat-value">{{ item.value }}</strong>
        </div>
      </footer>

      <p class="card-footer">
        <span>#{{ formattedId }}</span>
        <span>Exp. base {{ pokemon.baseExperience }}</span>
      </p>
    </div>
  </article>
</template>

<style scoped src="../styles/pokemon-card.css"></style>
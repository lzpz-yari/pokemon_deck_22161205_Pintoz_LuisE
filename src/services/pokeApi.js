// Servicio que se comunica con la PokeAPI usando fetch
const API_URL = 'https://pokeapi.co/api/v2'

export const MAX_POKEMON_ID = 1025 // Pokémon disponibles
export const DECK_SIZE = 40

// Guarda las habilidades ya consultadas para no repetir peticiones
const abilityCache = new Map()

function randomId() {
  return Math.floor(Math.random() * MAX_POKEMON_ID) + 1
}

async function getJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${url}`)
  }
  return response.json()
}

function capitalize(text) {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Obtiene el nombre y la descripción en español de una habilidad
async function getAbility(ability) {
  const { name, url } = ability

  if (!abilityCache.has(url)) {
    const request = getJson(url)
      .then((data) => {
        const nameEs = data.names.find((n) => n.language.name === 'es')
        const flavorEs = data.flavor_text_entries
          .filter((f) => f.language.name === 'es')
          .pop()
        const effectEn = data.effect_entries.find((e) => e.language.name === 'en')

        return {
          name: nameEs?.name ?? capitalize(name),
          description: (flavorEs?.flavor_text ?? effectEn?.short_effect ?? 'Sin descripción.')
            .replace(/\s+/g, ' ')
            .trim()
        }
      })
      .catch(() => ({ name: capitalize(name), description: 'Sin descripción.' }))

    abilityCache.set(url, request)
  }

  return abilityCache.get(url)
}

// Consulta un Pokémon por id: https://pokeapi.co/api/v2/pokemon/{id}
// Regresa null si no cumple con lo necesario para la carta
export async function getPokemon(id) {
  const data = await getJson(`${API_URL}/pokemon/${id}`)

  const image =
    data.sprites?.other?.['official-artwork']?.front_default ?? data.sprites?.front_default

  // Cada carta necesita imagen y al menos 2 habilidades
  if (!image || data.abilities.length < 2) return null

  const abilities = await Promise.all(
    data.abilities.slice(0, 2).map(async ({ ability, is_hidden }) => ({
      ...(await getAbility(ability)),
      hidden: is_hidden
    }))
  )

  const stat = (statName) => data.stats.find((s) => s.stat.name === statName)?.base_stat ?? 0

  return {
    id: data.id,
    name: capitalize(data.name),
    image,
    types: data.types.map((t) => t.type.name),
    height: data.height / 10, // decímetros -> metros
    weight: data.weight / 10, // hectogramos -> kilogramos
    baseExperience: data.base_experience ?? 0,
    stats: {
      hp: stat('hp'),
      attack: stat('attack'),
      defense: stat('defense'),
      speed: stat('speed')
    },
    abilities
  }
}

// Arma un deck de Pokémon aleatorios sin repetir
export async function getRandomDeck(size = DECK_SIZE) {
  const usedIds = new Set()
  const deck = []
  let attempts = 0

  while (deck.length < size && attempts < 10) {
    attempts++

    const ids = []
    while (ids.length < size - deck.length && usedIds.size < MAX_POKEMON_ID) {
      const id = randomId()
      if (!usedIds.has(id)) {
        usedIds.add(id)
        ids.push(id)
      }
    }

    const results = await Promise.allSettled(ids.map(getPokemon))
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) deck.push(result.value)
    })
  }

  if (deck.length === 0) {
    throw new Error('No se pudo cargar ningún Pokémon. Revisa tu conexión a internet.')
  }

  return deck.slice(0, size)
}
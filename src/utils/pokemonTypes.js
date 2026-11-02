// Nombre en español, color e ícono de cada tipo de Pokémon
export const POKEMON_TYPES = {
  normal:   { name: 'Normal',    color: '#A8A77A', icon: '⭐' },
  fire:     { name: 'Fuego',     color: '#EE8130', icon: '🔥' },
  water:    { name: 'Agua',      color: '#6390F0', icon: '💧' },
  electric: { name: 'Eléctrico', color: '#F7D02C', icon: '⚡' },
  grass:    { name: 'Planta',    color: '#7AC74C', icon: '🍃' },
  ice:      { name: 'Hielo',     color: '#96D9D6', icon: '❄️' },
  fighting: { name: 'Lucha',     color: '#C22E28', icon: '👊' },
  poison:   { name: 'Veneno',    color: '#A33EA1', icon: '☠️' },
  ground:   { name: 'Tierra',    color: '#E2BF65', icon: '⛰️' },
  flying:   { name: 'Volador',   color: '#A98FF3', icon: '🪶' },
  psychic:  { name: 'Psíquico',  color: '#F95587', icon: '🔮' },
  bug:      { name: 'Bicho',     color: '#A6B91A', icon: '🐛' },
  rock:     { name: 'Roca',      color: '#B6A136', icon: '🪨' },
  ghost:    { name: 'Fantasma',  color: '#735797', icon: '👻' },
  dragon:   { name: 'Dragón',    color: '#6F35FC', icon: '🐉' },
  dark:     { name: 'Siniestro', color: '#705746', icon: '🌙' },
  steel:    { name: 'Acero',     color: '#B7B7CE', icon: '⚙️' },
  fairy:    { name: 'Hada',      color: '#D685AD', icon: '✨' }
}

export function getTypeInfo(type) {
  return POKEMON_TYPES[type] ?? { name: type, color: '#A8A77A', icon: '⭐' }
}
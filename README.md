# Pokémon Deck

Aplicación hecha con **Vue.js 3** y **Vite** que arma un deck de **40 cartas Pokémon aleatorias** usando `fetch` y la [PokeAPI](https://pokeapi.co/).

Cada carta se dibuja con el componente `PokemonCard.vue` y muestra:

- Nombre e id (número de Pokédex)
- Imagen oficial
- Tipo(s)
- 2 habilidades (nombre y descripción en español)
- Características: PS, ataque, defensa, velocidad, altura, peso y experiencia base

## Funcionamiento

1. Se generan ids aleatorios entre 1 y 1025 sin repetir.
2. Se consulta cada Pokémon en `https://pokeapi.co/api/v2/pokemon/{id}`.
3. Solo se aceptan Pokémon con imagen y al menos 2 habilidades; si alguno no cumple, se pide otro.
4. Las habilidades se consultan para obtener su nombre y descripción en español.
5. El botón **Generar nuevo deck** baraja otras 40 cartas.

## Tecnologías

- Vue.js 3 (Composition API, `<script setup>`)
- Vite
- JavaScript, HTML y CSS
- PokeAPI

## Instalación

```bash
git clone https://github.com/<tu-usuario>/pokemon-deck.git
cd pokemon-deck
npm install
npm run dev
```

Abrir la dirección que muestra Vite (normalmente http://localhost:5173).

## Estructura

```
pokemon-deck/
├── public/
├── src/
│   ├── components/
│   │   └── PokemonCard.vue     # Componente carta Pokémon
│   ├── services/
│   │   └── pokeApi.js          # Peticiones fetch a la PokeAPI
│   ├── styles/
│   │   ├── main.css            # Estilos globales
│   │   ├── deck.css            # Estilos de la vista del deck
│   │   └── pokemon-card.css    # Estilos de la carta
│   ├── utils/
│   │   └── pokemonTypes.js     # Colores, íconos y nombres de tipos
│   ├── views/
│   │   └── DeckView.vue        # Vista con las 40 cartas
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

## Autor

Luis Enrique Pinto Zárate — Instituto Tecnológico de Oaxaca

# Smart Recipe Finder

Smart Recipe Finder är en webbapplikation byggd med React och Vite. Syftet med applikationen är att hjälpa användare att hitta recept baserat på antingen en vanlig sökning eller de ingredienser som redan finns hemma i köket.

Målgruppen är personer som vill laga mat enklare, använda ingredienser de redan har och minska matsvinn. Användaren kan söka efter recept, spara favoriter, lägga till ingredienser i ett köksförråd och söka recept utifrån detta förråd.

## Funktioner

- Sök efter recept via Spoonacular API.
- Visa receptkort med bild och titel.
- Visa detaljer för ett valt recept, till exempel ingredienser, instruktioner, tillagningstid och portioner.
- Spara favoritrecept i webbläsarens `localStorage`.
- Lägga till och ta bort ingredienser i ett köksförråd.
- Söka efter recept baserat på ingredienser i köksförrådet.
- Spara de senaste sökningarna i `localStorage`.
- Uppdatera köksförrådet när användaren markerar ett recept som tillagat.

## Tekniker

- React
- Vite
- JavaScript
- HTML
- CSS
- Spoonacular API
- Git och GitHub
- `localStorage`

## Externt API

Projektet använder Spoonacular API för receptdata. Följande endpoints används i applikationen:

- `GET /recipes/complexSearch` för att söka recept med en sökfras.
- `GET /recipes/findByIngredients` för att hitta recept baserat på ingredienser.
- `GET /recipes/{id}/information` för att hämta detaljerad information om ett recept.

API-anropen görs med `fetch`, där resultatet kan sparas i komponenternas state och sedan visas direkt i gränssnittet.

## Sparad data

Applikationen sparar data lokalt i webbläsaren med `localStorage`. Detta gör att informationen finns kvar även om användaren laddar om sidan.

Data som sparas:

- Favoritrecept
- Köksförråd
- Senaste sökningar


## Ramverksval

Vi valde React eftersom projektet består av flera tydliga delar som passar bra som komponenter: sökfält, receptkort, favoriter, köksförråd, receptdetaljer och senaste sökningar. Reacts komponentmodell gjorde det enkelt att dela upp gränssnittet i mindre filer och hantera data med `useState` och `useEffect`.

### Jämförelse mellan React, Vue och Angular

Inför utvecklingen av Smart Recipe Finder jämförde vi React med Vue och Angular för att hitta det ramverk som passade bäst för projektets behov.

React valdes eftersom det är komponentbaserat, har ett stort ekosystem och erbjuder bra möjligheter att bygga upp användargränssnitt med återanvändbara komponenter. React har också en stor användarbas, mycket dokumentation och fungerar väl tillsammans med Vite, vilket gjorde utvecklingsprocessen snabb och smidig. Med hjälp av Reacts hooks, såsom useState och useEffect, kunde vi enkelt hantera applikationens data och användarinteraktioner.

Vue var ett alternativ som vi också övervägde. Vue är känt för att vara lätt att lära sig, ha en tydlig syntax och bra dokumentation. För mindre projekt kan Vue vara ett mycket bra val eftersom det går snabbt att komma igång med. Däremot hade vi redan erfarenhet av React från tidigare kurser, vilket gjorde att React blev ett mer naturligt val för oss.

Angular är ett mer omfattande ramverk som innehåller många funktioner direkt från början, exempelvis routing, formulärhantering och dependency injection. Detta kan vara en fördel i större projekt med många utvecklare och mer avancerade krav. För vårt projekt bedömde vi dock att Angular skulle innebära mer komplexitet än vad som behövdes och att utvecklingstiden därför skulle bli längre.

Sammanfattningsvis valde vi React eftersom det gav oss en bra balans mellan flexibilitet, struktur och utvecklingshastighet. Vår tidigare erfarenhet av React gjorde också att vi kunde fokusera mer på att utveckla funktionaliteten i applikationen istället för att lära oss ett nytt ramverk. Vue hade också varit ett möjligt alternativ, men React passade bättre för projektets upplägg. Angular ansåg vi vara mer lämpligt för större och mer komplexa applikationer än Smart Recipe Finder.

## Projektstruktur

```text
src/
  App.jsx
  main.jsx
  services/
    recipeService.js
  components/
    Navbar.jsx
    SearchBar.jsx
    Inventory.jsx
    RecentSearches.jsx
  App.css
  index.css
```

Komponenterna har följande ansvar:

- `App.jsx` hanterar huvudlogiken och kopplar ihop komponenterna.
- `SearchBar.jsx` hanterar receptsökningar.
- `Inventory.jsx` hanterar köksförrådet.
- `RecentSearches.jsx` visar och hanterar senaste sökningar.
- `Navbar.jsx` visar sidans navigation.
- `recipeService.js` innehåller funktioner för API-anrop.


## Installation och körning

1. Klona projektet:

```bash
git clone https://github.com/ghzu1/smart_recipe_finder.git
```

2. Gå in i projektmappen:

```bash
cd smart_recipe_finder
```

3. Installera beroenden:

```bash
npm install
```

4. Skapa en `.env`-fil i projektets rotmapp och lägg till din API-nyckel:

```env
VITE_SPOONACULAR_API_KEY=din_api_nyckel_har
```

5. Starta utvecklingsservern:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Referenser

- React documentation: https://react.dev/
- React documentation, Describing the UI: https://react.dev/learn/describing-the-ui
- Vue documentation: https://vuejs.org/
- Angular documentation, What is Angular?: https://angular.dev/overview
- Angular documentation, Dependency injection: https://angular.dev/guide/di
- Vite documentation, Environment Variables and Modes: https://vite.dev/guide/env-and-mode
- Spoonacular API documentation: https://spoonacular.com/food-api/docs

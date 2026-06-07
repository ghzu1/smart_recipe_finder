# Smart Recipe Finder

Smart Recipe Finder är en webbapp byggd med React och Vite. Projektet handlar om att göra det enklare att hitta recept, antingen genom en vanlig sökning eller genom att använda ingredienser som redan finns hemma.

Tanken med appen är att användaren ska kunna få inspiration till matlagning utan att behöva börja från noll. Användaren kan söka efter recept, spara favoriter, lägga till ingredienser i ett köksförråd och sedan hitta recept baserat på dessa ingredienser.

## Funktioner

Applikationen har följande funktioner:

- Söka efter recept via Spoonacular API.
- Visa receptkort med bild och titel.
- Visa detaljer för ett valt recept.
- Visa ingredienser, instruktioner, tillagningstid och portioner.
- Spara favoritrecept i `localStorage`.
- Ta bort recept från favoriter.
- Lägga till ingredienser i ett köksförråd.
- Välja mängd och enhet för ingredienser, till exempel `pcs`, `g`, `kg`, `ml`, `l`, `tsp` och `tbsp`.
- Undvika dubbletter i köksförrådet genom att slå ihop ingredienser med samma namn och samma enhet.
- Ta bort ingredienser från köksförrådet.
- Söka recept baserat på ingredienser i köksförrådet.
- Spara de fem senaste sökningarna.
- Klicka på en tidigare sökning för att söka igen.
- Ta bort enskilda sökningar från sökhistoriken.
- Uppdatera köksförrådet när ett recept markeras som tillagat.

## Tekniker

Projektet använder:

- React
- Vite
- JavaScript
- HTML
- CSS
- Spoonacular API
- Git och GitHub
- `localStorage`

## Externt API

Applikationen använder Spoonacular API för att hämta receptdata.

Följande endpoints används:

- `GET /recipes/complexSearch`  
  Används för att söka efter recept med en sökfras.

- `GET /recipes/findByIngredients`  
  Används för att hitta recept baserat på ingredienser från köksförrådet.

- `GET /recipes/{id}/information`  
  Används för att hämta mer detaljerad information om ett recept.

API-anropen ligger i filen `recipeService.js`. På så sätt är API-logiken samlad på ett ställe och komponenterna blir lättare att läsa.

## Sparad data

Applikationen använder `localStorage` för att spara data lokalt i webbläsaren. Det gör att informationen finns kvar även om sidan laddas om.

Data som sparas:

- Favoritrecept
- Köksförråd
- Senaste sökningar

Detta gör appen mer användbar eftersom användaren inte behöver börja om varje gång sidan öppnas.

## Köksförråd och enheter

I köksförrådet kan användaren lägga till ingredienser med namn, mängd och enhet.

Exempel:

- Egg — 6 pcs
- Tomato — 7 pcs
- Salt — 200 g
- Milk — 1 l
- Flour — 500 g

Om användaren lägger till samma ingrediens med samma enhet igen, uppdateras mängden i stället för att ett nytt kort skapas.

Exempel:

```text
Egg 2 pcs
Egg 4 pcs
```

blir:

```text
Egg 6 pcs
```

Om samma ingrediens läggs till med en annan enhet sparas den separat.

Exempel:

```text
Salt 200 g
Salt 2 tsp
```

sparas som två olika poster. Detta är gjort för att undvika felaktiga automatiska omvandlingar mellan olika enheter, eftersom vissa omvandlingar beror på vilken ingrediens det gäller.

## Ramverksval

Vi valde React eftersom applikationen består av flera tydliga delar som passar bra som komponenter. Exempel på sådana delar är sökfältet, köksförrådet, favoriter, senaste sökningar och receptdetaljer.

React gjorde det enklare att dela upp gränssnittet i mindre filer och hantera förändringar i appen med `useState`. Eftersom användaren kan söka, klicka, spara, ta bort och uppdatera information behövdes ett ramverk som gör det smidigt att hantera dynamiskt innehåll.

Vite användes eftersom det går snabbt att komma igång med och fungerar bra tillsammans med React.

## Jämförelse mellan React, Vue och Angular

Inför projektet jämförde vi React med Vue och Angular.

React passade bäst för detta projekt eftersom det är komponentbaserat, flexibelt och har mycket dokumentation. Eftersom vi redan hade arbetat med React tidigare kunde vi fokusera mer på själva funktionaliteten i applikationen.

Vue hade också kunnat fungera bra. Det är lätt att komma igång med och har en tydlig struktur. För ett mindre projekt som detta hade Vue varit ett rimligt alternativ. I detta projekt valde vi ändå React eftersom vi hade mer erfarenhet av det och eftersom projektets upplägg passade bra med Reacts komponentmodell.

Angular är ett större och mer omfattande ramverk. Det innehåller många inbyggda funktioner, till exempel routing, formulärhantering och dependency injection. Det kan vara en fördel i större projekt, men för Smart Recipe Finder hade Angular blivit mer avancerat än vad som behövdes.

Sammanfattningsvis valde vi React eftersom det gav en bra balans mellan struktur, flexibilitet och utvecklingshastighet.

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
    inventory.jsx
    RecentSearches.jsx
  App.css
  index.css
```

## Filernas ansvar

### `App.jsx`

`App.jsx` är huvudkomponenten i applikationen. Den kopplar ihop de andra komponenterna och hanterar mycket av den centrala logiken.

Den hanterar bland annat:

- receptresultat
- favoriter
- valt recept
- köksförråd
- senaste sökningar
- sökning från köksförrådet
- uppdatering av `localStorage`

### `SearchBar.jsx`

`SearchBar.jsx` innehåller sökfältet. När användaren söker skickas söktexten vidare till `App.jsx`, där sökningen hanteras.

### `inventory.jsx`

`inventory.jsx` hanterar köksförrådet. Komponenten innehåller formuläret där användaren kan lägga till ingrediens, mängd och enhet.

Den visar också alla sparade ingredienser och låter användaren ta bort dem. Komponenten innehåller även logik för att undvika dubbletter. Om samma ingrediens med samma enhet redan finns, ökas mängden i stället för att skapa ett nytt kort.

### `RecentSearches.jsx`

`RecentSearches.jsx` visar de senaste sökningarna. Användaren kan klicka på en tidigare sökning för att söka igen eller ta bort en sökning från listan.

### `Navbar.jsx`

`Navbar.jsx` visar sidans navigation. Länkarna går till olika delar av sidan, till exempel sökning, köksförråd och favoriter.

### `recipeService.js`

`recipeService.js` innehåller funktionerna som gör API-anrop till Spoonacular. Genom att ha API-logiken i en separat fil blir koden mer organiserad.

## Hur applikationen fungerar

När användaren söker efter ett recept skickas söktexten från `SearchBar.jsx` till `App.jsx`. Där sparas sökningen i listan över senaste sökningar och funktionen `searchRecipes` används för att hämta recept från Spoonacular API.

När recepten har hämtats sparas de i state och visas som receptkort på sidan. Varje receptkort har en knapp för att lägga till receptet som favorit och en knapp för att visa mer detaljer.

När användaren klickar på “View details” hämtas mer information om receptet med hjälp av receptets id. Informationen visas i en modal där användaren kan se ingredienser, instruktioner, tillagningstid och portioner.

Favoriter, köksförråd och senaste sökningar sparas i `localStorage`, vilket gör att datan finns kvar även efter att sidan laddas om.

Köksförrådet fungerar genom att användaren skriver in ingrediens, mängd och enhet. Om samma ingrediens med samma enhet redan finns, uppdateras mängden. Annars skapas ett nytt kort.

## Installation och körning

### 1. Klona projektet

```bash
git clone https://github.com/ghzu1/smart_recipe_finder.git
```

### 2. Gå in i projektmappen

```bash
cd smart_recipe_finder
```

### 3. Installera beroenden

```bash
npm install
```

### 4. Skapa en `.env`-fil

Skapa en fil som heter `.env` i projektets rotmapp och lägg till din API-nyckel:

```env
VITE_SPOONACULAR_API_KEY=din api nyckel
```

### 5. Starta utvecklingsservern

```bash
npm run dev
```

Efter detta kan applikationen öppnas i webbläsaren via den lokala adressen som visas i terminalen.

## Scripts

Starta utvecklingsservern:

```bash
npm run dev
```

Bygga projektet:

```bash
npm run build
```

Köra lint:

```bash
npm run lint
```

Förhandsvisa den byggda versionen:

```bash
npm run preview
```

## Begränsningar och möjliga förbättringar

Det finns några delar som kan förbättras i framtiden:

- Bättre felhantering om API-anrop misslyckas.
- En loading indikator medan recept hämtas.
- Mer exakt hantering av mängder när ett recept tillagas.
- Automatisk omvandling mellan vissa enheter, till exempel kg till g eller l till ml.
- Mer avancerad matchning mellan receptets ingredienser och användarens köksförråd.
- Möjlighet att rensa hela köksförrådet med en knapp.

I den nuvarande versionen minskas ingredienser i köksförrådet på ett förenklat sätt när ett recept markeras som tillagat. Detta fungerar som en grundfunktion, men kan utvecklas vidare för att ta hänsyn till exakta mängder och enheter.

## Reflektion

Arbetet med projektet har visat hur React kan användas för att bygga en interaktiv webbapplikation med flera komponenter. En viktig del var att dela upp applikationen i mindre delar och låta `App.jsx` hålla ihop den centrala logiken.

En annan viktig del var att använda `localStorage` för att spara information lokalt. Detta gjorde appen mer användbar eftersom favoriter, köksförråd och senaste sökningar finns kvar efter att sidan laddas om.

Under utvecklingen förbättrades appen stegvis. Först byggdes de viktigaste funktionerna, som sökning, favoriter och köksförråd. Senare förbättrades designen med animationer, hover-effekter och en mer modern layout.

En förbättring som gjorde köksförrådet mer användbart var att lägga till enheter och hantera dubbletter. Det gjorde att användaren kan skriva till exempel `Egg 6 pcs` eller `Salt 200 g`, vilket gör funktionen tydligare och mer realistisk.

## Referenser

- React documentation: https://react.dev/
- React documentation, Describing the UI: https://react.dev/learn/describing-the-ui
- Vue documentation: https://vuejs.org/
- Angular documentation, What is Angular?: https://angular.dev/overview
- Angular documentation, Dependency injection: https://angular.dev/guide/di
- Vite documentation, Environment Variables and Modes: https://vite.dev/guide/env-and-mode
- Spoonacular API documentation: https://spoonacular.com/food-api/docs
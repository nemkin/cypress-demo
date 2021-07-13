# cypress-demo

Egy egyszerű Todo listát kezelő alkalmazás a Cypress bemutatásához.

A Cypress-es tesztkód itt található:
[frontend/e2e/cypress/integration/cypress-demo.spec.ts](frontend/e2e/cypress/integration/cypress-demo.spec.ts)

## Backend

A backendet .NET Core-ban írtam, a [backend/docker-compose.yaml](backend/docker-compose.yaml)
fájlban található a futtatáshoz szükséges konfiguráció.

### Telepítendő

- Docker: [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows) (Windowson)

### Futtatás

Parancssorból a `docker-compose up -d` parancs kiadása a [backend](backend) mappán belül.

### Url

A backend API dokumentációja a [http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html) url-en lesz elérhető.

## Frontend

A frontendet Angular-ban írtam, npm package managert használtam.

### Telepítendő

- [Node.js](https://nodejs.org/en/)
- (Opcionális IDE) [VSCode](https://code.visualstudio.com/)

### Futtatás

*Alkalmazás:*
- A VSCode-ban megnyitni a [frontend](frontend) mappát, majd itt terminált nyitni. (De sima parancssorból is működik.)
- Kiadni az `npm install`, majd az `npm run start` parancsot a [frontend](frontend) mappán belül.

*Tesztesetek:*
- A Cypress indításához nyitni még egy terminált.
- Belépni a [frontend/e2e](frontend/e2e) mappába.
- Kiadni az `npx cypress open` parancsot a [frontend/e2e](frontend/e2e) mappán belül.

### Url

A frontend a [http://localhost:4200/](http://localhost:4200/) url-en fog elindulni.

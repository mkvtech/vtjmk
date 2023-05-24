# Apie

Baigiamojo darbo projektas. VTJMK sistema. VilniusTech Jaunųjų mokslininkų konferencijos.

Pagrindinė kodo saugykla: https://github.com/mkvtech/vtjmk.

# Diegimo instrukcijos

Pagal šias instrukcijas yra lengviausia patikrinti sistemos veikimą.

Sistemą galima įdiegti "Windows" arba "Ubuntu" operacinėse sistemose.

Kompiuteryje turi būti įdiegta "Git" ir "Docker" programinė įranga.

## Žingsniai:

1. Atsiųsti projektą. Paleiskite komandas:

```sh
git pull https://github.com/mkvtech/vtjmk.git
cd vtjmk
```

2. Sukurti sistemos servisus Docker sistemoje. Paleiskite komandą:

```sh
docker-compose up --build --detach
```

Šis žingsnis gali užtrūkti apie 5 min.

3. Sukurti sistemos duomenų bazė. Paleiskite komandą:

```sh
docker exec vtjmk_backend_dev bundle exec rails db:create db:schema:load db:seed
```

4. Atidaryti sistemos puslapį naršyklėje: http://localhost:5173

## Kita informacija

Sistemos testavimui yra generuojamos kelios vartotojų paskyros. Visas paskyras galima rasti `backend/db/seeds/development.rb` faile.

Čia yra pateiktos kelios paskyrų prisijungimo duomenis:

| Vartotojas       | El. paštas                     | Slaptažodis |
| ---------------- | ------------------------------ | ----------- |
| Administratorius | `admin@example.com`            | `password`  |
| Organizatorius   | `jonas.jonaitis@example.com`   | `password`  |
| Recenzentas      | `petras.petraitis@example.com` | `password`  |

Detalesnę informaciją apie sistemą galima rasti baigiamojo darbo apraše.

Baigiant darbą, sistemą galima sustabdyti paleidžiant komandą:

```sh
docker-compose down
```

Po pakeitimų sistemoje, kartais yra naudinga perkurti duomenų bazės duomenis. Tai galima padaryti paleidžiant komandą:

```sh
docker exec vtjmk_backend_dev bundle exec rails db:drop db:create db:schema:load db:seed
```

Visos komandos buvo patikrintos "Windows 10" ir "Ubuntu 22.04" operacinėse sistemose.

# Diegimo į pagrindinę operacinę sistemą instrukcijos

Ši instrukcija yra naudinga jei reikia automatinius testus arba stebėti sistemos veikimą po programinio kodo pakeitimų. Automatinių testų veikimą taip pat galima stebėti GitHub Actions puslapyje: https://github.com/mkvtech/vtjmk/actions.

Sistemą galima įdiegti "Ubuntu" operacinėje sistemoje. Šio skyriaus komandos buvo patikrintos "Ubuntu 22.04" operacinėje sistemoje.

Sistemoje turi būti įdiegti `Git`, `Ruby`, `NodeJS`, `Yarn`, `PostgreSQL`, `LibreOffice` paketai.

## Žingsniai:

1. Atsiųsti projektą. Paleiskite komandas:

```sh
git pull https://github.com/mkvtech/vtjmk.git
cd vtjmk
```

2. Įdiegti `backend` sistemos dalies paketus:

```sh
cd ./backend
bundle install
```

3. Įdiegti `frontend` sistemos dalies paketus:

```sh
cd ./frontend
yarn
```

4. Sukurti sistemos duomenų bazė. Paleiskite komandą:

```sh
bundle exec rails db:create db:schema:load db:seed
```

## Backend

Paleisti vienetų testus:

```sh
bundle exec rspec
```

Vienetų testų paleidimas generuoja ataskaitą apie kodo padengimumą. Ją galima rasti `./coverage/index.html` faile. Patogiausia peržiūrėti galima su komanda:

```sh
xdg-open ./coverage/index.html
```

Statinė kodo analizė:

```sh
bundle exec rubocop
```

## Frontend

Statinė kodo analizė:

```sh
yarn lint
yarn format:check
```

## Integraciniai testai (E2E)

Paketų diegimas (1 min.):

```sh
cd ./e2e
yarn install
yarn playwright install --with-deps
```

Serverio paleidimas:

```sh
docker-compose --file ../docker-compose.e2e.yml up --build --detach
docker exec vtjmk_e2e bundle exec rails db:create db:schema:load
```

Testų paleidimas (3 min.):

```sh
yarn playwright test
```

# Sistemos struktūra

Sistema yra padalinta į 2 pagrindinius projektus: `backend` ir `frontend`. Šių projektų programinį kodą galima rasti pagrindinio kodo saugykloje atitinkamose direktorijose.

`backend` direktorijoje yra patalpintas serverio dalies programinis kodas. Yra naudojamas Rails internetinių puslapių karkasas ir Ruby programavimo kalba.

`frontend` direktorijoje yra patalpintas grafinės vartotojo sąsajos (GVS) programinis kodas. Yra naudojamas Vite serveris, React karkasas ir TypeScript programavimo kalba.

Detalesnę informaciją apie sistemos architektūrą galima rasti baigiamojo darbo apraše.

# Kontaktinė informacija

Maksim Kulagin

maksim.kulagin@stud.vilniustech.lt

http://github.com/mkvtech

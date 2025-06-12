# 🎬 LiteWatch – Lekka platforma filmowa

**Autor:** Łukasz Krawczyk  
**Temat projektu zaliczeniowego z laboratorium:** *Szkielety programistyczne w aplikacjach internetowych*

LiteWatch to lekka, responsywna aplikacja webowa inspirowana Filmwebem, oferująca system oceniania filmów, recenzji, watchlisty oraz integrację z TMDB API.

---

## 🚀 Funkcjonalności

### 🔐 Uwierzytelnianie i autoryzacja
- Rejestracja i logowanie z bezpiecznym haszowaniem haseł (bcrypt)
- JSON Web Token (JWT) do uwierzytelniania
- Role: `user`, `admin` (panel admina niezaimplementowany)

### 📝 CRUD recenzji
- Wystawianie ocen (1–10) i recenzji tekstowych
- Edycja i usuwanie własnych recenzji
- Wyświetlanie średniej ocen i listy recenzji innych użytkowników

### 📺 Watchlista
- Dodawanie/usuwanie filmów z listy „Do obejrzenia”
- Licznik filmów w navbarze z synchronizacją stanu

### 📚 Moja biblioteka
- Widok wszystkich ocenionych filmów w siatce
- Plakat, tytuł, gwiazdki, pełna recenzja, data aktualizacji

### 🔎 Wyszukiwanie i kategorie
- Globalna wyszukiwarka
- Dynamiczne pobieranie gatunków z TMDB

### 🎥 Strona filmu
- Szczegóły z TMDB: obsada, zwiastun, budżet, przychód, gatunki, podobne filmy
- Przycisk „Do obejrzenia” i formularz oceniania z direct linkiem `#rate`

### 🏠 Home / Slidery
- Popularne, Top Rated, Upcoming z TMDB
- Najlepiej oceniane na LiteWatch (na podstawie ocen użytkowników)
- Przewijalne rzędy z efektem hover-zoom i strzałkami

### 🌓 Motyw ciemny / jasny
- Przełącznik motywu w navbarze (Tailwind CSS)

---

## 🛠️ Technologie

### 🔙 Backend
- Node.js v22.16.0, Express.js
- MongoDB Atlas + Mongoose (MVC: modele, kontrolery, routery)
- JWT (`jsonwebtoken`), bcrypt, `express-validator`

### 🎨 Frontend
- Vite + React 18
- React Router, React Context (auth)
- Tailwind CSS, Lucide-React
- React Hook Form + walidacja po stronie klienta

### 🎬 API filmowe
- [TMDB (The Movie Database)](https://www.themoviedb.org/) – REST API

### 🧰 Narzędzia pomocnicze
- Nodemon, Dotenv
- `date-fns` – formatowanie dat

---

## 🧪 Wersje narzędzi

| Narzędzie         | Wersja        |
|-------------------|---------------|
| Node.js           | 22.16.0       |
| npm               | 10.x          |
| MongoDB Atlas     | (cloud)       |
| React             | 18.x          |
| Vite              | 4.x           |
| Tailwind CSS      | 3.x           |
| express-validator | 7.x           |

---

## 🖥️ Uruchomienie lokalne

### 1. Backend
```bash
cd backend
npm install
cp .example.env .env
# Uzupełnij plik .env zgodnie z przykładami
npm run dev
```
### 2. Frontend
```bash
cd frontend
npm install
cp .example.env .env
# Uzupełnij plik .env zgodnie z przykładami
npm run dev
```
> #### ⚠️ Wszystkie niezbędne klucze i dane środowiskowe zostały dostarczone z projektem (.env).

### 3. Otworz aplikacje
#### Przejdź do: http://localhost:5173

## 🧪 Konto testowe
Aby szybko przetestować funkcje aplikacji, możesz skorzystać z gotowego konta użytkownika:

| Rola  | Login              | Hasło         |
|-------|--------------------|---------------|
| User  | `user@gmail.com`   | `userpassword` |


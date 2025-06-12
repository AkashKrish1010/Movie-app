Discover movies, search effortlessly, and see what’s trending—powered by TMDb & Appwrite.
🎬 What This Repo Does
This project allows users to:

Search for Movies using the [TMDB (The Movie Database) API].

View Trending Movies based on search frequency, stored in a backend powered by Appwrite.

View Movie Cards displaying posters, ratings, and basic details.

Experience a modern, responsive UI with TailwindCSS and custom utility classes.

Deploy the app to GitHub Pages using gh-pages.

🛠️ Core Tech Stack
Frontend: React, Vite, Tailwind CSS

State Management: React Hooks

Debounce: @react-hook/debounce to reduce API calls on typing

Backend Services: Appwrite for storing trending searches

API Integration: TMDB API to fetch movie data

Deployment: GitHub Pages via gh-pages script

📂 Folder Structure Highlights
/src/components/: Contains reusable UI components like MovieCard and Search.

/src/appwrite.js: Logic for interacting with Appwrite (e.g., logging searches, fetching trending).

/src/App.jsx: Main logic for searching and displaying movies.

/index.css: Tailwind + custom styles and utilities.

⚙️ Key Features
🔍 Live Movie Search with debouncing

📈 Trending Section powered by Appwrite, showing most searched movies

💅 Clean UI with a hero section, styled movie cards, and smooth layout

🚀 Production-Ready Build System using Vite for fast dev and optimized build

# 🎬 Pop Movies

Welcome to Pop Movies, a web app that showcases the latest in cinema. This project serves as a technical assessment, featuring a homepage for movie enthusiasts.

## 🚀 Live Demo

Check out the live demo [🍿 here](https://movies-app-eight-rho.vercel.app/) and explore the world of cinema!

## 🎥 Features

PopMovies allows you to:

- Browse the latest trending movies
- View detailed information about selected films

## 🛠 Tech Stack

Technologies used in this project include:

- **Next.js (App Router)**: To protect third-party API tokens in a server-side middle API handler.
- **React Query**: Manages data fetching and caching for an optimal user experience.
- **Vitest**: Handles fast, efficient, and simplier setup, for unit testing.
- **Tailwind CSS**: To optimize styling and CSS bundle size.
  - Note: The use of Tailwind CSS was a deliberate decision to ensure a maintainable and scalable codebase while achieving pixel-perfect designs per the provided Figma specs.

## 🎬 Getting Started

### Prerequisites

Ensure you have:

- Node.js with NPM (version 20 or higher)
- A TMDB account and API key (obtainable [here](https://developer.themoviedb.org/docs))

### Environment Variables

Create a `.env.local` file in the root of your project with the following environment variables:

```
TMDB_API_URL=https://api.themoviedb.org/3
TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
```

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/djbautista/movies-app.git
   cd movies-app
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to begin exploring!

## 🎭 Testing

To run tests, use the following command:

```bash
npm test
```

Tests are managed using Vitest for quick and reliable results.

// index.js (BACKEND - ESM VERSION)
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ---------------- DATI FINTI -------------------

const movies = [
  {
    id: 1,
    title: "Il Padrino",
    year: 1972,
    genre: "Crime",
    description: "Un capolavoro del cinema.",
    poster: "https://via.placeholder.com/200x300",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    description: "Un viaggio nella mente.",
    poster: "https://via.placeholder.com/200x300",
  },
];

const books = [
  {
    id: 1,
    title: "Il Signore degli Anelli",
    author: "Tolkien",
    description: "Fantasy epico.",
    cover: "https://via.placeholder.com/200x300",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    description: "Distopia famosa.",
    cover: "https://via.placeholder.com/200x300",
  },
];

const reviews = {
  1: [],
  2: [],
};

// ---------------- ROTTE FILM -------------------

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);
  if (!movie) return res.status(404).json({ error: "Film non trovato" });
  res.json(movie);
});

app.get("/movies/:id/reviews", (req, res) => {
  const id = Number(req.params.id);
  res.json(reviews[id] || []);
});

app.post("/movies/:id/reviews", (req, res) => {
  const id = Number(req.params.id);
  const { author, content, rating } = req.body;

  const newReview = {
    id: Date.now(),
    author,
    content,
    rating,
  };

  if (!reviews[id]) reviews[id] = [];
  reviews[id].push(newReview);

  res.json(newReview);
});

// ---------------- ROTTA LIBRI -------------------

app.get("/books", (req, res) => {
  res.json(books);
});

// ---------------- START SERVER -------------------

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});

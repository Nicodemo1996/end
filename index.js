import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

 
app.use(cors());
app.use(express.json());

 
const movies = [
  { id: 1, title: "Inception", year: 2010, description: "Un ladro che ruba segreti dai sogni." },
  { id: 2, title: "The Matrix", year: 1999, description: "Neo scopre la verità sul mondo reale." },
  { id: 3, title: "Interstellar", year: 2014, description: "Un viaggio attraverso le galassie." }
];

 
const books = [
  { id: 1, title: "Il Signore degli Anelli", author: "J.R.R. Tolkien" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "Harry Potter", author: "J.K. Rowling" }
];

 
const reviews = {
  1: [
    { id: 1, text: "Film fantastico!" },
    { id: 2, text: "Trama molto interessante." }
  ],
  2: [
    { id: 3, text: "Un cult senza tempo." }
  ],
  3: [
    { id: 4, text: "Bellissimo viaggio nello spazio." }
  ]
};
 
app.get("/movies", (req, res) => res.json(movies));
app.get("/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: "Film non trovato" });
  res.json(movie);
});
 
app.get("/movies/:id/reviews", (req, res) => {
  const movieId = parseInt(req.params.id);
  res.json(reviews[movieId] || []);
});

 
app.get("/books", (req, res) => res.json(books));

 
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));

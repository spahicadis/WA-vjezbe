import { movies } from "../data/data.js";

export const chechIfMovieExist = (req, res, next) => {
  const { id } = req.params;

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return res.status(404).json({ message: "Film ne postoji" });
  }

  req.movie = movie;

  next();
};

//Mozda malo redundantno, svaki prosljeduje odredene potrebne podatke, ali moglo se i u jednom
export const chechIfMovieExistAndIndex = (req, res, next) => {
  const { id } = req.params;

  const movie = movies.findIndex((item) => item.id === Number(id));

  if (movie === -1) {
    return res.status(404).json({ message: "Film ne postoji" });
  }

  req.movieIndex = movie;

  next();
};

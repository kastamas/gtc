let faker = require('faker');

const generateMovies = () => {
  faker.locale = 'ru';

  let movies = [];

  for (let id = 0; id < 10; id++) {
    const movie = {
      id: id,
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      cover: `https://picsum.photos/220/330?random=${id}`,
      genres: generateGenres()
    };

    movies.push(movie);
  }

  return { movies: movies };
};

const generateGenres = () => {
  let genresList = ['comedy', 'drama', 'horror', 'thriller', 'documentary', 'sci-fi', 'cartoon', 'action'];
  const genres = [];

  for (let quantity = getRandomInt(1, 3); quantity > 0; quantity--) {
    const randomGenreId = getRandomInt(0, genresList.length - 1);
    genres.push(genresList[randomGenreId]);
    genresList.splice(randomGenreId, 1);
  }

  return genres;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generateMovies;

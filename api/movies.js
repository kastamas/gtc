let faker = require('faker');

const generateMovies = () => {
  faker.locale = 'ru';

  let movies = [];

  for (let id = 0; id < 10; id++) {
    const duration = `${getRandomInt(70, 160)} Min.`;
    const movie = {
      id: id,
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      cover: `https://picsum.photos/220/330?random=${id}`,
      genres: generateGenres(),
      director: faker.name.findName(),
      premiereDate: faker.date.recent(),
      duration: duration,
      imdbRating: getImdbRating(),
      starring: generateStarring()
    };

    movies.push(movie);
  }

  return { movies: movies };
};

const generateStarring = () => {
  const starring = [];

  for (let quantity = getRandomInt(3, 8); quantity > 0; quantity--) {
    starring.push(faker.name.findName());
  }

  return starring;
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

const getImdbRating = () => {
  const min = 1;
  const max = 10;

  return (Math.random() * (max - min + 1) + min).toFixed(1);
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generateMovies;

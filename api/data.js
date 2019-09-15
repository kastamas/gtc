let faker = require('faker');
faker.locale = 'ru';

const generateData = () => {
  return {
    movies: generateMovies(),
    rows: { rows: generateRows() }
  };
};

const generateMovies = () => {
  let movies = [];

  for (let i = 0; i < 10; i++) {
    const duration = `${getRandomInt(70, 160)} Min.`;
    const movie = {
      id: i,
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      cover: `https://picsum.photos/220/330?random=${i}`,
      genres: generateGenres(),
      director: faker.name.findName(),
      premiereDate: faker.date.recent(),
      duration: duration,
      imdbRating: getImdbRating(),
      starring: generateStarring()
    };

    movies.push(movie);
  }

  return movies;
};

const generateRows = () => {
  const rows = [];
  const rowsCount = getRandomInt(6, 8);

  for (let i = rowsCount; i > 0; i--) {
    const seats = [];
    const seatsCount = rowsCount + Math.floor(rowsCount / 2);

    for (let j = seatsCount; j > 0; j--) {
      const status = getRandomInt(1, 10) > 8 ? 'reserved' : 'available';
      const price = 330;

      seats.push({
        rowPosition: i,
        position: j,
        status: status,
        price: price
      });
    }

    rows.push({
      position: i,
      seats: seats
    });
  }

  return rows.reverse();
};

/*const generateShows = () => {
  dateTime: faker.date.future(),

}*/

/*const generateTheaters = () => {
  let theaters = [];

  for (let i = 0; i < 10; i++) {
    const theater = {
      id: i,
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      logo: faker.image.abstract()
    };
  }

  return theaters;
};*/

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
  const min = 3;
  const max = 9;

  return (Math.random() * (max - min + 1) + min).toFixed(1);
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generateData;

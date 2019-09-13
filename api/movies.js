let faker = require('faker');

const generateMovies = () => {
  let movies = [];

  for (let id = 0; id < 10; id++) {
    const movie = {
      id: id,
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      cover: `https://picsum.photos/220/330?random=${id}`,
      genres: ['comedy', 'drama', 'horror']
    };

    movies.push(movie);
  }

  return { movies: movies };
};

module.exports = generateMovies;

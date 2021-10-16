import faker from "faker";
const destination = [
  {
    name: "Ella",
    src: `/static/destinations/1.jpg`,
    rating: 4.5,
    description: faker.lorem.paragraph(),
  },
  {
    name: "Seegiriya",
    src: `/static/destinations/2.jpg`,
    rating: 4,
    description: faker.lorem.paragraph(),
  },
  {
    name: "Temple",
    src: `/static/destinations/3.jpg`,
    rating: 3,
    description: faker.lorem.paragraph(),
  },
  {
    name: "Buddha Statue",
    src: `/static/destinations/4.jpg`,
    rating: 2.5,
    description: faker.lorem.paragraph(),
  },
  {
    name: "Colombo",
    src: `/static/destinations/6.jpg`,
    rating: 2,
    description: faker.lorem.paragraph(),
  },
  {
    name: "Horton Plains",
    src: `/static/destinations/7.jpg`,
    rating: 1.5,
    description: faker.lorem.paragraph(),
  },
  {
    name: "Lake",
    src: `/static/destinations/8.jpg`,
    rating: 3.3,
    description: faker.lorem.paragraph(),
  },
  {
    name: "Daladamaligawa",
    src: `/static/destinations/9.jpg`,
    rating: 2.7,
    description: faker.lorem.paragraph(),
  },
];

export default destination;

import faker from 'faker';
import images from './imageData.js';
import { capitalizePhrase, getRandomImage } from './utils.js';


export const generateBlogPost = (authorId) => {
  return {
    title: capitalizePhrase(faker.company.bs()),
    subtitle: faker.hacker.phrase(),
    text: faker.lorem.paragraphs(Math.ceil(Math.random() * 10)),
    image: getRandomImage(images),
    authorId
  };
};




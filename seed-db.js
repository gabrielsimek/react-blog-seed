import faker from 'faker';
import images from './imageData.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const checkError = ({ data, error }) => {
  if (error) {
    throw error;
  }
  return data;
};

const numOfAuthors = 5;
const numOfBlogs = 20;

const capitalizePhrase = (phrase) => {
  return phrase
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
};

const getRandomImage = (images) => {
  return images.hits[Math.round(Math.random() * 20)].webformatURL;
};

const generateBlogPost = (authorId) => {
  return {
    title: capitalizePhrase(faker.company.bs()),
    subtitle: faker.hacker.phrase(),
    text: faker.lorem.paragraphs(Math.ceil(Math.random() * 10)),
    image: getRandomImage(images),
    authorId,
  };
};

const insertBlog = async ({ title, subtitle, text, image, authorId }) => {
  const response = await supabase.from('blogs').insert([
    {
      title,
      subtitle,
      text,
      image,
      author_id: authorId,
    },
  ]);

  return checkError(response);
};

const insertAuthor = async (name) => {
  const response = await supabase.from('authors').insert([{ name }]);

  return checkError(response);
};

const seedBlogs = async (numOfBlogs, numOfAuthors) => {
  const response = await Promise.all(
    [...Array(numOfBlogs)].map(() => {
      const blogPost = generateBlogPost(
        Math.ceil(Math.random() * numOfAuthors)
      );
      return insertBlog(blogPost);
    })
  );

  return response;
};

const seedAuthors = async (numOfAuthors) => {
  const response = await Promise.all(
    [...Array(numOfAuthors)].map(() =>
      insertAuthor(faker.fake('{{name.firstName}} {{name.lastName}}'))
    )
  );

  return response;
};

const run = async () => {
  try {
    await seedAuthors(numOfAuthors);
    await seedBlogs(numOfBlogs, numOfAuthors);
    console.log('Data Seeded');
  } catch (error) {
    console.log(error);
  }
};

run();

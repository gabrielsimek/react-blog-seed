import { supabase, checkError } from './client.js';
import faker from 'faker';

const getAll = async () => {
  const response = await supabase
    .from('authors')
    .select('*');
  return checkError(response);
}; 

const insertAuthor = async (name) => {
  const response = await supabase.from('authors')
    .insert([{ name }]);
  return checkError(response);
};

const deleteAuthor = async (author) => {
  const response = await supabase.from('authors')
    .delete()
    .eq('id', author);
  return checkError(response);
};

const deleteAuthors = async (numOfRows, startIndex) => {
  const response = await Promise.all(
    [...Array(numOfRows)].map((_, i) => deleteAuthor(i + startIndex))
  );
  return response;
};

const seedAuthors = async (numOfAuthors) => {
  const response = await Promise.all(
    [...Array(numOfAuthors)].map(() => insertAuthor(faker.fake('{{name.firstName}} {{name.lastName}}')))
  );
  return response;
};

// deleteAuthors()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));
  
// seedAuthors(5);

// getAll()
//   .then(data => console.log('GETALL', data))
//   .catch(err => console.log(err));

export { deleteAuthor, deleteAuthors, getAll, insertAuthor, seedAuthors };

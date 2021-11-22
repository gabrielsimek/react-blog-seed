import { supabase, checkError } from './client.js';

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

insertAuthor('Terrence Tupperware')
  .then(() => getAll())
  .then(res => console.log(res))
  .catch(err => console.log(err));

const deleteAuthor = async (author) => {
  const response = await supabase.from('authors')
    .delete()
    .eq('id', author);
  return checkError(response);
};

const deleteAuthors = async (numOfRows, startIndex) => {
  const response = await Promise.all(
    [
      ...Array(numOfRows)
    ].map((_, i) => deleteAuthor(i + startIndex))
  );
  return response;
};

// deleteAuthors()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

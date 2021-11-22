import  { supabase, checkError } from './client.js';
const getAll = async () => {
  const response = await supabase
    .from('blogs')
    .select('*');
     
  return checkError(response);
};

const insertBlog = async () => {
  const response = await supabase.from('blogs')
    .insert([{
      title: 'Test Blog Title',
      subtitle: 'blog subtitle',
      text: 'alkjsdfjkl;asdfjk;lasjkl;dfjklasdfkjl;asjdk;fjk;',
      image: 'https://placekitten.com/200/300'
    }]);
  return checkError(response);
};

//insertBlog().then(res => console.log('INSERT', res)).catch(err => console.log(err));

const updateBlog = async () => {
  const response = await supabase.from('blogs')
    .update({ text: 'testing this again' })
    .eq('id', '2');
  return checkError(response);
};

updateBlog()
  .then(res => console.log('UPDATE', res))
  .catch(err => console.log(err));

getAll()
  .then(data => console.log('GETALL', data))
  .catch(err => console.log(err));

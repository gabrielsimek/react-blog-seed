import  { supabase, checkError } from './client.js';
import faker from 'faker';

const getAll = async () => {
  const response = await supabase
    .from('blogs.duplicate')
    .select('*');
     
  return checkError(response);
};

const insertBlog = async () => {
  const response = await supabase.from('blogs.duplicate')
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
  const response = await supabase.from('blogs.duplicate')
    .update({ text: 'testing this again' })
    .eq('id', '2');
  return checkError(response);
};

// updateBlog()
//   .then(res => console.log('UPDATE', res))
//   .catch(err => console.log(err));

// getAll()
//   .then(data => console.log('GETALL', data))
//   .catch(err => console.log(err));


const capitalizeTitle = (title) => title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');

// Title
console.log(`\x1b[35m%s\x1b[0m`,'title: ', capitalizeTitle(faker.company.bs()));

// Subtitle
console.log(`\x1b[35m%s\x1b[0m`,'subtitle', faker.hacker.phrase());

// Text
// console.log(`\x1b[35m%s\x1b[0m`,'text', faker.lorem.paragraphs(Math.ceil(Math.random() * 20)));

// Image
console.log(`\x1b[35m%s\x1b[0m`,'image: ', faker.image.city(600, 300, true));

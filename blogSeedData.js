import  { supabase, checkError } from './client.js';
import { generateBlogPost } from './generateData.js';
const getAll = async () => {
  const response = await supabase
    .from('blogs.duplicate')
    .select('*');
     
  return checkError(response);
};

const insertBlog = async ({ title, subtitle, text, image, authorId }) => {
  const response = await supabase.from('blogs_duplicate')
    .insert([{
      title,
      subtitle,
      text,
      image,
      author_id: authorId
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

const seedBlogs = async (numOfPosts, numOfAuthors) => {
  const response = await Promise.all(
    [...Array(numOfPosts)].map(async () => {
      const blogPost =  generateBlogPost(Math.ceil(Math.random() * numOfAuthors));
      return await insertBlog(blogPost);
    })
  );

  return response;
};

// seedBlogs(1, 5)
//   .then(res => console.log(res))
//   .catch(err => console.log(err));
// updateBlog()
//   .then(res => console.log('UPDATE', res))
//   .catch(err => console.log(err));

// getAll()
//   .then(data => console.log('GETALL', data))
//   .catch(err => console.log(err));





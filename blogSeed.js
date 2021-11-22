import  { supabase, checkError } from './client.js';
const getAll = async () => {
  const response = await supabase
    .from('asdf')
    .select('*');
     
  return checkError(response);
};

getAll()
  .then(data => console.log(data))
  .catch(err => console.log(err));

  

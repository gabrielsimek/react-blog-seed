



export const capitalizePhrase = (phrase) => phrase.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');

export const getRandomImage = (images) => {
  return images.hits[Math.round(Math.random() * 20)].webformatURL;
};




import axios from "axios";

export const requestImages = async (searchTerm, page) => {
  const IMAGES_URL = `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=25755883-425392836cbaa44f717c19250&image_type=photo&orientation=horizontal&per_page=12`;
  
  try {    
    const { data } = await axios.get(IMAGES_URL);   
    return data;
  } catch (error) {   
    throw error;
  }
};
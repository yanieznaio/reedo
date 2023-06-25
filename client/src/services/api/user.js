// API côté client

import { axiosPrivate } from './axios';
const uploadProfileImage = async (imageFile, auth) => {
  const formData = new FormData();
  formData.append('profileImage', imageFile);

  try {
    const response = await axiosPrivate.put('/users', formData, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

 
    return response.data// L'URL de l'image téléchargée depuis le serveur
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors du téléchargement de l\'image de profil');
  }
};

const fetchProfileImage =  async (auth) => {
  try {
    const response = await axiosPrivate.get('/users/profile-image', {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
   
    return response.data
  } catch (error) {
    console.error(error);
  }
};

export { uploadProfileImage, fetchProfileImage };

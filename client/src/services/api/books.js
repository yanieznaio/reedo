import { axiosPrivate } from "./axios";

const addNewBook = async (auth, bookDataTosend) => {

    try {
        await axiosPrivate.post('/books', bookDataTosend, {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });

      } catch (error) {
        console.error(error);
      }
}

const fetchBooks =  async (auth) => {
    try {
      const response = await axiosPrivate.get('/books', {
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


const removeBook = async (bookId, auth) => {
    try{
        await axiosPrivate.delete(`/books/${bookId}`, {
            headers: {
              'Authorization': `Bearer ${auth.accessToken}`,
            },
          })
    } catch(err){
        console.log(err)
    }
}

const updateBook = async (bookId, bookDataTosend, auth) => {
  try {
    await axiosPrivate.put(`/books/${bookId}`, bookDataTosend, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error('Erreur lors de la mise à jour du livre');
  }
};

export {addNewBook, fetchBooks, removeBook, updateBook}


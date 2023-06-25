const Book = require('../model/Book');
const multer = require('multer');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExtension = file.originalname.split('.').pop(); // Récupérer l'extension d'origine du fichier
    const filename = file.fieldname + '-' + uniqueSuffix + '.' + originalExtension;
    callback(null, filename);
  }
});

const upload = multer({ storage });

const uploadSingle = upload.single('imgUrl');
// Ajoutez un livre à la liste de lecture
const addBook = (req, res) => {
    // Utilisez le middleware multer pour gérer l'upload de l'image
    uploadSingle(req, res, async (err) => {
      if (err) {
        console.error('Erreur lors de l\'upload de l\'image', err);
        return res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
      }
  
      try {
        const { title, author, status, score, reviews } = req.body;
  
        // Récupérez le chemin de l'image téléchargée depuis req.file.path
        const imgUrl = req.file ? req.file.path : null;
        const userId = req.userId; 
        // Créez une nouvelle instance du livre avec l'URL de l'image
        const newBook = new Book({
          title,
          author,
          status,
          score,
          reviews,
          imgUrl,
          userId,
        });
  
        // Enregistrez le livre dans la base de données
        const savedBook = await newBook.save();
  
        res.status(201).json(savedBook); // Renvoyer le livre ajouté en réponse
        console.log('livre ajouter')
      } catch (error) {
        console.error('Erreur lors de l\'ajout du livre', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du livre' });
      }
    });
  };


  const updateBook = async (req, res, next) => {
    try {
      const { bookId } = req.params;
      const { title, author, status } = req.body;
      const userId = req.userId;
  
      if (!isValidObjectId(bookId))
        return res.status(400).json({ error: 'ID du livre invalide' });
  
      const bookToUpdate = await Book.findById(bookId);
      if (!bookToUpdate)
        return res.status(404).json({ error: 'Livre non trouvé' });
  
      if (bookToUpdate.userId.toString() !== userId)
        return res.status(403).json({ error: 'Accès non autorisé' });
      
      const updatedBook = await bookToUpdate.updateOne({ title, author, status });
  
      res.json(updatedBook);
    } catch (error) {
      next(error);
    }
  };
  


const deleteBook = async (req, res, next) => {
  const {bookId} = req.params;
  const userId = req.userId; // ID de l'utilisateur extrait du jeton JWT
  const deleted = Book.findById(bookId)
  if(deleted){
    console.log(deleted)
    try{
      Book.deleteOne({ _id: bookId, userId })
    }catch(err){
      console.log(err)
    }
    
  }else{
    res.status(404).json({message: 'book you are looking for does not exist'})
  }
  await Book.deleteOne({ _id: bookId, userId })
    .then(() => {
      res.sendStatus(204); // No Content
      console.log("livre supprimé")
    })
    .catch(error => {
      next(error);
    });
};

const getAllBooks = (req, res, next) => {
  const userId = req.userId; // ID de l'utilisateur extrait du jeton JWT

  Book.find({ userId })
    .then(books => {
      console.log('getAllBooks ok')
      console.log(books.imgUrl)
      res.json(books);
    })
    .catch(error => {
      next(error);
    });
};

const getBooksByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    // Vérifier si le statut est fourni dans la requête
    if (!status) {
      return res.status(400).json({ message: 'Le statut est requis' });
    }

    // Récupérer les livres correspondants au statut
    const books = await Book.find({ status });

    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des livres' });
  }
};

module.exports = {addBook, updateBook, deleteBook, getAllBooks, getBooksByStatus}




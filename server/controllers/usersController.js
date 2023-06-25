const User = require('../model/User');
const Book = require('../model/Book')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { profile } = require('console');

// ...

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}



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

const uploadSingle = upload.single('profileImage');
// ...

const updateUserProfileImage = (req, res) => {
   // Utilisez le middleware multer pour gérer l'upload de l'image
   uploadSingle(req, res, async (err) => {

    if (err) {
      console.error('Erreur lors de l\'upload de l\'image', err);
      return res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
    }

    try {

      // Récupérez le chemin de l'image téléchargée depuis req.file.path
      const profileImage = req.file ? req.file.path : null;
      const userId = req.userId; 
      
      

      // Enregistrez l'image dans la base de données
      const userToUpdate = await User.findById(userId);
      if(!userToUpdate) return res.status(404).json({ error: 'Livre non trouvé' })
      const updatedUser = await userToUpdate.updateOne({profileImage});
      console.log(profileImage)

      res.status(201).json(profileImage); // Renvoyer le livre ajouté en réponse
      console.log('image ajouter')
    } catch (error) {
      console.error('Erreur lors de l\'ajout de limage de profile', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de limage' });
    }
  });
 
};
const getUserProfileImage = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId }).exec();
    if (!user || !user.profileImage) {
      return res.status(404).json({ message: 'User profile image not found' });
    }

    const imagePath = user.profileImage
    const resolvedImagePath = path.resolve(imagePath);
    console.log(imagePath)
    console.log('image recuperer')
    res.json(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user profile image' });
  }
};


const searchUsers = async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const users = await User.find({
      username: { $regex: searchTerm, $options: 'i' },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to search users' });
  }
};
/* const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
      return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
  }
  res.json(user);
}
 */
const getUser = async (req,res) => {

  try{
    const {username} = req.params

    if (!username) {
      return res.status(400).json({ message: 'username est requis' });
    }
  
    const user = await User.findOne({username})
    const userId = user._id

   const userBooks = await Book.find({userId})

    const result = {
      username,
      profileImage: user.profileImage,
      books: userBooks
    }
    console.log(result)
    res.json(result)
  }
  catch (err) {
    console.error(err)

    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du profile' });

  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUserProfileImage,
  getUserProfileImage,
  searchUsers,
};

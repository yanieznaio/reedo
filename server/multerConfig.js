const multer = require('multer');

// Configuration de l'emplacement et du nom du fichier de destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Définissez le dossier d'uploads où les images seront enregistrées
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.mimetype.split('/')[1];
    cb(null, `${uniqueSuffix}.${ext}`);
  },
});

// Validation du type de fichier accepté (uniquement les images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'), false);
  }
};

// Configuration de l'upload avec Multer
const upload = multer({ storage, fileFilter });

module.exports = upload;

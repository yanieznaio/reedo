const express = require('express')
const booksController = require('../../controllers/booksController');
const verifyJWT = require('../../middleware/verifyJWT')

const router = express.Router();

router.get('/', verifyJWT, booksController.getAllBooks); 
router.get('/', verifyJWT, booksController.getBooksByStatus); 
router.post('/', verifyJWT, booksController.addBook);
router.put('/:bookId', verifyJWT, booksController.updateBook);
router.delete('/:bookId', verifyJWT, booksController.deleteBook);
  
module.exports = router;


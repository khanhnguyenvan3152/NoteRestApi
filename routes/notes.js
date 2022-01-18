const express = require('express')
const router = express.Router()

const noteController = require('../controllers/noteController')

router.get('/',noteController.getAll)
router.post('/',noteController.addNote)
router.put('/:noteId',noteController.updateNote)
router.delete('/:noteId',noteController.deleteNote)
import express from 'express';

const router = express.Router()

const controllers = require('../controllers/api/test')

router.get('/', controllers.homepage)

module.exports = router

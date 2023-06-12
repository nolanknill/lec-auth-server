const router = require('express').Router();
const postController = require('../controllers/post-controller');
const { authorize } = require('../middleware/authorize');

router
    .route('/')
    .get(authorize, postController.getAll);

module.exports = router;
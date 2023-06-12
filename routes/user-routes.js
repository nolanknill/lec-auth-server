const router = require('express').Router();
const userController = require('../controllers/user-controller');
const { validateUser } = require("../middleware/user-validator");

router
    .route('/')
    .post(validateUser, userController.add);

router
    .route('/:id')
    .get(userController.findOne)
    .patch(validateUser, userController.update);

router
    .route("/:id/posts")
    .get(userController.posts);

module.exports = router;
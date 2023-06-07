const router = require('express').Router();
const userController = require('../controllers/user-controller');
const { validateUser } = require("../middleware/user-validator");

router
    .route('/')
    .get(userController.index)
    .post(validateUser, userController.add);

router
    .route('/:id')
    .get(userController.findOne)
    .patch(validateUser, userController.update)
    .delete(userController.remove);

router
    .route("/:id/posts")
    .get(userController.posts);

module.exports = router;
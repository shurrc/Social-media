const thoughtsController = require('./thoughts');
const userRoutes = require('./user');
const router = require('express').Router();

router.use("/user", userRoutes);
router.use("/thoughts", thoughtsController)


module.exports = router;
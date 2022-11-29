const router = require('express').Router();
const { Router } = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");


router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friend/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
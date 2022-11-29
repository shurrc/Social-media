const router = require('express').Router();
const { Router } = require('express');
const {
    getThoughts,
    getThought,
    editThought,
    deleteThought,
    createReaction,
    deleteReaction,
    createThought
} = require("../../controllers/thoughtsController");


router.route("/").get(getThoughts).post(createThought);
router.route("/:id").get(getThought).put(editThought).delete(deleteThought)
router.route("/:thoughtId/reaction").post(createReaction);
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;
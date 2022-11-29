const {User, Thought} = require("../models");



module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .select('-__v')
        .then((thoughts) => {
            res.json(thoughts)
        })
        .catch(error => {
            console.log(error);
        })
    },
    getThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then((thought) => {
            res.json(thought)
        })
        .catch(error => {
            console.log(error);
        })
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            console.log(thought)
            return User.findOneAndUpdate(          
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                {new: true},)
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({message: "thought created but no user with that id."})
            }
            res.json(user) 
        })
        .catch((error) => {
            console.log(error)
        })
    },
    editThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            {new: true}
        )
        .then((thought) => {
            res.json(thought)
        })
        .catch((error) => {
            console.log(error)
        })
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove(            
            { _id: req.params.id })
            .then((thought) => {
                console.log(thought)
                res.status(200).json({ message: 'thought successfully deleted' })
            })
            return User.findOneAndUpdate(            
                { _id: req.params.thoughtId },
                { $pull: { thoughts: { thoughts: req.params.thoughtId } } },
                {new: true})
        .catch((error) => {
            console.log(error)
        })
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(          
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body} },
                {new: true},)
        .then((reaction) => {
            res.json(reaction)   
        })
        .catch((error) => {
            console.log(error)
        })
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(            
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            {new: true})
        .then((thought) => {
            res.json(thought)
        })
        .catch((error) => {
            console.log(error)
        })
    },
}

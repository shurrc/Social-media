const {User, Thought} = require("../models");






module.exports = {
    getUsers(req, res) {
        User.find()
        .populate("thoughts")
        .populate("friends")
        .select('-__v')
        .then((users) => {
            res.json(users)
        })
        .catch(error => {
            console.log(error);
        })
    },
    getUser(req, res) {
        User.findOne({ _id: req.params.id })
        .then((user)=> {
            res.json(user)
        })
        .catch((error) => {
            console.log(error)
        })
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            console.log(error)
        })
    },
    updateUser(req, res) {
        User.findOneAndUpdate(            
            { _id: req.params.id },
            { $set: req.body },)
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            console.log(error)
        }) 
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.id })
        .then((user) => {
            res.status(200).json({ message: 'User successfully deleted' })
        })
        .catch((error)=> {
            console.log(error)
        })
    },
    addFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},)
        .then((user) => {
            res.json(user)
        })
        .catch((error)=> {
            console.log(error)
        });
    },
    deleteFriend(req, res) {
        User.findByIdAndUpdate(      
            { _id: req.params.friendId },
            { $pull: { friends: { friendId: req.params.friendId } } },)
        .then((user) => {
            res.json(user)
        })
        .catch((error)=> {
            console.log(error)
        });
    }
}
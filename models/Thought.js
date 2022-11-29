const {Schema, model} = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 200,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        }, 
        id: false,
    },
);

const Thought = model('Thought', thoughtSchema)

module.exports = Thought
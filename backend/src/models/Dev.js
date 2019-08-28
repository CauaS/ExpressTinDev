const { Schema, model } = require('mongoose');

//informa qual a structure do BD:
const DevSchema = new Schema({ 
    name:{
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
}, {
    timestamps:  true,
})

module.exports = model('Dev', DevSchema);
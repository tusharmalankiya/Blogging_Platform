const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    author_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String,
        required: [true, 'please enter a title']
    },
    description: {
        type: String,
        required: [true, 'please enter description']
    }
}, { timestamps: true})

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
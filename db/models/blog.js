

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    slug: { type: String, unique: true, sparse: true},
    title: {type: String, required: true, maxlength: 96 },
    subTitle: { type: String },
    content: { type: String },
    userId: { type: String, required: true },
    status: { type: String, default: 'draft', enum: ['draft', 'published', 'archived'] },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Blog', blogSchema);

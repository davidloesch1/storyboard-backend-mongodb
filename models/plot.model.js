const mongoose = require('mongoose')

const Schema = mongoose.Schema

const plotSchema = new Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    blurb: {type: String, required: true},
    pov: {type: Number, required: true},
    setting: {type: String, required: true},
    genre: {type: String, required: true},
    characters: [{ name: String, bio: String }],
    storyPlot: {type: String, required: true},
    date: {type: Date, default: Date.now},
    chapters: [{chapter: Number, title: String, contributor: String, body: String, date: Date}],
    entries: [{title: String, username: String, body: String, date: Date, oneLiner: String}],
    comments: [{body: String, date: Date}],
    meta: {
        upVotes: Number,
        downVotes: Number,
        favorites: Number,
    }
})

const Plot = mongoose.model("Plot", plotSchema);

module.exports = Plot;

import mongoose from "mongoose";

// export function //
// export const formatHashtags = (hashtags) => 
// hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));


// schema
const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, maxlength: 80},
    description: {type: String, required: true, trim: true, minLength: 20},
    createdAt: {type: Date, required: true, default: Date.now },
    hashtags: [{type: String, trim: true}],
    meta: {
        views: {type: Number, default: 0, required: true},
        rating: {type: Number, default: 0, required: true},
    },
});


//middleware//
// videoSchema.pre("save", async function () {
//     // console.log("We are about to save ",this);
//     // this.title = "Hahaha! Im a middleware!!!!";
//     this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
//     //console.log("We are about to save ",this);
// });

// custom function //
videoSchema.static('formatHashtags', function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
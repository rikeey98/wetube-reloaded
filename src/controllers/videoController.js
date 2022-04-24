// import Video, {formatHashtags} from "../models/Video";
import Video from "../models/Video";

// Video.find({}, (error, videos) => {
    
// }); 

export const home = async(req, res) => {
    const videos = await Video.find({}).sort({createdAt: "desc"});
    // console.log(videos);
    return res.render("home", {pageTitle: "Home", videos});
}
export const watch = async(req, res) => {
    // console.log(req.params);
    // const id = req.params.id;
    const {id} = req.params; 
    const video = await Video.findById(id) ;
    if (!video) {
        return res.render("404", {pageTitle: "404 Erorr Video not found!"});
    }
    return res.render("watch", {pageTitle: video.title, video});
}
export const getEdit = async(req, res) => {
    // console.log(req.params);
    const {id} = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", {pageTitle: "404 Erorr Video not found!"});
    }
    console.log("Show video", id);
    return res.render("edit", {pageTitle: `Editing: `, video });
}
export const postEdit = async(req, res) => {
    // console.log(req.params);
    console.log(req.body);
    // const id = req.params.id;
    // const title = req.body.title;
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const isVideo = await Video.exists({_id: id});
    if (!isVideo) {
        return res.render("404", {pageTitle: "404 Erorr Video not found!"});
    }

    await Video.findByIdAndUpdate(id, {
        title:title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: `Uploading`});
}

export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    // 1st method create js object
    // const video = new Video({
    //     title,
    //     description,
    //     createdAt: Date.now(),
    //     hashtags: hashtags.split(",").map(word => `#${word}`),
    //     meta: {
    //         views: 0,
    //         rating: 0,
    //     },
    // });
    // await video.save();
    
    // 2nd method
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
            //hashtags: hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)),
        });
        return res.redirect("/");
    } catch(error){
        console.log(error);
        return res.render("upload", {pageTitle: "Uploading", errorMessage: error._message});
    }
}

export const deleteVideo = async(req, res) => {
    const {id} = req.params;
    console.log(id);
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}


export const search = async(req, res) => {
    const {keyword} = req.query;
    let videos = [];
    if (keyword) {
        // search
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, "i"),
            },
        });
    }
    return res.render("search", {pageTitle: "Search", videos});
}
// export const removeVideo = (req, res) => {
//     console.log(req.params);
//     return res.send("remove Video");
// }


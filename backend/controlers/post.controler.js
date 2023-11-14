const PostModel = require("../models/post.model")

module.exports.getPosts = async (red, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts)
}

module.exports.setposts = async (req,res) => {
    if(!req.body.title) {
        res.status(400).json({message: "erreur dans la request: aucun titre"})
    }

    const post = await PostModel.create({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images
    })
    res.status(200).json(post)

};
module.exports.editPosts = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        const updatePost = await PostModel.findByIdAndUpdate(
            post,
            req.body,
            {new: true}
        )
    
        res.status(200).json(updatePost)

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "error 400"});
    }
    
}

module.exports.deletePosts = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if(!post) {
            res.status(400).json({message: "your id is unknown"})
        }

        await post.deleteOne();
        res.status(200).json({message: "post " + req.params.id + " delete"})


    } catch (err) {
        console.log(err);
        res.status(500).json({message: "server error"});
    }
    
}

module.exports.likePosts = async (req,res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {likers: req.body.userId } },
            { new: true }
        ).then(data => res.status(200).send(data))
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports.dislikePosts = async (req,res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: {likers: req.body.userId } },
            { new: true }
        ).then(data => res.status(200).send(data))
    } catch (err) {
        res.status(400).json(err)
    }
}
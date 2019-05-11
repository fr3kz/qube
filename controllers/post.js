const Post = require('../models/post');

const  getPosts = (req, res) => {
    res.json({
        posts: [
            {
                title: 'First post'
            },
            {
                title: 'second post'
            },
        ]
    });
}

const createPost = (req, res) => {

    const post = new Post(req.body);
    post.save( (err,result) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(201).json({
            post: result
        })

    });

    /*post.save().then((result) => {
        res.status(201).json({
            post: result
        });
    }); */

}
module.exports = {
    getPosts,createPost
};
const Post = require('../models/post');

const formidable = require("formidable");
const fs = require('fs');

exports.postById = (req,res,id) => {
    Post.findById(id).populate("postedBy", "_id name").exec((err,post) => {
        if(err || !post){
            return res.status(400).json({
                error:err
            });        
        }

        req.post = post;
        next();
    });
}

exports.postsByUser = (req, res) => {
    const posts = Post.find().populate("postedBy", "_id name").select("_id title body")

    .then( (posts) => {
 
         res.status(200).json({ posts})
     
     })
 
    .catch( err => console.log(err));
};


exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
 
         if(err || !user) return res.status(400).json({error:"user not found"});
 
         req.profile = user
         next();
    });
 }
 

exports.getPosts = (req, res) => {
   const posts = Post.find().populate("postedBy", "_id name").select("_id title body")

   .then( (posts) => {

        res.status(200).json({ posts})
    
    })

   .catch( err => console.log(err));
};

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err, fields,files) => {
        if(err){
            return res.status(400).json({
                error:"img cannot be uploaded"
            })
        }

        let post = new Post(fields)
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        post.postedBy = req.profile

        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = fs.photo.type
        }

        post.save((err,result) => {
            if(err){
                return res.status(400).json({error:err})
            }

            res.json(result)
        })
    })

}




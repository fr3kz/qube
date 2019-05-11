exports.createPostValidator = (req,res, next) => {
    req.check('title', 'Write a title').notEmpty()
    req.check("title", "title must be 4 20").isLength({
        min:4,
        max: 20,
    });

    req.check('body', 'Write a bodytle').notEmpty()
    req.check("body", "title must be 4 202").isLength({
        min:4,
        max: 200,
    });

    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    next();
}
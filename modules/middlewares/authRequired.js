const jwt = require("jsonwebtoken");


exports.authRequired = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(402).json({error: "Please login"})
    }

    const token = authorization.split(" ")[1]
    if(!token){
       return res.status(401).json({ error: "Please login"})
    }

    const user = jwt.verify(
      token,
      "ba3eedd629723db47f0a037a034ae3309149387d691dd4d44209132d86438123"
    );


    req.user = user;
    next();
}
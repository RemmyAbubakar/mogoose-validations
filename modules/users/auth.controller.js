const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {

// generate token
const token = jwt.sign(
  { id: user._id, email: user.email },
  "ba3eedd629723db47f0a037a034ae3309149387d691dd4d44209132d86438123", 
  {
    expiresIn: "1h",
  }
);

 return {
    token,
    user,
}

};


exports.register = async (req, res) => {
 const { email, password } = req.body;

 // checking to see if email already exits
const emailExists = await User.findOne({email});
if (emailExists) {
    return res.status(400).json({"error": "Email already in use."}, )
}

const hashedPassword = await bcrypt.hash(password, 12);

const user = await User.create({...req.body, password: hashedPassword});


const token = generateToken(user);
res.status(201).json({ token })
};



exports.login = async (req, res) => {
   const { email,password } = req.body;

   let user = await User.findOne({ email });
   if(!user) {
    return res.status(400).json({msg: "Invalid credentials"})
   }

   const isMatch = await bcrypt.compare(password, user.password);
   if(!isMatch){
    return res.status(400).json({msg: "Invalid credentials"});
   }


   const token = generateToken(user);

   res.status(200).json({ token });
};


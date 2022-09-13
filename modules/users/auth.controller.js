const User = require("./user.model")


exports.register = async (req, res) => {
 const { email, password } = req.body;

 // checking to see if email already exits
const emailExists = await User.findOne({email});
if (emailExists) {
    return res.status(400).json({"error": "Email already in use."})
}


const user = await User.create({...req.body});

res.status(201).json({ user })
};
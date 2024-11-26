const User = require('../models/auth.models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/auth');

const signup = async (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if(error) {
        return res.status(400).json({ success: false, message: error });
    }
    const { email, password } = req.body;

    try {
        const existingUser = User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exist'});

        }

        const hashedPassword = bcrypt.hash(password);
        const newUser = await new User({
            email: email,
            password: hashedPassword
        });

        const token = generateToken(newUser._id);
        return res.status(201).json({
            success: true,
            data: newUser,
            token
            
        });


    } catch (error) {
        res.status(500).json({ succes: false, message: error.message });
    }

};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({
            success: false,
            message: 'User does not exist'
        });
    }
    const comparePassword = bcrypt.compare(password, user.password);
    if(!comparePassword) {
        return res.status(400).json({
            success: false,
            message: 'Incorrect password'
        });
    }
    const token = generateToken(user._id);
    return res.status(200).json({
        success: true,
        user,
        token
    });
};


module.exports = {
    signup,
    login
}

const User = require('../models/auth.models');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    const { error, value } = userSchema.validate(req.body);
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

        return res.status(201).json({
            success: true,
            data: newUser
            
        });


    } catch (error) {
        res.status(500).json({ succes: false, message: error.message });
    }

}

module.exports = {
    signup,
}
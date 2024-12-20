const User = require("../models/usermodel");
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        if (!username || !password || !email) {
            return res.status(400).json({ message: "enter all fields" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "already user exist" });
        }
        const newUser = new User({ username: username, email: email, password: password });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, "jwt", { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000
        })

        return res.status(200).json(
            {
                message: "user added succefully",
                user: {
                    id: newUser._id,
                    name: newUser.username,
                    email: newUser.email
                }
            }
        )
    }
    catch (error) {
        console.log(`error in sign up ${error}`);
        res.status(500).json({ message: 'internal server error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "enter all fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user does not exits plz sign up" })
        }
        if (password != user.password) {
            return res.status(400).json({ message: "invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, "jwt", { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
            sameSite: false
        })

        return res.status(200).json({
            message: "loged in  successfully",
            user: {
                id: user._id,
                name: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.log(`error in log in ${error}`);
        res.status(400).json({ message: "err in log in " })
    }
}

const deleteUser = async (req , res) => {
    try {
        const userId = req.userId;
        const user = User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        res.clearCookie("token");
        // Send success response
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(`Error in delete user: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { login, signUp, deleteUser };
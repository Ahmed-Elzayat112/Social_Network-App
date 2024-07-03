const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const error = new Error("User already exists.");
            error.statusCode = 422;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const result = await user.save();
        res.status(201).json({ message: "User created!", user: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error(
                "A user with this email could not be found."
            );
            error.statusCode = 401;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString(),
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token: token,
            userId: user._id.toString(),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

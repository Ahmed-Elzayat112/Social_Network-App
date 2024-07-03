const express = require("express");
const { body } = require("express-validator");

const authController = require("../controller/auth");
const User = require("../model/user");

const router = express.Router();

router.put(
    "/signup",
    [
        body("name").trim().isLength({ min: 5 }),
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Please enter a valid email address")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject("E-Mail exists already");
                    }
                });
            }),
        body("password").trim().isLength({ min: 5 }),
    ],
    authController.signup
);

router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Please enter a valid email address"),
        body("password").trim().isLength({ min: 5 }),
    ],
    authController.login
);

module.exports = router;

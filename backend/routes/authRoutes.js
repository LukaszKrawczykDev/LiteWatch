const express    = require("express");
const { check }  = require("express-validator");
const validate   = require("../middleware/validate");
const { register, login } = require("../controllers/authController");
const router     = express.Router();

router.post(
    "/register",
    [
        check("username")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Nazwa użytkownika musi mieć co najmniej 3 znaki"),
        check("email")
            .isEmail()
            .withMessage("Niepoprawny email")
            .normalizeEmail(),
        check("password")
            .isLength({ min: 8 })
            .withMessage("Hasło musi mieć co najmniej 8 znaków"),
    ],
    validate,
    register
);

router.post(
    "/login",
    [
        check("email")
            .isEmail()
            .withMessage("Niepoprawny email")
            .normalizeEmail(),
        check("password")
            .notEmpty()
            .withMessage("Hasło jest wymagane"),
    ],
    validate,
    login
);

module.exports = router;
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");
const passport = require("passport");

const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "User page works" }));

//api/users/register
router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        const avatar = gravatar.url(req.body.email, {
            s: 200,
            r: "pg",
            d: "mm"
        });
        if (user) {
            return res.status(400).json({ email: "This email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

//api/users/login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //email check
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: "User not found" });
        }
        //check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // res.json({ msg: "Success!!!" });
                const payload = { id: user.id, name: user.name, avatar: user.avatar };
                jwt.sign(
                    payload,
                    keys.secretOrKey, { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer :" + token
                        });
                    }
                );
            } else {
                return res.status(404).json({ password: "Password is not matched" });
            }
        });
    });
});
//current
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({ msg: "success" });
    }
);
module.exports = router;
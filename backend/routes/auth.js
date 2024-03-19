const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/user')
const JWT_SECRET = "SecurePassword";

router.use(express.json());


router.post('/register', [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Password should have atleast 6 characters').isLength({ min: 6 }),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let success= false;
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    success,
                    error: "User with provided email address already exists"
                })
            }
            const salt = await bcrypt.genSalt(10);

            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: encryptedPassword,
                email: req.body.email
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            success= true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success,authToken });
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error")
        }

    })

router.post('/login', [
        body('email', 'Enter a valid Email address').isEmail(),
        body('password', "Password cannot be blank").exists(),
    ],
    async(req, res) => {
        let success= false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                success= false
                return res.status(400).json({success, error: "Invalid Credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success= false
                return res.status(400).json({success, error: "Invalid Credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success= true
            res.json({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    }
)

router.get('/getUser', fetchUser, async(req, res) => {

    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router;
const express = require('express');
const router = express.Router();
const Notes = require('./../models/notes');
const fetchUser = require('../middleware/user');
const { body, validationResult } = require('express-validator');
const notes = require('./../models/notes');

router.use(express.json());


router.get('/fetchAll', fetchUser, async(req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes );

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error")
    }

})

router.post('/new',
    fetchUser, [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Password should have atleast 10 characters').isLength({ min: 10 }),
    ],
    async(req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, tag, description } = req.body;
            const newNote = await new Notes({
                title,
                description,
                tag,
                user: req.user.id
            })
            const note = await newNote.save();
            res.json(note);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error")
        }

    }
)
router.put('/update/:id',
    fetchUser,
    async(req, res) => {

        try {
            const { title, tag, description } = req.body;
            const newNote = {};
            if (title) {
                newNote.title = title
            }
            if (description) {
                newNote.description = description
            }
            if (tag) {
                newNote.tag = tag
            }
            let note = await Notes.findById(req.params.id);
            if (!note)
                return res.status(404).send("Not Found");
            if (note.user.toString() !== req.user.id)
                return res.status(401).send("Not Allowed");

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error")
        }

    }
)
router.delete('/delete/:id',
    fetchUser,
    async(req, res) => {

        try {

            let note = await Notes.findById(req.params.id);
            if (!note)
                return res.status(404).send("Not Found");
            if (note.user.toString() !== req.user.id)
                return res.status(401).send("Not Allowed");

            note = await Notes.findByIdAndDelete(req.params.id);

            res.json({ "Success": "Note has been deleted" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error")
        }

    }
)




module.exports = router;
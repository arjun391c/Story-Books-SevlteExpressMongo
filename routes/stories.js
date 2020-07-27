const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const fs = require('fs')
const path = require('path')

const Story = require('../models/Story')

router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: res.locals.user.id }).lean()
        res.status(200).json(stories);
    } catch (err) {
        console.error(err)
    }
})

router.post('/add', ensureAuth, async (req, res) => {
    try{
        req.body.user = res.locals.user.id
        //validate file
        if (req.file) {
            req.body.image = req.file.filename
        }

        const story = await Story.create(req.body)
        story.user = req.user
        res.status(200).json(story)
    } catch (err) {
        console.error(err)
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOneAndDelete({
            _id: req.params.id,
            user: res.locals.user.id
        })

        if (!story){
            return res.end("No data")
        }

        // deleting the image if not defaultimage
        if(story.image != 'defaultstory.jpg') {
            fs.unlink(path.join(__dirname, `../client/public/images/${story.image}`), (err) => {
                if (err) console.error(err)
            });
        }

        res.json(story)
    } catch (err) {
        console.error(err)
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    try {        
        //req has title, body ,status, id, image filename
        var oldImage;

        //if image is updated
        if (req.file) {
            oldImage = req.body.image
            req.body.image = req.file.filename
        }

        const story = await Story.findOneAndUpdate({
            _id: req.params.id,
            user: res.locals.user.id
        }, req.body, {new: true, runValidators: true})

        if (!story){
            fs.unlink(path.join(__dirname, `../client/public/images/${req.body.image}`), (err) => {
                if (err) console.error(err)
            });
            return res.end("No data")
        }

        story.user = req.user

        // deleting the olf image if updated
        if(oldImage !== 'defaultstory.jpg') {
            fs.unlink(path.join(__dirname, `../client/public/images/${oldImage}`), (err) => {
                if (err) console.error(err)
            });
        }
        res.status(200).json(story) 

    } catch (err) {
        console.error(err)
    }
})

router.get('/public', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
            res.status(200).json(stories);
    } catch (err) {
        console.error(err)
    }
})

module.exports = router
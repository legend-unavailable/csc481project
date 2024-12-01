const express = require('express');
const router = express.Router();

const {getEvents, getEvent} = require('../database/database.js');

//Handle requests to search for an event given an event id
router.get('/', async (req, res, next) => {
    const {event_id} = req.body
    const events = await getEvent(event_id)

    res.status(201).json({
        events: events,
        message: "Known events: "

    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling POST requests to home'
    });
});

module.exports = router;
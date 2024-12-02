const express = require('express');
const router = express.Router();
const db = require('mysql')

const {createEvent} = require('../database/database.js');

//Handle post request to create an event
router.post('/', async (req, res, next) => {
    const {event_id, event_name, event_type, event_date, event_time, location, duration, max_attendees, organizer_id, created_at, updated_at} = req.body
    const event = await createEvent(event_id, event_name, event_type, event_date, event_time, location, duration, max_attendees, organizer_id, created_at, updated_at)

    res.status(201).json({
        event: event,
        message: "Successfully created an event!",
    });
});

module.exports = router;
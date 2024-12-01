const express = require('express');
const router = express.Router();

const {deleteEvent, getAllEventsFromUser} = require('../database/database.js');

//Handle get request to retrieve event data for a user
router.get('/', async (req, res, next) => {
    const events = await getAllEventsFromUser(req.body.user_id)

    res.status(201).json({
        events: events,
        message: 'Here are your events!',
    });
});

router.delete('/', async (req, res, next) => {
    const dEvent = await deleteEvent(req.body.event_id)

    res.status(201).json({
        dEvent: dEvent,
        message: 'Successfully deleted Event!',
    });
})


module.exports = router;
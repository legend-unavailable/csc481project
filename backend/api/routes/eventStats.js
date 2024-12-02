const express = require('express');
const router = express.Router();

const {deleteEvent, updateEvent, getAllEventsFromUser} = require('../database/database.js');

//Handle get request to retrieve event data for a user
router.get('/', async (req, res, next) => {
    const events = await getAllEventsFromUser(req.body.user_id)

    res.status(201).json({
        events: events,
        message: 'Here are your events!',
    })
})

router.put('/', async (req, res, next) => {
    const uEvent = await updateEvent(event_id)
    
    res.status(201).json({
        uEvent: uEvent,
        message: "Successfully updated Event",
    });
});

router.delete('/', async (req, res, next) => {
    const dEvent = await deleteEvent(event_id)

    res.status(201).json({
        dEvent: dEvent,
        message: 'Successfully deleted Event!',
    });
});

module.exports = router;
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//Elizabeth connection
const connection = mysql.createConnection({
    host: '192.168.1.90',
    user: 'root',
    password: 'root',
    database: 'eventmanage'
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Changed to match your database column names
    const query = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
    connection.query(query, [email, password], (error, results) => {
        if (error) {
            console.error('Login error:', error); // Added error logging
            res.status(500).json({ error: 'Database error' });
            return;
        }
        
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Signup endpoint - notice the exact path '/api/signup'
// Signup endpoint
app.post('/api/signup', (req, res) => {
    console.log('Received signup request:', req.body);
    const { firstName, lastName, email, password } = req.body.user;
    
    const query = 'INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, "attendee")';
    
    connection.query(query, [firstName, lastName, email, password], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Failed to create account' });
            return;
        }
        console.log('User created successfully');
        res.status(201).json({ message: 'Account created successfully' });
    });
});

// Check if user is organizer endpoint
app.get('/api/check-organizer/:userId', (req, res) => {
    const query = 'SELECT role FROM users WHERE user_id = ?';
    connection.query(query, [req.params.userId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        const isOrganizer = results[0]?.role === 'organizer';
        res.json({ isOrganizer });
    });
});

// Get all users for event invites
app.get('/api/users', (req, res) => {
    const query = 'SELECT user_id, first_name, last_name, email FROM users';
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Get all events with organizer and attendee details
app.get('/api/events', (req, res) => {
    console.log('Fetching events...'); // Add logging
    const query = `
        SELECT 
            e.*,
            u.first_name as organizer_first_name,
            u.last_name as organizer_last_name,
            COUNT(ea.user_id) as attendee_count,
            COUNT(CASE WHEN ea.status = 'accepted' THEN 1 END) as accepted_count
        FROM events e
        JOIN users u ON e.organizer_id = u.user_id
        LEFT JOIN event_attendees ea ON e.event_id = ea.event_id
        GROUP BY e.event_id
        ORDER BY e.event_date DESC
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // Get attendees in a separate query
        const attendeesPromises = results.map(event => {
            return new Promise((resolve, reject) => {
                const attendeesQuery = `
                    SELECT u.user_id, u.first_name, u.last_name, u.email, ea.status
                    FROM event_attendees ea
                    JOIN users u ON ea.user_id = u.user_id
                    WHERE ea.event_id = ?
                `;
                connection.query(attendeesQuery, [event.event_id], (error, attendees) => {
                    if (error) reject(error);
                    else resolve(attendees);
                });
            });
        });

        Promise.all(attendeesPromises)
            .then(attendeesResults => {
                results.forEach((event, index) => {
                    event.attendees = attendeesResults[index];
                });
                res.json(results);
            })
            .catch(error => {
                console.error('Error fetching attendees:', error);
                res.status(500).json({ error: 'Error fetching attendees' });
            });
    });
});

// Create event endpoint
app.post('/api/create-event', (req, res) => {
    console.log('Received event data:', req.body);
    const { event, guests } = req.body;
    console.log('Event:', event);
    console.log('Guests:', guests);
    
    // First check if creator is organizer
    const checkOrganizerQuery = 'SELECT role FROM users WHERE user_id = ?';
    connection.query(checkOrganizerQuery, [event.organizerId], (error, results) => {
        if (error) {
            console.error('Organizer check error:', error);
            res.status(500).json({ error: 'Failed to verify organizer' });
            return;
        }
        
        if (!results.length || results[0].role !== 'organizer') {
            res.status(403).json({ error: 'Only organizers can create events' });
            return;
        }

        const eventQuery = `
            INSERT INTO events (
                event_name, 
                event_type, 
                event_date, 
                event_time,
                location, 
                duration, 
                max_attendees,
                organizer_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const dateTime = new Date(event.eventDate);
        const eventValues = [
            event.eventName,
            event.eventType,
            dateTime.toISOString().split('T')[0], // date
            dateTime.toTimeString().split(' ')[0], // time
            event.eventLocate,
            event.eventLength,
            guests.length,
            event.organizerId
        ];

        console.log('Event values:', eventValues);

        connection.query(eventQuery, eventValues, (error, results) => {
            if (error) {
                console.error('Event creation error:', error);
                res.status(500).json({ error: 'Failed to create event' });
                return;
            }
            
            // Event created successfully, now add attendees
            const eventId = results.insertId;
            const attendeeValues = guests.map(guest => [eventId, guest.user_id, 'invited']);
            
            if (attendeeValues.length === 0) {
                res.status(201).json({ message: 'Event created successfully (no guests)' });
                return;
            }

            const attendeeQuery = 'INSERT INTO event_attendees (event_id, user_id, status) VALUES ?';
            connection.query(attendeeQuery, [attendeeValues], (error) => {
                if (error) {
                    console.error('Attendee insertion error:', error);
                    res.status(500).json({ error: 'Failed to add attendees' });
                    return;
                }
                res.status(201).json({ message: 'Event created successfully' });
            });
        });
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
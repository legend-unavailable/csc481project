DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS event_attendees;

/* Create event table */
CREATE TABLE events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    event_type ENUM('in_person', 'online') NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255),
    duration VARCHAR(50) NOT NULL,
    max_attendees INT NOT NULL,
    organizer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    /* Link to users table */
    FOREIGN KEY (organizer_id) REFERENCES users(user_id)
);

/* Create junction table for event attendees*/
CREATE TABLE event_attendees (
    event_id INT,
    user_id INT,
    status ENUM('invited', 'accepted', 'declined', 'maybe') DEFAULT 'invited',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* Insert Dummy Event Data */
INSERT INTO events (event_name, event_type, event_date, event_time, location, duration, max_attendees, organizer_id) 
VALUES 
('CSC 481 Presentation', 'in_person', '2024-12-02', '17:30:00', 'CSUDH Campus', '2 hours', 4, 1),
('CSC 481 Final', 'online', '2024-12-09', '17:30:00', 'Zoom URL', '2 hours', 30, 14);

/* Insert example attendees for the CSC 481 Presentation and Final */
INSERT INTO event_attendees (event_id, user_id, status) 
VALUES 
(1, 2, 'invited'),   -- Replace with actual user_ids from your users table
(1, 3, 'accepted'),
(1, 4, 'invited'),
(2, 26, 'maybe'),
(2, 27, 'accepted'),
(2, 28, 'declined'),
(2, 35, 'accepted'),
(2, 40, 'accepted'),
(2, 41, 'accepted');

/* You can get attendee information using this query: */
SELECT 
    e.event_name,
    u.first_name,
    u.last_name,
    u.email,
    ea.status
FROM event_attendees ea
JOIN events e ON ea.event_id = e.event_id
JOIN users u ON ea.user_id = u.user_id;
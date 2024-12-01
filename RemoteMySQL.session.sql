select * from users

select * from events

SELECT 
    e.event_name,
    u.first_name,
    u.last_name,
    u.email,
    ea.status
FROM event_attendees ea
JOIN events e ON ea.event_id = e.event_id
JOIN users u ON ea.user_id = u.user_id;

CREATE VIEW event_attendees_view AS
SELECT 
    e.event_name,
    u.first_name,
    u.last_name,
    u.email,
    ea.status
FROM event_attendees ea
JOIN events e ON ea.event_id = e.event_id
JOIN users u ON ea.user_id = u.user_id;


SELECT * FROM event_attendees_view;
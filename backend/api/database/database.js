const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mongo',
    database: 'eventmanage'
}).promise()

async function getAllEventsFromUser(user_id){
    const [rows] = await pool.query(`
        SELECT * FROM events WHERE user_id = ?
        `, [user_id])
    return rows
}

async function getEvents(){

    let perPage = 3;
    let page = req.query.page || 1;

    const [rows] = await pool.query(`
        SELECT * FROM events
        ORDER BY event_date DESC
        LIMIT perPage
        OFFSET (page - 1) * perPage
        `)
    return rows
}

async function getEvent(event_id){
    const [rows] = await pool.query(`
        SELECT * FROM events WHERE event_id = ?
        `, [event_id])
    return rows[0]
}

async function createEvent(event_id, event_name, event_type, event_date, event_time, location, duration, max_attendees, organizer_id, created_at, updated_at){
    const result = await pool.query(`
        INSERT INTO events (event_id, event_name, type, date, time, location, duration, max_attendees, organizer_id, created_at, updated_at)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [event_id, event_name, event_type, event_date, event_time, location, duration, max_attendees, organizer_id, created_at, updated_at])
}

async function updateEvent(event_id){
    const result = await pool.query(`
        SELECT * FROM events WHERE event_id = ?
        `, [event_id])
        return result
}

async function deleteEvent(event_id){
    const [rows] = await pool.query(`
        SELECT * FROM events WHERE event_id = ?
        `, [event_id])
        return rows[0]
}

async function createUser(user_id, first_name, last_name, email, password_hash, role){
    const result = await pool.query(`
        INSERT INTO users (user_id, first_name, last_name, email, password_hash, role)
        values (?, ?, ?, ?, ?, ?)
        `, [user_id, first_name, last_name, email, password_hash, role])
}

async function getUserData(user_id){
    const result = await pool.query(`
        SELECT * FROM users WHERE user_id = ?
        `, [user_id])
        return result[0]
}

async function updateUserData(user_id, first_name, last_name, email, password_hash){
    const result = await pool.query(`
        UPDATE users
        SET (?, ?, ?, ?)
        WHERE user_id = ?
        `, {user_id, first_name, last_name, email, password_hash})
        return result
}

async function userExists(email, password_hash){
    const result = await pool.query(`
        SELECT EXISTS FROM user
        WHERE email = ? AND password_hash = ?
        `, [email, password_hash])
        return result
}


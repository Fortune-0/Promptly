-- Create a new database called promptly
CREATE DATABASE IF NOT EXISTS promptly_db;
CREATE USER IF NOT EXISTS 'prompt' IDENTIFIED BY 'Str0ngPassw0rd!';
GRANT ALL PRIVILEGES ON promptly_db.* TO 'prompt';
FLUSH PRIVILEGES

-- Use the promptly database
USE promptly_db;

-- Create a table called prompt
CREATE TABLE IF NOT EXISTS prompt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    date DATE NOT NULL,
    time TIME NOT NULL,
);

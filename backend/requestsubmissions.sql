CREATE DATABASE IF NOT EXISTS valley3dprints;

USE valley3dprints;

CREATE TABLE IF NOT EXISTS quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    material VARCHAR(50) NOT NULL,
    link VARCHAR(255),
    noSupports BOOLEAN DEFAULT FALSE,
    priority VARCHAR(50),
    file_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
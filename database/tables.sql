-- tabla de usuarios

CREATE TABLE users(
    userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(80) NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    created_at timestamp NOT NULL DEFAULT current_timestamp
)
ENGINE=InnoDB;

-- tabla de criptomonedas
CREATE TABLE indicators(
    indiId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    current_price DECIMAL(9,2),
    userId INT NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY(userId) REFERENCES users(userId)
)
ENGINE=InnoDB;
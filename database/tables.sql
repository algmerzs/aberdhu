-- tabla de usuarios

CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(80) NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    created_at TIMESTAMP NOT NULL,
);

-- tabla de criptomonedas
CREATE TABLE indicators(
    id_indi INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    symbol VARCHAR(10) NOT NULL,
    current_price FLOAT(15,15) NOT NULL,
    indi_username INT(11) NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_indic FOREIGN KEY(indi_username) REFERENCES users(id)
);
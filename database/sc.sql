CREATE TABLE indicators(
    id INT(11) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    current_price DECIMAL(15,15) NOT NULL,
    username INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(username) REFERENCES users(username)
);
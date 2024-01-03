CREATE TABLE Role(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    newdepartments_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (newdepartments_id) REFERENCES newdepartments(id)
);
DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;
USE work_db;

DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS Employee;


CREATE TABLE department (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Role (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(5,0),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE Employee (
    id INTEGER (11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);
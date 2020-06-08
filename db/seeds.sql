INSERT INTO departments (department)
VALUES
('Engineering'),
('Admin'),
('Advertising'),
('Labor');

INSERT INTO Role (title, salary, department_id)
VALUES
('CS lead', 55000, 1 ),
('CS junior', 38000, 2),
('CS mid', 44000, 3),
('3d modeling', 48000, 4),
('secretary', 32000, 5),
('CEO', 78000, 6),
('janitor', 99999, 7),
('ad man', 60000, 8);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES
('bob', 'ross', 1, 1),
('karen', 'matthews', 2, 1),
('scott', 'tabernackle', 2, 1),
('frank', 'ocean', 3, 1),
('baby', 'driver', 4, 2),
('donald', 'glover', 4, 2),
('andrew', 'jackson', 4, 2),
('paul', 'nessle', 5, 2);


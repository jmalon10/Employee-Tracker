INSERT INTO department (name)
VALUES ('owners'),
('management'),
('front of house'),
('back of house');

INSERT INTO role (title, salary, department_id)
VALUES ('owner', 300000, 1),
('manager', 70000, 2),
('waitress', 100000, 3),
('sou chef', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nicole', 'Faretti', 2, 1),
('Oscar', 'Benitez', 4, 1),
('Ariana', 'Miller', 3, 1);


INSERT INTO departments (department_name)
VALUES 
      ("Management"),
      ("Law"),
      ("Sales"),
      ("Marketing"),
      ("Warehouse"),
      ("Web Development");


INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 90000, 1),
("CEO", 400000, 1),
("Associate Lawyer", 100000, 2),
("Partner Lawyer", 200000, 2),
("Team Lead", 90000, 3),
("Associate Sales", 35000, 3),
("Senior Marketing", 85000, 4),
("Intern Marketing", 10000, 4),
("Driver", 45000, 5),
("Senior Front End", 175000, 6),
("Junior Front End", 89000, 6),
("Senior Back End", 175000, 6),
("Junior Back End", 89000, 6);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Snow", 2, NULL),
("Tim", "Horton", 1, NULL),
("Jim", "Halpert", 5, 1),
("Scary", "Terry", 9, 1),
("Nick", "Doe", 6, 4),
("Rachel", "Berry", 10, 2),
("Jen", "Lim", 4, NULL),
("Greg", "Moms", 3, 4),
("Ashley", "Moore", 7, 2),
("Missy", "Franklin", 8, 7),
("Green", "Monster", 11, 2),
("Mitch", "Vox", 12, 11);
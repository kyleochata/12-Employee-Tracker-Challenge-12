INSERT INTO departments (department_name)
VALUES 
      ("Management"),
      ("Law"),
      ("Sales"),
      ("Warehouse"),
      ("Web Development");


INSERT INTO roles (title, salary, department_id)
VALUES 
("Manager", 90000, 1),
("CEO", 400000, 1),
("Associate Lawyer", 100000, 2),
("Partner Lawyer", 200000, 2),
("Team Lead", 90000, 3),
("Associate Sales", 35000, 3),
("Driver", 45000, 5),
("Senior Front End", 175000, 5),
("Junior Front End", 89000, 5),
("Senior Back End", 175000, 5),
("Junior Back End", 89000, 5);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Snow", 2, NULL),
("Michael", "Scott", 1, 1),
("Jim", "Halpert", 5, 2),
("Dwight K", "Schrute", 5, 2),
("Kelly", "Kapoor", 4, 2),
("Molly", "Baz", 3, 5),
("Kim", "Kardashian", 6, 4),
("Michelle", "Kwan", 8, 2),
("Gary", "Boots", 9, 8);
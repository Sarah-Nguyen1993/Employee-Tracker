INSERT INTO department(name) 
	VALUES ("Sales"), ("Engineering"), ("Legal");

INSERT INTO role(title, salary, department_id) 
    VALUES ("Sales manager", 80000,1),
			("Sales analyst", 60000,1),
           ("Lead Engineer", 150000,2),
           ("Engineer", 80000,2),
           ("Laywer", 90000,3);

INSERT INTO employees(first_name, last_name, role_id, manager_id) 
    VALUES ("James", "Scott",1,null),
		   ("Marry","White", 2,1),
           ("Ann", "Smith",3,null),
            ("John", "Depp",4,3),
             ("Ted", "Bear",5,null);
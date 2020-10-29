Drop Database if exists employee_trackerBD;
Create Database employee_trackerBD;
Use employee_trackerBD;

Create Table department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    name VARCHAR (30)
);

Create Table role (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

Create Table employees (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT NULL,
	FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;

INSERT INTO department(name) 
	VALUES ("Sales"), ("Engineering"), ("Finance");

INSERT INTO role(title, salary, department_id) 
    VALUES ("Salesperson", 80000,1),
           ("Lead Engineer", 150000,2),
           ("Accountant", 50000,1);

INSERT INTO employees(first_name, last_name, role_id, manager_id) 
    VALUES ("John", "Doe",1,1),
		   ("Mike","Chan", 2,2),
           ("Malia", "Brown",3,3);
           

SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name as department, role.salary
FROM employees
LEFT JOIN role on employees.role_id = role.id
LEFT JOIN department on role.department_id = department.id;


-- Insert data into the department table
INSERT INTO department (name) VALUES
('Sales'),        
('Engineering'),  
('Finance');      

-- Insert data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 60000, 1),       
('Software Engineer', 80000, 2),   
('Accountant', 50000, 3);          

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),          
('Alex', 'Smith', 2, 1),          
('Mike', 'Peters', 3, 1);         
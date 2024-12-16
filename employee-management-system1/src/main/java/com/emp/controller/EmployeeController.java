package com.emp.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.emp.model.Employee;
import com.emp.model.User;
import com.emp.repository.EmployeeRepository;
import com.emp.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/emp")
public class EmployeeController {
	@Autowired
	private EmployeeRepository employeeRepository;

	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}
	
	@GetMapping("/employee/{id}")
	public Employee getEmployeeById(@PathVariable long id) {
		return employeeRepository.findById(id).get();
	}

	@PostMapping("/addEmployee")
	public Employee createEmployee(@Valid @RequestBody Employee emp) {
		System.out.println(">>>>>>"+ emp.getName());
		return employeeRepository.save(emp);
	}

	@PutMapping("/updateEmployee/{id}")
	public Employee updateEmployee(@PathVariable long id, @RequestBody Employee emp) {
		Employee getEmployee = employeeRepository.findById(id).get();
		getEmployee.setBirthdate(emp.getBirthdate());
		getEmployee.setEmail(emp.getEmail());
		getEmployee.setName(emp.getName());
		getEmployee.setPassword(emp.getPassword());
		return employeeRepository.save(getEmployee);
	}

	@DeleteMapping("/delete/{id}")
	public String deleteEmployee(@PathVariable long id) {
		employeeRepository.deleteById(id);
		return "Employee delete successfully";
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Employee>> searchUsers(@RequestParam String searchText) {
		List<Employee> searchResults = employeeRepository.findByNameContainingIgnoreCase(searchText);
		return ResponseEntity.ok(searchResults);
	}
	
	@GetMapping("/employeeLogin/{username}/{password}")
	public Employee getEmployeeByEmailAndPassword(@PathVariable String username, @PathVariable String password) {
		return employeeRepository.findByEmailAndPassword(username, password);
	}

}

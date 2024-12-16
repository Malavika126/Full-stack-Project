package com.emp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.emp.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	//login
	public User findByEmailAndPassword(String email,String password);
	//Seraching
	List<User> findByFirstNameContainingIgnoreCase(String searchText);
}

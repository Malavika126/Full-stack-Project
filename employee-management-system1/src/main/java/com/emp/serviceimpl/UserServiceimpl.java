package com.emp.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emp.model.User;
import com.emp.repository.UserRepository;
import com.emp.service.UserService;

@Service
public class UserServiceimpl implements UserService{

	 @Autowired
	  private UserRepository userRepository;	 

	public User loginUser(User user) throws Exception {
		User loggedInUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if (loggedInUser == null) {
			throw new Exception("User not found");
		}
		return loggedInUser;
	}
	
	@Override
	public List<User> searchUsers(String searchText) {
		return userRepository.findByFirstNameContainingIgnoreCase(searchText);
	}
}

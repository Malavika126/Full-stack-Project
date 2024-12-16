package com.emp.service;

import java.util.List;

import com.emp.model.User;

public interface UserService {
	 public User loginUser(User user) throws Exception;
	 List<User> searchUsers(String searchText);
}

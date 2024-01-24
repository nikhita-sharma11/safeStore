// src/utils/auth.js
export const authenticateUser = (username, password) => {
  // Simulate a successful login
  // In a real-world scenario, you would send a request to a server to authenticate the user

  // For simulation purposes, let's consider the login successful if both username and password are non-empty
  return !!username && !!password;
};

/*
 * Filename: ComplexWebApp.js
 * 
 * Description: A complex web application that demonstrates various advanced concepts in JavaScript.
 */

// Module for handling user information
const UserModule = (function() {
  let username = '';

  function setUsername(name) {
    username = name;
  }

  function getUsername() {
    return username;
  }

  return {
    setUsername,
    getUsername
  };
})();

// Module for user interface
const UIModule = (function() {
  const welcomeSection = document.getElementById('welcome-section');
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username-input');
  const greetSection = document.getElementById('greet-section');

  function showLoginForm() {
    welcomeSection.style.display = 'none';
    loginForm.style.display = 'block';
  }

  function greetUser() {
    const username = UserModule.getUsername();
    greetSection.textContent = `Hello, ${username}! Welcome to our complex web app!`;
    greetSection.style.display = 'block';
  }

  return {
    showLoginForm,
    greetUser
  };
})();

// Module for handling API requests
const APIModule = (function() {
  function loginUser(username) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin') {
          resolve({ success: true });
        } else {
          reject({ success: false, error: 'Invalid credentials' });
        }
      }, 2000);
    });
  }

  return {
    loginUser
  };
})();

// Main application module
const App = (function(UserModule, UIModule, APIModule) {
  function init() {
    UIModule.showLoginForm();
    document.getElementById('login-btn').addEventListener('click', handleLogin);
  }

  async function handleLogin() {
    const username = UIModule.usernameInput.value;

    try {
      const response = await APIModule.loginUser(username);

      if (response.success) {
        UserModule.setUsername(username);
        UIModule.greetUser();
      } else {
        console.error(response.error);
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login. Please try again later.');
    }
  }

  return {
    init
  };
})(UserModule, UIModule, APIModule);

// Initialize the application
document.addEventListener('DOMContentLoaded', App.init);
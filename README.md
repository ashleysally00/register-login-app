# Register and Login App :sunglasses:

## Introduction

This is a simple full stack login and register app built with the following:
- **React** (Frontend)
- **Node.js/Express** (Backend)
- **SQL** (Database)
- **JavaScript**, **HTML**, and **CSS** (User Interface)

### Login Page
<img src="https://github.com/ashleysally00/register-login-app/blob/main/Login.png" alt="Login Page" width="400"/>

### Signup Page
<img src="https://github.com/ashleysally00/register-login-app/blob/main/Signup.png" alt="Signup Page" width="400"/>

## Features

- User registration
- User login
- Protected routes

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js and npm](https://nodejs.org/en/download/) (latest version)
- MySQL database

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ashleysally00/register-login-app.git
   ```

2. Navigate to the project directory
  ```sh
  cd register-login-app
```

3. Install dependencies for both frontend and backend
  ```sh
cd frontend && npm install
cd ../backend && npm install
```

## Configuration

1. In the backend directory, create a .env file

 ```sh
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```
Replace placeholders with your actual database credentials and choose a secure random string for JWT_SECRET.

2. Set up the database using the SQL commands in database_setup.md.

## Usage

1. Start the backend server:

 ```sh
 cd backend && npm start
```

2. In a new terminal, start the frontend development server:
 ```sh
   cd frontend && npm start
```

3. Open your web browser and visit http://localhost:3000

## Database Setup

Create a file named database_setup.md in your project root with the following content:


Run these SQL commands in your MySQL database:

```sql
CREATE DATABASE IF NOT EXISTS your_database_name;

USE your_database_name;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Replace your_database_name with the name specified in your .env file.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

Ashley Rice - [ashleysally00@gmail.com](mailto:ashleysally00@example.com)

Project Link: [https://github.com/ashleysally00/register-login-app](https://github.com/ashleysally00/register-login-app)






























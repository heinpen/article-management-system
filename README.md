# Article Management System

This is a web application for managing articles. It allows administrators to create, update, and delete articles, while regular users for now can only read articles.

## Overview

The Article Management System is designed to facilitate the creation and management of articles by both regular users and administrators. Regular users can create an account, log in, and create new articles. On the other hand, administrators have access to the admin dashboard, where they can manage articles and users.

The main features of the Article Management System include:

## Features

- Admin Dashboard: The application provides an admin dashboard that allows administrators to manage articles.
- Create, Update, Delete: Administrators can create new articles, update existing articles, and delete articles as needed.
- Read-only for Users: Regular users can access and read articles but do not have permission to perform any modifications.

## How to Register as an Admin

During the registration process, an additional "Is Admin" checkbox is provided. To become an administrator, check this box during registration. Only users with the "Is Admin" checkbox checked will have access to the admin dashboard and the ability to perform CRUD operations on articles.

## Technologies Used

- Frontend: The frontend is built using React with Material-UI for the user interface.
- Backend: The backend is developed with Node.js and Express.js, providing the API endpoints for managing articles and user authentication.
- Database: MongoDB is used as the database to store article data and user information.

## RSS Feed Integration

The Article Management System is equipped with a feature to integrate RSS feeds. The application fetches articles from an external RSS feed and stores them in the database on a daily schedule. This allows users to access the latest articles from the external source within the system.

### How it Works

1.  The backend server uses the `rss-parser` library to fetch articles from an external RSS feed. The feed URL can be configured in the backend settings.
2.  A schedule is set up using `cron` to fetch articles from the RSS feed once a day at a specified time, ensuring the data remains up-to-date.
3.  The fetched articles are then stored in the MongoDB database as new articles in the system.

## Installation

To run the Article Management System locally, ensure you have the following prerequisites:

- Node.js (Version 14 or higher)
- npm (Version 6 or higher)
- MongoDB (Version 4 or higher)

Follow the steps below to set up the project:

1. Clone the repository:

```bash
git clone https://github.com/your-username/article-management-system.git
```

3. Install the required dependencies for frontend and backend:

```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the `backend` directory with the following content:

```
URI=your-mongodb-connection-string
TOKEN_KEY=your-secret-key // example: jllgshllWEUJHGHYJkjsfjds90JKLHKJDFH2L341234
PORT=your-port
```

Replace `your-mongodb-connection-string` with your MongoDB connection string, and `your-secret-key` with a secure secret key for JWT authentication.

⚠️ **IMPORTANT: Before running the application, ensure you add your IP to your MongoDB cluster whitelist to allow access.**

5. Start the development server:
6. ## Installation and Setup

7. Clone the repository to your local machine:

```bash
 git clone https://github.com/your-username/article-management-system.git`
```

2.  Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install`
```

3.  Start the backend server:

```bash
npm run start:dev
```

4.  Navigate to the frontend directory and install dependencies:

bashCopy code

```bash
cd ../frontend
npm install`
```

5.  Start the frontend application:

```bash
npm run dev
```

## How to Use

1.  Register as a new user and check the "Is Admin" checkbox to become an administrator.
2.  Log in with your credentials.
3.  As an admin, access the admin dashboard from the navigation menu.
4.  In the admin dashboard, you can create, update, and delete articles as needed.
5.  Regular users can access articles from the homepage but will not have access to any administrative functions.

## API Documentation

The Article Management System uses a RESTful API to interact with the backend. For API documentation, refer to the `openapi.yaml` file in the `backend` directory.

## Database

The application uses MongoDB as the database to store articles, user information, and other data. The MongoDB connection URI is specified in the `.env` file.

## License

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.

## Contributors

- [Oleksand Lyshchynskyi](https://github.com/heinpen)

Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests.

For any questions or feedback, please contact [sashalischinskiy72@gmail.com](sashalischinskiy72@gmail.com).

Happy managing your articles!

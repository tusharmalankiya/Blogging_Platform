# Blogging Platform

## Overview

This is a fully functional blogging platform built with Node.js, Express, MongoDB, and EJS as the `view engine`. The application allows users to `create`, `edit`, `delete`, and `view` blog posts. 

## Features

- **User Authentication**: Sign up, log in, and manage user sessions.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Responsive Design**: Mobile-friendly and responsive layout.
- **Comments**: Users can add and delete comments on blog posts.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing blog posts and user information.
- **EJS**: Embedded JavaScript templating for rendering views.

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Clone the Repository

```bash
    git clone https://github.com/tusharmalankiya/Blogging_Platform.git
```
```bash
    cd Blogging_platform
```
### Install Dependencies

```bash
    npm install
```
### Configuration
1. Create a .env file in the root directory of the project.

2. Add the following environment variables:
    ```bash 
        MONGO_URI=mongodb://localhost:27017/your-database
        PORT=4000
        JWT_SECRET=mysecret
        TOKEN_AGE=259200
    ```
### Running the Application
Start the application using:
```bash
    node app.js
```

### Usage
- **Sign Up / Log In**: Register a new account or log in with existing credentials.
- **Create a Post**: Navigate to the create post page and fill out the form.
- **View Posts**: Browse the list of blog posts and read individual posts.
- **Edit / Delete Posts**: Edit or delete your own posts from the management page.
- **Comment**: Add and Delete comments to blog posts.
# RadiantPages

## Overview

A fully functional ***blogging platform*** built with Node.js, Express, MongoDB, and EJS as the view engine. This platform enables users to securely register, log in, and manage their accounts using JWT authentication. Users can create, edit, and delete blog posts, as well as add and manage comments. The platform is designed to be responsive and user-friendly, with a clean and modern interface styled with Bootstrap, HTML, CSS, and front-end JavaScript. Enhanced security is provided through password encryption with bcrypt and structured data management using Mongoose ODM.

## Features

- **User Authentication**: Secure registration and login using JWT, with password encryption through hashing and salting.
- **User Profile Management**: Users can update their profiles, reset passwords, and delete their accounts.
- **Blog Management**: Create, read, edit, and delete blog posts with ease.
- **Commenting System**: Users can comment on blogs and delete their own comments.
- **Responsive Design**: The platform is fully responsive, ensuring a seamless experience across devices.
- **Security**: Robust security features, including JWT for authentication and bcrypt for password hashing.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB with Mongoose ODM(Object Data Modeling)
- **Frontend**: EJS(Embedded JavaScript templating for rendering views), Bootstrap, HTML, CSS, JavaScript
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt for password hashing and salting

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### steps

1. Clone the repository:

    ```bash
    git clone https://github.com/tusharmalankiya/RadiantPages.git
    ```
    ```bash
    cd RadiantPages
    ```
2. Install Dependencies:

    ```bash
    npm install
    ```
## Configuration
1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables:
    ```bash 
        MONGO_URI=mongodb://127.0.0.1:27017/radiantpages
        PORT=4000
        JWT_SECRET=mysecret
        TOKEN_AGE=259200
    ```
## Running the Application
Start the application using:
```bash
    node app.js
```

## Usage

- **Sign Up / Log In**: Register a new account or log in with existing credentials.
- **Create a Post**: Navigate to the create post page and fill out the form.
- **View Posts**: Browse the list of blog posts and read individual posts.
- **Edit / Delete Posts**: Edit or delete your own posts from the management page.
- **Comment**: Add comments on blog posts to interact with other users and Delete own comments.
- **Profile Management**: Manage user profile and delete account if neccessary.

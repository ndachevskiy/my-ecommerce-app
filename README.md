# E-commerce API Documentation

## Overview
This E-commerce API provides a comprehensive interface for managing a digital storefront. It allows operations on products, orders, customers, and other related entities, enabling integration into various e-commerce platforms.

## Documentation
Detailed API documentation is available at `/api/v1/docs`. This documentation includes all the available endpoints, their expected inputs, outputs, and behavior.

## Getting Started with the API

### Cloning the Repository
To start using this API locally, first clone the repository to your local machine:

git clone https://github.com/ndachevskiy/my-ecommerce-app.git


### Environment Setup
Create a `.env` file in the root directory of the project. You can copy the format and variables from `.env.example` provided in the repository.

### Local Installation and Running

#### Prerequisites
- Download and install Node.js from [Node.js official page](https://nodejs.org/).

- Install pnpm:

`npm install -g pnpm`

- Install Nx:

`npm install -g nx`

#### Running the project
Navigate to the project directory and start the application:

`cd path/to/my-ecommerce-app`
`pnpm start`


### Running with Docker
You can also run the application using Docker. Navigate to the project directory, then build and run the application using the following commands:

`docker build -t my-ecommerce-app .`
`docker run -p 3000:3000 my-ecommerce-app`


### Running with Docker Compose
Alternatively, you can use Docker Compose to build and run the application. Navigate to the project directory and use the following command:

`docker-compose up --build`


### Authentication
Most endpoints require authentication. Start by logging in with the following credentials to receive an authentication token:

```
{
  "email": "alice@example.com",
  "password": "password123"
}
```

Use the obtained token to make authenticated requests by attaching it to the Authorization header as follows:

`Authorization: Bearer <token>`

This setup guide should help you get started with the E-commerce API on your local machine or using Docker technologies.

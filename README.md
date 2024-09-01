# MMFood E-Commerce Platform

## Overview

MMFood is a comprehensive e-commerce platform that allows users to browse, select, and purchase food products online. This project includes a frontend for user interaction, an admin panel for managing products, a backend API for handling business logic, and a MySQL database for data storage. The project is containerized using Docker and deployed on a Google Cloud VM with Traefik handling HTTPS routing.

## Technologies Used

### Frontend
- **React**: The main user interface is built with React, providing a responsive and dynamic user experience.
- **Vite**: The admin panel is built using Vite, a fast and efficient build tool optimized for modern web development.

### Backend
- **Go (Golang)**: The backend is developed in Go, offering a robust and efficient API for handling requests and interacting with the database.
- **MySQL**: A relational database used for storing user data, product information, and other application data.

### Deployment
- **Docker**: The entire application, including the frontend, admin panel, backend, and database, is containerized using Docker.
- **Docker Compose**: Used to manage multi-container Docker applications, making it easy to deploy and manage the different services.
- **Traefik**: An edge router that provides HTTPS routing for the application, ensuring secure communication over the internet.
- **Google Cloud Platform (GCP)**: The application is deployed on a Virtual Machine (VM) instance on GCP, providing scalability and reliability.

## Project Structure
myanmarfoodpro/
│
├── admin/                    # Admin panel (Vite)
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   │   ├── AddProduct/
│   │   │   │   ├── AddProduct.css
│   │   │   │   ├── AddProduct.jsx
│   │   │   ├── ListProduct/
│   │   │   │   ├── ListProduct.css
│   │   │   │   ├── ListProduct.jsx
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.css
│   │   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.css
│   │   │   │   ├── Sidebar.jsx
│   │   ├── Pages/
│   │   │   ├── Admin/
│   │   │   │   ├── Admin.css
│   │   │   │   ├── Admin.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/                  # Backend (Golang)
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   ├── handlers/
│   │   ├── cart_handlers.go
│   │   ├── product_handlers.go
│   │   ├── productforyou_handler.go
│   │   ├── relatedproduct_handler.go
│   │   └── user_handlers.go
│   ├── middleware/
│   │   └── jwt_middleware.go
│   ├── models/
│   │   └── structs.go
│   ├── upload/
│   │   └── images/
│   │       ├── product_256.png
│   │       ├── product_327.png
│   │       ├── product_578.png
│   │       └── ... (additional image files)
│   ├── Dockerfile
│   ├── go.mod
│   └── schema.sql
│
├── frontend/                 # User-facing frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Asset/
│   │   │   ├── Assets/
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.css
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Footer1.css
│   │   │   │   ├── Footer1.jsx
│   │   │   ├── Items/
│   │   │   ├── LoginSignup/
│   │   │   ├── Navbar/
│   │   │   ├── Pages/
│   │   ├── Context/
│   │   ├── i18n/
│   │   ├── services/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── jest.config.js
│   ├── babel.config.js
│   ├── package.json
│   └── package-lock.json
│
├── docker-compose.yml        # Docker Compose configuration
├── traefik.toml              # Traefik configuration (if used)
├── .env                      # Environment variables (for local development)
└── README.md                 # Project documentation

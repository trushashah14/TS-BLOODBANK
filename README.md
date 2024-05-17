# BloodBank - A Blood Donation Management System

This project is a web application built with ReactJS, Express.js, MongoDB, and Node.js that facilitates blood donation management between donors, organizations (blood banks), and hospitals.

## User Roles and Functionality:

### Donors:
- Register and create a profile.
- View their recent 5 donations.
- Access a detailed donation history, including organizations they've donated to.
- Donate blood to various organizations.

### Organizations:
- Register and create a profile.
- Manage blood inventory (total blood in, blood taken out, and available blood for each blood group).
- View recent blood inflows and outflows.
- Track donor records (including donation history and details).
- Receive blood donations from donors and provide blood to hospitals.

### Hospitals:
- Register and create a profile.
- Request blood from organizations based on blood group requirements.
- View recent blood consumption/requests.
- Track blood obtained from organizations (including details and history).

### Frontend (ReactJS):

- Manages user interfaces for each user type, providing intuitive navigation and data visualization.
- Handles user interactions such as blood d onation requests, hospital blood requests, and inventory management.
- Displays relevant information to each user based on their role (e.g., recent donations, inventory levels, donation history).

### Backend (Express.js, Node.js, MongoDB):

- Provides secure API endpoints for user authentication, data access, and CRUD (create, read, update, delete) operations.
- Validates user input and sanitizes data to prevent vulnerabilities.
- Manages user data, blood inventory, and donation records in a MongoDB database.
- Enforces authorization rules to restrict access based on user roles.

### Local Deployment Steps:

#### 1. Prerequisites:
- Node.js and npm (or yarn) installed on your system.
- Basic understanding of command-line tools.

#### 2. Clone the Repository:
```
git clone https://github.com/trushashah14/bloodbank-project.git
```

#### 3. Install Dependencies:
```
cd bloodbank-project
npm install  # or yarn install
```

#### 4. Set Up Environment Variables:
- Create a .env file in the project root directory.
- Add environment variables for database connection details (MongoDB URI) and any other sensitive information.

#### 5. Start the Development Server:
```
npm start  # or yarn start
```

- This will start both the frontend and backend servers. Navigate to http://localhost:3000 (or the port specified) in your browser to access the application.


### Live Demo:
The live demo of the deployed application can be accessed through the following link
[LIVE_DEMO_URL](https://ts-bloodbank-1.onrender.com/)

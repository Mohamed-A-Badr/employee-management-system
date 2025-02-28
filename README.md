# Employee Management System

## Project Overview

This is a full-stack Employee Management System developed as part of a technical assessment. The application provides comprehensive functionality for managing companies, departments, and employees with a focus on robust features and user-friendly interface.

## Project Status

### Completed Requirements

✅ Backend Models

- [x] User Accounts Model
- [x] Company Model
- [x] Department Model
- [x] Employee Model

✅ Backend Validations & Business Logic

- [x] Field validations
- [x] Email and mobile number format validation
- [x] Automatic calculations for departments and employees
- [x] Cascading management for related records
- [x] Implement comprehensive role-based access control

✅ Frontend Features

- [x] Login Page
- [x] Company Management Pages
  - List Companies
  - View Company Details
- [x] Department Management Pages
  - List Departments
  - View Department Details
- [x] Employee Management Pages
  - List Employees
  - View Employee Details

✅ API Integration

- [x] RESTful API for CRUD operations
- [x] Frontend-Backend data exchange
- [x] Error handling

### Pending/Bonus Requirements

❓ Employee Management Pages

- [ ] Create Employee
- [ ] Edit Employee

❓ Workflow Management

- [ ] Employee Onboarding Workflow
- [ ] Defined Stages and Transitions

❓ Advanced Security

- [ ] Comprehensive Role-Based Access Control
- [ ] Advanced Authentication Mechanisms

❓ Additional Features

- [ ] User Account Management
- [ ] Summary Dashboard
- [ ] Detailed Employee Reports
- [ ] Comprehensive Logging
- [ ] Extensive Testing

## Technology Stack

- **Backend**:
  - Language: Python
  - Framework: Django
- **Frontend**:
  - Language: JavaScript
  - Framework: React
- **State Management**:
- **Styling**:

## Prerequisites

- Python 3.8+
- Node.js 14+
- pip
- npm/yarn

## Setup Instructions

### Backend Setup

1. Navigate to backend directory

```bash
cd backend
```

2. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Run migrations

```bash
python manage.py migrate
```

5. Create superuser account

```bash
python manage.py createsupueruser
```

6. Start development server

```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to frontend directory

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

## API Documentation

Detailed API documentation is available at `/api/swagger` when the backend server is running.

### Key Endpoints

- `/api/v1/companies`: Company management
- `/api/v1/departments`: Department management
- `/api/v1/employees`: Employee management
- `/api/v1/auth/register`: Create new use account
- `/api/v1/auth/login`: Login to user account
- `/api/v1/auth/logout`: logout from the account
- `/api/v1/auth/refresh`: refresh the access token

## Security Considerations

- Basic authentication implemented
- Input validation on both client and server-side
- Protection against common web vulnerabilities

## Future Improvements

- Add more advanced workflow management
- Enhance error logging and monitoring
- Develop more extensive test coverage

## Assumptions & Considerations

- Focused on core functionality within time constraints
- Used standard Django and React patterns
- Prioritized mandatory requirements

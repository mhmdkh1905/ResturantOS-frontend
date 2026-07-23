# 🍽️ RestaurantOS — Frontend

A responsive restaurant management dashboard built with React for managing orders, tables, menu items, inventory, employees, and kitchen operations from one centralized platform.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Application-22c55e?style=for-the-badge)](https://resturant-os-frontend-mu.vercel.app/)
[![Backend Repository](https://img.shields.io/badge/Backend-Repository-181717?style=for-the-badge\&logo=github)](https://github.com/mhmdkh1905/ResturantOS-backend)

---

## Overview

RestaurantOS is a full-stack restaurant management platform designed to simplify daily restaurant operations.

The frontend provides role-based dashboards and management tools for administrators, chefs, waiters, and other restaurant employees. It communicates with the RestaurantOS backend through REST APIs to manage operational data and protected workflows.

The application includes authentication, role-based authorization, order processing, kitchen workflows, table management, inventory tracking, employee management, and analytics.

---

## Key Features

### Authentication and Authorization

* User registration and login
* Protected application routes
* Role-based access control
* Unauthorized-access page
* Automatic redirection for unauthenticated users

### Dashboard

* Restaurant activity overview
* Total-order statistics
* Daily income summary
* Active-order tracking
* Low-stock alerts
* Weekly revenue visualization
* Recent-orders overview

### Order Management

* View and filter restaurant orders
* Search orders by table
* Create orders using menu items
* Add quantities, discounts, and notes
* Update order status
* Follow orders through preparation workflows

### Kitchen Display

* View active kitchen orders
* Display order details for chefs
* Update preparation statuses
* Restrict access to authorized roles

### Menu Management

* Browse menu items by category
* Add, edit, and delete menu items
* Manage prices and availability
* Store images and recipe ingredients

### Table Management

* View restaurant tables in a visual grid
* Track free, reserved, and occupied tables
* Add and delete tables
* Update table capacity
* Change table status

### Inventory Management

* View and search inventory records
* Track stock quantities
* Display low-stock warnings
* Configure stock thresholds
* Store supplier and cost information
* Edit inventory records

### Employee Management

* View employees and assigned roles
* Add, edit, and delete employees
* Restrict employee management to administrators
* Support restaurant roles such as manager, chef, waiter, cashier, and cleaner

### Settings and Appearance

* Light and dark themes
* Language selection
* Centralized design tokens
* Responsive interface
* Sign-out functionality

---

## Role-Based Access

| Page      | Access                  |
| --------- | ----------------------- |
| Dashboard | All authenticated users |
| Orders    | All authenticated users |
| Menu      | Admin and waiter        |
| Kitchen   | Admin and chef          |
| Tables    | Admin and waiter        |
| Inventory | Admin and chef          |
| Employees | Admin only              |
| Settings  | All authenticated users |

Unauthenticated users are redirected to the login page. Authenticated users without the required role are redirected to the unauthorized page.

---

## My Contribution

I contributed to the frontend architecture and implementation of RestaurantOS, including:

* Building responsive management pages and reusable UI components
* Implementing client-side routing and protected routes
* Creating role-based access guards for different employee roles
* Connecting frontend features to backend REST APIs
* Developing order, table, menu, inventory, employee, and kitchen workflows
* Implementing authentication-related interfaces
* Building modals, forms, status controls, and dashboard components
* Supporting dark mode through centralized CSS variables
* Debugging frontend behavior and API integration issues

> Update this section so it describes only the parts you personally implemented.

---

## Technology Stack

| Technology      | Purpose                                  |
| --------------- | ---------------------------------------- |
| React 18        | Component-based user interface           |
| React Router v6 | Navigation and protected routing         |
| Vite            | Development server and production builds |
| CSS Modules     | Component-scoped styling                 |
| Lucide React    | Interface icons                          |
| REST APIs       | Communication with the backend           |

---

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   ├── sidebar/
│   ├── cards/
│   └── modals/
├── pages/
│   ├── dashboard/
│   ├── orders/
│   ├── menu/
│   ├── kitchen/
│   ├── tables/
│   ├── inventory/
│   ├── employees/
│   ├── analytics/
│   ├── settings/
│   ├── login/
│   ├── register/
│   ├── unauthorized/
│   └── notFound/
├── routes/
│   ├── ProtectedRoute.jsx
│   ├── AdminRoute.jsx
│   ├── AdminChefRoute.jsx
│   └── AdminWaiterRoute.jsx
├── hooks/
│   ├── useOrders.js
│   ├── useTables.js
│   └── useMenu.js
├── router/
│   └── router.jsx
└── index.css
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js 18 or newer
* npm
* The RestaurantOS backend API

### Installation

Clone the repository:

```bash
git clone https://github.com/mhmdkh1905/ResturantOS-frontend.git
cd ResturantOS-frontend
```

Install the project dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The application should be available at:

```text
http://localhost:5173
```

---

## Environment Variables

| Variable       | Required | Description                              |
| -------------- | -------: | ---------------------------------------- |
| `VITE_API_URL` |      Yes | Base URL of the RestaurantOS backend API |

Example for local development:

```env
VITE_API_URL=http://localhost:5000/api
```

Do not commit production credentials or private environment values.

---

## Available Scripts

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

---

## Routing Architecture

RestaurantOS uses route-wrapper components to control access.

```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

```jsx
<AdminRoute>
  <Employees />
</AdminRoute>
```

```jsx
<AdminChefRoute>
  <Kitchen />
</AdminChefRoute>
```

```jsx
<AdminWaiterRoute>
  <Tables />
</AdminWaiterRoute>
```

These guards ensure that users can access only the pages permitted for their assigned roles.

---

## Theming

The frontend supports light and dark themes through CSS custom properties.

Dark mode is activated using:

```js
document.documentElement.setAttribute("data-theme", "dark");
```

Light mode is restored using:

```js
document.documentElement.removeAttribute("data-theme");
```

The design system is maintained in `src/index.css`, including:

* Background colors
* Text colors
* Surface colors
* Border styles
* Shadows
* Status colors
* Button styles
* Component spacing

---

## Related Repository

RestaurantOS requires the backend API for authentication, data persistence, and application workflows.

* [RestaurantOS Backend](https://github.com/mhmdkh1905/ResturantOS-backend)

---

## Live Application

* [Open RestaurantOS](https://resturant-os-frontend-mu.vercel.app/)

---

## Future Improvements

* Add automated frontend tests
* Improve loading and error states
* Add more detailed analytics
* Improve accessibility support
* Add multilingual content
* Add real-time order updates
* Expand mobile and tablet optimization

---

## Author

**Mohammad Khateeb**

* [GitHub](https://github.com/mhmdkh1905)
* [LinkedIn](https://www.linkedin.com/in/mohammad-khateeb-891332303)
* [Email](mailto:mhmd52kh@gmail.com)

# 🍽️ RestaurantOS — Frontend

A modern restaurant management system built with **React**, **React Router**, and **CSS Modules**. Manage tables, orders, inventory, employees, and more from a clean, responsive dashboard.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Features](#pages--features)
- [Routing & Auth Guards](#routing--auth-guards)
- [Theming & Dark Mode](#theming--dark-mode)
- [Design System](#design-system)
- [Available Scripts](#available-scripts)

---

## 🛠️ Tech Stack

| Technology      | Purpose                  |
| --------------- | ------------------------ |
| React 18        | UI framework             |
| React Router v6 | Client-side routing      |
| CSS Modules     | Scoped component styling |
| Lucide React    | Icon library             |
| Vite            | Build tool & dev server  |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── rootLayout/         # Main layout with sidebar
│   ├── sidebar/                # Sidebar + NavItem
│   ├── cards/
│   │   ├── tableCard/          # Table status card
│   │   └── orderCard/          # Order card with actions
│   └── modals/
│       ├── addTableModal/
│       ├── addItemModal/
│       ├── addEmployeeModal/
│       └── createOrderModal/
├── pages/
│   ├── dashboard/              # Overview + stats + charts
│   ├── orders/                 # Order management
│   ├── menu/                   # Menu items
│   ├── kitchen/                # Kitchen display
│   ├── tables/                 # Table management
│   ├── inventory/              # Stock tracking
│   ├── employees/              # Staff management
│   ├── analytics/              # Reports & charts
│   ├── settings/               # App preferences
│   ├── login/                  # Auth - Login
│   ├── register/               # Auth - Register
│   ├── unauthorized/           # 403 page
│   └── notFound/               # 404 page
├── routes/
│   ├── ProtectedRoute.jsx      # Requires login
│   ├── AdminRoute.jsx          # Requires admin role
│   ├── AdminChefRoute.jsx      # Requires admin or chef
│   └── AdminWaiterRoute.jsx    # Requires admin or waiter
├── hooks/
│   ├── useOrders.js
│   ├── useTables.js
│   └── useMenu.js
├── router/
│   └── router.jsx
└── index.css                   # Global CSS variables & reset
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/restaurantos-frontend.git
cd restaurantos-frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your values (see Environment Variables below)

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

---

## 🔐 Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_URL=http://localhost:5000/api
```

| Variable       | Description                       |
| -------------- | --------------------------------- |
| `VITE_API_URL` | Base URL of your backend REST API |

---

## 📄 Pages & Features

### 🏠 Dashboard

- Summary stats: Total Orders, Today's Income, Active Orders, Low Stock
- Weekly Revenue bar chart
- Recent Orders list with status badges
- Quick navigation links to key pages

### 📦 Orders

- Live order list with status filtering (Pending / Preparing / Ready)
- Search by table number
- Create new orders via modal (select table, menu items, qty, discount, notes)
- Update order status inline

### 🍕 Menu

- Browse all menu items by category
- Add / edit / delete items
- Each item includes name, price, category, image, recipe ingredients, and availability toggle

### 👨‍🍳 Kitchen

- Kitchen display view for active orders
- Status updates for chefs

### 🪑 Tables

- Visual grid of all tables with status (Free / Reserved / Occupied)
- Add and delete tables
- Edit seat count inline
- Change status via dropdown

### 📊 Inventory

- Full stock list with search
- Low stock warnings with visual progress bars
- Inline row editing
- Add new inventory items with supplier, cost, threshold

### 👥 Employees

- Employee cards with role badges
- Add / edit / delete employees
- Roles: Manager, Chef, Waiter, Cashier, Cleaner

### ⚙️ Settings

- Dark Mode toggle
- Display Language selector
- Sign Out button

### 🔒 Auth Pages

- **Login** — email + password with show/hide toggle
- **Register** — full name, email, role, password with validation

---

## 🔑 Routing & Auth Guards

All protected pages are wrapped in route guard components:

```jsx
// Requires any logged-in user
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Requires admin role only
<AdminRoute>
  <Employees />
</AdminRoute>

// Requires admin or chef
<AdminChefRoute>
  <Kitchen />
</AdminChefRoute>

// Requires admin or waiter
<AdminWaiterRoute>
  <Tables />
</AdminWaiterRoute>
```

| Route        | Guard            | Accessible By       |
| ------------ | ---------------- | ------------------- |
| `/dashboard` | ProtectedRoute   | All logged-in users |
| `/orders`    | ProtectedRoute   | All logged-in users |
| `/menu`      | AdminWaiterRoute | Admin, Waiter       |
| `/kitchen`   | AdminChefRoute   | Admin, Chef         |
| `/tables`    | AdminWaiterRoute | Admin, Waiter       |
| `/inventory` | AdminChefRoute   | Admin, Chef         |
| `/employees` | AdminRoute       | Admin only          |
| `/settings`  | ProtectedRoute   | All logged-in users |

Unauthenticated users are redirected to `/login`. Unauthorized users are redirected to `/unauthorized`.

---

## 🌗 Theming & Dark Mode

The app supports full **dark mode** via a `data-theme="dark"` attribute on `:root`.

To toggle dark mode, set the attribute on the document root:

```js
document.documentElement.setAttribute("data-theme", "dark"); // dark
document.documentElement.removeAttribute("data-theme"); // light
```

All colors are driven by CSS variables defined in `index.css`. Dark mode overrides are scoped under `:root[data-theme="dark"]`.

---

## 🎨 Design System

All design tokens live in `src/index.css` as CSS custom properties.

### Key Variables

```css
/* Accent */
--accent: #f97316;
--accent-hover: #ea6c0a;

/* Page */
--page-bg: #fafafa;
--page-text: #14181e;
--page-text-muted: #6a7281;

/* Surfaces */
--surface: #ffffff;
--surface-2: #f8fafc;

/* Borders & Shadows */
--border: #e5e7eb;
--shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.04);
--shadow-md: 0 10px 24px rgba(0, 0, 0, 0.1);

/* Status Colors */
--status-pending: #f97316;
--status-preparing: #eab308;
--status-ready: #10b981;
--status-served: #64748b;
```

### Component Conventions

- All components use **CSS Modules** (`.module.css`)
- Cards: white background, `1.5px solid #eeeeee` border, `16px` border-radius
- Buttons: `10–11px` border-radius, `600` font-weight
- Modals: max-width `420px`, `#faf9f7` background, `16px` border-radius

---

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint the codebase
npm run lint
```

---

## 📦 Dependencies

```bash
# Core
npm install react react-dom react-router-dom

# Icons
npm install lucide-react

# Build
npm install -D vite @vitejs/plugin-react
```

---

> Built with ❤️ for restaurant operators. Pair with the RestaurantOS backend API for full functionality.
> https://github.com/mhmdkh1905/ResturantOS-backend.git

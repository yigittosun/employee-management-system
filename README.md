# Employee Management System

A web-based Employee Management System built with modern Web Components using LitElement, Vaadin Router, and Redux Toolkit. This project provides an interactive UI to list, add, edit, and delete employee records, with features such as internationalization, responsive design, confirmation dialogs, toast notifications, and comprehensive unit tests with >85% coverage.

## Features

* **Employee Listing**: Table and card views with toggle
* **Pagination**: Dynamic pagination with ellipsis and navigation controls
* **Add/Edit Employee**: Single form for creating and updating records
* **Delete Confirmation**: Modal dialog for delete confirmation
* **State Management**: Redux Toolkit with `localStorage` persistence
* **Internationalization**: English/Turkish support via mixin
* **Notifications**: Toast messages for add/update/delete operations
* **Routing**: Client-side routing with Vaadin Router
* **Unit Testing**: Comprehensive tests using @open-wc/testing and Web Test Runner

## Tech Stack

* **Web Components** with [LitElement](https://lit.dev)
* **State Management** with [Redux Toolkit](https://redux-toolkit.js.org)
* **Routing** with [Vaadin Router](https://vaadin.com/router)
* **Testing** with [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) and [@open-wc/testing](https://open-wc.org)
* **Styling**: CSS Grid, Flexbox, modern CSS features

## Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:yigittosun/employee-management-system.git
   cd employee-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development mode**

   ```bash
   npm run dev
   ```

   Opens a dev server at `localhost:8000` (or specified port) with live reload.

4. **Run tests**

   ```bash
   npm run test
   ```

   Runs Web Test Runner with coverage reporting (thresholds at 85%).

## Project Structure

```
├── index.html   
├── src/
│   ├── layout.js         # MainLayout component
│   ├── router/index.js   # Client-side routing setup
│   ├── pages/
│   │   ├── employee-list-page.js
│   │   └── employee-form-page.js
│   ├── components/
│   │   ├── employee-table.js
│   │   ├── employee-cards.js
│   │   ├── employee-card.js
│   │   ├── employee-form.js
│   │   ├── confirm-dialog.js
│   │   ├── notification-toast.js
│   │   └── app-header.js
│   ├── i18n/
│   │   ├── i18n.js
│   │   └── translations.js
│   └── store/
│       └── index.js      # Redux store with slices
├── test/                 # Unit tests
├── web-test-runner.config.js
├── package.json
└── README.md 
```

## Usage

* **List View**: Navigate to `/` to see employees in table or cards
* **Add Employee**: Click **Add New** or go to `/add`
* **Edit Employee**: Click edit icon on a record or visit `/edit/:id`
* **Delete Employee**: Click delete icon, confirm in dialog

## Internationalization

* Toggle language via flag button in header. Supports English (`en`) and Turkish (`tr`). Translations reside in `src/i18n/translations.js`.

## Styling and Responsiveness

* Uses CSS Grid and Flexbox for layouts
* Table is horizontally scrollable on small screens
* Cards adjust to screen width with `auto-fill` grid

## Testing

* Tests located under `test/` directory
* UI component tests with @open-wc/testing fixtures
* Router integration tests simulate navigation and DOMContentLoaded
* Coverage report generated in `coverage/` folder


## Testing Coverage
<img width="821" height="278" alt="Image" src="https://github.com/user-attachments/assets/52c16508-6f73-4808-8141-b2fbd3c78444" />


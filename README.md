# React User Management Application

This is a responsive single-page application (SPA) for managing user data, built with React. It allows users to view, add, edit, delete, search, sort, and filter user records fetched from the JSONPlaceholder mock API.

## Features

-   **CRUD Operations**: Full Create, Read, Update, and Delete functionality for users.
-   **Search**: Dynamic search across all user fields.
-   **Sort**: Clickable table headers to sort data by any column.
-   **Filter**: A popup modal to apply filters based on first name, last name, email, and department.
-   **Pagination**: Paginated view with selectable limits (10, 25, 50, 100 users per page).
-   **Responsive Design**: The UI adapts to different screen sizes, from mobile to desktop.
-   **Modern Stack**: Built with Create React App, Styled-Components, and modern ES6+ JavaScript.

## Setup and Run Instructions

Follow these steps to get the application running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd user-management-app
    ```

3.  **Install dependencies:**
    This project uses `npm`. Run the following command to install the required packages.
    ```bash
    npm install
    ```

4.  **Start the development server:**
    This will launch the application in your default browser.
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## Assumptions Made

-   **First/Last Name**: The `/users` endpoint from JSONPlaceholder returns a single `name` field. This field has been split into `firstName` and `lastName` to better facilitate the filtering and sorting requirements.
-   **Department**: The user object does not contain a `department` field. I have made the assumption that the `company.name` field can be used to represent the user's department.
-   **Optimistic UI Updates**: For Add, Edit, and Delete operations, the UI is updated *before* waiting for the final API confirmation. This provides a faster user experience, as JSONPlaceholder only simulates these mutations.

## Reflection

### Challenges Faced

-   **State Management**: Managing numerous UI states (search, sort, filter, pagination, modals) alongside the core data state in a single component (`App.js`) was complex. Using `useMemo` was critical to efficiently derive the displayed data without causing unnecessary re-renders.
-   **API Limitations**: The JSONPlaceholder API simulates `POST`, `PUT`, and `DELETE` requests but doesn't actually persist the changes. This required implementing an "optimistic" update strategy where the local state is modified immediately to reflect the user's action.

### Future Improvements

If I had more time, I would consider the following improvements:

-   **Global State Management**: For a larger application, I would move the state management from `App.js` into a more robust solution like **React Context API** or a library like **Redux Toolkit** to avoid prop drilling and better separate concerns.
-   **Debouncing**: The search input triggers a re-render on every keystroke. I would implement debouncing to reduce the number of calculations and improve performance, especially with larger datasets.
-   **Unit & Integration Tests**: I would add tests using a library like **React Testing Library** to ensure components are rendering correctly and that user interactions work as expected.
-   **URL State**: I would sync the application's state (filters, sorting, pagination) with the URL query parameters. This would allow users to share links to specific views of the data.
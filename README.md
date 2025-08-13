# Tech Event Talks App

A simple, single-page web application to display a schedule of talks for a tech event. This project demonstrates a basic client-server architecture using Node.js and Express for the backend, and plain HTML, CSS, and JavaScript for the frontend.

## Features

-   **Dynamic Talk Schedule:** Fetches talk data from a backend and displays it without needing to reload the page.
-   **Client-Server Architecture:** Separates the frontend (what the user sees) from the backend (which serves the data).
-   **Simple API:** Provides a basic API endpoint to serve the event data.

## How It Works

This project is divided into two main parts: the server-side and the client-side.

### 1. Server-Side (`server.js`)

The server is built with **Node.js** and the **Express.js** framework. Its primary responsibilities are:

-   **Serving Static Files**: The `app.use(express.static('public'))` command tells Express to serve the `index.html`, `style.css`, and `script.js` files directly to the browser.
-   **Providing an API**: The `app.get('/api/talks', ...)` route creates an API endpoint. When the client requests this endpoint, the server reads the `talks.json` file from the disk and sends its contents back as a JSON response.

### 2. Client-Side (`public/` directory)

The client-side code runs entirely in the user's browser.

-   **`index.html`**: Provides the basic structure of the webpage.
-   **`css/style.css`**: Contains the styling rules.
-   **`js/script.js`**: This is the brain of the client-side. It makes a `fetch` request to the server's `/api/talks` endpoint. Once it receives the talk data, it dynamically creates the HTML elements for each talk and injects them into the page for the user to see.

### Request/Response Flow

1.  **Initial Request**: A user navigates to the website. The browser requests the root URL (`/`).
2.  **Server Sends HTML**: The Express server responds by sending the `public/index.html` file.
3.  **Browser Requests Assets**: The browser parses the HTML and finds it needs `style.css` and `script.js`, so it requests them from the server.
4.  **Server Sends Assets**: The server sends the requested CSS and JavaScript files.
5.  **Client Fetches Data**: The `script.js` file executes and makes a `GET` request to `/api/talks`.
6.  **Server Responds with Data**: The server reads `talks.json` and sends the data back as a JSON payload.
7.  **Client Renders Data**: The browser receives the JSON data. The `script.js` code then builds the talk schedule and updates the webpage.

## Getting Started

### Prerequisites

-   Node.js and npm must be installed.

### Installation & Running the App

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/javi-vaz/javi-vaz-event-talks-app.git
    cd javi-vaz-event-talks-app
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the server:**
    ```sh
    node server.js
    ```

4.  Open your browser and navigate to `http://localhost:3000`.

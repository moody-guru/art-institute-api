# Art Institute of Chicago Gallery - React Assignment

A React application built with **TypeScript** and **Vite** that displays artwork data from the Art Institute of Chicago API. This project implements server-side pagination and persistent row selection using **PrimeReact**.

## 🚀 Live Demo
**Deployed URL:** [Insert your Cloudflare/Netlify Link Here]

## 🛠️ Tech Stack
* **Framework:** React 18 (Vite)
* **Language:** TypeScript
* **UI Components:** PrimeReact
* **Styling:** PrimeFlex & CSS
* **API:** Art Institute of Chicago Public API

## ✨ Key Features
* **Server-Side Pagination:** Fetches only the required data for the current page (12 rows per page) to optimize performance.
* **Persistent Selection:** Selected rows remain checked even when navigating between different pages, implemented using `dataKey` and state synchronization.
* **Custom Bulk Selection:** A custom overlay panel allowing users to select $N$ number of rows.
* **Zero-Prefetch Logic:** To prevent memory issues and unnecessary API calls, the bulk selection logic strictly operates on already-fetched data as per assignment requirements.
* **Responsive UI:** Fully responsive data table with a dynamic selection counter.

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/moody-guru/art-institute-api.git](https://github.com/moody-guru/art-institute-api.git)
    cd art-institute-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

4.  **Build for Production:**
    ```bash
    npm run build
    ```

## 🛡️ Implementation Details
### Persistent Selection Strategy
The application manages selection state using an array of `Artwork` objects. By providing the `dataKey="id"` prop to the PrimeReact `DataTable`, the component internally tracks which IDs are selected. When a user navigates back to a previously visited page, the component compares the loaded row IDs with the stored selection state to maintain the "checked" status.

### Custom Selection Overlay
The bulk selection feature is triggered by a chevron icon in the table header. It allows selecting multiple rows from the current view without triggering recursive API calls, adhering to the performance constraints of the assignment.

## 👤 Author
* **Pushkar Sahu**
* GitHub: [@moody-guru](https://github.com/moody-guru)
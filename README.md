# AIFAQ User dashboard 

This project is a front-end application built with ReactJS, Vite, and TypeScript. It integrates authentication using Auth0.

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone aifaq_user_dashboard
   cd aifaq_user_dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following Auth0 configuration details:
   ```env
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   ```
   Replace `your-auth0-domain` and `your-auth0-client-id`,  with your Auth0 application details.

### Running the Development Server

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

To build the application for production:
```bash
npm run build
```

### Previewing the Production Build

To preview the production build locally:
```bash
npm run preview
```

## Authentication Configuration

This project uses Auth0 for authentication. Update the `.env` file with your Auth0 credentials as mentioned in the **Installation** section.

For more details on configuring Auth0, refer to [Auth0 Documentation](https://auth0.com/docs).

## Scripts

| Command            | Description                              |
|--------------------|------------------------------------------|
| `npm install`      | Install project dependencies            |
| `npm run dev`      | Start the development server            |
| `npm run build`    | Build the project for production        |
| `npm run preview`  | Preview the production build locally    |

## Backend
Working with the backend and fixing some minor issues .

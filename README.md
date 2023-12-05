# Disney Dashboard

This project focuses on creating a **single-page dashboard** application that allows users to list, search, and explore detailed information about beloved Disney characters. Utilizing the [disneyAPI](https://disneyapi.dev/), this dashboard aims to provide a user-friendly experience for Disney enthusiasts.

## Instalation

To get started, follow these steps:

- **Clone the Repository:** `git clone https://github.com/fozuzip/disney-dashboard.git`
- **Install Dependencies:** `npm install`
- **Run the Project:** `npm run dev`

You can view the project live [here](https://fozuzip.github.io/disney-dashboard/)

## Project Goals

The primary goals for this project include:

- Fulfilling all required user stories.
- Implementing additional functionalities to maximize the potential of what disneyAPI offers.
- Offering an optimized user experience to users interacting with the dashboard.

## Technologies used:

- The project was built using **TypeScript** and **React**.
- I selected **Vite** as the build tool due to its lightweight yet powerful bundling capabilities.
- **Redux**, along with **Redux Toolkit**, was employed for state management. The project leveraged Redux Toolkit Query to handle data fetching and caching efficiently.
- **Tailwind CSS** was utilized for styling purposes.
- **Highcharts** was used for implementing the charts, and the **xlsx** package facilitated the data download into files.

Acknowledging that utilizing **Redux Toolkit** and **Redux Toolkit Query** might deviate from the initial requirement of using **Redux** for state management, I developed an alternative version of the project. This version maintains all functionalities and features of the original ( minus the caching ) using only the `redux` and `react-redux` packages. You can access this version in the `plain-redux` branch of the project.

## Features Overview

Users can:

- **View Data Table:** Access a comprehensive data table featuring characters, including additional columns like Avatar, Number of Films, and Wiki Page links aligned with the API response scheme.
- **Customize Table Columns:** Tailor the table view by selecting preferred columns using the view dropdown menu.
- **Filter Rows:** Apply multiple filters (by name, films, TV shows, and video games) using the convenient "+ filter" button.
- **Navigate Table Pages:** Easily move between table pages and adjust the page size using intuitive controls at the bottom of the table.
- **Detailed Information Modal:** Dive deeper into character details and view enlarged images by clicking on a specific table row.
- **Pie Chart Visualization:** Access Pie charts for each table page, with the option to download chart data as an xlsx file. Choose data representation based on films, TV shows, or video games for each character.
- **Light/Dark Mode Toggle:** Switch between light and dark mode seamlessly to match personal preferences.

## Components and Folder Structure

Considering the project's small scale, I opted against creating a `pages` or `features` folder. Instead, all components reside within the `components` folder, with the App component rendering the page.

Envisioning potential scalability within a more extensive dashboard context, I developed a series of general-purpose, reusable UI components. These components live in the `ui` folder within the `components` directory.

All the components are custom-made and styled with Tailwind. I used Radix-ui's headless primitives to build the Select and Modal components.

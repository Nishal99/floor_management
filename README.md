# Getting Started with Create React App

# Floor Management

## Description

The Floor Management application allows users to manage and visualize floor plans, with the ability to drag and drop tables into rooms, resize them, and export the layout as an image. The app leverages modern web technologies such as React, TypeScript, Redux, Material UI, and React Beautiful DnD.

This project provides a user-friendly interface for managing room layouts, with real-time interaction and persistence of state.

## Features

- **Drag-and-drop functionality:** Organize and move tables within rooms using `react-beautiful-dnd`.
- **Resizable tables:** Tables can be resized dynamically by dragging their edges.
- **Screenshot capability:** Capture the current layout of tables as a PNG image using `html2canvas`.
- **State management:** Redux handles global state for rooms, tables, and their positions.
- **Modern UI components:** Material-UI provides clean, pre-designed UI components.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript to improve code quality and maintainability.
- **Redux**: A state management tool for JavaScript apps.
- **Material UI**: A popular React UI framework for faster and easier UI development.
- **react-beautiful-dnd**: A library for creating drag-and-drop interfaces.
- **html2canvas**: A library that allows for capturing DOM elements as images.

## Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 14 or above) and npm (or Yarn) installed on your system.

### Steps to Run the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nishal99/floor-management.git
   cd floor-management


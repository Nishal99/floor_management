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

## Code Documentation & Best Practices
Component-based structure: The app follows a component-based architecture using React. Each part of the UI is broken into reusable components, such as FloorArea, Room, and Table.
State management with Redux: The application uses Redux to manage the global state of rooms, tables, and their positions. Redux helps centralize and streamline the state management logic, especially as the app scales.
TypeScript for type safety: The codebase uses TypeScript to provide strong typing, reducing runtime errors and improving code clarity. All Redux actions, states, and component props are typed explicitly to ensure predictability.
Material UI for UI components: Material UI components are used throughout the app to provide a consistent and responsive design, following Material Design principles.
Libraries & Tools Used

- 1. React (react & react-dom)
React is the core JavaScript library used for building user interfaces. It allows for component-based development and facilitates a reactive rendering system.

- 2. Material UI (@mui/material)
Material UI provides a suite of customizable components for faster and easier web development, ensuring a polished and responsive design.

- 3. Redux & @reduxjs/toolkit (react-redux, @reduxjs/toolkit)
Redux is used for managing global application state. The @reduxjs/toolkit simplifies Redux setup, providing a more efficient and streamlined API.

- 4. React Beautiful DnD (react-beautiful-dnd)
This library enables intuitive drag-and-drop functionality in React applications. It handles the drag state, item positioning, and animations, ensuring a smooth user experience.

- 5. html2canvas (html2canvas)
This library allows the app to capture the current layout as an image. It renders DOM elements into a canvas element, making it possible to export the floor plan as a PNG image.

- 6. TypeScript (typescript)
TypeScript adds static types to JavaScript, providing type safety and reducing runtime errors, which improves development productivity.

- 7. Formik (formik)
Formik is used to handle form state and validation, simplifying form creation in React.

## Drag-and-Drop Mechanism
The drag-and-drop functionality in this project is powered by react-beautiful-dnd, which offers a highly customizable and intuitive API for handling draggable elements. Here's how it works:

## Key Components:

- DragDropContext: This is the wrapper component that manages the overall drag-and-drop context, including listening for drag events and providing callbacks for handling item movement.
- Droppable: Marks a target area where draggable items (tables) can be dropped. Each room is a Droppable area.
- Draggable: Each table in the room is a Draggable item, meaning it can be moved around the layout.

## Mechanism for Positioning:

- When a table is dragged, the drag-and-drop event is captured by react-beautiful-dnd.
- The new position is calculated by updating the x and y coordinates of the dragged table in the Redux store, which stores the table's position.
- After the drag operation is completed, the application state is updated, causing the UI to re-render with the table in its new position.
- This approach ensures precise control over table placements, with an optimized state management flow through Redux, preventing UI inconsistencies.

## Justification:

- react-beautiful-dnd provides seamless drag-and-drop interactions with minimal configuration.
- By updating Redux state on drag completion, the app ensures that all positions are persisted and the UI remains consistent.
- The drag-and-drop behavior is smooth, and each table's position is accurately tracked in the app, allowing for real-time updates and persistent layout changes.

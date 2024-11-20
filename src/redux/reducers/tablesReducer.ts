import { Table } from '../store';

const initialState: Table[] = [];

const tablesReducer = (state = initialState, action: any): Table[] => {
  switch (action.type) {
    case 'ADD_TABLE':
      return [
        ...state,
        {
          ...action.payload,
          position: action.payload.position || { x: 0, y: 0 },
          width: action.payload.width || 100, // Default width
          height: action.payload.height || 100, // Default height
        },
      ];

    case 'UPDATE_TABLE_POSITION':
      return state.map((table) =>
        table.id === action.payload.id
          ? { ...table, position: action.payload.position }
          : table
      );

    case 'RESIZE_TABLE':
      return state.map((table) =>
        table.id === action.payload.id
          ? { ...table, width: action.payload.size.width, height: action.payload.size.height }
          : table
      );

      case 'ROTATE_TABLE':
        return state.map((table) =>
          table.id === action.payload.id
            ? { ...table, rotation: (table.rotation || 0) + 90 } // Add 90 degrees to current rotation
            : table
        );

    case 'DELETE_TABLE':
      return state.filter((table) => table.id !== action.payload.id);

    default:
      return state;
  }
};

export default tablesReducer;

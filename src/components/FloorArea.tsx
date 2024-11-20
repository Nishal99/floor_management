import React, { useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas'; // Import html2canvas
import { RootState, Table } from '../redux/store';

// Import table and control icons
import { TableImage, MidImage, circleSM, copy, trash, resizerImage } from '../images/imageImports'; // Add the resizer image
import Statistics from './Statistics';

const FloorArea: React.FC = () => {
  const tables = useSelector((state: RootState) => state.tables);
  const dispatch = useDispatch();
  const floorAreaRef = useRef<HTMLDivElement | null>(null); // Reference to the floor area
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false); // Track resizing state
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null); // Track selected table
  const [rooms, setRooms] = useState([{ id: 'room-1', name: 'Room 1', tables: tables }]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('room-1'); // Track selected room

  const handleSaveRoom = async () => {
    if (!floorAreaRef.current) return;

    // Use html2canvas to capture the floor area
    const canvas = await html2canvas(floorAreaRef.current);
    const image = canvas.toDataURL('image/png'); // Convert canvas to image

    // Trigger download
    const link = document.createElement('a');
    link.href = image;
    link.download = `${rooms.find((room) => room.id === selectedRoomId)?.name || 'room'}.png`;
    link.click();
  };

  

  // Handle mouse movement for dragging without grid snapping
  const handleMouseMove = (e: MouseEvent) => {
    if (floorAreaRef.current) {
      const floorAreaRect = floorAreaRef.current.getBoundingClientRect();
      // Calculate the mouse position relative to the floor area (without snapping to grid)
      const offsetX = e.clientX - floorAreaRect.left;
      const offsetY = e.clientY - floorAreaRect.top;

      setMousePosition({ x: offsetX, y: offsetY });
    }
  };

  const handleDragStart = () => {
    window.addEventListener('mousemove', handleMouseMove);
  };

  const handleDragEnd = (result: DropResult) => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (!result.destination) return;

    const { draggableId } = result;
    const draggedTable = tables.find((table) => table.id === draggableId);

    if (draggedTable) {
      // Update table position with the exact mouse position
      dispatch({
        type: 'UPDATE_TABLE_POSITION',
        payload: { id: draggableId, position: mousePosition },
      });
    }
  };

  // Handle rotation of table
  const handleRotate = (id: string) => {
    dispatch({ type: 'ROTATE_TABLE', payload: { id } });
  };

  // Handle duplication of table
  const handleDuplicate = (table: Table) => {
    const newTable = {
      ...table,
      id: `table-${Date.now()}`,
      position: { x: table.position.x + 10, y: table.position.y + 10 }, // Move slightly for duplication
    };
    dispatch({ type: 'ADD_TABLE', payload: newTable });
  };

  // Handle deletion of table
  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TABLE', payload: { id } });
    setSelectedTableId(null); // Deselect the table after deletion
  };

  // Handle resizing of table
  const handleResizeStart = (id: string) => {
    setIsResizing(true);
    const resizeHandler = (e: MouseEvent) => handleResize(e, id);
    window.addEventListener('mousemove', resizeHandler);
    window.addEventListener('mouseup', () => handleResizeEnd(resizeHandler));
  };

  // Perform resize
  const handleResize = (e: MouseEvent, id: string) => {
    const resizedTable = tables.find((table) => table.id === id);
    if (resizedTable && floorAreaRef.current) {
      const newWidth = Math.max(50, e.clientX - resizedTable.position.x);
      const newHeight = Math.max(50, e.clientY - resizedTable.position.y);

      dispatch({
        type: 'RESIZE_TABLE',
        payload: {
          id,
          size: { width: newWidth, height: newHeight },
        },
      });
    }
  };

  // End resizing
  const handleResizeEnd = (resizeHandler: (e: MouseEvent) => void) => {
    setIsResizing(false);
    window.removeEventListener('mousemove', resizeHandler);
    window.removeEventListener('mouseup', () => handleResizeEnd(resizeHandler));
  };
  const handleAddRoom = () => {
    const newRoomId = `room-${rooms.length + 1}`;
    const newRoom = { id: newRoomId, name: `Room ${rooms.length + 1}`, tables: [] };
    setRooms([...rooms, newRoom]);
    setSelectedRoomId(newRoomId); // Select the new room
  };


  

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {rooms.map((room) => (
    <button
      key={room.id}
      onClick={() => setSelectedRoomId(room.id)}
      style={{
        marginRight: '0px',
        padding: '5px 10px',
        cursor: 'pointer',
        backgroundColor: room.id === selectedRoomId ? '#ffffff' : '#ffffff',
        border: '1px solid #fff',
        borderRadius: room.id === selectedRoomId ? '0px' : '5px',
        borderBottom: room.id === selectedRoomId ? '2px solid #bb2e26' : 'none',
      }}
    >
      {room.name}
    </button>
  ))}
</div>


        {/* Add Room Button */}
        <button
  onClick={handleAddRoom}
  style={{
    marginLeft: 'auto',
    marginBottom: '10px',
    background: '#bb2e26',
    color: '#ffffff',
    fontSize: '12px',
    padding: '5px 15px',
    border: '1px solid transparent',
    borderRadius: '5px',
  }}
>
  + Add Room
</button>


        {/* Save Room Button */}
        <button
          style={{
            marginLeft: '10px',
            background: '#ffffff',
            marginBottom: '10px',
            color: '#000000',
            fontSize: '12px',
            padding: '5px 15px',
            border: '1px solid #000000',
            borderRadius: '5px',
          }}
          onClick={handleSaveRoom} // Capture and save screenshot on click
        >
          Save Room
        </button>
      </div>
    
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {tables.length > 0 && (
          <Droppable droppableId="floor">
            {(provided) => (
              <div
                ref={(node) => {
                  floorAreaRef.current = node;
                  provided.innerRef(node);
                }}
                {...provided.droppableProps}
                style={{
                  width: '100%',
                  height: '450px',
                  border: '1px solid #ccc',
                  position: 'relative',
                  backgroundColor: '#f9f9f9',
                  display: 'flex',
                  
                }}
              >
                {tables.map((table) => (
                  <Draggable key={table.id} draggableId={table.id} index={table.position.y}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          width: `${table.width}px`,
                          height: `${table.height}px`,
                          position: 'absolute',
                          top: table.position.y,
                          left: table.position.x,
                          
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                          }}
                          onClick={() => setSelectedTableId(table.id)} // Select the table when clicked
                        >
                          {table.shape === 'square' ? (
                            <img src={TableImage} alt="Table" width="100%" height="100%" />
                          ) : (
                            <img src={MidImage} alt="Mid" width="100%" height="100%" />
                          )}

                          {/* Show options if table is selected */}
                          {selectedTableId === table.id && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '-30px', // Adjust to position above the table
                                right: '-15px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                padding: '5px',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width: '100px',
                              }}
                            >
                              <img
                                src={circleSM}
                                alt="Rotate"
                                style={{ width: '10px', height: '10px', cursor: 'pointer' }}
                                onClick={() => handleRotate(table.id)}
                              />
                              <img
                                src={copy}
                                alt="Duplicate"
                                style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                                onClick={() => handleDuplicate(table)}
                              />
                              <img
                                src={trash}
                                alt="Delete"
                                style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                                onClick={() => handleDelete(table.id)}
                              />
                            </div>
                          )}

                          {/* Resize Handle, only show when table is selected */}
                          {selectedTableId === table.id && (
                            <img
                              src={resizerImage} // Using resizer image here
                              alt="Resize"
                              style={{
                                width: '10px',
                                height: '10px',
                                position: 'absolute',
                                bottom: '5px',
                                right: '5px',
                                cursor: 'se-resize',
                              }}
                              onMouseDown={() => handleResizeStart(table.id)}
                            />
                          )}

                          {/* Show table name at the bottom when selected */}
                          {selectedTableId === table.id && (
                            <div
                              style={{
                                position: 'absolute',
                                bottom: '-20px', // Position name below the table
                                width: '100%',
                                textAlign: 'center',
                                fontSize: '12px',
                                color: '#333',
                              }}
                            >
                              {table.name}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
      <Statistics />
    </div>
  );
};

export default FloorArea;

import React from 'react';
import Sidebar from './components/SideBar'
import FloorArea from './components/FloorArea';


const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '94vh' }}>
      <header style={{ padding: '10px',
    textAlign: 'center',
    background: '#ffffff',
    fontSize: '14px',
    border: '2px solid #f1f1f1',
    fontFamily: 'sans-serif',
    color: '#000000',
    fontWeight: 'bold',}}>
        Floor Management
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <FloorArea />
      </div>
    
    </div>
  );
};

export default App;

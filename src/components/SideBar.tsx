import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Switch, Checkbox, styled } from '@mui/material';

// Import images for table shapes and buttons
import { TableImage, MidImage } from '../images/imageImports';
import { button_reduce, button_increase } from '../images/imageImports';

// Custom styled Switch for colors and size adjustments
const CustomSwitch = styled(Switch)({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#bb2e26', // Ball color when active
    '& + .MuiSwitch-track': {
      backgroundColor: '#f3dfdf', // Track background when active
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#f3dfdf', // Default track background
    borderRadius: '50px', // Rounded track
  },
  '& .MuiSwitch-thumb': {
    width: 20,
    height: 20,
    backgroundColor: '#bb2e26', // Thumb color
  },
});

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const [shape, setShape] = useState<'square' | 'circle'>('square');
  const [name, setName] = useState('');
  const [minCovers, setMinCovers] = useState(1);
  const [maxCovers, setMaxCovers] = useState(4);
  const [isActive, setIsActive] = useState(true);
  const [additionalSettings, setAdditionalSettings] = useState(false); // State for checkbox

  const addTable = () => {
    const id = `table-${Date.now()}`;
    dispatch({
      type: 'ADD_TABLE',
      payload: { id, shape, name, minCovers, maxCovers, isActive, position: { x: 0, y: 0 } },
    });
    setName('');
    setMinCovers(1);
    setMaxCovers(4);
  };

  const incrementMinCovers = () => setMinCovers((prev) => Math.min(prev + 1, maxCovers));
  const decrementMinCovers = () => setMinCovers((prev) => Math.max(prev - 1, 1));
  const incrementMaxCovers = () => setMaxCovers((prev) => Math.max(prev + 1, minCovers));
  const decrementMaxCovers = () => setMaxCovers((prev) => Math.max(prev - 1, minCovers));

  return (
    <div style={{ width: '20%', fontSize: '12px', fontWeight: 'normal' , fontFamily: ' "Roboto", sans-serif', padding: '10px', borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '0px', }}>Table Options</h3>
      <p style={{ textAlign: 'center', marginBottom: '20px', marginTop: '0px', }}>Drag and drop your table</p>

      {/* Table Shape Selection using Images */}
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}>
        <div
          onClick={() => setShape('square')}
          style={{
            cursor: 'pointer',
            border: shape === 'square' ? '1px dashed #bb2e26' : '2px solid transparent',
            backgroundColor: shape === 'square' ? '#f3dfdf' : 'transparent',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <img src={TableImage} alt="Square Table" width="50px" height="50px" />
        </div>

        <div
          onClick={() => setShape('circle')}
          style={{
            cursor: 'pointer',
            border: shape === 'circle' ? '1px dashed #bb2e26' : '2px solid transparent',
            backgroundColor: shape === 'circle' ? '#f3dfdf' : 'transparent',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <img src={MidImage} alt="Circle Table" width="50px" height="50px" />
        </div>
      </div>

      <hr style={{ border: '1px solid rgb(241, 241, 241)', margin: '0px 0' }} />
      <h3 style={{ textAlign: 'center' }}>Table Details</h3>

      {/* Table Name Input */}
      <div style={{ fontWeight: 'normal' ,  display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <label style={{ fontWeight: 'normal' ,  flex: '1',  marginRight: '10px' }}>Table Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: '1',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
          }}
        />
      </div>

      {/* Min Covers */}
      <div style={{ fontWeight: 'normal' ,  display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <label style={{ fontWeight: 'normal' , flex: '1',  marginRight: '10px' }}>Min Covers:</label>
        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <img
            src={button_reduce}
            alt="Decrease Min Covers"
            onClick={decrementMinCovers}
            style={{ cursor: 'pointer', marginRight: '5px' }}
          />
          <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{minCovers}</span>
          <img
            src={button_increase}
            alt="Increase Min Covers"
            onClick={incrementMinCovers}
            style={{ cursor: 'pointer', marginLeft: '5px' }}
          />
        </div>
      </div>

      {/* Max Covers */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <label style={{ fontWeight: 'normal' ,  flex: '1',  marginRight: '10px' }}>Max Covers:</label>
        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <img
            src={button_reduce}
            alt="Decrease Max Covers"
            onClick={decrementMaxCovers}
            style={{ cursor: 'pointer', marginRight: '5px' }}
          />
          <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{maxCovers}</span>
          <img
            src={button_increase}
            alt="Increase Max Covers"
            onClick={incrementMaxCovers}
            style={{ cursor: 'pointer', marginLeft: '5px' }}
          />
        </div>
      </div>

      {/* Status Switch */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ flex: '1', fontWeight: 'bold' }}>Status:</span>
        <span style={{ fontWeight: 'bold', color: isActive ? '#bb2e26' : '#777', marginRight: '10px' }}>
          {isActive ? 'Active' : 'Hide'}
        </span>
        <CustomSwitch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
      </div>
      {/* Add Table Button */}
      <Button style={{ backgroundColor: '#bb2e26' }} variant="contained" color="primary" onClick={addTable}>
        Add Table
      </Button>

      <hr style={{ border: '1px solid rgb(241, 241, 241)', margin: '20px 0' }} />

      {/* Additional Settings */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' , justifyContent: 'space-between'}}>
        
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Additional Settings</span>
        <Checkbox
          checked={additionalSettings}
          onChange={(e) => setAdditionalSettings(e.target.checked)}
          style={{ color: '#bb2e26' }}
        />
      </div>

      {additionalSettings && (
        <div style={{ marginBottom: '15px', padding: '10px', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <p style={{ fontStyle: 'italic', color: '#777' }}>Placeholder for additional settings...</p>
        </div>
      )}

      
    </div>
  );
};

export default Sidebar;

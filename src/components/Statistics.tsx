import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Import images for statistics
import { table, people, world } from '../images/imageImports'; // Ensure correct image paths

const Statistics: React.FC = () => {
  const tables = useSelector((state: RootState) => state.tables);

  // Calculate statistics with a fallback value of 0 for optional properties
  const totalTables = tables.length;
  const totalMainCovers = tables.reduce(
    (sum, table) => sum + (table.minCovers || 0), // Default to 0 if minCovers is undefined
    0
  );
  const totalMaxCovers = tables.reduce(
    (sum, table) => sum + (table.maxCovers || 0), // Default to 0 if maxCovers is undefined
    0
  );
  const onlineCapacity = totalMainCovers; // Online Capacity equals the total main covers

  return (
    <div style={styles.outerContainer}>
      <div style={styles.statisticsContainer}>
        <div style={styles.statItems}>
          {/* Total Tables Stat */}
          <div style={styles.statItemContainer}>
            <img src={table} alt="Total Tables" style={styles.statImage} />
            <p style={styles.statItem}>Tables: {totalTables}</p>
          </div>

          {/* Main Covers Stat */}
          <div style={styles.statItemContainer}>
            <img src={people} alt="Main Covers" style={styles.statImage} />
            <p style={styles.statItem}>Main Covers: {totalMainCovers}</p>
          </div>

          {/* Max Covers Stat */}
          <div style={styles.statItemContainer}>
            <img src={people} alt="Max Covers" style={styles.statImage} />
            <p style={styles.statItem}>Max Covers: {totalMaxCovers}</p>
          </div>

          {/* Online Capacity Stat */}
          <div style={styles.statItemContainer}>
            <img src={world} alt="Online Capacity" style={styles.statImage} />
            <p style={styles.statItem}>Online Capacity: {onlineCapacity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the statistics component
const styles = {
  outerContainer: {
    backgroundColor: '#fff', // Outer div with white background
    padding: '20px', // Padding around the stats container
    borderRadius: '8px', // Rounded corners for the outer container
    display: 'flex', // Flexbox layout
    justifyContent: 'center',
    fontFamily: ' "Roboto", sans-serif'
  },
  statisticsContainer: {
    backgroundColor: '#000', // Black background for the stats container
    padding: '0px 20px', // Padding for the inner container
    borderRadius: '8px', // Rounded corners for the inner container
    width: '80%', // Full width of the parent container
    textAlign: 'center' as 'center', // Explicitly set textAlign to 'center'
    display: 'flex', // Flexbox layout
    justifyContent: 'center', // Center the items horizontally
    fontFamily: ' "Roboto", sans-serif'
  },
  statItems: {
    display: 'flex',
    alignItems: 'center', // Ensure stats are aligned inline
    justifyContent: 'center', // Ensure stats are centered inline
  },
  statItemContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 15px', // Add space between the stats
  },
  statImage: {
    width: '20px', // Adjust image size as needed
    height: '20px',
    marginRight: '8px', // Space between image and text
  },
  statItem: {
    color: '#fff', // White text color
    fontSize: '12px', // Font size set to 12px as requested
    fontWeight: 'normal',
    textAlign: 'center' as 'center', // Explicitly set textAlign to 'center'
  },
};

export default Statistics;

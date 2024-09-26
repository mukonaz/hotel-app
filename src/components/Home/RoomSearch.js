import React from 'react';

const RoomSearch = () => {
  return (
    <div style={searchStyle}>
      <h2>Find Your Room</h2>
      <form>
        <input type="date" placeholder="Check-in" required />
        <input type="date" placeholder="Check-out" required />
        <input type="number" placeholder="Price Range" min="0" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

const searchStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

export default RoomSearch;

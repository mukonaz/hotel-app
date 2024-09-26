import React from 'react';
import NavBar from './Home/NavBar';
import Slideshow from './Home/Slideshow';
import RoomSearch from './Home/RoomSearch';
import RoomCard from './Home/RoomCard'; // Assuming you have a list of rooms

const rooms = [
  { id: 1, name: "Deluxe Room", image: "https://example.com/deluxe.jpg" },
  { id: 2, name: "Executive Room", image: "https://example.com/executive.jpg" },
  // More rooms...
];

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Slideshow />
      <RoomSearch />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </>
  );
};

export default HomePage;

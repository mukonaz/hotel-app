import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { storage } from '../../firebase'; // Adjust the path if needed
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Slideshow = () => {
  const [images, setImages] = useState([
    "", // Placeholder for uploaded images
    "https://example.com/room2.jpg",
    "https://example.com/room3.jpg",
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    // Update images state to include the newly uploaded image URL
    setImages((prevImages) => [...prevImages, downloadURL]);
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <Slider {...settings}>
        {images.map((img, idx) => (
          img && ( // Only display images that have valid URLs
            <div key={idx}>
              <img src={img} alt={`Room ${idx}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            </div>
          )
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;

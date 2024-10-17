import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Slideshow = () => {
  const [images, setImages] = useState([
    "",
    "https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/fernando-alvarez-rodriguez-M7GddPqJowg-unsplash.jpg?alt=media&token=d58b9b77-073e-412c-9e64-929ba115dc3c",
    "https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/jason-briscoe-76-58HpxvpQ-unsplash.jpg?alt=media&token=f663ce47-7bee-4359-88c4-9ac9935c0859",
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
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

    
    setImages((prevImages) => [...prevImages, downloadURL]);
  };

  return (
    <div className="relative">
      <Slider {...settings} style={{ height: '600px' }}>
        {images.map((img, idx) => (
          img && (
            <div key={idx} style={{ height: '600px' }}> 
              <img 
                src={img} 
                alt={`Room ${idx}`} 
                className="w-full h-full object-cover" 
                style={{ height: '600px', width: '1900px' }}
              />
            </div>
          )
        ))}
      </Slider>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold">Discover Extraordinary Comfort in Hotels</h1>
      </div>
    </div>
  );
};

export default Slideshow;

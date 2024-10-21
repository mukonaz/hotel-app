import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Giggle Resort</h1>
          <p className="text-lg">
            Experience luxury, comfort, and unforgettable moments with us.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-gray-700 mb-8">
            Giggle Resort is a premier destination for travelers seeking a luxurious stay in a serene and welcoming environment. Nestled in the heart of nature, our hotel offers stunning views, exquisite dining, and a range of amenities to make your stay memorable. Whether you're here for a relaxing getaway, a family vacation, or a business trip, we strive to provide the highest level of comfort and service.
          </p>
          <div className="flex justify-center">
            <div className="w-1/2">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/665d6e20c8d590035eff1b4b_room-main-01.jpg?alt=media&token=05c01aad-4192-4293-a257-9b861673ccca" 
                alt="Hotel Lobby" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/665d6f801f8b12758a5689ae_room-main-06.jpg?alt=media&token=705f38cb-ed16-4b14-a50c-8f6bc39c1cc8" 
              alt="Room View" 
              className="rounded-lg object-cover w-full h-64"
            />
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/6662c6f38aca5e65dd0c474e_room-thumb-07.jpg?alt=media&token=80a9382d-fe43-4256-9e94-81e7c7cc89c7" 
              alt="Swimming Pool" 
              className="rounded-lg object-cover w-full h-64"
            />
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/6662c6f3dea3ba56407c0889_room-thumb-03%20(1).jpg?alt=media&token=731645e8-a552-47d3-8e18-2e0cf1d8ec7a" 
              alt="Restaurant" 
              className="rounded-lg object-cover w-full h-64"
            />
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/b2bd0189-8b6b-4d44-b7a9-ddb19290d688.jpg?alt=media&token=ffea35e9-da64-4f66-a2f0-329ccab9ee7a" 
              alt="Bar Lounge" 
              className="rounded-lg object-cover w-full h-64"
            />
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/design-hotel-bedroom-2021-04-06-00-00-47-utc.jpg?alt=media&token=1681583f-f0ed-4400-9ff3-969259ada2a9" 
              alt="Luxury Suite" 
              className="rounded-lg object-cover w-full h-64"
            />
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/hotel-app-688af.appspot.com/o/fernando-alvarez-rodriguez-M7GddPqJowg-unsplash.jpg?alt=media&token=d58b9b77-073e-412c-9e64-929ba115dc3c" 
              alt="Spa Center" 
              className="rounded-lg object-cover w-full h-64"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Luxury Rooms</h3>
              <p className="text-gray-700">
                Spacious, comfortable, and elegantly designed rooms equipped with modern amenities.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Exquisite Dining</h3>
              <p className="text-gray-700">
                Indulge in a variety of local and international cuisines prepared by top chefs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">World-Class Facilities</h3>
              <p className="text-gray-700">
                Enjoy our spa, gym, pool, and other exclusive facilities during your stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="mb-4">Address: 123 Resort Avenue, Oceanview City, Country</p>
          <p className="mb-4">Phone: +123 456 7890</p>
          <p className="mb-4">Email: info@giggleresort.com</p>
          <p className="text-sm">Follow us on social media for the latest updates and offers.</p>
          <div className="flex justify-center mt-4 space-x-6">
            <a href="#" className="text-white hover:text-gold">Facebook</a>
            <a href="#" className="text-white hover:text-gold">Twitter</a>
            <a href="#" className="text-white hover:text-gold">Instagram</a>
            <a href="#" className="text-white hover:text-gold">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

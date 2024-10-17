import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const Form = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const auth = getAuth();
  const firestore = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let avatarUrl = '';
      if (avatar) {
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, avatar);
        avatarUrl = await getDownloadURL(avatarRef);
      }

      await updateProfile(user, {
        displayName: userName,
        photoURL: avatarUrl,
      });


      await setDoc(doc(firestore, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: userName,
        photoURL: avatarUrl,
      });

      console.log('User registered successfully');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    }
  };

  return (
    <div className="">
      <section className="rounded-md p-2 bg-white">
        <div className="flex items-center justify-center my-3">
          <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-2xl font-bold leading-tight">
              Sign up to create account
            </h2>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="space-y-4">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    User Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-white py-2 rounded-md"
                >
                  Create Account
                </button>
                <p>Have an account? <Link to="/login" >Login..</Link>  </p>
              </div>
            </form>
            {error && <p className="text-red-500 mt-3">{error}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;

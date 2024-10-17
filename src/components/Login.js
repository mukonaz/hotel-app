import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home'); 
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

    return (
    <div className="bg-slate-300 flex flex-col items-center justify-center h-screen ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            placeholder="Email address"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          value={email} onChange={(e) => setEmail(e.target.value)} type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="PassWord"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            
          />
          <div className="flex items-center justify-between flex-wrap">
        
            <p className="text-white mt-4">
              <a
                className="text-sm text-blue-500 -200 hover:underline mt-4"
                href="/register"
              >
                <p>Don't have an account? <Link to="/register" >Sign Up</Link>  </p>
              </a>
            </p>
          </div>
          <button
            className="bg-gold to-gold-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gold-600 hover:to-gold-600 transition ease-in-out duration-150"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

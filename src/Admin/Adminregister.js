import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore

const AdminRegister = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle file upload and convert to base64
    const handlePictureUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPicture(reader.result); // Base64-encoded image
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                name,
                surname,
                email,
                role: 'admin',
                picture, 
            });

            navigate('/admin-login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <section className="rounded-md p-2 bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center my-3">
                        <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <div className="mb-2" />
                            <h2 className="text-2xl font-bold leading-tight">
                                Sign up to create account
                            </h2>
                            <p className="mt-2 text-base text-gray-600">
                                Don't have an account? <Link to="/admin-login">Sign Up</Link>
                            </p>
                            <div className="mt-5 space-y-4">
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        User Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="First Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            type="text"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="user_name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Surname
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Surname"
                                            value={surname}
                                            onChange={(e) => setSurname(e.target.value)}
                                            required
                                            type="text"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="surname"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            type="email"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            type="password"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="password"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <label className="text-base font-medium text-gray-900">
                                            Profile Picture
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="file-input w-full max-w-xs"
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePictureUpload}
                                            required
                                            name="avatar"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        type="submit"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AdminRegister;

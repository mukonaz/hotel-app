import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; 

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role !== 'admin') {
          navigate('/'); 
        }
      } else if (!loading) {
        navigate('/login'); 
      }
    };

    checkAdmin();
  }, [user, loading, navigate]);

  return user ? children : null; 
};

export default ProtectedRoute;

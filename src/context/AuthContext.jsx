import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebase/config';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Register user in backend
  const registerUserInBackend = async (firebaseUser, provider) => {
    try {
      const token = await firebaseUser.getIdToken();
      const response = await axios.post(`${API_URL}/auth/register`, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email,
        photoURL: firebaseUser.photoURL || '',
        provider
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUserRole(response.data.user.role);
      return response.data.user;
    } catch (error) {
      console.error('Backend registration error:', error);
    }
  };

  // Email/Password Registration
  const register = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    await registerUserInBackend(userCredential.user, 'email');
    return userCredential;
  };

  // Email/Password Login
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await registerUserInBackend(userCredential.user, 'email');
    return userCredential;
  };

  // Google Login
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await registerUserInBackend(result.user, 'google');
    return result;
  };

  // GitHub Login
  const loginWithGithub = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    await registerUserInBackend(result.user, 'github');
    return result;
  };

  // Logout
  const logout = () => {
    setUserRole(null);
    return signOut(auth);
  };

  // Get auth token
  const getAuthToken = async () => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserRole(response.data.role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userRole,
    register,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout,
    getAuthToken,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


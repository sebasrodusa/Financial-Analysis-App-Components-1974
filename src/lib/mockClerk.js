import React from 'react';

// Mock Clerk Authentication
const mockUser = {
  id: 'user_mock123',
  firstName: 'John',
  lastName: 'Doe',
  primaryEmailAddress: {
    emailAddress: 'john.doe@example.com'
  },
  imageUrl: 'https://via.placeholder.com/150'
};

export const useUser = () => {
  return {
    isSignedIn: true,
    user: mockUser,
    isLoaded: true
  };
};

// Simple avatar component without JSX
export const UserButton = () => {
  return React.createElement('img', {
    src: mockUser.imageUrl,
    alt: 'User',
    className: 'w-10 h-10 rounded-full cursor-pointer'
  });
};

export const SignIn = () => null;
export const SignUp = () => null;
export const ClerkProvider = ({ children }) => children;
export const SignedIn = ({ children }) => children;
export const SignedOut = () => null;
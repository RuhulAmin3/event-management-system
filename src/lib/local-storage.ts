"use client";
const USER_KEY = 'eventhub_user';

// User management
export const getCurrentUser = (): string => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) {
    const userId = `user_${Date.now()}`;
    localStorage.setItem(USER_KEY, userId);
    return userId;
  }
  return user;
};




 


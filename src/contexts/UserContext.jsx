// src/contexts/UserContext.js
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 현재 로그인한 사용자 정보

  // 세션에 저장된 userId로 유저 정보 불러오기
  useEffect(() => {
    const storedId = sessionStorage.getItem("userId");
    if (storedId) {
      fetch(`http://localhost:4000/users/${storedId}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("유저 정보 불러오기 실패", err));
    }
  }, []);

  // 로그인 함수 (email + password)
  const login = async (email, password) => {
    try {
      const res = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`);
      const data = await res.json();
      if (data.length === 1) {
        const user = data[0];
        sessionStorage.setItem("userId", user.id);
        setUser(user);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("로그인 실패", err);
      return false;
    }
  };

  // 로그아웃 함수
  const logout = () => {
    sessionStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 유저 로드 함수
  const loadUser = async (id) => {
    try {
      const res = await fetch(`https://reactfinalexamproject01.onrender.com/${id}`);
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("유저 정보 불러오기 실패", err);
    }
  };

  // 로그인 함수 (email과 password로 로그인)
  const login = async (email, password) => {
    try {
      const res = await fetch(
        `https://reactfinalexamproject01.onrender.com/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length === 1) {
        const user = data[0];
        sessionStorage.setItem("userId", user.id); // 저장
        await loadUser(user.id); // 상태 저장
        return true;
      }
      return false;
    } catch (err) {
      console.error("로그인 실패", err);
      return false;
    }
  };

  // 로그아웃
  const logout = () => {
    sessionStorage.removeItem("userId");
    setUser(null);
  };

  // 새로고침 시 userId가 있으면 자동 로그인 처리
  useEffect(() => {
    const storedId = sessionStorage.getItem("userId");
    if (storedId) {
      loadUser(storedId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

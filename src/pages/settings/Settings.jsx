import React from 'react'
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate()
  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login')
  };

  return (
    <div>
      <h1>Settings</h1>
    <button onClick={logout}>logout</button>
    </div>
  )
}

export default Settings
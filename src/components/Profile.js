import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.username);

      axios.get('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });
    }
  }, []);

  return (
    <div>
      {user ? <h1>Welcome, {user}</h1> : <h1>Please log in</h1>}
    </div>
  );
};

export default Profile;

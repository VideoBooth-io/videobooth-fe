import React from 'react';
import NavAndHeader from '../components/nav/NavAndHeader';
import UserVideosList from '../components/user/UserVideosList';

const UserVideos = () => (
  <NavAndHeader>
    <div className="my-videos">
      <h1>My Videos</h1>
      <UserVideosList />
    </div>
  </NavAndHeader>
);

export default UserVideos;

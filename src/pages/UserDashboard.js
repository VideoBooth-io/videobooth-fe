import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavAndHeader from '../components/nav/NavAndHeader';
import TeamList from '../components/user/UserTeamsList';
import Carousel from '../components/shared/Carousel';
import UserVideosCard from '../components/user/UserVideosCard';

import { fetchUserVideos } from '../redux/actions/userActions';
import { clearError } from '../redux/actions/teamActions';

function UserDashboard({
  id, fetchVideos, clearTeamError, videos,
}) {
  useEffect(() => {
    clearTeamError();
    fetchVideos(id);
  }, [id, fetchUserVideos]);

  return (
    <NavAndHeader>
      <div className="user-dashboard dashboard">
        <h1>Dashboard</h1>
        <TeamList />
        <div className="dashboard-header">
          <h2>My&nbsp;Videos</h2>
        </div>
        <Carousel component={UserVideosCard} data={videos} name="videos" />
      </div>
    </NavAndHeader>
  );
}

const mapStateToProps = (state) => ({
  username: state.User.username,
  videos: state.User.videos,
  id: state.User.userId,
});

UserDashboard.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  clearTeamError: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps,
  {
    fetchVideos: fetchUserVideos,
    clearTeamError: clearError,
  })(UserDashboard);

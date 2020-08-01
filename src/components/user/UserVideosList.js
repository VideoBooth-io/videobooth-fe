import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { fetchUserVideos } from '../../redux/actions/userActions';

// Components
import UserVideosCard from './UserVideosCard';

function UserVideos({ fetchVideos, id, videos }) {
  useEffect(() => {
    fetchVideos(id);
  }, [id, fetchVideos]);

  return (
    <div className="user-videos-list">
      {videos.map((video) => <UserVideosCard key={video.id} data={video} />)}
    </div>
  );
}

const mapStateToProps = (state) => ({
  videos: state.User.videos,
  id: state.User.userId,
});

UserVideos.propTypes = {
  id: PropTypes.number.isRequired,
  fetchVideos: PropTypes.func.isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, { fetchVideos: fetchUserVideos })(UserVideos);

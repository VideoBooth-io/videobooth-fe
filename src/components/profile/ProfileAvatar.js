import React from 'react';
import { connect } from 'react-redux';
import Upload from './Upload';

function ProfileAvatar() {
  return (
    <div className="avatar-wrapper">
      <Upload />
    </div>
  );
}

const mapStateToProps = (state) => ({
  avatar: state.User.avatar,
});

export default connect(mapStateToProps, {})(ProfileAvatar);

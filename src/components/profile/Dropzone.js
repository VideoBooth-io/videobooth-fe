import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Avatar, Button } from 'antd';
import { connect } from 'react-redux';

const Dropzone = ({ disabled, avatar, fileAdded }) => {
  const [hightlight, setHighlight] = useState(false);
  const fileInputRef = React.createRef();

  const fileListToArray = (list) => {
    const array = [];

    for (let i = 0; i < list.length; i += 1) {
      array.push(list.item(i));
    }
    array[0].path = URL.createObjectURL(list[0]);
    return array;
  };

  const onFileAdded = (evt) => {
    if (disabled) return;
    const { files } = evt.target;
    if (fileAdded) {
      const array = fileListToArray(files);
      fileAdded(array);
    }
  };

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = (event) => {
    event.preventDefault();

    if (disabled) return;

    const { files } = event.dataTransfer;
    if (fileAdded) {
      const array = fileListToArray(files);
      fileAdded(array);
    }
    setHighlight(false);
  };

  return (
    <div className="dropzone-component">
      <Avatar alt="user avatar" size={216} className="user-avatar" src={`${process.env.REACT_APP_S3_STORAGE_PATH}${avatar}`} />
      <Icon
        type="cloud-upload"
        className={`Dropzone ${hightlight ? 'Highlight' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={openFileDialog}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      />
      <input
        ref={fileInputRef}
        className="FileInput"
        type="file"
        multiple
        onChange={onFileAdded}
      />
      <Button onClick={openFileDialog}>
        <span>Change profile picture</span>
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  avatar: state.User.avatar,
});

Dropzone.propTypes = {
  disabled: PropTypes.bool,
  avatar: PropTypes.string.isRequired,
  fileAdded: PropTypes.func.isRequired,
};

Dropzone.defaultProps = {
  disabled: null,
};

export default connect(mapStateToProps, {})(Dropzone);

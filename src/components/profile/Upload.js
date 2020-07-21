import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Modal, Button, Alert,
} from 'antd';
import { connect } from 'react-redux';
import Dropzone from './Dropzone';
import Progress from './Progress';
import { updateUProfilePicture, clearPhotoUpload } from '../../redux/actions/userActions';

const Upload = ({
  updatePicture, userId, imageUpload, clearPhoto,
}) => {
  const [file, setFile] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fileAdded = (newFile) => {
    setFile(newFile[0]);
    setShowModal(true);
  };

  const renderProgress = () => {
    if (imageUpload.isUploading || imageUpload.progress === 100) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={imageUpload.progress ? imageUpload.progress : 0} />
          <Icon
            type="check-circle"
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity: imageUpload.progress && imageUpload.progress === 100 ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
    return null;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setFile({});
    clearPhoto();
  };

  const sendRequest = () => {
    const formData = new FormData();
    formData.append('photo', file, file.name);

    updatePicture(userId, formData);
  };

  const handleOk = () => {
    if (imageUpload.progress === 100) {
      toggleModal();
    } else {
      sendRequest(file);
    }
  };

  return (
    <div className="Upload">
      <div className="Content">
        <Dropzone
          fileAdded={fileAdded}
        />
      </div>
      <Modal
        className="upload-modal"
        title="Upload Profile Picture"
        visible={showModal}
        onOk={handleOk}
        onCancel={toggleModal}
        footer={[
          <Button key="submit" type="primary" loading={imageUpload.isUploading} onClick={handleOk}>
            {imageUpload.progress === 100 ? 'Done' : 'Upload'}
          </Button>,
        ]}
      >
        {imageUpload.error ? <Alert message={imageUpload.error} type="error" /> : null}
        <div className="Files">
          {file ? (
            <div key={file.name} className="Row">
              <img alt="selected file" src={file.path} />
              <span className="Filename">{file.name}</span>
              {renderProgress(file)}
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.User.userId,
  imageUpload: state.User.imageUpload,
});

const mapActionsToProps = {
  updatePicture: updateUProfilePicture,
  clearPhoto: clearPhotoUpload,
};

Upload.propTypes = {
  updatePicture: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  clearPhoto: PropTypes.func.isRequired,
  imageUpload: PropTypes.shape({
    isUploading: PropTypes.bool.isRequired,
    progress: PropTypes.number.isRequired,
    error: PropTypes.string,
  }),
};

Upload.defaultProps = {
  imageUpload: PropTypes.shape({
    error: null,
  }),
};

export default connect(mapStateToProps, mapActionsToProps)(Upload);

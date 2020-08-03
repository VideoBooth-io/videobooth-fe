import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import { Button } from 'antd';

const DownloadVideo = ({ videoUrl }) => {
  const downloadRef = useRef(null);

  function download() {
    downloadRef.current.click();
  }

  return (
    <>
      <a ref={downloadRef} href={videoUrl} download="alpacavid.webm" hidden>
        Download Video
      </a>
      <Button onClick={download} style={{ margin: '8px' }} icon="download">
        <span>Download Video</span>
      </Button>
    </>
  );
};

const mapStateToProps = (state) => ({
  videoUrl: state.User.videoStream.stream,
});

DownloadVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(DownloadVideo);

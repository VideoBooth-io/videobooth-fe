import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input } from 'antd';
import CopyClipboard from '../utils/CopyClipboard.js';

const InviteModal = (props) => {
  const baseURL = process.env.REACT_APP_FRONT_END_URL || 'https://www.alpacavids.com/';
  const URL = baseURL.concat('invite/', props.inviteCode);

  const handleOk = (e) => {
    e.preventDefault();
    props.setVisibility(false);
    CopyClipboard('team-link');
  };

  function handleCancel() {
    props.setVisibility(false);
  }

  return (
    <Modal
      title="Team Invitation Link"
      visible={props.isVisible}
      okText="Copy"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label="Copy Link">
          <Input readOnly id="team-link" value={URL} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  inviteCode: state.Team.inviteCode,
});

export default connect(mapStateToProps)(InviteModal);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Collapse, Alert } from 'antd';

import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import { updateUserData, getUserData } from '../../redux/actions/userActions';

const { Panel } = Collapse;

function ProfileForm(props) {
  const { id, updateUserData, getUserData } = props;
  const [formError, setFormError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [activePanel, setActivePanel] = useState('1');

  useEffect(() => {
    getUserData(id);
  }, [isSaved, getUserData, id]);

  const handleSubmit = (e, formSchema, changes) => {
    e.preventDefault();
    formSchema
      .validate(changes, { abortEarly: true })
      .then(() => {
        updateUserData(id, changes);
        setIsSaved(!isSaved);
        setFormError(null);
      })
      .catch((validationError) => {
        setFormError(validationError.errors);
      });
  };

  const onCancel = () => {
    setFormError(null);
  };

  return (
    <div className="profile-information">
      <h1>Edit Profile</h1>
      <div className="form-container">
        <Collapse
          activeKey={activePanel}
          defaultActiveKey={[activePanel]}
          accordion
          bordered={false}
          onChange={() => {
            if (activePanel === '1') {
              setActivePanel('2');
            } else {
              setActivePanel('1');
            }
          }}
        >
          <Panel header="Update your personal info" key="1" style={{ textAlign: 'left' }}>
            {formError ? <Alert message={formError} type="error" /> : null}
            <UpdateProfile
              first_name={props.first_name}
              last_name={props.last_name}
              email={props.email}
              username={props.username}
              handleSubmit={handleSubmit}
              isUpdatingUserData={props.isUpdatingUserData}
              onCancel={onCancel}
            />
          </Panel>
          <Panel header="Change your password" key="2" style={{ textAlign: 'left' }}>
            {formError ? <Alert message={formError} type="error" /> : null}
            <ChangePassword
              handleSubmit={handleSubmit}
              isUpdatingUserData={props.isUpdatingUserData}
              onCancel={onCancel}
            />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.User.userId,
  first_name: state.User.first_name,
  last_name: state.User.last_name,
  email: state.User.email,
  username: state.User.username,
  isUpdatingUserData: state.User.isUpdatingUserData,
});

export default connect(mapStateToProps, { updateUserData, getUserData })(ProfileForm);

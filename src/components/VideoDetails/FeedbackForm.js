import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';

// Actions
import { Form, Input, Button } from 'antd';
import { submitFeedback } from '../../redux/actions/userActions';

// Components

// Additional Ant Design components
const { TextArea } = Input;

const FeedbackForm = ({ videoId, submitFeedback, isSubmitting }) => {
  const [feedback, setFeedback] = useState({
    post: '',
  });

  const handleInput = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.post) {
      submitFeedback(videoId, feedback);
      setFeedback({ post: '' });
    }
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item label="Feedback">
        <TextArea name="post" rows={4} value={feedback.post} onChange={handleInput} />
      </Form.Item>
      <Form.Item>
        <Button
          loading={isSubmitting}
          type="primary"
          htmlType="submit"
          className="feedback-form-button"
          disabled={!feedback.post}
        >
          Submit Feedback
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  isSubmitting: state.User.videoDetailFocus.feedback.isSubmitting,
});

const mapActionsToProps = {
  submitFeedback,
};

export default connect(mapStateToProps, mapActionsToProps)(FeedbackForm);

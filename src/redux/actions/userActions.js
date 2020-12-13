import axios from 'axios';
import { notification } from 'antd';
import constants from '../constants';
import AxiosWithAuth from '../../components/utils/AxiosWithAuth';

// REGISTER A NEW USER
export const registerUser = (applicant) => (dispatch) => {
  dispatch({ type: constants.AUTH_START });
  axios
    .post('/auth/register', applicant)
    .then((registerResponse) => {
      dispatch({ type: constants.AUTH_SUCCESS, payload: registerResponse.data });
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.error) {
        dispatch({ type: constants.AUTH_FAILURE, payload: err.response.data.error });
      } else {
        dispatch({ type: constants.AUTH_FAILURE, payload: 'An unexpected error occured.' });
      }
    });
};

// LOGIN A USER
export const loginUser = (user) => (dispatch) => {
  dispatch({ type: constants.AUTH_START });
  axios
    .post('/auth/login', user)
    .then((loginResponse) => {
      dispatch({ type: constants.AUTH_SUCCESS, payload: loginResponse.data });
    })
    .catch((err) => {
      dispatch({ type: constants.AUTH_FAILURE, payload: err.response.data.message });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: constants.LOGOUT_USER });
};

export const createTeam = () => (dispatch) => {
  dispatch({ type: constants.CREATE_TEAM_START });
  AxiosWithAuth()
    .post('/api/teams/')
    .then((res) => {
      dispatch({ type: constants.CREATE_TEAM_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: constants.CREATE_TEAM_FAILURE, payload: err.response }));
};

// FETCH TEAMS FOR USER
export const fetchUserTeams = (userId) => (dispatch) => {
  dispatch({ type: constants.FETCH_USER_TEAMS_START });
  AxiosWithAuth()
    .get(`/users/${userId}/teams`)
    .then((res) => {
      dispatch({ type: constants.FETCH_USER_TEAMS_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: constants.GENERATE_ERROR, payload: err.response }));
};

// FETCH VIDEOS FOR USER
export const fetchUserVideos = (userId) => (dispatch) => {
  dispatch({ type: constants.FETCH_USER_VIDEOS_START });
  AxiosWithAuth()
    .get(`/users/${userId}/videos`)
    .then((res) => {
      dispatch({ type: constants.FETCH_USER_VIDEOS_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: constants.GENERATE_ERROR, payload: err.response }));
};

export const fetchVideo = (videoId) => (dispatch) => {
  dispatch({ type: constants.FETCH_VIDEO_START });
  AxiosWithAuth()
    .get(`/videos/${videoId}`)
    .then((res) => {
      dispatch({ type: constants.FETCH_VIDEO_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: constants.FETCH_VIDEO_FAILURE, payload: err.response }));
};

export const fetchFeedback = (videoId) => (dispatch) => {
  dispatch({ type: constants.FETCH_FEEDBACK_START });
  AxiosWithAuth()
    .get(`/videos/${videoId}/feedback`)
    .then((res) => {
      dispatch({ type: constants.FETCH_FEEDBACK_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: constants.FETCH_FEEDBACK_FAILURE, payload: err.response }));
};

export const submitFeedback = (videoId, feedback) => (dispatch) => {
  dispatch({ type: constants.SUBMIT_FEEDBACK_START });
  AxiosWithAuth()
    .post(`/videos/${videoId}/feedback`, feedback)
    .then(() => {
      dispatch({
        type: constants.SUBMIT_FEEDBACK_SUCCESS,
      });
      notification.success({
        message: 'Feedback Submitted!',
      });
    })
    .catch((err) => {
      dispatch({ type: constants.SUBMIT_FEEDBACK_FAILURE, payload: err.response });
      notification.error({
        message: 'Could not submit feedback :( Try again later.',
      });
    });
};

export const fetchInvite = (invite) => (dispatch) => {
  dispatch({ type: constants.FETCH_INVITE_START, payload: invite });
  axios
    .get(`/invites/${invite}`)
    .then((res) => {
      if (res.data.team_id > 0) {
        dispatch({ type: constants.FETCH_INVITE_SUCCESS, payload: res.data.team_id });
      } else {
        dispatch({ type: constants.FETCH_INVITE_FAILURE, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: constants.FETCH_INVITE_FAILURE, payload: err.response });
    });
};

export const addToInvitedTeam = (teamId, userId, history) => (dispatch) => {
  dispatch({ type: constants.ADD_INVITED_MEMBER_START });
  AxiosWithAuth()
    .post(`/teams/${teamId}/users`, {
      userId,
      role_id: 1,
      teamId,
    })
    .then((res) => {
      dispatch({ type: constants.ADD_INVITED_MEMBER_SUCCESS, payload: res });
      history.push(`/teams/${userId}`);
    })
    .then(() => dispatch({ type: constants.CLEAR_INVITE }))
    .catch((err) => {
      dispatch({ type: constants.ADD_INVITED_MEMBER_FAILURE, payload: err.response });
    });
};

export const uploadVideo = (video) => (dispatch) => {
  dispatch({
    type: constants.UPLOAD_VIDEO_START,
  });

  // Create formdata object
  const videoSubmission = new FormData();

  // Append video and associated metadata
  try {
    // raw video arrayBuffer
    const blob = new Blob(video.raw, { type: 'video/webm' });

    // Video metadata
    videoSubmission.append('video', blob);
    videoSubmission.append('title', video.title);
    videoSubmission.append('description', video.description);
    videoSubmission.append('owner_id', video.owner_id);
    videoSubmission.append('prompt_id', video.prompt_id);
  } catch (err) {
    dispatch({
      type: constants.UPLOAD_VIDEO_FAILURE,
      payload: err,
    });
  }

  const submissionConfig = {
    onUploadProgress(progressEvent) {
      dispatch({
        type: constants.UPLOAD_VIDEO_PROGRESS,
        payload: Math.round((progressEvent.loaded * 100) / progressEvent.total),
      });
    },
    headers: {
      // eslint-disable-next-line no-underscore-dangle
      'Content-Type': `multipart/form-data; boundary=${videoSubmission._boundary}`,
    },
    timeout: 500000,
  };

  AxiosWithAuth()
    .post('/videos', videoSubmission, submissionConfig)
    .then((res) => {
      dispatch({
        type: constants.UPLOAD_VIDEO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: constants.UPLOAD_VIDEO_FAILURE,
        payload: err.response,
      });
    });
};

export const updateStreamObject = (streamObj) => (dispatch) => {
  dispatch({
    type: constants.UPDATE_STREAM_OBJECT,
    payload: streamObj,
  });
};

export const updateStreamRaw = (arrayBuffer) => (dispatch) => {
  dispatch({
    type: constants.UPDATE_STREAM_RAW,
    payload: arrayBuffer,
  });
};

export const toggleStreamPlayback = () => (dispatch) => {
  dispatch({
    type: constants.TOGGLE_STREAM_PLAYBACK,
  });
};

export const restartRecording = () => (dispatch) => {
  dispatch({
    type: constants.RESTART_RECORDING,
  });
};

export const setStreamError = (error) => (dispatch) => {
  dispatch({
    type: constants.SET_STREAM_ERROR,
    payload: error,
  });
};

// Update user data
export const updateUserData = (id, changes) => (dispatch) => {
  dispatch({ type: constants.UPDATE_USER_DATA_START });
  AxiosWithAuth()
    .put(`/users/${id}`, changes)
    .then((res) => {
      dispatch({ type: constants.UPDATE_USER_DATA_SUCCESS, payload: res.data.updatedUser });
      notification.success({
        message: 'Profile successfully updated!',
        duration: 2,
      });
    })
    .catch((error) => {
      dispatch({ type: constants.UPDATE_USER_DATA_FAILURE, payload: error });
      notification.error({
        message: `Something's wrong! Try again. ${error.response.data.message}`,
        duration: 2,
      });
    });
};

export const updateUProfilePicture = (id, photo) => (dispatch) => {
  const config = {
    onUploadProgress: (event) => {
      if (event.lengthComputable) {
        dispatch({
          type: constants.UPDATE_PROFILE_PICTURE_PROGRESS,
          payload: (event.loaded / event.total) * 100,
        });
      }
    },
  };

  dispatch({ type: constants.UPDATE_PROFILE_PICTURE_START });
  AxiosWithAuth()
    .post(`/users/${id}/photo`, photo, config)
    .then((res) => {
      dispatch({ type: constants.UPDATE_PROFILE_PICTURE_PROGRESS, payload: 100 });
      dispatch({ type: constants.UPDATE_PROFILE_PICTURE_SUCCESS, payload: res.data.avatar });
      notification.success({
        message: 'Profile picture successfully updated!',
        duration: 2,
      });
    })
    .catch((err) => {
      dispatch({ type: constants.UPDATE_PROFILE_PICTURE_FAILURE, payload: err });
      notification.error({
        message: `Something went wrong wrong! Try again. ${err.response.data.message}`,
        duration: 2,
      });
    });
};

export const clearPhotoUpload = () => (dispatch) => {
  dispatch({ type: constants.UPDATE_PROFILE_PICTURE_CLEAR });
};

// Get user data
export const getUserData = (id) => (dispatch) => {
  dispatch({ type: constants.FETCH_USER_DATA_START });

  AxiosWithAuth().get(`/users/${id}`)
    .then((res) => {
      dispatch({ type: constants.FETCH_USER_DATA_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: constants.GENERATE_ERROR, payload: error });
    });
};

// SET AN ERROR
export const setAuthError = (errorMessage) => (dispatch) => {
  dispatch({ type: constants.GENERATE_AUTH_ERROR, payload: errorMessage });
};

// CLEAR AN ERROR
export const clearAuthError = () => (dispatch) => {
  dispatch({ type: constants.CLEAR_AUTH_ERROR, payload: null });
};

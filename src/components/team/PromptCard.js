import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Collapse } from 'antd';
import TeamVideoList from './TeamVideoList';
import humanDate from '../utils/HumanDate';

const { Panel } = Collapse;

const PromptCard = ({ data, index }) => (
  <Collapse
    className="prompt-item"
    bordered={false}
    defaultActiveKey={[index === 0 ? data.id : null]}
  >
    <Panel header={data.question} key={prompt.id} style={{ textAlign: 'left' }} extra={humanDate(data.created_at)}>
      <div className="prompt-desc">{data.description}</div>
      <TeamVideoList promptId={data.id} videos={data.videos} />
    </Panel>
  </Collapse>
);

PromptCard.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    videos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default withRouter(PromptCard);

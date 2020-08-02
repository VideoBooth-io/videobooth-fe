import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import humanDate from '../utils/HumanDate';

const { Meta } = Card;

const UserVideosCard = ({ data }) => (
  <Link to={`/videos/${data.id}`}>
    <Card
      className="video-card"
      cover={<img alt={`${data.title} video thumbnail`} src={data.thumbnail} style={{ display: !data.thumbnail ? 'none' : 'block' }} />}
    >
      <Meta
        style={{ textAlign: 'left' }}
        title={data.title}
        description={data.description && (
          <>
            <p className="tiny">{humanDate(data.created_at)}</p>
            <p className="small">
              {data.description}
              {data.description}
            </p>
          </>
        )}
      />
    </Card>
  </Link>
);

UserVideosCard.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserVideosCard;

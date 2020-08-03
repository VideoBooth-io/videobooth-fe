import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const TeamCard = ({ data }) => (
  <Link to={`/teams/${data.id}`}>
    <Card className="teamCard" size="small">
      <Icon type="ellipsis" />
      {data.avatar ? data.avatar : <Avatar size={64} icon="team" />}
      <Meta
        style={{ textAlign: 'left' }}
        title={data.name}
        description={<p className="small">{data.description}</p>}
      />
    </Card>
  </Link>
);

const mapStateToProps = (state) => ({
  isUpdating: state.isUpdating,
});

TeamCard.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, {})(TeamCard);

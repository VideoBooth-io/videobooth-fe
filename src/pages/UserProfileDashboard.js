import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import 'antd/dist/antd.css';
import ProfileContent from '../components/profile/ProfileContent';

const { Title } = Typography;
const { Header, Content } = Layout;

function EditUserDashboard() {
  return (
    <Layout className="profile-page">
      <Header>
        <Link to="/">
          <Title level={3} className="logo">
            VideoBooth.io
          </Title>
        </Link>
      </Header>
      <Content className="profile-page">
        <ProfileContent />
      </Content>
    </Layout>
  );
}

export default EditUserDashboard;

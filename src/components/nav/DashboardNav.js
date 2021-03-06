import React from 'react';
import {
  Layout, Menu, Icon, Typography,
} from 'antd';
import { Link, withRouter } from 'react-router-dom';

const { Sider, Header } = Layout;
const { Title } = Typography;

const DashboardNav = withRouter((props) => {
  // Use location from router as a key to show that link is selected.
  const { location } = props;

  return (
    <Sider
      breakpoint="lg"
      className="side-nav"
      collapsedWidth="0"
      width="240"
    >
      <Header>
        <Link to="/">
          <Title level={3} className="logo">
            VideoBooth.io
          </Title>
        </Link>
      </Header>
      <Menu theme="dark" mode="inline" className="userDashMenu" selectedKeys={[location.pathname]}>
        <Menu.Item key="/user-dashboard">
          <Link to="/" style={{ color: '#fff', display: 'block' }}>
            <Icon type="home" theme="filled" />
            {' '}
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="/profile">
          <Link to="/profile" style={{ color: '#fff', display: 'block' }}>
            <Icon type="user" />
            {' '}
            My Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="/videos">
          <Link to="/videos" style={{ color: '#fff', display: 'block' }}>
            <Icon type="play-circle" theme="filled" />
            {' '}
            My Videos
          </Link>
        </Menu.Item>
        <Menu.Item key="/teams" disabled>
          <Icon type="calendar" theme="filled" />
          {' '}
          My Teams
        </Menu.Item>
        <Menu.Item key="/setting" disabled>
          <Icon type="setting" theme="filled" />
          Teams Settings
        </Menu.Item>

        <hr style={{ margin: '40px 0' }} />

        <h3 style={{ color: 'white', paddingLeft: '24px', paddingBottom: '20px' }}>Team Controls</h3>
        <Menu.Item key="/manage-teams" disabled>
          <Icon type="calendar" theme="filled" />
          <span>Manage Teams</span>
        </Menu.Item>
        <Menu.Item key="/team-archive" disabled>
          <Icon type="folder" theme="filled" />
          <span>Team Archive</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
});

export default DashboardNav;

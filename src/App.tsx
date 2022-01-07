import { Layout, Menu, Typography } from "antd";
import React, { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ClearOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./styles/App.css";
import Title from "antd/lib/skeleton/Title";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content } = Layout;
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="App">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <Logo collapsed={collapsed} />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<ClearOutlined />}>
              Purify
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;

interface LogoProps{
  collapsed:boolean;
}
function Logo({collapsed}:LogoProps) {
  const { Title } = Typography;

  let name="";
  collapsed?name="NM":name="NasManager";
  
  return(
    <Title level={3}>{name}</Title>
  )
}

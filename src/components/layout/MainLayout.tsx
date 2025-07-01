import React, { useState } from "react";
import { Layout, Menu, theme, Drawer, Button, MenuProps, Dropdown } from "antd";
import { MenuOutlined, CloseOutlined, GithubOutlined } from "@ant-design/icons";
import myLogo from "../../assets/vibeventLogo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { userPaths } from "../../routes/userRoutes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  currentUserData,
  logoutUser,
} from "../../redux/features/auth/authSlice";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userData = useAppSelector(currentUserData);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleNavClick = (sectionId: string) => {
    navigate(sectionId);
    // if (location.pathname === "/") {
    //   // Already on home, just scroll
    //   const section = document.getElementById(sectionId);
    //   if (section) {
    //     section.scrollIntoView({ behavior: "smooth" });
    //   }
    // } else {
    //   // Navigate to home with state
    //   navigate("/", { state: { scrollTo: sectionId } });
    // }

    // if (window.innerWidth < 768) {
    //   setDrawerVisible(false);
    // }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const navbarItems: MenuProps["items"] = userPaths
    .filter((item) => item.name && (item.name !== "Sign In" || !userData))
    .map((item) => ({
      key: item.path,
      label: (
        <span
          onClick={() => {
            handleNavClick(item.path);
          }}
          className="cursor-pointer font-semibold text-white"
        >
          {item.name}
        </span>
      ),
    }));

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background:
            "linear-gradient(90deg, #1a0033 0%, #6a11cb 50%, #2575fc 100%)",
          color: "#fff",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-5 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={myLogo} alt="Logo" style={{ height: 40 }} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end">
          <Menu
            theme="dark"
            mode="horizontal"
            items={navbarItems}
            style={{
              background: "transparent",
              flex: 1,
              justifyContent: "end",
            }}
          />
          {userData && (
            <div className="hidden md:flex items-center ml-4">
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "username",
                      label: (
                        <span className="font-semibold text-black">
                          {userData.name}
                        </span>
                      ),
                      disabled: true,
                    },
                    {
                      key: "logout",
                      label: <span onClick={handleLogout}>Logout</span>,
                    },
                  ],
                }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <img
                  src={userData.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border"
                />
              </Dropdown>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            type="text"
            icon={
              drawerVisible ? (
                <CloseOutlined style={{ fontSize: 22, color: "white" }} />
              ) : (
                <MenuOutlined style={{ fontSize: 22, color: "white" }} />
              )
            }
            onClick={toggleDrawer}
          />
        </div>
      </Header>
      {/* Mobile Drawer */}
      <Drawer
        title="Navigation"
        placement="right"
        closable
        onClose={toggleDrawer}
        open={drawerVisible}
        className="md:hidden"
      >
        <Menu mode="vertical" items={navbarItems} />
      </Drawer>
      {/* Main Content */}
      <Content
        style={{
          flex: 1,
          padding: 24,
          minHeight: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          backgroundColor: "#f0f2f5",
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <div>
          Designed & Built by <strong>Md Rahatul Islam</strong>
        </div>
        <div style={{ marginTop: 4 }}>
          © {new Date().getFullYear()} Md Rahatul Islam. All rights reserved.
        </div>
        <a
          href="https://github.com/Th3At0nic"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "24px",
            color: "#000",
            marginTop: 8,
            display: "inline-block",
          }}
        >
          <GithubOutlined />
        </a>
      </Footer>
    </Layout>
  );
};

export default App;

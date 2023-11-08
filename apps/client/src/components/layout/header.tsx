import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  useGetIdentity,
  useGetLocale,
  useSetLocale,
  useActiveAuthProvider,
  useLogout,
} from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Dropdown,
  Menu,
  Space,
  Switch,
  Typography,
  AutoComplete,
  Input,
  MenuProps,
  Badge,
  List,
  Grid,
} from "antd";
import { BASE_URL } from "../../common";
import { useContext, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import { ColorModeContext } from "../../contexts/color-mode";
import { useSearch } from "../../common/hooks";
import { RefineLayoutHeaderProps } from "@refinedev/antd";

import { Colors } from "../../common/contants";

const { Text } = Typography;

const renderTitle = (title: string) => {
  return (
    <Text strong style={{ fontSize: "16px" }}>
      {title}
    </Text>
  );
};

const renderItem = (title: string, resource: string, id: number) => {
  return {
    value: title,
    label: (
      <Link to={`/${resource}/show/${id}`}>
        <Text>{title}</Text>
      </Link>
    ),
  };
};

export const Header: React.FC<
  RefineLayoutHeaderProps & {
    collapsed?: boolean;
    setCollapsed?: (collapsed: boolean) => void;
  }
> = ({ collapsed, setCollapsed }) => {
  const { mutate: logout } = useLogout();

  const breakpoint = Grid.useBreakpoint();
  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;
  const { options, setValue } = useSearch({
    renderItem,
    renderTitle,
  });
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  //const { data: user } = useGetIdentity<IUser>();
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const { mode, setMode } = useContext(ColorModeContext);

  const currentLocale = locale();

  const menu = (
    <Menu selectedKeys={currentLocale ? [currentLocale] : []}>
      {[...(i18n.languages || [])].sort().map((lang: string) => (
        <Menu.Item
          key={lang}
          onClick={() => changeLanguage(lang)}
          icon={
            <span style={{ marginRight: 8 }}>
              <Avatar size={16} src={`/images/flags/${lang}.svg`} />
            </span>
          }
        >
          {lang === "en" ? "English" : "German"}
        </Menu.Item>
      ))}
    </Menu>
  );

  const profileMenu: MenuProps["items"] = [
    {
      label: <Link to="/admin">Personal Settings</Link>,
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      key: "3",
      icon: <LogoutOutlined />,
      onClick: () => logout(),
    },
  ];

  const notifications = [
    {
      id: 1,
      name: "Muhammad Amir",
      message:
        "Ant Design, a design language for background applications, is refined by Ant UED Team",
    },
    {
      id: 2,
      name: "Muhammad Amir",
      message:
        "Ant Design, a design language for background applications, is refined by Ant UED Team",
    },
    {
      id: 3,
      name: "Muhammad Amir",
      message:
        "Ant Design, a design language for background applications, is refined by Ant UED Team",
    },
  ];

  const notificationMenu = (
    <Menu style={{ paddingLeft: 10, paddingRight: 10 }}>
      <List
        style={{ minWidth: 400 }}
        itemLayout="horizontal"
        dataSource={notifications}
        header={<Text>Notifications</Text>}
        footer={<Button type="text">View All Notifications</Button>}
        renderItem={(item) => (
          <List.Item className="hoverable">
            <List.Item.Meta
              avatar={
                <Avatar
                  src={"https://randomuser.me/api/portraits/men/48.jpg"}
                />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.message}
            />
          </List.Item>
        )}
      />
    </Menu>
  );

  const toggleIconStyle: CSSProperties = { color: "#fff" };

  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        background: Colors.primary,
        alignItems: "center",
        padding: "0px 0px",
        paddingRight: 24,
        height: "64px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={toggleIconStyle} />
              ) : (
                <MenuFoldOutlined style={toggleIconStyle} />
              )
            }
            onClick={() => setCollapsed?.(!collapsed)}
          ></Button>
        </Space>

        <div>
          {!isMobile && (
            <Space>
              <AutoComplete
                style={{ width: "100%" }}
                options={options}
                filterOption={false}
                onSearch={debounce((value: string) => setValue(value), 500)}
              >
                <Input
                  size="large"
                  placeholder="Search subjects, chapters and topics"
                  suffix={<SearchOutlined />}
                />
              </AutoComplete>
            </Space>
          )}
          <Space>
            <Dropdown overlay={menu}>
              <Button type="text" style={{ color: "#fff" }}>
                <Space>
                  <Avatar
                    size={16}
                    src={`/images/flags/${currentLocale}.svg`}
                  />
                  {currentLocale === "en" ? "English" : "German"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Switch
              checkedChildren="🌛"
              unCheckedChildren="🔆"
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
              defaultChecked={mode === "dark"}
            />
            <Space style={{ marginRight: 20, marginTop: 10 }}>
              <Dropdown overlay={notificationMenu} arrow trigger={["click"]}>
                <Badge count={20} size="small">
                  <Button
                    icon={<BellOutlined size={24} style={{ color: "#FFF" }} />}
                    type="text"
                  />
                </Badge>
              </Dropdown>
            </Space>
            <Space style={{ marginLeft: "8px" }}>
              <Dropdown menu={{ items: profileMenu }} arrow>
                <Space>
                  {user?.avatar && (
                    <Avatar
                      src={`${BASE_URL}/${user?.avatar}`}
                      alt={user?.firstName}
                      crossOrigin="anonymous"
                    />
                  )}
                  <Text style={{ color: "#FFF" }}> {user?.firstName}</Text>
                </Space>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>
    </AntdLayout.Header>
  );
};

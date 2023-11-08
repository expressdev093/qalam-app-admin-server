import React, { useState, CSSProperties } from "react";
import {
  useTranslate,
  useLogout,
  useTitle,
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useRouterContext,
  useMenu,
  useRefineContext,
  useLink,
  useRouterType,
  useActiveAuthProvider,
  pickNotDeprecated,
  useWarnAboutChange,
} from "@refinedev/core";
import { Title as DefaultTitle } from "@refinedev/antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Grid, ConfigProvider, Drawer } from "antd";
import type { RefineLayoutSiderProps } from "@refinedev/antd";
import { Colors } from "../../common/contants";

const { SubMenu } = Menu;

export const Sider: React.FC<
  RefineLayoutSiderProps & {
    collapsed?: boolean;
    setCollapsed?: (collapsed: boolean) => void;
  }
> = ({
  Title: TitleFromProps,
  render,
  meta,
  collapsed = false,
  setCollapsed,
}) => {
  //const [collapsed, setCollapsed] = useState<boolean>(false);
  //const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const isExistAuthentication = useIsExistAuthentication();
  const routerType = useRouterType();
  const NewLink = useLink();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;
  const TitleFromContext = useTitle();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const breakpoint = Grid.useBreakpoint();
  const { hasDashboard } = useRefineContext();
  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const {
        icon,
        label,
        route,
        key,
        name,
        children,
        parentName,
        meta,
        options,
      } = item;

      if (children.length > 0) {
        return (
          <CanAccess
            key={item.key}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <SubMenu
              key={item.key}
              icon={icon ?? <UnorderedListOutlined />}
              title={label}
            >
              {renderTreeView(children, selectedKey)}
            </SubMenu>
          </CanAccess>
        );
      }
      const isSelected = key === selectedKey;
      const isRoute = !(
        pickNotDeprecated(meta?.parent, options?.parent, parentName) !==
          undefined && children.length === 0
      );
      return (
        <CanAccess
          key={item.key}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Menu.Item
            key={item.key}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route ?? ""}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        translate(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes."
        )
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
      {translate("buttons.logout", "Logout")}
    </Menu.Item>
  );

  const dashboard = hasDashboard ? (
    <Menu.Item
      key="dashboard"
      style={{
        fontWeight: selectedKey === "/" ? "bold" : "normal",
      }}
      icon={<DashboardOutlined />}
    >
      <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
      {!collapsed && selectedKey === "/" && (
        <div className="ant-menu-tree-arrow" />
      )}
    </Menu.Item>
  ) : null;

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout,
        collapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  const renderMenu = () => {
    return (
      <>
        <Menu
          style={{
            height: "calc(100vh - 64px)",
          }}
          theme="dark"
          selectedKeys={selectedKey ? [selectedKey] : []}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
          onClick={() => {
            setCollapsed?.(false);
            if (!breakpoint.lg) {
              setCollapsed?.(true);
            }
          }}
        >
          {renderSider()}
        </Menu>
      </>
    );
  };

  const renderDrawerSider = () => {
    return (
      <>
        <Drawer
          open={collapsed}
          onClose={() => setCollapsed?.(false)}
          placement="left"
          closable={false}
          width={200}
          bodyStyle={{
            padding: 0,
            background: Colors.primary,
          }}
          maskClosable={true}
        >
          <Layout>
            <Layout.Sider
              style={{
                height: "100vh",
                overflow: "hidden",
                background: Colors.primary,
              }}
            >
              <RenderToTitle collapsed={false} />
              {renderMenu()}
            </Layout.Sider>
          </Layout>
        </Drawer>
        {/* <Button
          style={drawerButtonStyles}
          size="large"
          onClick={() => setDrawerOpen(true)}
          icon={<BarsOutlined />}
        ></Button> */}
      </>
    );
  };

  const renderContent = () => {
    if (isMobile) {
      return renderDrawerSider();
    }

    return (
      <Layout.Sider
        style={{
          background: Colors.primary,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed: boolean): void => setCollapsed?.(collapsed)}
        collapsedWidth={80}
        breakpoint="lg"
      >
        <RenderToTitle collapsed={collapsed} />
        {renderMenu()}
      </Layout.Sider>
    );
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorItemBg: "transparent",
            colorItemText: "#fff",
            colorItemTextSelected: "#fff",
            colorItemBgSelected: "transparent",
            colorItemTextHover: "#fff",
          },
        },
      }}
    >
      {renderContent()}
    </ConfigProvider>
  );
};

import { ErrorComponent, ThemedLayoutV2 } from "@refinedev/antd";
import { Authenticated, ResourceProps } from "@refinedev/core";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Layout } from "../components";
import {
  AppCornerCreate,
  AppCornerEdit,
  AppCornerList,
  AppCornerShow,
  ChapterCreate,
  ChapterEdit,
  ChapterList,
  ChapterShow,
  Dashboard,
  Login,
  OnlineClassCreate,
  OnlineClassEdit,
  OnlineClassList,
  OnlineClassShow,
  QuizList,
  QuizEdit,
  QuizCreate,
  QuizShow,
  SubjectCreate,
  SubjectEdit,
  SubjectList,
  SubjectShow,
  TopicCreate,
  TopicEdit,
  TopicList,
  TopicShow,
  UserCreate,
  UserEdit,
  UserList,
  UserShow,
  BoardsList,
  BoardsCreate,
  BoardsEdit,
  BoardsShow,
  BoardClassesList,
  BoardClassesCreate,
  BoardClassesEdit,
  BoardClassesShow,
  PastPapersList,
  PastPapersCreate,
  PastPapersEdit,
  PastPapersShow,
  AdminProfile,
  AppContentCreate,
  AppContentEdit,
  AppContentList,
  AppContentShow,
} from "../pages";
import { Outlet, Route, Routes } from "react-router-dom";

import { Sider } from "../components/layout/sider";
import { Title } from "../components/layout/title";
import { Header } from "../components/layout/header";
import React from "react";

export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated fallback={<CatchAllNavigate to="/login" />}>
            <Layout Header={Header} Sider={Sider} Title={Title}>
              <Outlet />
            </Layout>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="dashboard" />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/app-corners">
          <Route index element={<AppCornerList />} />
          <Route path="create" element={<AppCornerCreate />} />
          <Route path="edit/:id" element={<AppCornerEdit />} />
          <Route path="show/:id" element={<AppCornerShow />} />
        </Route>
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path="create" element={<UserCreate />} />
          <Route path="edit/:id" element={<UserEdit />} />
          <Route path="show/:id" element={<UserShow />} />
        </Route>
        <Route path="/subjects">
          <Route index element={<SubjectList />} />
          <Route path="create" element={<SubjectCreate />} />
          <Route path="edit/:id" element={<SubjectEdit />} />
          <Route path="show/:id" element={<SubjectShow />} />
        </Route>
        <Route path="/chapters">
          <Route index element={<ChapterList />} />
          <Route path="create" element={<ChapterCreate />} />
          <Route path="edit/:id" element={<ChapterEdit />} />
          <Route path="show/:id" element={<ChapterShow />} />
        </Route>
        <Route path="/topics">
          <Route index element={<TopicList />} />
          <Route path="create" element={<TopicCreate />} />
          <Route path="edit/:id" element={<TopicEdit />} />
          <Route path="show/:id" element={<TopicShow />} />
        </Route>
        <Route path="/online-classes">
          <Route index element={<OnlineClassList />} />
          <Route path="create" element={<OnlineClassCreate />} />
          <Route path="edit/:id" element={<OnlineClassEdit />} />
          <Route path="show/:id" element={<OnlineClassShow />} />
        </Route>
        <Route path="/quizes">
          <Route index element={<QuizList />} />
          <Route path="create" element={<QuizCreate />} />
          <Route path="edit/:id" element={<QuizEdit />} />
          <Route path="show/:id" element={<QuizShow />} />
        </Route>
        <Route path="/boards">
          <Route index element={<BoardsList />} />
          <Route path="create" element={<BoardsCreate />} />
          <Route path="edit/:id" element={<BoardsEdit />} />
          <Route path="show/:id" element={<BoardsShow />} />
        </Route>
        <Route path="/board-classes">
          <Route index element={<BoardClassesList />} />
          <Route path="create" element={<BoardClassesCreate />} />
          <Route path="edit/:id" element={<BoardClassesEdit />} />
          <Route path="show/:id" element={<BoardClassesShow />} />
        </Route>
        <Route path="/past-papers">
          <Route index element={<PastPapersList />} />
          <Route path="create" element={<PastPapersCreate />} />
          <Route path="edit/:id" element={<PastPapersEdit />} />
          <Route path="show/:id" element={<PastPapersShow />} />
        </Route>

        <Route path="/website-contents">
          <Route index element={<AppContentList />} />
          <Route path="create" element={<AppContentCreate />} />
          <Route path="edit/:id" element={<AppContentEdit />} />
          <Route path="show/:id" element={<AppContentShow />} />
        </Route>
        <Route path="/admin">
          <Route index element={<AdminProfile />} />
        </Route>
      </Route>
      <Route
        element={
          <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        element={
          <Authenticated>
            <ThemedLayoutV2 Header={Header}>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
};

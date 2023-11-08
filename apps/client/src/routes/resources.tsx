import { ResourceProps } from "@refinedev/core";
import {
  DashboardFilled,
  FilePdfOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faTableList,
  faUsers,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";

export const resources: ResourceProps[] = [
  {
    name: "dashboard",
    list: "/dashboard",
    meta: {
      icon: <DashboardFilled />,
    },
  },
  {
    name: "app-corners",

    list: "/app-corners",
    create: "/app-corners/create",
    edit: "/app-corners/edit/:id",
    show: "/app-corners/show/:id",
    meta: {
      canDelete: true,
      label: "App Corner",
      icon: <FontAwesomeIcon icon={faMobileScreen} />,
    },
  },
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/edit/:id",
    show: "/users/show/:id",
    meta: {
      canDelete: true,
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
  },
  {
    name: "subjects",
    list: "/subjects",
    create: "/subjects/create",
    edit: "/subjects/edit/:id",
    show: "/subjects/show/:id",
    meta: {
      canDelete: true,
      icon: <FontAwesomeIcon icon={faBook} />,
    },
  },
  {
    name: "chapters",
    list: "/chapters",
    create: "/chapters/create",
    edit: "/chapters/edit/:id",
    show: "/chapters/show/:id",
    meta: {
      canDelete: true,
      icon: <FontAwesomeIcon icon={faTableList} />,
    },
  },
  {
    name: "topics",
    list: "/topics",
    create: "/topics/create",
    edit: "/topics/edit/:id",
    show: "/topics/show/:id",

    meta: {
      canDelete: true,
      icon: <FontAwesomeIcon icon={faTableList} />,
    },
  },
  {
    name: "online-classes",
    list: "/online-classes",
    create: "/online-classes/create",
    edit: "/online-classes/edit/:id",
    show: "/online-classes/show/:id",

    meta: {
      canDelete: true,
      icon: <FontAwesomeIcon icon={faClock} />,
      label: "Online Classes",
    },
  },
  {
    name: "exercises",
    create: "/chapters/:chapterId/exercises/create",
    edit: "/chapters/:chapterId/exercises/edit/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "topic-videos",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "questions",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "mcqs",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "mcq-options",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "quizes",

    list: "/quizes",
    create: "/quizes/create",
    edit: "/quizes/edit/:id",
    show: "/quizes/show/:id",
    meta: {
      canDelete: true,
      icon: <PushpinOutlined />,
    },
  },
  {
    name: "quiz-mcqs",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "quiz-mcqoptions",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "boards",
    list: "/boards",
    create: "/boards/create",
    edit: "/boards/edit/:id",
    show: "/boards/show/:id",
    meta: {
      canDelete: true,
      icon: <PushpinOutlined />,
    },
  },
  {
    name: "board-classes",
    list: "/board-classes",
    create: "/board-classes/create",
    edit: "/board-classes/edit/:id",
    show: "/board-classes/show/:id",
    meta: {
      canDelete: true,
      icon: <PushpinOutlined />,
    },
  },
  {
    name: "past-papers",
    list: "/past-papers",
    create: "/past-papers/create",
    edit: "/past-papers/edit/:id",
    show: "/past-papers/show/:id",
    meta: {
      canDelete: true,
      icon: <FilePdfOutlined />,
    },
  },

  {
    name: "website-contents",

    list: "/website-contents",
    create: "/website-contents/create",
    edit: "/website-contents/edit/:id",
    show: "/website-contents/show/:id",
    meta: {
      label: "App Contents",
    },
  },
];

import React, { isValidElement } from "react";
import { produce } from "immer";
import {
  SmileOutlined,
  AntDesignOutlined,
  DesktopOutlined,
  ControlOutlined,
  EyeOutlined,
  SubnodeOutlined,
  ReadOutlined
} from "@ant-design/icons";

const keyForIcons = {
  Cms: <SmileOutlined />,
  TestOne: <AntDesignOutlined />,
  TestTwo: <AntDesignOutlined />,
  Page: <DesktopOutlined />,
  Template: <EyeOutlined />,
  PageManagement: <ReadOutlined />,
  基本设置: <ControlOutlined />,
  SEO设置: < SubnodeOutlined />,
  栏目管理:< SubnodeOutlined />
};

export function routesTransformMenu(routes = []) {
  return routes.map((item) => {
    return produce(item, (draftItem) => {
      if (draftItem.key && isValidElement(keyForIcons[draftItem.key])) {
        draftItem.icon = keyForIcons[draftItem.key];
      }
      if (draftItem.routes) {
        draftItem.routes = routesTransformMenu(draftItem.routes);
      }
    });
  });
}

export function routesTransformMenuLanguage(routes = []) {
  return routes.map((item) => {
    return produce(item, (draftItem) => {
      draftItem.name = draftItem.key;

      if (draftItem.routes) {
        draftItem.routes = routesTransformMenuLanguage(draftItem.routes);
      }
    });
  });
}

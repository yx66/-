import React from "react";
import { Provider } from "react-redux";

import "antd/dist/antd.css";

import AppRouter from "@/routes";
import store from "@/store";

import 'grapesjs/dist/css/grapes.min.css';
import '@/assets/styles/main.scss';
import "@/assets/styles/global.less";

import "@/languages";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;

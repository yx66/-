import React, { useState } from "react";
import { message, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProForm, { ProFormText } from "@ant-design/pro-form";
import { LockTwoTone, UserOutlined } from "@ant-design/icons";
import {login} from "@/apis/blog"
import { saveStorage } from "@/utils/local";
import { LOCAL_KEY_CONSTANTS } from "@/constants/local";
import { APP_ACTION_TYPES } from "@/store/types/app.type";
import { createUUID } from "@/utils";
import { allRoutes } from "@/mock";

import styles from "./index.module.less";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t: $t } = useTranslation();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
// 登录
  const handleSubmit = async (values) => {
    setSubmitLoading(true);
    try {
      const res = await login(values);
      setTimeout(() => {
      setSubmitLoading(false);
      console.log("data",res);
        if (values && values.username === res.data.result.name) {
          if (res.data.status === "ST200") {
            setErrorState(false);
            const { csrf_token, routes, ...info } = res.data.result;
            const token = createUUID();
            localStorage.setItem(LOCAL_KEY_CONSTANTS.USER_INFO, JSON.stringify(info));
            localStorage.setItem(LOCAL_KEY_CONSTANTS.TOKEN, csrf_token);
            localStorage.setItem(LOCAL_KEY_CONSTANTS.ROUTES, JSON.stringify(routes));
            dispatch({ type: APP_ACTION_TYPES.SET_TOKEN, token });
            dispatch({ type: APP_ACTION_TYPES.SET_ROUTES, routes: allRoutes });
            saveStorage(LOCAL_KEY_CONSTANTS.TOKEN, token);
            saveStorage(LOCAL_KEY_CONSTANTS.ROUTES, JSON.stringify(allRoutes));
            message.success("登录成功");
            navigate("/test/one");
          }
          else {
            setErrorState(true);
        }
      } else {
        setErrorState(true);
      }
    }, 1200);
    } catch (e) {
      console.log(e);
      message.error("Please enter the correct account and password")
      setSubmitLoading(false);
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang></div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <span className={styles.title}>TTL Cms App</span>
          </div>
          <div className={styles.desc}>
            A new concept of background management system
          </div>
        </div>

        <div className={styles.main}>
          {errorState && (
            <Alert
              style={{ marginBottom: 24 }}
              message={$t("pages.login.error_message")}
              type="error"
              showIcon
            />
          )}
          <ProForm
            initialValues={{ autoLogin: true }}
            onFinish={handleSubmit}
            submitter={{
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitLoading,
                size: "large",
                style: { width: "100%" },
              },
              searchConfig: {
                submitText: $t("pages.login.submit_login_btn"),
              },
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="Please enter the account number"
              rules={[
                {
                  required: true,
                  message: $t("pages.login.rule_required_username"),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockTwoTone className={styles.prefixIcon} />,
              }}
              placeholder="Please input a password"
              rules={[
                {
                  required: true,
                  message: $t("pages.login.rule_required_password"),
                },
              ]}
            />
          </ProForm>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

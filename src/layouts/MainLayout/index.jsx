import React, { Suspense ,useState} from "react";
import { Avatar, Button,Input} from "antd";
import { UserOutlined,AudioOutlined  } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate   } from "react-router-dom";
import ProLayout, { DefaultFooter,PageContainer ,SettingDrawer } from "@ant-design/pro-layout";
import { logout } from "@/apis/blog";
import Loading from "@/components/Loading";
import { APP_ACTION_TYPES } from "@/store/types/app.type";
import { removeStorage } from "@/utils/local";
import { LOCAL_KEY_CONSTANTS } from "@/constants/local";
import { PATH_CONSTANTS } from "@/constants/path";
import {
  routesTransformMenu,
  routesTransformMenuLanguage,
} from "@/utils/functions/transformFunctions";
import "./index.less"


function MainLayout(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = value => console.log(value);
  const routes = useSelector((state) => routesTransformMenu(state.app.routes));
  const username = JSON.parse(window.localStorage.getItem("__u____r_")).name

// 登出事件
  const handleLogoutClick = async() => {
    const res = await logout();
    dispatch({ type: APP_ACTION_TYPES.SET_TOKEN, token: "" });
    dispatch({ type: APP_ACTION_TYPES.SET_ROUTES, routes: [] });
    removeStorage(LOCAL_KEY_CONSTANTS.TOKEN);
    removeStorage(LOCAL_KEY_CONSTANTS.ROUTES);
    localStorage.clear()
    navigate(PATH_CONSTANTS.LOGIN);
  };

  const logoClick=()=>{
    navigate('/website')
  }

  return (
    <div className="main-layout">
      <ProLayout
          fixSiderbar
          route={routesTransformMenuLanguage(routes)[0]}
            location={{ pathname: location.pathname }}
            layout="mix"
            splitMenus="true"
            title="winadmin"
            logo={"https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"}
            onMenuHeaderClick={logoClick}
            menuItemRender={(item,dom) => <Link to={item.path}>{dom}</Link>}
            footerRender={() => (
              <DefaultFooter
                copyright="这是一条测试文案"
              />
            )}

          rightContentRender={() => (
            <>
              <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 , marginTop:8 , marginRight:10}} enterButton />
              <Avatar  src="https://joeschmoe.io/api/v1/random" />
              <span style={{color:"#fff"}}>您好!{ username}</span>
              <Button
                style={{ marginLeft: "8px" }}
                size="small"
                onClick={handleLogoutClick}
              >
                登出
              </Button>
            </>
          )}
        >
          <PageContainer>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </PageContainer>
          </ProLayout>
    </div>
  );
}

export default MainLayout;

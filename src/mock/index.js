export const allRoutes = [
  {
    key: "Root",
    path: "/",
    locale: "zh-CN",
    routes: [
      {
        key: "Test",
        path: "/test",
        routes: [
          {
            key: "TestOne",
            path: "/test/one",
          },
          {
            key: "TestTwo",
            path: "/test/two",
          },
        ],
      },
      // {
      //   key: "应用管理",
      //   path: "/website",
      //   routes: [
      //     {
      //       key: "栏目管理",
      //       path: "/website/columumanage",
      //     },
      //     {
      //       key: "基本设置",
      //       path: "/website/BasicSettings",
      //     },
      //     {
      //       key: "SEO设置",
      //       path: "/website/SEOSettings"
      //     }
      //   ]
      // },
      // {
      //   key: "站点设置",
      //   path: "/SiteManagement/index",
      // },
      {
        key: "Page",
        path: "/grapesJs",
        routes: [
          {
            key: "PageManagement",
            path: "/grapesJs/home"
          },
          {
            key: "PageEditing",
            hideInMenu: true,
            pure: false,
            path: "/grapesJs/editor"
          }
        ]
      },
      {
        key: "Tempale",
        path: "/grapesJs",
        routes: [
          {
            key: "TempalePage",
            path: "/grapesJs/tempalePage"
          }
        ]
      },
    ]
  },

];


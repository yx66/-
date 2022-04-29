var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
};
import React, { useState  } from 'react';
import ProCard, { StatisticCard ,CheckCard } from '@ant-design/pro-card';
import { message, Row, Col, Space,Button ,Modal,Tooltip ,Form, Avatar } from 'antd';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormUploadDragger,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import './index.less'
import ProTable from '@ant-design/pro-table';
import { DownOutlined, QuestionCircleOutlined,RightOutlined,MenuOutlined} from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from '@ant-design/pro-utils';
import GridLayout from 'react-grid-layout';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
const imgStyle = {
  display: 'block',
  width: 60,
  height: 60,
};
const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }}/>);
const DetectDragcolumns = [
    {
        title: '侦测方式',
        dataIndex: 'sort',
        className: 'drag-visible',
        render: () => <div><DragHandle /> Chinese, Simplified </div> ,

    },
    {
        title: '描述',
        dataIndex: 'name',
        className: 'drag-visible',
    },
    {
        title: '启用',
        dataIndex: 'qiyon',
    },
];
const Dragcolumns = [
    {
        title: '英文名称',
        dataIndex: 'sort',
        className: 'drag-visible',
        render: () => <div><DragHandle /> Chinese, Simplified </div> ,

    },
    {
        title: '本地化名称',
        dataIndex: 'name',
        className: 'drag-visible',
    },
    {
        title: '代码',
        dataIndex: 'age',
    },
    {
        title: '方向',
        dataIndex: 'address',
    },
    {
        title: '启用',
        dataIndex: 'qiyon',
    },
    {
        title: '预设',
        dataIndex: 'yushe',
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: () => [
          <a key="link">编辑</a>,
          <a key="link2">删除</a>,
      ],
  },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: "zh-hans",
        address: 'New York No. 1 Lake Park',
        index: 0,
    },
    {
        key: '2',
        name: 'Jim Green',
        age: "zh-hans",
        address: 'London No. 1 Lake Park',
        index: 1,
    },
    {
        key: '3',
        name: 'Joe Black',
        age: "en",
        address: 'Sidney No. 1 Lake Park',
        index: 2,
    },
];


const { Statistic } = StatisticCard;
function SEOSettings() {
  const [formLayoutType, setFormLayoutType] = useState(LAYOUT_TYPE_HORIZONTAL);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRestrictionsVisible, setIsRestrictionsVisible] = useState(false);
  const [isAssignmentVisible, setIsAssignmentVisible] = useState(false);
  const [dataSource, setDataSource] = useState(data);
  // const [layouts,setlayouts] =useState(JSON.parse(JSON.stringify(originalLayouts)))
    const SortableItem = SortableElement((props) => <tr {...props}/>);
    const SortContainer = SortableContainer((props) => <tbody {...props}/>);
    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newData = arrayMoveImmutable([...dataSource], oldIndex, newIndex).filter((el) => !!el);
            setDataSource([...newData]);
        }
    };
    const DraggableContainer = (props) => (<SortContainer useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={onSortEnd} {...props}/>);
    const DraggableBodyRow = (props) => {
        const { className, style } = props, restProps = __rest(props, ["className", "style"]);
        const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps}/>;
    };

  const formItemLayout = formLayoutType === LAYOUT_TYPE_HORIZONTAL
      ? {
          labelCol: { span: 7 },
          wrapperCol: { span: 12 },
      }: null;


        const PermissionScheme = () => {
          setIsModalVisible(true);
        };
        const PermissionRestrictions = () => {
          setIsRestrictionsVisible(true);
        };
        const PermissionAssignment = () => {
          setIsAssignmentVisible(true);
        };

        const handleOk = () => {
          setIsModalVisible(false);
          setIsRestrictionsVisible(false);
          setIsAssignmentVisible(false);
        };

        const handleCancel = () => {
          setIsModalVisible(false);
          setIsRestrictionsVisible(false);
          setIsAssignmentVisible(false);
        };
        const tableListDataSource = [];
        const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
        for (let i = 0; i < 5; i += 1) {
            tableListDataSource.push({
                key: i,
                creator: creators[Math.floor(Math.random() * creators.length)],
                status: valueEnum[Math.floor(Math.random() * 10) % 4],
                createdAt: Date.now() - Math.floor(Math.random() * 100000),
                wenben:'An AJAX HTTP error occurred.',
                wenbenfenzu:"内置的文本"
            });
        }
        const translatecolumns = [
          {
              title: '文本',
              dataIndex: 'wenben',
          },
          {
              title: '文本翻译',
              width: 80,
              dataIndex: 'wenbfany',
          },
          {
              title: (<>
              文本分组
              <Tooltip placement="top" title="这是一段描述">
                <QuestionCircleOutlined style={{ marginLeft: 4 }}/>
              </Tooltip>
            </>),
              width: 140,
              dataIndex: 'wenbenfenzu',
          },
          {
              title: '操作',
              width: 180,
              key: 'option',
              valueType: 'option',
              render: () => [
                  <a key="link">编辑</a>,
                  <a key="link2">删除</a>,
              ],
          },
          {
            title: '上下文',
            width: 80,
            dataIndex: 'shangxiawen',
        },
        ];
        const columns = [
          {
              title: '状态',
              width: 80,
              dataIndex: 'status',
              initialValue: 'all',
              valueEnum: {
                  all: { text: '全部', status: 'Default' },
                  close: { text: '关闭', status: 'Default' },
                  running: { text: '运行中', status: 'Processing' },
                  online: { text: '已上线', status: 'Success' },
                  error: { text: '异常', status: 'Error' },
              },
          },
          {
              title: '创建者',
              width: 80,
              dataIndex: 'creator',
              valueEnum: {
                  all: { text: '全部' },
                  付小小: { text: '付小小' },
                  曲丽丽: { text: '曲丽丽' },
                  林东东: { text: '林东东' },
                  陈帅帅: { text: '陈帅帅' },
                  兼某某: { text: '兼某某' },
              },
          },
          {
              title: (<>
              创建时间
              <Tooltip placement="top" title="这是一段描述">
                <QuestionCircleOutlined style={{ marginLeft: 4 }}/>
              </Tooltip>
            </>),
              width: 140,
              key: 'since',
              dataIndex: 'createdAt',
              valueType: 'date',
              sorter: (a, b) => a.createdAt - b.createdAt,
          },
          {
              title: '操作',
              width: 180,
              key: 'option',
              valueType: 'option',
              render: () => [
                  <a key="link">链路</a>,
                  <a key="link2">报警</a>,
                  <a key="link3">监控</a>,
              ],
          },
        ];
        const [form] = Form.useForm();
        const handleSubmit = async (values) => {
          message.success('提交成功')
          console.log('values', values);
        };

        // const resetLayout=()=> {
        //   setlayouts()
        // }
        // function getFromLS(key) {
        //   let ls = {};
        //   if (global.localStorage) {
        //     try {
        //       ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        //     } catch (e) {
        //       /*Ignore*/
        //     }
        //   }
        //   return ls[key];
        // }
        // const originalLayouts = getFromLS("layouts") || {};
        // function saveToLS(key, value) {
        //   if (global.localStorage) {
        //     global.localStorage.setItem(
        //       "rgl-8",
        //       JSON.stringify({
        //         [key]: value
        //       })
        //     );
        //   }
        // }
        // const onLayoutChange =(layout, layouts)=> {
        //   saveToLS("layouts", layouts);
        //   layouts()
        // }
  return <div>
    <Row gutter={8}>
    {/* <button onClick={() => resetLayout()}>Reset Layout</button> */}
      {/* <GridLayout   cols={24}  rowHeight={200} width={1900}
      // onLayoutChange={(layout, layouts) =>
      //       onLayoutChange(layout, layouts)
      //     }
          > */}
        <Col key='a' data-grid={{x: 0, y: 0, w: 12, h: 1.7}} span={12} style={{marginTop:20}}>
        <ProCard title="站点基本信息" type="inner"  layout="center" bordered >
              <ProForm id='Basic' {...formItemLayout} layout={formLayoutType}
                submitter={{
                  searchConfig: {
                    resetText: '取消',
                  },
                  render: (props, doms) => {
                      return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (<Row>
                    <Col span={9} offset={3}>
                      <Space>{doms}</Space>
                    </Col>
                  </Row>) : (doms);
                  },
                }}
                onFinish={async (values) => {
                      await waitTime(2000);
                      console.log(values);
                      message.success('提交成功');
                  }} params={{}} request={async () => {
                      await waitTime(100);
                      return {
                          name: '',
                      };
                  }}>

                <ProFormText required rules={[{ required: true, message: '请输入站点名字' }]} width="md" name="name" label="站点名字" tooltip="最长为 24 位" placeholder="请输入站点名字"/>
                <ProFormText required rules={[{ required: true, message: '请输入站点名字' }]} width="md" name="fantiname" label="(繁體中文)站点名字" placeholder="请输入站点名字"/>
                <ProFormText required rules={[{ required: true, message: '请输入站点名字' }]} width="md" name='Englishname'  label="(English)站点名字" placeholder="请输入站点名字"/>
                <ProFormText required rules={[{ required: true, message: '请输入邮箱账号' }]} width="md" name="SiteEmail" label="Site Email" placeholder="请输入邮箱"/>
                <ProFormSelect
                    width="md"
                    options={[
                      {
                        value: 'no',
                        label: '-没有-',
                      },
                      {
                        value: 'China',
                        label: '中国',
                      },
                      {
                        value: 'HongKong',
                        label: '香港特别行政区',
                      },
                    ]}
                    name="DefaultCountry"
                    label="默认国家"
                />
                <ProFormText required rules={[{ required: true, message: '请输入IP地址' }]} width="md" name="ip" label="内网IP" placeholder="请输入IP地址"/>
              </ProForm>
          </ProCard>
        </Col>

        <Col  key='b' data-grid={{x: 12, y: -12, w: 12, h: 1.7}} span={12} style={{marginTop:20}}>
        <ProCard title="站点页面信息"  type="inner"  bordered >
              <ProForm {...formItemLayout} layout={formLayoutType}
                submitter={{
                  render: (props, doms) => {
                      return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (<Row>
                    <Col span={14} offset={4}>
                      <Space>{doms}</Space>
                    </Col>
                  </Row>) : (doms);
                  },
                }}
                onFinish={async (values) => {
                      await waitTime(2000);
                      console.log(values);
                      message.success('提交成功');
                  }} params={{}} request={async () => {
                      await waitTime(100);
                      return {
                          name: '',
                      };
                  }}>
                    <ProForm.Group>


                <ProFormText required rules={[{ required: true, message: '请输入站点' }]} width="md" name="qiantaizhandian" label="前台站点" tooltip="最长为 24 位" placeholder="请输入站点"/>
                <ProFormText width="md" name="fantiname" style={{display:'flex'}} label="访问拒绝页" addonBefore={<span>http://13.75.119.30:28093/gtjauat/web/zh-hans/</span>} />
                <ProFormText width="md" name='Englishname'  label="资源找不到" addonBefore={<span>http://13.75.119.30:28093/gtjauat/web/zh-hans/</span>}/>
              </ProForm.Group>
              </ProForm>
          </ProCard>
        </Col>

        <Col key='c' data-grid={{x: 0, y: 0, w: 24, h: 2}} span={24} style={{marginTop:20}}>
        <ProCard key='c' data-grid={{x: 0, y: 0, w: 11.9, h: 2}} gutter={16}  >
        <ProTable headerTitle="拖拽排序" columns={Dragcolumns} rowKey="index" pagination={false} dataSource={dataSource} components={{
                    body: {
                        wrapper: DraggableContainer,
                        row: DraggableBodyRow,
                    },
                }}/>
        </ProCard>
        </Col>

        <Col key='d' data-grid={{x: 0, y: 0, w: 8, h: 1,autoSize:true}} span={8} style={{marginTop:20}}>
        <ProCard
          hoverable bordered onClick={PermissionScheme}
          extra={<div className='extra'><span>More</span> <RightOutlined /></div> }>
          <StatisticCard
            statistic={{
              value: `权限方案`,
              title: '"群组(角色)权限配置/群组(角色)权限"方案导入/导出',
              icon: (
                <img
                  style={imgStyle}
                  src={require("@/assets/images/quanxian.svg")}
                  alt="icon"
                />
              ),
            }}
          />
          </ProCard>
        </Col>
        <Modal title="权限方案"
          maskClosable={false}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width="70%"
          footer={null}>
            <ProCard
              tabs={{
                type: 'card',
              }}
            >
              <ProCard.TabPane key="tab1" tab="导入">
                <ProForm>
                  <ProFormUploadDragger max={4} label="上传文件" name="dragger" />
                  <span>允许的文件类型：inheritance_limit inheritance_config permission_limit permission_allocation。</span> <br /> <br />
                </ProForm>
              </ProCard.TabPane>

              <ProCard.TabPane key="tab2" tab="导出">
                <ProTable columns={columns} request={(params, sorter, filter) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    console.log(params, sorter, filter);
                    return Promise.resolve({
                        data: tableListDataSource,
                        success: true,
                    });
                    }} rowKey="key" pagination={{
                        showQuickJumper: true,
                    }} search={{
                        optionRender: false,
                        collapsed: false,
                    }} dateFormatter="string" headerTitle="表格标题" toolBarRender={() => [
                    <Button key="show">查看日志</Button>,
                    <Button key="out">
                  导出数据
                  <DownOutlined />
                </Button>,
                    <Button type="primary" key="primary">
                  创建应用
                </Button>,
                ]}/>
              </ProCard.TabPane>

              <ProCard.TabPane key="tab3" tab="重置">
              <div>这个操作无法恢 复。</div>
              <br />
              <Space>
                <Button danger type='primary'>重置</Button>
                <Button type='primary'>取消</Button>
              </Space>

              </ProCard.TabPane>
            </ProCard>
        </Modal>

        <Col key='e' data-grid={{x: 8, y: 0, w: 8, h: 1}} span={8} style={{marginTop:20}}>
        <ProCard
          hoverable bordered onClick={PermissionRestrictions}
          extra={<div className='extra'><span>More</span> <RightOutlined /></div> }>

          <StatisticCard
            statistic={{
              value: `权限限制`,
              title: '权限限制',
              icon: (
                <img
                  style={imgStyle}
                  src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                  alt="icon"
                />
              ),
            }}
          />
          </ProCard>
        </Col>
        <Modal title="权限限制"
          maskClosable={false}
          visible={isRestrictionsVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width="70%"
          footer={null}>
              <ProTable columns={columns} request={(params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log(params, sorter, filter);
              return Promise.resolve({
                  data: tableListDataSource,
                  success: true,
              });
          }} rowKey="key" pagination={{
              showQuickJumper: true,
          }} search={{
              optionRender: false,
              collapsed: false,
          }} dateFormatter="string" headerTitle="权限限制" toolBarRender={() => [
              <Button key="out">
            导出数据
            <DownOutlined />
          </Button>
          ]}/>
        </Modal>

        <Col key='f' data-grid={{x: 16, y: 0, w: 8, h: 1}} span={8} style={{marginTop:20}}>
        <ProCard
          hoverable bordered onClick={PermissionAssignment}
          extra={<div className='extra'><span>More</span> <RightOutlined /></div> }>
          <StatisticCard
            statistic={{
              value: `权限分配`,
              title: '权限分配',
              icon: (
                <img
                  style={imgStyle}
                  src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                  alt="icon"
                />
              ),
            }}
          />
          </ProCard>
        </Col>
        <Modal title="权限分配"
          maskClosable={false}
          visible={isAssignmentVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width="70%"
          footer={null}>
              <ProTable columns={columns} request={(params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log(params, sorter, filter);
              return Promise.resolve({
                  data: tableListDataSource,
                  success: true,
              });
          }} rowKey="key" pagination={{
              showQuickJumper: true,
          }} search={{
              optionRender: false,
              collapsed: false,
          }} dateFormatter="string" headerTitle="表格标题" toolBarRender={() => [
              <Button key="show">查看日志</Button>,
              <Button key="out">
            导出数据
            <DownOutlined />
          </Button>,
              <Button type="primary" key="primary">
            创建应用
          </Button>,
          ]}/>
        </Modal>

        <Col key='g' data-grid={{x: 0, y: 0, w: 10, h: 1.9}} span={10} style={{marginTop:20}}>
        <ProCard title="客户设置" type="inner" bordered>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="checkbox-group" label="开户通知邮件附件  ">
              <CheckCard.Group style={{ width: '100%' }}>
                <CheckCard
                  title="包含"
                  avatar={
                    <Avatar
                      src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                      size="large"
                    />
                  }
                  value="包含"
                />
                <CheckCard
                  title="不包含"
                  avatar={
                    <Avatar
                      src="https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg"
                      size="large"
                    />
                  }
                  value="SOFABoot"
                />
              </CheckCard.Group>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button >
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </ProCard>
        </Col>
      {/* </GridLayout> */}
    </Row>
  </div>
}

export default SEOSettings;

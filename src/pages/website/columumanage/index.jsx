import React, {useState }from "react";
import "./index.less"
import { Link } from 'react-router-dom';
import { Table, Popconfirm, Space ,Button,message,Modal} from 'antd';




function BasicSettings() {
  const [checkStrictly, setCheckStrictly] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [iseditModalVisible, setIseditModalVisible] = useState(false);
  const handleAdd=()=>{
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
    setIseditModalVisible(false);
    console.log("保存成功");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIseditModalVisible(false);
  };

  const addModalcolumns=()=>{
    console.log('添加栏目');
  }

  const edit =()=>{
    console.log("编辑");
    setIseditModalVisible(true);
  }
  function cancel() {
    message.error('Click on No');
  }
  function confirm(record) {
    message.success('Click on Yes');
    console.log('ssss',record.key);
    console.log('data',data);
  }
  function Modalconfirm(record) {
    // message.success('Click on Yes');
    console.log('ssss',record.key);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',

    },
    {
      title: '栏目名称',
      dataIndex: 'columnname',
      key: 'columnname',
      editable: true,
    },
    {
      title: '所属模型',
      dataIndex: 'columnmodule',
      key: 'columnmodule',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '操作',
      key: 'operate',
      render: (record) => (
        <Space size="middle">
          <Button ghost type="primary" onClick={edit}>
            编辑
          </Button>

          <Popconfirm
            title="Are you sure to delete this page?"
            onConfirm={()=>confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger >删除</Button>
          </Popconfirm>
        </Space>
      ),
    },

  ];
  const Modalcolumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable:true,
    },
    {
      title: '栏目名称',
      dataIndex: 'columnname',
      key: 'columnname',
      editable:true
    },
    {
      title: '所属模型',
      dataIndex: 'columnmodule',
      key: 'columnmodule',
    },
    {
      title: '操作',
      key: 'operate',
      render: (record) => (
          <Popconfirm
            title="Are you sure to delete this page?"
            onConfirm={ ()=>Modalconfirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger >撤销</Button>
          </Popconfirm>
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
  ];

  const data = [
    {
      key: 1,
      id:1,
      columnname: '关于我们',
      columnmodule: "单页模型",
      operate: 'New York No. 1 Lake Park',
      sort: '1',
      children: [
        {
          key: 12,
          id:12,
          columnname: '联系我们',
          columnmodule: '图文模型',
          sort: 100,
        },
      ],
    },
    {
      key: 2,
      id:2,
      columnname: '解决方案',
      columnmodule: "图集模型",
      sort: 2,
    },
  ];
  const dataSource=[
    {
      key:1,
      id:0,
      columnname:'关于我们'
    }
  ]

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows)  ;
    },
  };
  return <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
            添加栏目
      </Button>
      <Modal title="添加栏目"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      width="70%">
          <Button
            onClick={addModalcolumns}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            添加
          </Button>
          <Table
            // components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={Modalcolumns}
          />
      </Modal>
      <Modal title="编辑栏目"
      visible={iseditModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      width="70%">
          <Button
            onClick={addModalcolumns}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            添加
          </Button>
          <Table
            // components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={Modalcolumns}
          />
      </Modal>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />
    </div>
}

export default BasicSettings;

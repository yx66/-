import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Space, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { queryList } from "@/apis/blog"


const Home = () => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true)
  const [visible, setVisible] = useState(true)
  const [pages, setPages] = useState([])
  const [error, setError] = useState("")
  const { Search } = Input;


  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#0d6efd',
      }}
    />
  );

  const onSearch = value => console.log("search", value);

  const getPageDate = async () => {
    try {
      const responses = await queryList().then(pages => {
        setPages(pages.data.result)
        return pages.data.result
      })
      setPages(responses)
    } catch (error) {
      setError(Error.message)
      console.log("error", error)
    }
  }


  useEffect(() => {
    async function getAllPages() {
      try {
        getPageDate()
      } catch (error) {
        console.log("error :>>", error);
        setError(Error.message)
      }
    }
    getAllPages()

  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'zd',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'updated',
      dataIndex: 'updated',
      key: 'updated',
    }, {
      title: 'created',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button ghost type="primary">
            <Link to={{
              pathname: '/grapesJs/tempalePage/tempalePage', search: `?pageid=${record.id} `
            }}>see</Link>
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 mt-5'>
          <div className='modal-header'>
            <h5 className='modal-title' id='addPageModalLabel'>Tempale Page</h5>
          </div>
        </div>
        <div className='col-12 mt-5'>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <div className='col-12 my-2'>
          <Table columns={columns} dataSource={pages.rows} rowKey={record => record.id} />
        </div>
      </div>
    </div>
  )
}

export default Home

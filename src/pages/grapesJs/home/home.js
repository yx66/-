import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Space, Popconfirm, message, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { queryList, delPage, submitForm } from "@/apis/blog"
import "bootstrap";



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
  async function confirm(record) {
    try {
      await delPage({ id: record });
      getPageDate()
      console.log(record);
    } catch (error) {
      setError(Error.message)
      console.log("error", error)
    }
    message.success('Deleted successfully')
  }

  function cancel() {
    // message.error('Click on No');
  }
  // clear
  const clearForm = async () => {
    setName("");
    setIsValid(true)
    setVisible(true)
  }
  // save
  const handleSubmit = async () => {
    const pageName = pages.rows.map((page) => {
      return page.name
    })
    if (!name) {
      setIsValid(false)
      setVisible(true)
      return;
    }
    for (let i = 0; i < pageName.length; i++) {
      if (name === pageName[i]) {
        setVisible(false);
        return;
      }
    }
    await submitForm({ name: name });
    setName("");
    setIsValid(true)
    setVisible(true)
    message.success('Created successfully')
    getPageDate()

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
      key: 'id',
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
              pathname: '/grapesJs/editor', search: `?pageid=${record.id}&pagename=${record.name} `
            }}>Edit</Link>
          </Button>

          <Popconfirm
            title="Are you sure to delete this page?"
            onConfirm={() => confirm(record.id)}
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
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 mt-5'>
          <form id='create-page'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addPageModalLabel'>Create Page</h5>
            </div>
            <div className='modal-body'>
              <div className='col-auto'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input
                  type='text'
                  className={`form-control form-control-sm ${isValid ? "" : "is-invalid"
                    } ${visible ? "" : "is-invalid"}`}
                  id='name'
                  name='name'
                  placeholder='Name of Page'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isValid && (
                  <div className='invalid-feedback'>
                    Please provide a valid name.
                  </div>
                )}
                {!visible && (
                  <div className='invalid-feedback'>
                    Duplicate name, please re-enter
                  </div>
                )}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary btn-sm'
                onClick={clearForm}
              >
                Clear
              </button>
              <button type='button' className='btn btn-primary btn-sm'
                onClick={handleSubmit}
              >
                Save
              </button>

            </div>
          </form>
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
          {error && (
            <div role="alert" className="alert alert-primary">
              {error}
            </div>
          )}
          <Table columns={columns} dataSource={pages.rows} rowKey={record => record.id} />
        </div>
      </div>
    </div>
  )
}

export default Home

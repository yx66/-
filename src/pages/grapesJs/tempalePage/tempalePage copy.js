import React, {
  useState,
  useEffect
} from 'react'
import grapesjs from "grapesjs"
import { Breadcrumb } from 'antd';
import { urlLoadPage } from '@/apis/blog';


function getQueryVariable(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const result = window.location.search.substr(1).match(reg);
  if (result != null) {
    return decodeURI(result[2]);
  }
  return null;


}
const TempalePage = () => {
  const [error, setError] = useState("")
  const [editor, setEditor] = useState(null);
  const [pages, setPages] = useState([])
  // 页面ID是动态识别的的
  const pageId = getQueryVariable('pageid')
  const pagename = getQueryVariable('pagename')


  let contentPage = []
  const getPageDate = async () => {
    try {
      await urlLoadPage({
        id: pageId,
      }).then(pages => {
        setPages(pages.result)
        contentPage = pages.data.result
        if (pages.data.status === "ST200") {
          const LandingPage = {
            html: contentPage.gjs_html,
            css: contentPage.gjs_css,
            components: null,
            style: null,
          };
          const editor = grapesjs.init({
            container: '#tempalePage',
            fromElement: false,
            height: '100vh',
            width: "85vw",
            components: LandingPage.components || LandingPage.html,
            style: LandingPage.style || LandingPage.css,
            storageManager: {
              autoload: false,
            },
            panels: { defaults: [] },
          });
          setEditor(editor)
        }
        return contentPage
      })
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


  return (
    <div id='app'>
      <div className='modal-header'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/tempale">tempale</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>tempalePage</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div id='tempalePage'></div>
    </div>


  )
}


export default TempalePage


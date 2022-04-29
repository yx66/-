import React, {
  useState,
  useEffect
} from 'react'
import grapesjs from "grapesjs"
import gisBlocksBasic from "grapesjs-blocks-basic"
import gjsExport from "grapesjs-plugin-export"
import gjsNavbar from 'grapesjs-navbar'
import gjsTabs from 'grapesjs-tabs'
import gjsStyleBg from 'grapesjs-style-bg'
import gjsPluginExport from 'grapesjs-plugin-export'
import grapesjsblocksbootstrap from "grapesjs-blocks-bootstrap4"
import { styleManager, layerManager, traitManager, selectorManager, panels, deviceManager } from '@/pages/grapesJs/api_utils/geditor_utils'
import { urlLoadPage, urlStorePage } from '@/apis/blog';
import Sidebar from "@/components/Sidebar"
import $ from "jquery"
import { message } from 'antd';
import "bootstrap";


function getQueryVariable(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const result = window.location.search.substr(1).match(reg);
  if (result != null) {
    return decodeURI(result[2]);
  }
  return null;

}
console.log("tijiao",document.getElementById('tijiao'));
const Editor = () => {
  const [error, setError] = useState("")
  const [editor, setEditor] = useState(null);
  const [pages, setPages] = useState([])
  // 页面ID是动态识别的
  const pageId = getQueryVariable('pageid')
  const pagename = getQueryVariable('pagename')
  console.log("tijiao1",document.getElementById('tijiao'));
  const handleSubmit = async () => {
    await urlStorePage({
      name: pagename,
      id: pageId,
      gjs_assets: window.localStorage.getItem("gjs-assets"),
      gjs_components: window.localStorage.getItem("gjs-components"),
      gjs_css: window.localStorage.getItem("gjs-css"),
      gjs_html: window.localStorage.getItem("gjs-html"),
      gjs_styles: window.localStorage.getItem("gjs-css"),
      type: "advanced_page"
    });
  }
  let contentPage = []
  const getPageDate = async () => {
    try {
      await urlLoadPage({
        id: pageId
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
          console.log("tijiao2",document.getElementById('tijiao'));
          const editor = grapesjs.init({
            
            container: '#tempalePage',
            blockManager: {
              appendTo: '#blocks',
            },
            fromElement: false,
            height: '100vh',
            width: "70vw",
            components: LandingPage.components || LandingPage.html,
            style: LandingPage.style || LandingPage.css,
            storageManager: {
              autoload: false,
              autosave: false,
              stepsBeforeSave: 1,
              contentTypeJson: true,
              storeComponents: true,
              storeStyles: true,
              storeHtml: true,
              storeCss: true,
              type: 'local'
            },
            styleManager,
            layerManager,
            traitManager,
            selectorManager,
            panels,
            deviceManager,
            assetsMansger: { upload: true },
            plugins: [gisBlocksBasic, gjsNavbar, gjsExport, gjsTabs, gjsStyleBg, gjsPluginExport, grapesjsblocksbootstrap],
            pluginsOpts: {
              gisBlocksBasic: {},
              gjsNavbar: {},
              gjsExport: {},
              gjsTabs: {},
              gjsStyleBg: {},
              gjsPluginExport: {},
              grapesjsblocksbootstrap: {
                blocks: {
                  Forms:{
                    
                  }
                },
                blockCategories: {
                  // ...
                },
                labels: {
                  // ...
                },
              },
            },
            nvas: {
              yles: [
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
              ],
              ripts: [
                'https://code.jquery.com/jquery-3.3.1.slim.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
              ],
            },
          },
          );
          console.log("tijiao",document.getElementById('tijiao'));
          // 响应式布局
          // Commands
          editor.Commands.add('set-device-desktop', {
            run: (editor) => editor.setDevice('Desktop'),
          });
          editor.Commands.add('set-device-mobile', {
            run: (editor) => editor.setDevice('Mobile'),
          });

          // saveDb
          editor.Commands.add('saveDb', {
            run: (editor, sender) => {
              sender && sender.set('active');
              // console.log('ssss', pages);
              if (pages.data.status === 'ST200') {
                editor.store(res =>
                  handleSubmit()
                );
                message.success('Saved successfully')
              }

            }
          });
          // clear
          editor.Commands.add('cmd-clear', {
            run: (editor) => {
              editor.DomComponents.clear();
              editor.CssComposer.clear();
            }
          });
          // undo
          editor.Commands.add('undo', {
            run: (editor) => {
              editor.UndoManager.undo()
            },
          });
          // redo
          editor.Commands.add('redo', {
            run: (editor) => editor.UndoManager.redo(),
          });
          // export
          editor.Commands.add('export', {
            run: (editor) => editor.runCommand("gjs-export-zip"),
          });

          // Preview
          editor.on("run:preview", () => {
            console.log("It will trigger when we click on preview icon");
            editor.stopCommand("sw-visibility");
            $("#navbar").removeClass("sidebar");
            $("#main-content").removeClass("main-content");
            $("#main-content > .navbar-light").addClass("d-none");
          });
          editor.on("stop:preview", () => {
            console.log("It will trigger when we click on cancel preview icon");
            editor.runCommand("sw-visibility");
            $("#navbar").addClass("sidebar");
            $("#main-content").addClass("main-content");
            $("#main-content > .navbar-light").removeClass("d-none");
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
      <div id='navbar' className='sidenav d-flex flex-column overflow-scroll' style={{ top: "45px" }}>
        <nav className='navbar navbar-light'>
        </nav>
        <Sidebar />
      </div>
      <div className='main-content' id="main-content">
        <nav className='navbar navbar-light'>
          <div className='container-fluid'>
            <div className='panel__devices'></div>
            <div className='panel__editor'></div>
            <div className='panel__basic-actions'></div>
          </div>
        </nav>
        <div id='tempalePage'></div>
      </div>
    </div>

  )
}

export default Editor

import {Button, Input, Modal, notification, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {ManageAPI, SettingStore} from "../stores";
import {PiFunctionBold} from "react-icons/pi";
// import MonacoEditor from '@uiw/react-monacoeditor';
import {Editor, useMonaco} from "@monaco-editor/react";
import {CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, SaveOutlined} from "@ant-design/icons";

function langToEditorLang(lang: string) {
  switch (lang) {
    case 'js':
      return 'javascript'
    case 'ts':
      return 'typescript'
    case 'py':
      return 'python'
    case 'sh':
      return 'shell'
    default:
      return 'rust'
  }
}

export const NewFunctionModal = () => {
  const [open, setOpen] = useState(false);
  const [large, setLarge] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log('[Editor] Macro instance', monaco);
    }
  }, [monaco]);

  const [uid, setUid] = useState('');
  const [lang, setLang] = useState('js');
  const [code, setCode] = useState('');
  const handleOk = () => {
    ManageAPI.addTask({uid, lang, code}, SettingStore.getAxiosOptions()).catch(
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            notification.error({
              message: 'Unauthorised',
              description: 'Please make sure your credentials are correct',
              duration: 3
            });
          } else {
            notification.error({
              message: 'Management Failed',
              description: 'Error with ' + error.response.data,
              duration: 3
            });
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    )
    setOpen(false)
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" icon={<span className={"anticon"}><PiFunctionBold/></span>} onClick={showModal}>
        New Function
      </Button>
      <Modal
        open={open}
        title="Add Script as Function"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button icon={large ? <FullscreenExitOutlined/> : <FullscreenOutlined/>} key="large"
                  onClick={() => setLarge(!large)}>
            {large ? 'Small' : 'Large'}
          </Button>,
          <Button icon={<CloseOutlined/>} key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button icon={<SaveOutlined/>} key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
        width={large ? '100%' : undefined}
      >
        <Space direction={"vertical"} style={{width: "100%"}}>
          <Input addonBefore={"UID"} value={uid} onChange={(e) => setUid(e.target.value)}/>
          <Select
            value={lang}
            style={{width: '100%'}}
            onChange={(e) => setLang(e)}
            options={[
              {value: 'js', label: 'JavaScript'},
              {value: 'ts', label: 'TypeScript'},
              {value: 'py', label: 'Python'},
              {value: 'sh', label: 'Shell'}]}
          />
          <Editor
            language={langToEditorLang(lang)}
            //value={code}
            onChange={(v) => v && setCode(v)}
            //style={{minHeight: '100px'}}
            height={ large ? '50vh' :'30vh'}

            theme={SettingStore.DefaultTheme() === 'dark' ? 'vs-dark' : 'vs'}
          />
        </Space>
      </Modal>
    </>
  )
}
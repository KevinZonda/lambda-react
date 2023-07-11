import {Button, Input, Modal, notification, Select, Space} from "antd";
import {useState} from "react";
import {ManageAPI, SettingStore} from "../stores";
import {AppstoreAddOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";


export const NewFunctionModal = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

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
              duration: 3});
          } else {
            notification.error({
              message: 'Management Failed',
              description: 'Error with ' + error.response.data,
              duration: 3});
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
      <Button type="primary" icon={<AppstoreAddOutlined />} onClick={showModal}>
        New Function
      </Button>
      <Modal
        open={open}
        title="Add Script as Function"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Space direction={"vertical"} style={{width: "100%"}}>
          <Input addonBefore={"UID"} value={uid} onChange={(e) => setUid(e.target.value)}/>
          <Select
            value={lang}
            style={{ width: '100%' }}
            onChange={(e) => setLang(e)}
            options={[{ value: 'js', label: 'JavaScript' }, { value: 'ts', label: 'TypeScript' }, { value: 'py', label: 'Python' }, {value: 'sh', label: 'Shell'}]}
          />          <TextArea value={code} onChange={(e) => setCode(e.target.value)}/>
        </Space>
      </Modal>
    </>
  )
}
import {observer} from "mobx-react-lite";
import {Button, Input, Modal} from "antd";
import {useState} from "react";
import {SettingStore, StatusStore} from "../stores";
import {SettingOutlined} from "@ant-design/icons";


export const SettingModal = observer(() => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [endpoint, setEndpoint] = useState(SettingStore.getEndPoint());
  const handleOk = () => {
    //setLoading(true);
    SettingStore.setEndPoint(endpoint)
    StatusStore.fetchStatus()
    setOpen(false)
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" icon={<SettingOutlined />} onClick={showModal}>
        Configuration
      </Button>
      <Modal
        open={open}
        title="Configuration"
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
        <Input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
      </Modal>
    </>
  )
})
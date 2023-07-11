import {useEffect} from "react";
import {ManageAPI, SettingStore, StatusStore} from "../stores";
import {observer} from "mobx-react-lite";
import {Button, notification, Space, Table, Tag, Typography} from "antd";
import {StatusItem} from "../api";
import type {ColumnsType} from 'antd/es/table';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PoweroffOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  SyncOutlined
} from "@ant-design/icons";
import {useInterval} from "usehooks-ts";
import {SettingModal} from "./SettingModal.tsx";
import {NewFunctionModal} from "./NewFunctionModal.tsx";

const {Link} = Typography;

const mapKind = (kind: string | undefined) => {
  if (kind === undefined) return ""
  switch (kind) {
    case 'http_binary':
      return "HTTP Gateway"
    case 'exec_binary':
      return "Executable"
    case 'exec_script':
      return "Script"
  }
  return kind
}

export const StatusPage = () => {
  return (
    <div style={{width: '100%', maxWidth: '100vw'}}>
      <div style={{textAlign: 'center'}}>
        <Typography.Title level={3}>λ by KevinZonda</Typography.Title>
      </div>
      <div style={{marginLeft: '20px', marginRight: '20px'}}>
        <ControlPanel/>
        <StatusList/>
      </div>
    </div>
  )
}

const ControlPanel = observer(() => {
  return (
    <Space style={{marginBottom: '8px'}}>
      <Button icon={<ReloadOutlined/>} onClick={() => StatusStore.fetchStatus()}>Refresh</Button>
      <NewFunctionModal/>
      <SettingModal/>
    </Space>
  )
})

const columns: ColumnsType<StatusNode> = [
  {
    title: 'UID',
    dataIndex: 'uid',
    key: 'uid',
  },
  {
    title: 'Kind',
    dataIndex: 'kind',
    key: 'kind',
    render: (_, {kind}) => (
      <p>{mapKind(kind)}</p>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, {status}) => (
      <>
        {
          status === 'live' ?
            <Tag icon={<CheckCircleOutlined/>} color="success">Running</Tag>
            : status === 'idle'
              ? <Tag icon={<SyncOutlined spin/>} color="processing">Idle</Tag>
              : status === 'unloaded'
                ? <Tag icon={<InfoCircleOutlined/>} color="blue">Unloaded</Tag>
                : status === 'nil'
                  ? <Tag icon={<CloseCircleOutlined/>} color="error">Nil</Tag>
                  : status === 'unavailable'
                    ? <Tag icon={<QuestionCircleOutlined/>} color="default">Unavailable</Tag>
                    : status === 'freeze'
                      ? <Tag icon={<PoweroffOutlined/>} color="default">Disabled</Tag>
                      : status === 'unknown'
                        ? <Tag icon={<ExclamationCircleOutlined/>} color="warning">Unknown</Tag>
                        : <Tag icon={<CloseCircleOutlined/>} color="error">Error</Tag>
        }
      </>
    ),
  },
  {
    title: 'Life Cycle',
    children: [
      {
        title: 'Last Trig',
        key: 'lastTrig',
        dataIndex: 'lastTrig',
        render: (_, {lastTrig}) => (
          <p>{lastTrig ? new Date(lastTrig).toLocaleString() : '-'}</p>
        ),
      },
      {
        title: 'Keep Until',
        key: 'keepUntil',
        dataIndex: 'keepUntil',
        render: (_, {keepUntil}) => (
          <p>{keepUntil ? new Date(keepUntil).toLocaleString() : '-'}</p>
        ),
      },
    ]
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, n) => (
      <Space size="middle">
        <Link disabled={n.status === 'live'} onClick={() => manage('run', n.uid)}>Run</Link>
        <Link disabled={n.status !== 'live'} onClick={() => manage('stop', n.uid)}>Stop</Link>
        <Link disabled={n.status === 'freeze'} onClick={() => manage('freeze', n.uid)}>Disable</Link>
        <Link disabled={n.status !== 'freeze'} onClick={() => manage('unfreeze', n.uid)}>Enable</Link>
        <Link onClick={() => manage('del', n.uid)}>Remove</Link>
      </Space>
    ),
  },
];

function manage(oper: string, uid: string) {
  ManageAPI.manageTask({oper, uid}, SettingStore.getAxiosOptions()).catch(
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
  StatusStore.fetchStatus()
}

export const StatusList = observer(() => {
  useEffect(() => {
    StatusStore.fetchStatus()
  }, [])
  useInterval(
    () => {
      StatusStore.fetchStatus()
    },
    5000
  )
  return (
    <>
      <Table
        style={{width: '100%', lineHeight: '1'}}
        dataSource={statusItemToArr(StatusStore.status)}
        columns={columns}
        size={"small"}
      />
    </>
  )
})

function statusItemToArr(rs: Record<string, StatusItem>): StatusNode[] {
  const arr: StatusNode[] = []
  for (const uid in rs) {
    const vv = rs[uid]
    arr.push({
      status: vv.status ?? 'unknown',
      uid: uid,
      kind: vv.kind ?? 'unknown',
      lastTrig: vv.last_trig_at,
      keepUntil: vv.keep_until
    })
  }
  return arr
}


interface StatusNode {
  status: string
  uid: string
  kind: string
  lastTrig: string | undefined
  keepUntil: string | undefined
}

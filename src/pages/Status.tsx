import {useEffect} from "react";
import {ManageAPI, StatusStore} from "../stores";
import {observer} from "mobx-react-lite";
import {Button, Space, Table, Tag, Typography} from "antd";
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

const {Link} = Typography;

export const StatusPage = () => {
  return (
    <div style={{width: '100%'}}>
      <Typography.Title level={3}>λ by KevinZonda Status</Typography.Title>
      <StatusList/>
    </div>
  )
}

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
        <Link disabled={n.status === 'freeze'} onClick={() => manage('freeze', n.uid)}>Disable</Link>
        <Link disabled={n.status !== 'freeze'} onClick={() => manage('unfreeze', n.uid)}>Enable</Link>
        <Link onClick={() => manage('del', n.uid)}>Remove</Link>
      </Space>
    ),
  },
];

function manage(oper: string, uid: string) {
  ManageAPI.manageTask({oper, uid})
  StatusStore.fetchStatus()
}

export const StatusList = observer(() => {
  useEffect(() => {
    StatusStore.fetchStatus()
  }, [])
  return (
    <>
      <Button icon={<ReloadOutlined/>} onClick={() => StatusStore.fetchStatus()}>Refresh</Button>
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

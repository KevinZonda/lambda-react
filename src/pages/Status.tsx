import {useEffect} from "react";
import {StatusStore} from "../stores";
import {observer} from "mobx-react-lite";
import {Button, Table, Tag, Typography} from "antd";
import {StatusItem} from "../api";
import type {ColumnsType} from 'antd/es/table';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";

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
            <Tag icon={<CheckCircleOutlined/>} color="success">success</Tag>
            : status === 'idle'
              ? <Tag icon={<SyncOutlined spin/>} color="processing">Idle</Tag>
              : status === 'unloaded'
                ? <Tag icon={<ClockCircleOutlined/>} color="default">Unloaded</Tag>
                : status === 'nil'
                  ? <Tag icon={<CloseCircleOutlined/>} color="error">Nil</Tag>
                  : status === 'unavailable'
                    ? <Tag icon={<ExclamationCircleOutlined/>} color="default">Unavailable</Tag>
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
];


export const StatusList = observer(() => {
  useEffect(() => {
    StatusStore.fetchStatus()
  }, [])
  return (
    <>
      <Button onClick={() => StatusStore.fetchStatus()}>Refresh</Button>
      <Table
        style={{width: '100%'}}
        dataSource={statusItemToArr(StatusStore.status)}
        columns={columns}/>
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

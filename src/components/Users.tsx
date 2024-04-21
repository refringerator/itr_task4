import React, { useState } from "react";
import { Button, Table, Flex } from "antd";
import type { TableColumnsType } from "antd";
import { DeleteFilled, LockFilled, UnlockFilled } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  id: string;
  email: string;
  lastLogin: string;
  status: "Active" | "Blocked";
}

const columns: TableColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "e-Mail",
    dataIndex: "email",
  },
  {
    title: "Last login",
    dataIndex: "lastLogin",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const data: DataType[] = [];

  return (
    <>
      <Flex align="center" gap="small">
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
          icon={<LockFilled />}
          ghost
        >
          Block
        </Button>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
          icon={<UnlockFilled />}
          ghost
        ></Button>
        <Button
          danger
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
          icon={<DeleteFilled />}
          ghost
        ></Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </Flex>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  );
};

export default App;

import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

import CommandPanel from "./CommandPanel";
import { SupabaseContext } from "../Context";

interface DataType {
  id: string;
  email: string;
  lastlogin: string;
  status: "Active" | "Blocked";
}

const columns: TableColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "e-Mail",
    dataIndex: "email",
    width: 100,
  },
  {
    title: "Last login",
    dataIndex: "lastlogin",
    width: 15,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 15,
  },
];

const Users = () => {
  const supabase = useContext(SupabaseContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc("get_users");

      if (error) return;

      // const d = data.map((da) => ({
      //   id: da.id,
      //   email: da.email,
      //   lastLogin: "",
      //   status: "",
      // }));
      setData(data);
    };

    fetchData();

    supabase.rpc("get_users").then(({ data, error }) => {
      console.log({ data, error });
    });
  }, []);

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

  return (
    <>
      <CommandPanel
        rowsSelected={hasSelected}
        loading={loading}
        block={start}
        unblock={start}
        remove={start}
      />
      <Table
        bordered
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default Users;

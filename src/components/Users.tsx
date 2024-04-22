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
  const { supabase, session } = useContext(SupabaseContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc("get_users");
      if (error) return;
      setData(data);
    };
    fetchData();
  }, [supabase]);

  const rpc_function = async (function_name: string) => {
    setLoading(true);
    const { data, error } = await supabase.rpc(function_name, {
      user_ids: selectedRowKeys,
    });
    if (!error) setData(data);
    setLoading(false);

    if (selectedRowKeys.some((id) => id === session?.user.id))
      supabase.auth.refreshSession();
    setSelectedRowKeys([]);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
        block={() => rpc_function("block_users")}
        unblock={() => rpc_function("unblock_users")}
        remove={() => rpc_function("delete_users")}
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

import { Button, Flex } from "antd";
import { DeleteFilled, LockFilled, UnlockFilled } from "@ant-design/icons";
import PopConfirm from "./PopConfirm";

interface ICommandPanel {
  rowsSelected: boolean;
  loading: boolean;
  block: () => void;
  unblock: () => void;
  remove: () => void;
}

const CommandPanel = ({
  rowsSelected,
  loading,
  block,
  unblock,
  remove,
}: ICommandPanel) => {
  return (
    <Flex align="center" gap="small" style={{ marginBottom: 8 }}>
      <Button
        type="primary"
        onClick={block}
        disabled={!rowsSelected}
        loading={loading}
        icon={<LockFilled />}
        ghost
      >
        Block
      </Button>
      <Button
        type="primary"
        onClick={unblock}
        disabled={!rowsSelected}
        loading={loading}
        icon={<UnlockFilled />}
        ghost
      />
      <PopConfirm
        onConfirm={remove}
        description="Are you sure to delete selected users?"
        title="Delete users"
      >
        <Button
          danger
          disabled={!rowsSelected}
          loading={loading}
          icon={<DeleteFilled />}
          ghost
        />
      </PopConfirm>
    </Flex>
  );
};

export default CommandPanel;

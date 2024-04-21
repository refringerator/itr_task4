import { Button, Flex } from "antd";
import { DeleteFilled, LockFilled, UnlockFilled } from "@ant-design/icons";

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
      ></Button>
      <Button
        danger
        onClick={remove}
        disabled={!rowsSelected}
        loading={loading}
        icon={<DeleteFilled />}
        ghost
      ></Button>
    </Flex>
  );
};

export default CommandPanel;

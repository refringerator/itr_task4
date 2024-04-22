import { Popconfirm } from "antd";

interface PopConfirmProps {
  title: string;
  description: string;
  onConfirm: () => void;
}

const PopConfirm = ({
  children,
  title,
  description,
  onConfirm,
}: React.PropsWithChildren<PopConfirmProps>) => (
  <Popconfirm
    title={title}
    placement="bottom"
    description={description}
    onConfirm={onConfirm}
    okText="Yes"
    cancelText="No"
  >
    {children}
  </Popconfirm>
);

export default PopConfirm;

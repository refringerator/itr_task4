import { ConfigProvider } from "antd";
import { theme } from "antd";
import { PropsWithChildren } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

const AntConfigProvider = ({ children }: PropsWithChildren) => {
  const isExtraLargeDevice = useMediaQuery("(prefers-color-scheme: dark)");
  const { darkAlgorithm } = theme;
  const changedTheme = {
    algorithm: isExtraLargeDevice ? [darkAlgorithm] : [],
  };

  return <ConfigProvider theme={changedTheme}>{children}</ConfigProvider>;
};

export default AntConfigProvider;

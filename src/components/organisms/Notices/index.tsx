import { useNotices } from "@/context/notices-context";
import NoticesList from "./list";
import Subscription from "./Info";

export default function Notices() {
  const { module } = useNotices();

  const modules = {
    list: <NoticesList />,
    subscription: <Subscription />,
  };
  const moduleComponent = modules[module as keyof typeof modules];

  return <div>{moduleComponent}</div>;
}

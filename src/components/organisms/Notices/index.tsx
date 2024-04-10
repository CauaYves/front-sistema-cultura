"use strict";
import { useNotices } from "@/context/notices-context";
import NoticesList from "./list";
import Subscription from "./Info";
import { Typography } from "@mui/material";
import Proposal from "./proposal";
import Enrollment from "./enrollment";

export default function Notices() {
  const { module } = useNotices();

  const modules = {
    list: <NoticesList />,
    subscription: <Subscription />,
    proposal: <Proposal />,
    enrollment: <Enrollment />,
  };
  const moduleComponent = modules[module as keyof typeof modules];

  return (
    <div>
      <Typography variant="body1" sx={{ mb: "10px" }}>
        Arraiá Cultural RJ 4
      </Typography>
      {moduleComponent}
    </div>
  );
}

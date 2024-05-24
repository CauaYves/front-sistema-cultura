"use strict";
import { useNotices } from "@/context/notices-context";
import NoticesList from "./list";
import Subscription from "./Info";
import { Typography } from "@mui/material";
import Proposal from "./proposal";
import Enrollment from "./enrollment";
import { useEffect, useState } from "react";
import { getLocation } from "@/app/api";
import noticesFunctions from "./functions";

export default function Notices() {
  const { module } = useNotices();
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!city) return noticesFunctions.fetchUserCity(setCity);
    }
    fetchData();
  }, [city]);

  return (
    <div>
      <Typography variant="body1" sx={{ mb: "10px" }}>
        Arraiá Cultural RJ 4
      </Typography>
    </div>
  );
}

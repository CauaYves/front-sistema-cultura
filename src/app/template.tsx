"use client";
import { Box } from "@mui/material";
import { UserDataProvider } from "@/context/user-context";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box>
      <UserDataProvider>{children}</UserDataProvider>
    </Box>
  );
}

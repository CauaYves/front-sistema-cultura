import { Box, Paper, styled } from "@mui/material";
import { ReactNode } from "react";

export default function PaddingBox({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Box>
      <PBox>{children}</PBox>
    </Box>
  );
}

const PBox = styled(Paper)`
  padding: 10px 30px 0px 10px;
  margin-right: 30px;
`;

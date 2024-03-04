import React, { HTMLAttributes } from "react";
import { Divider } from "@mui/material";

interface CustomDividerProps extends HTMLAttributes<HTMLHRElement> {
  thickness?: number;
  color?: string;
  width?: string | number;
  margin?: string | number;
}

const CustomDivider = (props: CustomDividerProps) => {
  return <Divider {...props} sx={{ ...props }} />;
};

export default CustomDivider;

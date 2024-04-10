import { Box, Link, Typography } from "@mui/material";

export default function BidderHandbook() {
  return (
    <Box>
      <Typography variant="body1">Manual do Proponente</Typography>
      <ol>
        <li>
          <Typography>
            Clique aqui para fazer o download do
            <Link href="#"> Manual do Proponente</Link>.
          </Typography>
        </li>
      </ol>
    </Box>
  );
}

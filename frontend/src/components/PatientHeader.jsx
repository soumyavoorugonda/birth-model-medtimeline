import { Box, Typography, Avatar } from "@mui/material";

function PatientHeader({ patientId }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 4,
        p: 5,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Avatar />

      <Box>
        <Typography variant="h4" color="text.secondary">
          Patient details
        </Typography>
        <Typography variant="h6">{patientId}</Typography>
      </Box>
    </Box>
  );
}

export default PatientHeader;

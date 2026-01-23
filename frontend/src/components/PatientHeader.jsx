import {Card, Box, Typography, Avatar, Chip, Stack} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function PatientHeader({ patientId, name = "Olivia Doe", age = 29 }) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
      }}
    >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1.5,
        gap: 2,
      }}
    >
      <Avatar
          sx={{
            bgcolor: "#f0f0f0",
            color: "#666",
            width: 44,
            height: 44,
          }}
        >
            <PersonIcon />
        </Avatar>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" color="#020a08" fontWeight={600}>
          Patient details
        </Typography>
        <Typography variant="body1">
            ID: {patientId} • Name: {name} • Age: {age}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1}>
          <Chip
            label="Active"
            size="small"
            sx={{
              bgcolor: "#e8f5e9",
              color: "#2e7d32",
              fontWeight: 500,
            }}
          />
          <Chip
            label="OB Patient"
            size="small"
            sx={{
              bgcolor: "#e3f2fd",
              color: "#1565c0",
              fontWeight: 500,
            }}
          />
        </Stack>
    </Box>
  </Card>
);
}

export default PatientHeader;

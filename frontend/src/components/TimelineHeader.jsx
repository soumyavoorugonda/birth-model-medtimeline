import { Box, Typography } from "@mui/material";

function TimelineHeader({ monthMarkers, todayX }) {
  return (
    <Box sx={{ position: "relative", height: 36, width: "100%", overflow: "hidden" }}>
      {/* Month boundary lines + labels */}
      {monthMarkers.map((m) => (
        <Box key={m.label} sx={{ 
            position: "absolute", 
            left: m.x, 
            top: 0, 
            bottom: 0 }}>
          <Box sx={{ 
            position: "absolute", 
            left: 0, 
            top: 0, 
            bottom: 0, 
            width: 1, 
            bgcolor: "#eee", 
            zIndex: 1 }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ position: "absolute", top: 0, left: 6, whiteSpace: "nowrap" }}
          >
            {m.label}
          </Typography>
        </Box>
      ))}

      {/* Today marker */}
      {Number.isFinite(todayX) && todayX >= 0 && (
        <Box sx={{ 
            position: "absolute", 
            left: todayX, 
            top: 0, 
            bottom: 0 }}>
          <Box sx={{ 
            position: "absolute", 
            left: 0, 
            top: 0, 
            bottom: 0, 
            width: 2, 
            bgcolor: "#cfcfcf", 
            zIndex: 2 }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ 
                position: "absolute", 
                top: 18, 
                left: 6, 
                whiteSpace: "nowrap" }}
          >
            Today
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default TimelineHeader;
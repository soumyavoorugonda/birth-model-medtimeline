import { Box, Typography } from "@mui/material";
import {format} from "date-fns";

function TimelineHeader({ monthMarkers, todayX }) {
    const todayLabel = format(new Date(), "MMM d, yyyy");
  return (
    <Box sx={{ position: "relative", height: 36, width: "100%", overflow: "visible", }}>
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
                zIndex: 0 }} />
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 10,
                    whiteSpace: "nowrap" }}
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
            bottom: 0,
            zIndex: 1 }}>
          <Box sx={{ 
            position: "absolute", 
            left: 0, 
            top: 0, 
            bottom: 0, 
            width: 2, 
            bgcolor: "#cfcfcf", 
            zIndex: 1 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ 
                px: 1,
                py: 0.25,
                borderRadius: 1,
                border: "1px solid #cfd8dc",
                backgroundColor: "#fafafa",
                fontWeight: 500,
                whiteSpace: "nowrap",
                color: "#40887d",
                }}
          >
            Today: {format(new Date(), "MMM dd, yyyy")}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default TimelineHeader;
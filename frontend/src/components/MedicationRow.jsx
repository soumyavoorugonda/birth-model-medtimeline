import { Box, Typography, Chip } from "@mui/material";
import TimelineBar from "./TimelineBar.jsx";

function MedicationRow({timeline, timelineStart, timelineEnd, monthMarkers, todayX, todayDate, dayWidth = 3, gridTemplateColumns}) {
    const markers = monthMarkers;
    return (
        <Box
        sx={{
            display: "grid",
            gridTemplateColumns: gridTemplateColumns,
            alignItems: "center",
            py: 0.7,
            borderBottom: "1px solid #f0f0f0",
        }}
        >
        {/* LEFT */}
        <Typography fontWeight={600}>
            {timeline.medication_name}
            {timeline.records.length > 1 && (
                <Chip 
                    label={`${timeline.records.length} records`}
                    size="small"
                    color="warning"
                    sx={{ ml: 1 }}
                />
            )}
        </Typography>

        {/* TIMELINE */}
        <Box sx={{ 
            position: "relative", 
            height: "auto", 
            minHeight: 30,
            overflow: "visible" 
        }}>
            {/* Month grid lines extending down */}
            {(markers ?? []).map((m) => (
                <Box
                    key={`grid-${m.label}`}
                    sx={{
                        position: "absolute",
                        left: m.x,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        bgcolor: "#e0e0e0", // Light gray in rows
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                />
            ))}

            {/* Bars */}
            <Box sx={{ position: "relative", zIndex: 10 }}>
                <TimelineBar
                    timeline={timeline}
                    timelineStart={timelineStart}
                    timelineEnd={timelineEnd}
                    dayWidth={dayWidth}
                    todayDate={todayDate}
                />
            </Box>

            {/* Today line (topmost) */}
            {Number.isFinite(todayX) && todayX >= 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        left: todayX,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        bgcolor: "#9e9e9e",
                        zIndex: 5,
                        pointerEvents: "none",
                    }}
                />
            )}
        </Box>

        {/* RIGHT (mirror) */}
        <Box sx={{ pl: 2 }}>
            <Typography fontWeight={600}>
            {timeline.medication_name}
            </Typography>
        </Box>

        {/* DOSE */}
        <Typography variant="body2" color="text.secondary">
            {timeline.displayDose}
        </Typography>
        </Box>
    );
}

export default MedicationRow;
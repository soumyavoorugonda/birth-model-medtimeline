import { useMemo, useState } from "react";
import { Box, Typography, Chip, Drawer, Divider} from "@mui/material";
import TimelineBar from "./TimelineBar.jsx";
import { format } from "date-fns";


function fmtDate(d) {
  if (!d) return "ongoing";
  // d can be string or Date
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return String(d);
  return date.toISOString().slice(0, 10);
}

function MedicationRow({timeline, timelineStart, timelineEnd, monthMarkers, todayX, todayDate, dayWidth = 3, gridTemplateColumns}) {
    const markers = monthMarkers;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const hasSourceConflict = useMemo(() => {
        if (!timeline?.records || timeline.records.length <= 1) return false;
        const sources = new Set(timeline.records.map(r => r.source));
        return sources.size > 1;
    }, [timeline]);
    const conflictReason = useMemo(() => {
        if (!hasSourceConflict) return null;

        const sources = Array.from(new Set(timeline.records.map(r => r.source)));
        const doses = new Set(timeline.records.map(r => r.dose));
        
        if (doses.size > 1) {
            return `Multiple sources (${sources.join(", ")}) with different doses.`;
        }
        return `Same medication documented by multiple sources: ${sources.join(", ")}`;
    }, [timeline, hasSourceConflict]);
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
            {hasSourceConflict && ( // Changed from timeline.records.length > 1
                <Chip
                    label="source conflict"
                    size="small"
                    color="warning"
                    clickable
                    onClick={(e) => {
                        e.stopPropagation();
                        setDrawerOpen(true);
                    }}
                />
            )}
        </Typography>

        {/* TIMELINE */}
        <Box sx={{ 
            position: "relative", 
            height: "auto", 
            minHeight: 30,
            overflowX: "visible" 
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

            {/* Today line */}
            {Number.isFinite(todayX) && todayX >= 0 && (
            <>

            <Box sx={{ 
                position: "absolute", 
                left: todayX, 
                top: 0, 
                bottom: 0 }}>
                <Box sx={{ 
                    position: "absolute", 
                    left: 0, top: 0, 
                    bottom: 0, 
                    width: 2, 
                    bgcolor: "#9e9e9e", 
                    zIndex: 2 
                    }} />
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ position: "absolute", top: 18, left: 6, whiteSpace: "nowrap" }}
                >
                </Typography>
            </Box>
  </>
)}
        </Box>

        {/* RIGHT */}
        <Box sx={{ pl: 2 }}>
            <Typography fontWeight={600}>
            {timeline.medication_name}
            </Typography>
        </Box>


        {/* Drawer (details panel) */}
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
        >
            <Box sx={{ width: 420, p: 2 }}>
            <Typography variant="h6">{timeline.medication_name}</Typography>

            {conflictReason && (
                <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                {conflictReason}
                </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Records
            </Typography>

            <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 2 }}>
                {Array.from(new Set(timeline.records.map(r => r.source))).map(source => {
                    const sourceRecords = timeline.records
                    .filter(r => r.source === source)
                    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
                    
                    return (
                    <Box 
                        key={source} 
                        sx={{
                        p: 1.5, 
                        bgcolor: "#f5f5f5", 
                        borderRadius: 1 
                        }}>

                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                        {source} ({sourceRecords.length} record{sourceRecords.length > 1 ? 's' : ''})
                        </Typography>
                        
                        {sourceRecords.map((r, idx) => (
                        <Box
                            key={r.id}
                            sx={{
                            p: 1.25,
                            mb: idx < sourceRecords.length - 1 ? 1 : 0,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            bgcolor: "white",
                            }}
                        >
                            <Typography variant="body2">
                            {fmtDate(r.start_date)} → {fmtDate(r.end_date)}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Dose: {r.dose}
                            </Typography>
                            <Typography variant="body2">Route: {r.route}</Typography>
                            {r.reason && (
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                                {r.reason}
                            </Typography>
                            )}
                        </Box>
                        ))}
                        
                        {sourceRecords.length > 1 && (
                        <Typography variant="caption" color="warning" sx={{ mt: 0.5, display: "block" }}>
                            ↑ Dose change
                        </Typography>
                        )}
                    </Box>
                    );
                })}
                </Box>

            </Box>
        </Drawer>
    </Box>
    );
}

export default MedicationRow;
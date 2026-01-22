import { Box, Tooltip } from "@mui/material";
import { dayOffset } from "../timeline/dateUtils";

function clampDate(d, min, max) {
  return d < min ? min : d > max ? max : d;
}

function TimelineBar({ timeline, timelineStart, timelineEnd, dayWidth, todayDate }) {
  const MIN_BAR_PX = 6;

  // Group records by source
  const recordsBySource = {};
  timeline.records.forEach(record => {
    if (!recordsBySource[record.source]) {
      recordsBySource[record.source] = [];
    }
    recordsBySource[record.source].push(record);
  });

  // Sort each source's records by start date
  Object.keys(recordsBySource).forEach(source => {
    recordsBySource[source].sort((a, b) => 
      new Date(a.start_date) - new Date(b.start_date)
    );
  });

  const sources = Object.keys(recordsBySource);

  // Extract numeric dose
  const getDoseValue = (doseStr) => {
    const match = doseStr.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Get all dose values for color scaling
  const allDoses = timeline.records.map(r => getDoseValue(r.dose));
  const minDose = Math.min(...allDoses);
  const maxDose = Math.max(...allDoses);

  return (
    <Box sx={{ position: "relative", height: sources.length * 20, minHeight: 20 }}>
      {sources.map((source, sourceIdx) => {
        const records = recordsBySource[source];
        
        return (
          <Box key={source} sx={{ position: "relative" }}>
            {records.map((record, idx) => {
              const start = new Date(record.start_date);
              const end = record.end_date ? new Date(record.end_date) : todayDate;

              if (end < timelineStart || start > timelineEnd) return null;

              const startClamped = clampDate(start, timelineStart, timelineEnd);
              const endClamped = clampDate(end, timelineStart, todayDate);

              const leftPx = dayOffset(timelineStart, startClamped) * dayWidth;
              const widthPx = Math.max((dayOffset(startClamped, endClamped) + 1) * dayWidth, MIN_BAR_PX);

              // Calculate opacity based on dose
              const doseValue = getDoseValue(record.dose);
              const intensity = maxDose > minDose 
                ? (doseValue - minDose) / (maxDose - minDose) 
                : 0.5;
              const opacity = 0.4 + (intensity * 0.5);

              return (
                <Tooltip
                  key={record.id}
                  title={`${record.dose}, ${source}, ${record.start_date} → ${record.end_date || 'ongoing'}`}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: sourceIdx * 18, // All segments for same source at same height
                      left: leftPx,
                      width: widthPx,
                      height: 16,
                      borderRadius: 1,
                      backgroundColor: "#4fb6d6",
                      opacity: opacity,
                      border: "1px solid white",
                      zIndex: 100,
                      '&:hover': { 
                        opacity: 1, 
                        zIndex: 200,
                        boxShadow: 2
                      }
                    }}
                  />
                </Tooltip>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}

export default TimelineBar;
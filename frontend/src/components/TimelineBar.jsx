import { Box, Tooltip } from "@mui/material";
import { dayOffset } from "../timeline/dateUtils";

function clampDate(d, min, max) {
  return d < min ? min : d > max ? max : d;
}

function TimelineBar({ timeline, timelineStart, timelineEnd, dayWidth, todayDate }) {
  const MIN_BAR_PX = 6;
  const BASE_COLOR = "#4fb6d6";

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

  return (
    <Box sx={{ position: "relative", height: sources.length * 20, minHeight: 20 }}>
      {sources.map((source, sourceIdx) => {
        const records = recordsBySource[source];
        const baselineDose = getDoseValue(records[0].dose);
        
        return (
          <Box 
            key={source} 
            sx={{ position: "relative" }}>
            {records.map((record, idx) => {
                const parseLocalDate = (dateStr) => {
                    if (!dateStr) return null;
                    const [year, month, day] = dateStr.split('-');
                    return new Date(year, month - 1, day); // Months are 0-indexed
                    };
              const start = parseLocalDate(record.start_date);
              const end = record.end_date ? parseLocalDate(record.end_date) : todayDate;

              if (end < timelineStart || start > timelineEnd) return null;
              const effectiveEnd = end > todayDate ? todayDate : end;
        
              const startClamped = clampDate(start, timelineStart, timelineEnd);
              const endClamped = clampDate(effectiveEnd, timelineStart, timelineEnd);

              const leftPx = dayOffset(timelineStart, startClamped) * dayWidth;
              const isOngoing = !record.end_date;
              const widthPx = isOngoing 
                ? Math.max(dayOffset(startClamped, endClamped) * dayWidth, MIN_BAR_PX)
                : Math.max((dayOffset(startClamped, endClamped) + 1) * dayWidth, MIN_BAR_PX);

              // Calculate opacity based on dose change from baseline
              const currentDose = getDoseValue(record.dose);
              let opacity;
              
              if (currentDose === baselineDose) {
                // No change - base opacity
                opacity = 0.7;
              } else if (currentDose > baselineDose) {
                // Dose increase - darker
                const increase = (currentDose - baselineDose) / baselineDose;
                opacity = Math.min(0.7 + (increase * 0.3), 1.0);
              } else {
                // Dose decrease - lighter
                const decrease = (baselineDose - currentDose) / baselineDose;
                opacity = Math.max(0.7 - (decrease * 0.3), 0.4);
              }

              return (
                <Tooltip
                  key={record.id}
                  title={`${record.frequency}, ${record.dose}, ${record.source}, ${record.start_date} → ${record.end_date || 'ongoing'}`}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: sourceIdx * 18, // All segments for same source at same height
                      left: leftPx,
                      width: widthPx,
                      height: 17,
                      borderRadius: 0,
                      backgroundColor: BASE_COLOR,
                      opacity: opacity,
                      border: "none",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                      zIndex: 100,
                      '&:hover': { 
                        opacity: 1.0,
                        border: "1px solid #000", 
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
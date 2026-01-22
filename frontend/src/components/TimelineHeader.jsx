import { Box, Typography } from "@mui/material";
import { MONTH_WIDTH, DAY_WIDTH } from "../timeline/timelineConfig";
import {addMonths, format, isBefore, startOfMonth, differenceInCalendarDays} from "date-fns";

// function TimelineHeader({timelineStart, timelineEnd, dayWidth}) {
//     const firstMonth = startOfMonth(timelineStart);
//     const monthStarts = [];
//     for (let d = firstMonth; isBefore(d, timelineEnd); d = addMonths(d, 1)) {
//       monthStarts.push(d);
//     }
//     return (
//     <Box sx={{ position: "relative", height: 32 }}>
//       {monthStarts.map((m) => {
//         const left = differenceInCalendarDays(m, timelineStart) * dayWidth;
//         return (
//           <Box key={m.toISOString()} sx={{ position: "absolute", left }}>
//             <Typography variant="caption">{format(m, "MMM yyyy")}</Typography>
//           </Box>
//         );
//       })}
//     </Box>
//   );
//     // return (
//     //     <Box
//     //     sx={{
//     //         display: "flex",
//     //         height: 32,
//     //     }}
//     //     >
//     //     {Array.from({ length: monthsVisible }).map((_, i) => {
//     //         const monthDate = addMonths(timelineStart, i);

//     //         return (
//     //         <Box
//     //             key={i}
//     //             sx={{
//     //             width: MONTH_WIDTH,
//     //             flexShrink: 0,   
//     //             textAlign: "center",
//     //             borderLeft: "1px solid #eee",
//     //             }}
//     //         >
//     //             <Typography variant="caption" color="text.secondary">
//     //             {format(monthDate, "MMM yyyy")}
//     //             </Typography>
//     //         </Box>
//     //         );
//         // })}
//         // </Box>
// }

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
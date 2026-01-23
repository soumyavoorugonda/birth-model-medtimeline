import {useState, useEffect, useMemo, useRef} from 'react';
import axios from 'axios';
import {Typography, Divider, CircularProgress, Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import PatientHeader from "./components/PatientHeader";
import MedicationRow from "./components/MedicationRow";
import TimelineHeader from './components/TimelineHeader';
import {LEFT_COL_WIDTH, TIMELINE_RANGES, DAY_WIDTH_BY_RANGE, gridTemplateColumns} from "./timeline/timelineConfig";
import {startOfMonth, startOfDay, subMonths, differenceInCalendarDays, dayOffset} from "./timeline/dateUtils";
import {addMonths, isBefore, format} from "date-fns";


function App() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [range, setRange] = useState("6M");
  const monthsVisible = TIMELINE_RANGES[range];
  const timelineEnd = useMemo(() => startOfDay(new Date()), []);
  const timelineStart = useMemo(() => {
    return startOfMonth(subMonths(timelineEnd, monthsVisible-1));
  }, [timelineEnd, monthsVisible]);

  const dayWidth = DAY_WIDTH_BY_RANGE[range];
  const totalDays = differenceInCalendarDays(timelineEnd, timelineStart) + 1;
  const timelineWidth = totalDays * dayWidth;

  const timelineScrollRef = useRef(null);
  const todayDate = useMemo(() => startOfDay(new Date()), []);
  const todayX = useMemo(() => {
    const xPos = dayOffset(timelineStart, todayDate) * dayWidth;
    return xPos;
  }, [timelineStart, todayDate, dayWidth]);
  useEffect(() => {
    if (!timelineScrollRef.current) return;

    const el = timelineScrollRef.current;
    // Scroll to show the most recent months
    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [monthsVisible]);

  const monthMarkers = useMemo(() => {
    const out = [];
    let d = startOfMonth(timelineStart);

    while (isBefore(d, timelineEnd) || d.getTime() === timelineEnd.getTime()) {
      out.push({
        label: format(d, "MMM yyyy"),
        x: dayOffset(timelineStart, d) * dayWidth,
      });
      d = addMonths(d, 1);
    }
    return out;
  }, [timelineStart, timelineEnd, dayWidth]);
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/medtimeline/patients/patient-001/")
    .then((res) => {
      setMedications(res.data);
      setLoading(false);
  }).catch((err) => {
    console.error("AXIOS ERROR:", err);
    const message = err.response?.data?.detail || err.message || "Failed to fetch medication timeline";
    setError(message);
    setLoading(false);
  });
}, []);

if (loading) return <CircularProgress />;

if (error) {
    return <Typography color="error">{error}</Typography>;
  }

const groupedMedications = medications.reduce((acc, med) => {
  acc[med.medication_name] = acc[med.medication_name] || [];
  acc[med.medication_name].push(med);
  return acc;
}, {});


return (
  <Box
    ref={timelineScrollRef}
    sx={{
      border: "1px solid #e0e0e0",
      borderRadius: 2,
      p: 2,
      width: "100%",
      overflowX: "auto"
    }}
  >
    <PatientHeader patientId="patient-001" />

    <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
      Medication Timeline
    </Typography>
    <Divider sx={{ mb: 2, mt: 1 }} />

    <Box
      sx={{
        display: "flex",
        pl: `${LEFT_COL_WIDTH}px`,
        mb: 1,
      }}
    >
      <ToggleButtonGroup
        size="small"
        value={range}
        exclusive
        onChange={(_, value) => value && setRange(value)}
      >
        <ToggleButton value="1M">1M</ToggleButton>
        <ToggleButton value="3M">3M</ToggleButton>
        <ToggleButton value="6M">6M</ToggleButton>
        <ToggleButton value="1Y">1Y</ToggleButton>
        <ToggleButton value="3Y">3Y</ToggleButton>
      </ToggleButtonGroup>
    </Box>

    {/* TIMELINE HEADER*/}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: gridTemplateColumns,
        borderBottom: "1px solid #eee",
        pb: 1,
      }}
    >
      <Box />
      <TimelineHeader monthMarkers={monthMarkers} todayX={todayX} />
      <Box />
      <Box />
    </Box>

    {/* Container for grid lines + medication rows */}
    <Box sx={{ position: "relative" }}>
      {/* Vertical month grid lines*/}
      <Box
        sx={{
          position: "absolute",
          left: LEFT_COL_WIDTH,
          top: 0,
          bottom: 0,
          width: timelineWidth,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {monthMarkers.map((m) => (
          <Box
            key={`grid-${m.label}`}
            sx={{
              position: "absolute",
              left: m.x,
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: "#d1d1d1",
            }}
          />
        ))}
      </Box>

      {/* Medication rows */}
      {Object.entries(groupedMedications).map(([name, records]) => {
        const startDates = records.map(r => new Date(r.start_date));
        const endDates = records.map(r =>
          r.end_date ? new Date(r.end_date) : new Date()
        );

        const timeline = {
          medication_name: name,
          start: new Date(Math.min(...startDates)),
          end: new Date(Math.max(...endDates)),
          records,
          displayDose: records[records.length - 1]?.dose,
        };

        return (
          <MedicationRow
            key={name}
            timeline={timeline}
            timelineStart={timelineStart}
            timelineEnd={timelineEnd}
            gridTemplateColumns={gridTemplateColumns}
            monthMarkers={monthMarkers}
            todayX={todayX}
            todayDate={todayDate}
            dayWidth={dayWidth}
          />
        );
      })}
    </Box>
  </Box>
  );
}

export default App;
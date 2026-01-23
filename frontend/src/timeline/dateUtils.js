import {
  addMonths,
  subMonths,
  startOfMonth,
  startOfDay,
  differenceInMonths,
  differenceInCalendarDays,
} from "date-fns";

export {
  addMonths,
  subMonths,
  startOfMonth,
  startOfDay,
  differenceInMonths,
  differenceInCalendarDays,
};

export function dayOffset(start, date) {
  return differenceInCalendarDays(date, start);
}
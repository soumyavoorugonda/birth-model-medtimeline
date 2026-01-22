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

export function maxDate(a, b) {
  return a > b ? a : b;
}

export function minDate(a, b) {
  return a < b ? a : b;
}

export function dayOffset(start, date) {
  return differenceInCalendarDays(date, start);
}
export const MONTH_WIDTH = 120;

export const LEFT_COL_WIDTH = 180;
export const RIGHT_COL_WIDTH = 180;
export const DOSE_COL_WIDTH = 120;
export const DAY_WIDTH = 8;
export const BAR_HEIGHT = 24;
export const ROW_SPACING = 32;

export const GRID_TEMPLATE = `
  ${LEFT_COL_WIDTH}px
  1fr
  ${RIGHT_COL_WIDTH}px
`;

export const TIMELINE_RANGES = {
    "1M": 1,
    "3M": 3,
    "6M": 6,
    "1Y": 12,
    "3Y": 36,
    "MAX": 120
};

export const DAY_WIDTH_BY_RANGE = {
  "1M": 12,
  "3M": 8,
  "6M": 6,
  "1Y": 3,
  "3Y": 2,
};
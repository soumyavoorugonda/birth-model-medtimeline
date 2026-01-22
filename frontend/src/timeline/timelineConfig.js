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
  ${DOSE_COL_WIDTH}px
`;

export const TIMELINE_RANGES = {
    "6M": 6,
    "1Y": 12,
    "3Y": 36,
    "5Y": 60,
};

export const DAY_WIDTH_BY_RANGE = {
  "6M": 6,
  "1Y": 3,
  "3Y": 2,
  "5Y": 1,
};
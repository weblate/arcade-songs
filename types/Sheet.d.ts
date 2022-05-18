import type { Song } from './Song';

export type Sheet = (Song & {
  type?: string;
  difficulty?: string;
  level?: string;
  levelValue?: number;

  noteDesigner?: string;
  noteCounts?: Record<string, number | null>;
  regions?: Record<string, boolean>;
  isSpecial?: boolean;
} & {
  // added by preprocessing
  sheetNo: number;
  notePercents?: Record<string, number | null>;

  // used by sheet placeholders
  searchUrl?: string | null;
});
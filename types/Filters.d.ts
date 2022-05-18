export type Filters = {
  categories: string[];
  title: string | null;
  artist: string | null;

  versions: string[];
  minBPM: number | null;
  maxBPM: number | null;

  type: string | null;
  difficulties: string[];
  minLevelValue: number | null;
  maxLevelValue: number | null;

  noteDesigners: string[];
  region: string | null;
};
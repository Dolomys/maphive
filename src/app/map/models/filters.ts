import { ActivityCategory, StudyType } from "@prisma/client";

export interface ActivityFilters {
  search?: string;
  type?: ActivityCategory;
  minDuration?: number;
  maxDuration?: number;
  isPaid?: boolean;
  minRating?: number;
  maxRating?: number;
  city?: string;
  creatorId?: string;
  withCoordinates?: boolean;
  onlyPublished?: boolean;
  studyType?: StudyType;
}

export const DEFAULT_FILTERS: ActivityFilters = {
  search: undefined,
  type: undefined,
  minDuration: undefined,
  maxDuration: undefined,
  isPaid: undefined,
  minRating: undefined,
  maxRating: undefined,
  city: undefined,
  creatorId: undefined,
};

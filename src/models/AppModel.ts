import { SearchResult } from "./SearchResult";
import { AuthDetails } from "./AuthDetails";

export type AppModel = {
  page: number;
  totalPages: number | null;
  results: SearchResult[];
  authDetails: AuthDetails | null;
  initializing: boolean;
  search: string;
  hasSearched: boolean;
  pendingSearchRequest: boolean;
};

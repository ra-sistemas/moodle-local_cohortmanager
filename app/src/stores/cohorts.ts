import { defineStore } from 'pinia';

interface CohortListState {
  searchQuery: string;
  page: number;
  perpage: number;
}

export const useCohortsStore = defineStore('cohorts', {
  state: (): CohortListState => ({
    searchQuery: '',
    page: 1,
    perpage: 10,
  }),

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    setPage(page: number) {
      this.page = page;
    },

    setPerPage(perpage: number) {
      this.perpage = perpage;
    },

    reset() {
      this.searchQuery = '';
      this.page = 1;
      this.perpage = 10;
    },
  },
});
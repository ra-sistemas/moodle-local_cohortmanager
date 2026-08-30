import { defineStore } from 'pinia';

interface CohortListState {
  searchQuery: string;
  page: number;
  perpage: number;
  contextType: string;
  contextValue: string;
}

export const useCohortsStore = defineStore('cohorts', {
  state: (): CohortListState => ({
    searchQuery: '',
    page: 1,
    perpage: 10,
    contextType: 'system',
    contextValue: '',
  }),

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    setContext(contextType: string, contextValue: string) {
      this.contextType = contextType;
      this.contextValue = contextValue;
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
      this.contextType = 'system';
      this.contextValue = '';
    },
  },
});
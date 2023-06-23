export const selectTransactions = state => state.transaction.transactions;
export const selectCategories = state => state.transaction.categories;
export const selectCategoriesSummary = state =>
  state.transaction.categoriesSummary;
export const selectIncomeSummary = state => state.transaction.incomeSummary;
export const selectExpenseSummary = state => state.transaction.expenseSummary;
export const selectPeriodTotal = state => state.transaction.periodTotal;
export const selectYear = state => state.transaction.year;
export const selectMonth = state => state.transaction.month;
export const selectIsLoading = state => state.transaction.isLoading;

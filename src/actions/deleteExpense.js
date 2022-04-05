export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpenseAction = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});

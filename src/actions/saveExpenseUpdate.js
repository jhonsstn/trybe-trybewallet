export const SAVE_UPDATE = 'SAVE_UPDATE';

export const saveExpenseUpdateAction = (expenses) => ({
  type: SAVE_UPDATE,
  expenses,
});

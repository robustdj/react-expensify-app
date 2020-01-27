import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
  const total = selectExpensesTotal([])
  expect(total).toBe(0)
})

test('should correctly add up a single expense', () => {
  const singleExpense = {
    ...expenses[0],
    amount: 100
  }
  const total = selectExpensesTotal([singleExpense])
  expect(total).toBe(100)
})

test('should correctly add up multiple expenses', () => {
  const total = selectExpensesTotal(expenses)
  expect(total).toBe(114195)
})
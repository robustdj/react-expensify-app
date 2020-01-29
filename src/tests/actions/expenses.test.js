import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expensesData = {}
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  database.ref('expenses').set(expensesData).then(done)
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should remove expenses from firebase', (done) => {
  const store = createMockStore({})
  store.dispatch(startRemoveExpense({ id: expenses[0].id })).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: expenses[0].id
    })

    return database.ref(`expenses/${expenses[0].id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBe(null)
    done()
  })
})

test('should setup edit expense action object', () => {
  const id = '123abc'
  const updates = { note: 'This is a new note' }
  const action = editExpense(id, updates)
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  })
})

test('should edit expenses from firebase', (done) => {
  const store = createMockStore({})
  const id = expenses[0].id
  const updates = {
    note: 'This was expensive!'
  }

  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    })

    return database.ref(`expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val().note).toBe(updates.note)
    done()
  })
})

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    })

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
  const defaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaults
      }
    })

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaults)
    done()
  })
})

test('should set up set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({})
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done()
  })
})
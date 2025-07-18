import {configureStore, createSlice, createAction} from '@reduxjs/toolkit';

export const reset = createAction('RESET');

const persisted = JSON.parse(localStorage.getItem('employees') || '[]');

const employeesSlice = createSlice({
  name: 'employees',
  initialState: persisted,
  reducers: {
    addEmployee: (state, action) => {
      const id = action.payload.id ?? Date.now().toString();
      state.unshift({...action.payload, id});
    },
    updateEmployee: (state, action) => {
      const idx = state.findIndex((emp) => emp.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteEmployee: (state, action) =>
      state.filter((emp) => emp.id !== action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(reset, (_state, action) => action.payload);
  },
});

export const {addEmployee, updateEmployee, deleteEmployee} =
  employeesSlice.actions;

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('employees', JSON.stringify(store.getState().employees));
});

import {configureStore, createSlice} from '@reduxjs/toolkit';

const persisted = JSON.parse(localStorage.getItem('employees') || '[]');

const employeesSlice = createSlice({
  name: 'employees',
  initialState: persisted,
  reducers: {
    addEmployee: (state, action) => {
      state.push({...action.payload, id: Date.now().toString()});
    },
    updateEmployee: (state, action) => {
      const idx = state.findIndex((emp) => emp.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteEmployee: (state, action) => {
      return state.filter((emp) => emp.id !== action.payload);
    },
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

import { expect } from '@open-wc/testing';
import { store, addEmployee, updateEmployee, deleteEmployee } from '../src/store/index.js';

describe('Redux store', () => {
  beforeEach(() => {
    localStorage.clear();
    store.dispatch({ type: 'RESET', payload: [] });
  });

  it('adds an employee', () => {
    store.dispatch(addEmployee({ firstName: 'X' }));
    const emps = store.getState().employees;
    expect(emps.length).to.equal(1);
    expect(emps[0].firstName).to.equal('X');
  });

  it('updates an employee', () => {
    store.dispatch(addEmployee({ id: '42', firstName: 'A' }));
    store.dispatch(updateEmployee({ id: '42', firstName: 'B' }));
    const emp = store.getState().employees.find(e => e.id === '42');
    expect(emp.firstName).to.equal('B');
  });

  it('deletes an employee', () => {
    store.dispatch(addEmployee({ id: 'Z', firstName: 'Z' }));
    store.dispatch(deleteEmployee('Z'));
    const emp = store.getState().employees.find(e => e.id === 'Z');
    expect(emp).to.be.undefined;
  });
});

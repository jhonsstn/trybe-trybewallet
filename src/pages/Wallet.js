import React from 'react';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ExpensesForm />
        <Table />
      </>
    );
  }
}

export default Wallet;

import React from 'react'
import {Card , Row} from 'antd'
import './styles.css'
import Button from '../Button'
const Cards = ({income , expenses , currentBalance , showExpenseModal , showIncomeModal }) => {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          <p>{currentBalance} Rs.</p>
          <Button text={"Reset Balance"} blue={true} />
        </Card>
        <Card className="my-card" title="Total Income">
          <p>{income} Rs.</p>
          <Button text={"Add Income"} blue={true} onClick={showIncomeModal} />
        </Card>
        <Card className="my-card" title="Total Expenses">
          <p>{expenses} Rs.</p>
          <Button text={"Add Expense"} blue={true} onClick={showExpenseModal}/>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;

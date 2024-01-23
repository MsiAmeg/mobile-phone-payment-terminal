import { operators } from "@/constants/operators";

import { StyledH1 } from "@/components/Styled";

import PaymentOperator from "@/components/PaymentOperator";
import PaymentForm from "@/components/PaymentForm";


type PaymentPageT = {
  params: {
    operatorId: string;
  };
}

export default function PaymentPage({ params: {operatorId}}:PaymentPageT) {
  
  const operator = operators.find(operator => operator.id.toString() == operatorId);

  if (!operator) throw new Error('Оператор не найден!');

  return (
    <>
      <StyledH1>Оплатить</StyledH1>
      <PaymentOperator operator={operator} />
      <PaymentForm operator={operator} />
    </>
  )
}
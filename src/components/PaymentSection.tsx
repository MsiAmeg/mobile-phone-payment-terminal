"use client";

import { useRootStore } from "@/store/rootStore";

import PaymentOperator from "@/components/PaymentOperator";

export default function PaymentSection() {
  const operator = useRootStore(state => state.selectedOperator);
  const balance = useRootStore(state => state.balance);

  return (
    <>
      {operator && <PaymentOperator operator={operator} />}
      <h3>Баланс {balance} руб.</h3>
    </>
  )
}
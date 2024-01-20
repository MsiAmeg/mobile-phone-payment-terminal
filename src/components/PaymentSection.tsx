"use client";

import { useRootStore } from "@/store/rootStore";

import { StyledBtn } from "./Styled";

import PaymentOperator from "@/components/PaymentOperator";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 720px;
  text-align: left;
  height: 100%;
`;

const StyledBalance= styled.h3`
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 1px;
  padding: 20px 0 30px;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 16px;
  letter-spacing: 1px;
`;


const StyledInput = styled.input`
border: none;
background: transparent;
border-radius: 10px;
font-size: 16px;
letter-spacing: 1px;
border-bottom: 1px solid #656565;
padding: 0 10px 5px;
transition: border-bottom 350ms ease-out;

&:focus-visible {
  outline: none;
}

&:invalid:not(:focus) {
  border-bottom: 1px solid #FF3030;
}

&:valid:not(:focus) {
  border-bottom: 1px solid #007105;
}

&:invalid:not(:focus) ~ span {
  visibility: visible;
  opacity: 1;
}
`;

const StyledError = styled.span`
  color: #FF3030;
  font-size: 12px;
  letter-spacing: 1px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 350ms ease-out;
`;

const StyledSubmitBtn = styled(StyledBtn)<{$color: string, $backroundColor: string}>`
  background-color: ${props => props.$backroundColor};
  color: ${props => props.$color};
  justify-content: center;
  max-width: 500px;
  align-self: center;
  width: 100%;
  margin: auto 0 50px;
`;

export default function PaymentSection() {
  const operator = useRootStore(state => state.selectedOperator);
  const balance = useRootStore(state => state.balance);

  return (
    <>
      {operator && <PaymentOperator operator={operator} />}
      <StyledForm>
        <StyledBalance>Баланс: {balance} руб.</StyledBalance>
        <StyledLabel>
          Введите номер телефона
          <StyledInput type="tel" required pattern="\d{11}" className="phone" placeholder="В формате 11 цифр" />
          <StyledError>Некорректный формат номера</StyledError>
        </StyledLabel>
        <StyledLabel >
          Введите сумму
          <StyledInput type="number" required min={1} max={1000} className="money" placeholder="От 1 до 1000 руб."/>
          <StyledError>Некорректный формат суммы</StyledError>
        </StyledLabel>
        {operator && <StyledSubmitBtn $backroundColor={operator.color} $color={operator.textColor}>Подтвердить</StyledSubmitBtn>}
      </StyledForm>
    </>
  )
}
"use client";

import { AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import { useRootStore } from "@/store/rootStore";

import { paymentCall } from "@/utils/fakeApi";
import { StyledBalance, StyledError, StyledForm, StyledInput, StyledLabel, StyledSubmitBtn } from "./Styled";

import PaymentOperator from "@/components/PaymentOperator";
import Popup from "@/components/Popup";
import { useRouter } from "next/navigation";


type inputT = {
  phone: {
    text: string;
    validity: boolean;
  };
  money: {
      text: string;
      validity: boolean;
  };
}

export default function PaymentSection() {

  const router = useRouter();

  const [input, setInput] = useState<inputT>({phone: {text: '', validity: false}, money: {text: '', validity: false}});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput({...input, [e.target.name]: { text: e.target.value, validity: e.target.validity.valid}});
  };

  useEffect(() => {
    if (input.money.validity && input.phone.validity) {
      setIsFormValid(true);
    }
    else {
      setIsFormValid(false);
    }
  }, [input])

  const [popupOpened, setPopupOpened] = useState(false);
  const [succes, setSucces] = useState(false);

  const operator = useRootStore(state => state.selectedOperator);
  const balance = useRootStore(state => state.balance);

  const onClickHandler = async () => {
    setIsFormValid(false);
    setIsLoading(true);
    paymentCall()
      .then(() => {
        const randBoolean: boolean = (Math.random() < 0.5)? true : false;

        setPopupOpened(true);
        setSucces(randBoolean);
        if (randBoolean) {
          setTimeout(() => {
            router.push('/');
          }, 1700);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setPopupOpened(false);
        }, 1500);
      })
  }

  return (
    <>
      {operator && <PaymentOperator operator={operator} />}
      <StyledForm>
        <StyledBalance>Баланс: {balance} руб.</StyledBalance>
        <StyledLabel>
          Введите номер телефона
          <StyledInput type="tel" required pattern="\d{11}" name="phone" placeholder="В формате 11 цифр" onChange={onInputChange} />
          <StyledError>Некорректный формат номера</StyledError>
        </StyledLabel>
        <StyledLabel >
          Введите сумму
          <StyledInput type="number" required min={1} max={1000} name="money" placeholder="От 1 до 1000 руб." onChange={onInputChange}/>
          <StyledError>Некорректный формат суммы</StyledError>
        </StyledLabel>
      </StyledForm>
      <AnimatePresence>
        {popupOpened && <Popup succes={succes} />}
      </AnimatePresence>
      {operator && 
        <StyledSubmitBtn initial={{scale: 0}} animate={{scale: 1}} whileHover={{scale: isFormValid? 1.05 : 1}} whileTap={{scale: 0.96}} onClick={onClickHandler} disabled={!isFormValid} type="submit" $backroundColor={operator.color} $color={operator.textColor}>
          {isLoading? "Загрузка..." : "Подтвердить"}
        </StyledSubmitBtn>}
    </>
  )
}
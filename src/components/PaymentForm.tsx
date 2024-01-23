"use client";

import { useEffect, useState } from "react";
import { useRootStore } from "@/store/rootStore";

import { paymentCall } from "@/utils/fakeApi";

import { StyledBalance, StyledError, StyledForm, StyledInput, StyledLabel, StyledSubmitBtn } from "./Styled";
import { AnimatePresence } from "framer-motion";

import { OperatorT } from "@/constants/operators";
import { useRouter } from "next/navigation";

import Popup from "./Popup";

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

type PaymentFormT = {
  operator: OperatorT;
}

export default function PaymentForm({operator}:PaymentFormT) {
  
  const router = useRouter();

  const [input, setInput] = useState<inputT>({phone: {text: '', validity: false}, money: {text: '', validity: false}});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [popupOpened, setPopupOpened] = useState(false);
  const [succes, setSucces] = useState(false);

  
  const balance = useRootStore(state => state.balance);
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({...input, [e.target.name]: { text: e.target.value, validity: e.target.validity.valid}});
  };


  const redirectOnSucces = () => {
    router.push('/');
  }
  
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
            redirectOnSucces();
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
  
  useEffect(() => {
    if (input.money.validity && input.phone.validity) {
      setIsFormValid(true);
    }
    else {
      setIsFormValid(false);
    }
  }, [input])


  return (
    <>
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
      <StyledSubmitBtn initial={{scale: 0}} animate={{scale: 1}} whileHover={{scale: isFormValid? 1.05 : 1}} whileTap={{scale: 0.96}} onClick={onClickHandler} disabled={!isFormValid} type="submit" $backroundColor={operator.color} $color={operator.textColor}>
        {isLoading? "Загрузка..." : "Подтвердить"}
      </StyledSubmitBtn>
    </StyledForm>
    <AnimatePresence>
      {popupOpened && <Popup succes={succes} />}
    </AnimatePresence>
    </>
  );
}
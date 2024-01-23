"use client";

import { useEffect, useState } from "react";
import { useRootStore } from "@/store/rootStore";

import { paymentCall } from "@/utils/fakeApi";

import { StyledBalance, StyledError, StyledForm, StyledInput, StyledLabel, StyledSubmitBtn } from "./Styled";
import { AnimatePresence } from "framer-motion";

import { OperatorT } from "@/constants/operators";
import { useRouter } from "next/navigation";

import { maskMoney, maskNumber } from "@/utils/masks";

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

  const isMoneyValid = (value: number):boolean => {
    if (value >= 1 && value <= 1000) {
      return true;
    }
    return false;
  }

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimedValue = e.target.value.toLowerCase().replace(/\D/g, "");

    maskNumber(e, trimedValue, input.phone.text);
    setInput({...input, phone: { text: trimedValue, validity: /^\d{11}$/g.test(trimedValue)}});
  };

  const onMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const trimedValue = e.target.value
      .toLowerCase()
      .replace('руб.', '')
      .replace(/[^\d\.\,]/g, "").replace(',', '.');
    
    maskMoney(e, trimedValue, input.money.text);
    setInput({...input, money: { text: parseFloat(trimedValue).toFixed(2), validity: isMoneyValid(Number(trimedValue))}});
  };

  const redirectOnSucces = () => {
    router.push('/');
  }
  
  const onClickHandler = async () => {
    setIsFormValid(false);
    setIsLoading(true);
    paymentCall()
      .then(() => {
        setSucces(true);
        setTimeout(() => {
          redirectOnSucces();
        }, 1700);
      })
      .catch(() => {
        setSucces(false);
      })
      .finally(() => {
        setPopupOpened(true);
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
    console.log(input);
  }, [input])


  return (
    <>
    <StyledForm initial={{opacity: 0}} animate={{opacity: 1}}>
      <StyledBalance>Баланс: {balance} руб.</StyledBalance>
      <StyledLabel>
        Введите номер телефона
        <StyledInput $isValid={input.phone.validity} type="tel" required pattern="\+ \d \(\d{3}\) \d{3}-\d{2}-\d{2}|\+ \d{11}" name="phone" placeholder="В формате 11 цифр" onChange={onPhoneChange} maxLength={19} />
        <StyledError $visibility={!input.phone.validity}>Некорректный формат номера</StyledError>
      </StyledLabel>
      <StyledLabel>
        Введите сумму
        <StyledInput $isValid={input.money.validity} type="tel" required step='any' min={1} max={1000} name="money" placeholder="От 1 до 1000 руб." onChange={onMoneyChange}/>
        <StyledError $visibility={!input.money.validity}>Некорректный формат суммы</StyledError>
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
"use client";

import { motion } from "framer-motion";

import succesImg from "@/assets/succes.png";
import errorImg from "@/assets/error.png";

import Image from "next/image";

import styled from "styled-components";

const StyledPopup= motion(styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: rgba(0,0,0, 0.8);
  z-index: 10;
`);

const StyledPopupImage = motion(styled(Image)`
  justify-content: center;
  inset: 0;
  max-height: 250px;
  max-width: 250px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`);

type PopupT = {
  succes: boolean
}

export default function Popup({succes}:PopupT) {
  return (
    <StyledPopup initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <StyledPopupImage initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}
        width={250} height={250} src={succes? succesImg : errorImg} alt="Изображение успешности операции" />
      <h2>{succes? "Оплата прошла успешно!" : "Что-то пошло не так, попробуйте снова"}</h2>
    </StyledPopup>
  );
}
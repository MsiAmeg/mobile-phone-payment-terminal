"use client";

import { motion } from 'framer-motion';

import styled from "styled-components";
import Image from "next/image";
import arrow from '@/assets/arrow.svg';

const StyledBtn = styled(motion.button)`
  display: flex;
  font-family: inherit;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  letter-spacing: 1px;
  color: white;
  margin: 0;
  padding: 20px;
  border-radius: 10px;
  border: none;
`;

const StyledArrow = motion(styled(Image)``);

type OperatorsButtonT = {
  opened: boolean, 
  onClick: () => void
}

export default function OperatorsButton({opened, onClick}: OperatorsButtonT) {

  return (
    <StyledBtn onClick={onClick} 
      whileHover={{scale: 0.98}}
      whileTap={{ scale: 0.96}}
      transition={{duration: 0.25}}
    >
      Выбрать оператора
      <StyledArrow animate={{rotateX: opened ? "180deg" : 0 }} priority alt="arrow" src={arrow}/>
    </StyledBtn>
  )
}
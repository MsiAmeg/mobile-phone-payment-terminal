"use client";

import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { useRootStore } from "@/store/rootStore";

import { OperatorT, operators } from '../constants/operators';
import { StyledImage } from "./Styled";

import styled from "styled-components";

const StyledList = styled(motion.ul)`
  display: grid;
  justify-items: center;
  justify-content: center;
  width: 100%;
  grid-auto-rows: 1fr;
  grid-template-columns: 
    repeat(auto-fit, 150px);
  margin: 0;
  padding: 0;
  gap: 10px;
  user-select: none;
`;

const StyledLi = styled(motion.li)<{$backgroundColor: string; $color: string;}>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  max-width: 150px;
  min-height: 150px;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$color};
  transition: scale 350ms ease-out;
`;

const container = {
  hidden: { scale: 0.8, opacity: 0.6 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    },
    exit: {
      scale: 0.9, opacity: 0
    }
  }
}

const item = {
  hidden: { scale: 0.7, y: 20, opacity: 0 },
  show: { scale: 1, y: 0, opacity: 1 }
}


export default function OperatorsGrid() {
  const setOperator = useRootStore(state => state.selectOperator);
  const router = useRouter();

  const onItemClick = (operator: OperatorT) => {
    setOperator(operator);
    router.push('/payment');
  }
  return (
    <StyledList variants={container} initial="hidden" animate="show" exit="exit" transition={{duration: 0.35}}>
      {operators.map((operator) => {
        return (
          <StyledLi key={operator.id} variants={item} whileHover={{scale: 1.04}} whileTap={{scale: 0.9}}
             $backgroundColor={operator.color} $color={operator.textColor} onClick={() => onItemClick(operator)}
          >
            <StyledImage src={operator.image} alt={operator.title} />
            {operator.title}
          </StyledLi>
        )
      })}
    </StyledList>
  )
}
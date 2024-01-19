"use client";

import { motion } from "framer-motion";

import { useRef } from "react";

import { StyledImage } from "./Styled";

import { OperatorT } from "@/constants/operators";

import styled from "styled-components";

const StyledArticle = styled.article<{$color: string | null, $textColor: string | null}>`
  position: relative;
  display: flex;
  width: 100%;
  border-radius: 10px;
  gap: 10px;
  padding: 20px;
  margin: 0;
  align-items: center;
  background-color: ${props => props.$color};
  color: ${props => props.$textColor};
`;

const StyledWrapper = motion(styled.div`
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
`)

type PaymentOperatorT = {
  operator: OperatorT;
}

export default function PaymentOperator({operator}: PaymentOperatorT) {

  const articleRef = useRef(null);

  return (
    <StyledArticle $color={operator.color} $textColor={operator.textColor} ref={articleRef}>
      <StyledWrapper className="moving-wrapper" drag="x" dragElastic={0} dragConstraints={articleRef}>
          <StyledImage src={operator.image} alt={operator.title} />
          {operator.title}
      </StyledWrapper>
    </StyledArticle>
  )
}
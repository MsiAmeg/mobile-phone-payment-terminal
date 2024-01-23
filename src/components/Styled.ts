"use client";

import { motion } from "framer-motion";

import styled from "styled-components"

export const StyledH1 = styled.h1`
  font-size: 32px;
  color: white;
  margin: 0;
  padding: 0;
`;

export const StyledBtn = styled.button`
  display: flex;
  font-family: inherit;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  letter-spacing: 1px;
  color: white;
  margin: 0;
  padding: 20px;
  border-radius: 10px;
  border: none;
  transition: opacity 250ms ease-out;

  &:disabled {
    opacity: 0.6;
  }
`;

export const StyledImage = styled.img`
  pointer-events: none;
  user-select: none;
  max-width: 50px;
  max-height: 50px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: 0;
  padding: 0;
`;

export const StyledForm = motion(styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 720px;
  text-align: left;
  height: 100%;
  flex-grow: 2;
`);

export const StyledBalance= styled.h3`
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 1px;
  padding: 20px 0 30px;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 16px;
  letter-spacing: 1px;
`;

export const StyledInput = styled.input<{$isValid: boolean}>`
border: none;
background: transparent;
border-radius: 10px;
font-size: 16px;
letter-spacing: 1px;
border-bottom: 1px solid #656565;
padding: 5px 10px 5px;
transition: border-bottom 350ms ease-out;

&:focus-visible {
  outline: none;
}

&:focus ~ span {
  visibility: hidden;
  opacity: 0;
}

&:not(:focus) {
  border-bottom: 1px solid ${props => props.$isValid? '#007105' : '#FF3030'};
}
`;

export const StyledError = styled.span<{$visibility: boolean}>`
  color: #FF3030;
  font-size: 12px;
  letter-spacing: 1px;
  opacity: ${props => props.$visibility? '1' : '0'};
  visibility: ${props => props.$visibility? 'visible' : 'hidden'};
  transition: opacity 350ms ease-out;
`;

export const StyledSubmitBtn = motion(styled(StyledBtn)<{$color: string, $backroundColor: string}>`
  background-color: ${props => props.$backroundColor};
  color: ${props => props.$color};
  justify-content: center;
  max-width: 500px;
  align-self: center;
  width: 100%;
  margin: auto 0 30px;
`);
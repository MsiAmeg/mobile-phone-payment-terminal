"use client";

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
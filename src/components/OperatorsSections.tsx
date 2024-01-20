"use client";

import { useState } from "react";
import { AnimatePresence } from 'framer-motion';

import styled from "styled-components";
import OperatorsButton from "./OperatorsButton";
import OperatorsGrid from "./OperatorsGrid";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 0;
  padding: 0 20px;
`;

export default function OperatorsSections() {

  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(!opened)
  }

  return (
    <StyledSection>
      <OperatorsButton opened={opened} onClick={handleOpen} />
      <AnimatePresence>
        {opened && <OperatorsGrid />}
      </AnimatePresence>
    </StyledSection>
  )
}
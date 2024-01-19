'use client';

import styled from 'styled-components';

const StyledFooter = styled.footer`
  width: 100%;
  margin: 0;
  padding: 20px;
  text-align: center;
`;

const StyledLink = styled.a`
  transition: opacity 350ms ease-out;
  &:hover {
    opacity: 0.8;
  }
`;

export default function Footer() {
  return (
    <StyledFooter className='footer'>
      Created by &copy; 
      <StyledLink href='https://github.com/MsiAmeg' target='_blank'>
        Rekun Ivan
      </StyledLink>
    </StyledFooter>
  )
};
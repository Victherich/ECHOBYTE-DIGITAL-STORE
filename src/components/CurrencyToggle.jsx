
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
   position: fixed;
  top: 10px;
  right: 45%;
  z-index: 1000;
`;

const ToggleLabel = styled.span`
  font-weight: 600;
  color: white;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #facc15;
  }

  &:checked + span:before {
    transform: translateX(28px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: background-color 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color:#1f2937;
    border-radius: 50%;
    transition: transform 0.4s;
  }
`;

export default function CurrencyToggle() {
const { currency, setCurrency }=useContext(Context);

const toggleCurrency = (e) => {
  // Only proceed if event is trusted (user-initiated)
  if (!e.isTrusted) return;

  setCurrency((prev) => (prev === 'USD' ? 'NGN' : 'USD'));
};


  return (
    <ToggleWrapper>
      <ToggleLabel>USD</ToggleLabel>
      <Switch>
       <Checkbox
  type="checkbox"
  checked={currency === 'NGN'}
  onClick={toggleCurrency}
/>

        <Slider />
      </Switch>
      <ToggleLabel>NGN</ToggleLabel>
    </ToggleWrapper>
  );
}

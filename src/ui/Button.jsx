/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
    text-align: center;
  `,
};

const locations = {
  left: css`
    text-align: start;
    align-content: start;
    justify-content: start;
  `,
  right: css`
    text-align: end;
    align-content: end;
    justify-content: end;
  `,
  center: css`
    text-align: center;
    align-content: center;
    justify-content: center;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  align-items: center;
  display: flex;
  gap: 0.7rem;
  ${(props) => variations[props.variation]}
  ${(props) => sizes[props.size]};
  ${(props) => locations[props.location]};
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;

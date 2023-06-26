import React from 'react';
import css from './PasswordStrengthIndicator.module.css';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = () => {
    const passwordLength = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (passwordLength >= 8 && hasUppercase && hasLowercase && hasSpecialChar) {
      return css.super_strong;
    } else if (passwordLength >= 8 && hasUppercase && hasLowercase) {
      return css.strong;
    } else if (passwordLength >= 6 && (hasUppercase || hasLowercase)) {
      return css.medium;
    } else if (passwordLength > 0) {
      return css.weak;
    } else {
      return css.empty;
    }
  };

  const strengthClass = calculateStrength();

  return (
    <div className={css.indicator}>
      <div className={strengthClass}></div>
    </div>
  );
};

export default PasswordStrengthIndicator;

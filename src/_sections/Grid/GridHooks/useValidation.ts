import { useState, useEffect } from 'react';

export const useTextFieldsValidation = (value: string | null) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (value) return;
    setIsValid(false);

    return () => setIsValid(true);
  }, [value]);

  return isValid;
};

export const usePhoneFieldsValidation = (errorMessage: string) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!errorMessage) return;
    setIsValid(false);

    return () => setIsValid(true);
  }, [errorMessage]);

  return isValid;
};

export const useByIdValidation = (ID: number) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (ID > 0) return;
    setIsValid(false);

    return () => setIsValid(true);
  }, [ID]);

  return isValid;
};

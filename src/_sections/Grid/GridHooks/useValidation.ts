import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectAppointmentByStaffMemberID } from '../../../_bus/Entities/EntitiesSelectors';

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

export const useStartDateEventValidation = (value: Date, LookupHR01teamId: number) => {
  const [isValid, setIsValid] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const selectEmployeeAppointments = useMemo(() => selectAppointmentByStaffMemberID(LookupHR01teamId), [LookupHR01teamId]);
  const employeeAppointments = useSelector(selectEmployeeAppointments);
  const actualAppointments = employeeAppointments.filter(({ Start }) => Date.now() < Start.getTime());

  useEffect(() => {
    if (actualAppointments.length === 0) return;

    for (const { Start, End } of actualAppointments) {
      const inputStartDateInTimestamp = value.getTime();

      if (inputStartDateInTimestamp > Start.getTime() && inputStartDateInTimestamp < End.getTime()) {
        setIsValid(false);
        break;
      } else if (!isValid) {
        setShowPopup(false);
        setIsValid(true);
      }
    }
  }, [actualAppointments, actualAppointments.length, isValid, value]);

  useEffect(() => {
    if (!isValid) {
      setShowPopup(true);
    }
    return () => setIsValid(true);
  }, [isValid]);

  return { isValid, showPopup, setShowPopup, actualAppointments };
};

export const useEndDateEventValidation = (value: Date, LookupHR01teamId: number) => {
  const [isValid, setIsValid] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const selectEmployeeAppointments = useMemo(() => selectAppointmentByStaffMemberID(LookupHR01teamId), [LookupHR01teamId]);
  const employeeAppointments = useSelector(selectEmployeeAppointments);
  const actualAppointments = employeeAppointments.filter(({ Start }) => Date.now() < Start.getTime());

  useEffect(() => {
    if (actualAppointments.length === 0) return;

    for (const { Start, End } of actualAppointments) {
      const inputEndDateInTimestamp = value.getTime();

      if (inputEndDateInTimestamp > Start.getTime() && inputEndDateInTimestamp < End.getTime()) {
        setIsValid(false);
        break;
      } else if (!isValid) {
        setShowPopup(false);
        setIsValid(true);
      }
    }
  }, [actualAppointments, actualAppointments.length, isValid, value]);

  useEffect(() => {
    if (!isValid) {
      setShowPopup(true);
    }
    return () => setIsValid(true);
  }, [isValid]);

  return { isValid, showPopup, setShowPopup, actualAppointments };
};

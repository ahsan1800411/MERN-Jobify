import React from 'react';
import { useAppContext } from '../context/AppContext';

export const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

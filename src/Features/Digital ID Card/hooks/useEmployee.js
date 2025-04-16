import { useState, useEffect } from 'react';
import mockEmployee from '../data/mockEmployee';

export const useEmployee = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Simulate fetch - in production, replace with API or Redux
    setTimeout(() => {
      setEmployee(mockEmployee);
    }, 200); // optional delay
  }, []);

  return { employee };
};

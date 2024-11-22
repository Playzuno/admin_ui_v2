import axios from '../utils/axios';
import { BusinessInfoContext } from './useBusinessContext';
import { useEffect, useState } from 'react';

export default function BusinessProvider({ children }) {
  const [businessInfo, setBusinessInfo] = useState({});
  const orgId = localStorage.getItem('orgId');
  useEffect(() => {
    axios
      .get(`/api/v1/business/${orgId}`)
      .then(res => {
        console.log(res.data);
        setBusinessInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <BusinessInfoContext.Provider value={businessInfo}>{children}</BusinessInfoContext.Provider>
  );
}

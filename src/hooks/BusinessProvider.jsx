import axios from "../utils/axios";
import { BusinessInfoContext } from "./useBusinessContext";
import { useEffect, useState } from "react";

export default function BusinessProvider({ children }) {
  const [businessInfo, setBusinessInfo] = useState({});
  useEffect(() => {
    axios
      .get("/business/293057670284312695")
      .then((res) => {
        // console.log(res.data);
        setBusinessInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <BusinessInfoContext.Provider value={businessInfo}>
      {children}
    </BusinessInfoContext.Provider>
  );
}

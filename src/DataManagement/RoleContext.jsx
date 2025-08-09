import { createContext, useEffect, useState } from "react";

// Step 1: Create context
export const RoleContext = createContext();

// Step 2: Create provider component
export const RoleProvider = ({ children }) => {
  // Step 4: Create state
  const [roledata, setRoleData] = useState();


  useEffect(() => {
    // Step 3: Load initial role data from localStorage
    const getRoleData = localStorage.getItem("roleDetail");
    const storedRoleData = getRoleData ? JSON.parse(getRoleData) : [];
    setRoleData(storedRoleData)
  },[setRoleData])

  return (
    <RoleContext.Provider value={{ roledata, setRoleData }}>
      {children}
    </RoleContext.Provider>
  );
};

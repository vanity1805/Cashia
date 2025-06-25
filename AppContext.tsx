import React, {createContext, useContext, useState} from 'react';

//Define the data types
type Food = {food: string; rating: number; price: number}
type Transport = { transportCost: number}
type Budget = {budget: number}

//Context Types
type AppContextType = {
  foodDataList: Food[];
  setFoodDataList: React.Dispatch<React.SetStateAction<Food[]>>;
  transportList: Transport[];
  setTransportList: React.Dispatch<React.SetStateAction<Transport[]>>;
  budgetList: Budget[];
  setBudgetList: React.Dispatch<React.SetStateAction<Budget[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

//Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foodDataList, setFoodDataList] = useState<Food[]>([]);
  const [transportList, setTransportList] = useState<Transport[]>([]);
  const [budgetList, setBudgetList] = useState<Budget[]>([]);

  return (
    <AppContext.Provider
      value={{
        foodDataList,
        setFoodDataList,
        transportList,
        setTransportList,
        budgetList,
        setBudgetList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for usage
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

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



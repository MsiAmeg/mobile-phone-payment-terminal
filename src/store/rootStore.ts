import { create } from "zustand";

import { OperatorT } from '../constants/operators';
import { persist } from "zustand/middleware";

type rootStoreT = {
  selectedOperator: null | OperatorT,
  balance: number;
  cashOut: (by: number) => void;
  selectOperator: (operators: OperatorT) => void;
}

export const useRootStore = create<rootStoreT>()(
  persist(
    (set) => ({
    selectedOperator: null,
    balance: Math.floor(Math.random() * 4500 + 1000),
    cashOut: (by: number) => set((state) => ({balance: state.balance - by})),
    selectOperator: (operator: OperatorT) => set((state) => ({selectedOperator: operator})),
    }),
    {
      name: 'root-storage',
    },
  )


    // (set) => ({
    //   selectedOperator: null,
    //   balance: Math.floor(Math.random() * 4500),
    //   cashOut: (by: number) => set((state) => ({balance: state.balance - by})),
    //   selectOperator: (operator: OperatorT) => set((state) => ({selectedOperator: operator})),
    // }),
)
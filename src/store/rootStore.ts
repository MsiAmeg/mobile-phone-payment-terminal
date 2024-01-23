import { create } from "zustand";

import { OperatorT } from '../constants/operators';

type rootStoreT = {
  selectedOperator: null | OperatorT,
  balance: number;
  cashOut: (by: number) => void;
  selectOperator: (operators: OperatorT) => void;
}

export const useRootStore = create<rootStoreT>()((set) => ({
  selectedOperator: null,
  balance: 13503,
  cashOut: (by: number) => set((state) => ({balance: state.balance - by})),
  selectOperator: (operator: OperatorT) => set((state) => ({selectedOperator: operator})),
})
)
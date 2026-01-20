import { create, StateCreator } from 'zustand';

interface IInvoiceStore {
  workingDays: number;
  setWorkingDays: (days: number) => void;
}

export const createInvoiceStore: StateCreator<IInvoiceStore, [], [], IInvoiceStore> = (set) => ({
  workingDays: 0,
  setWorkingDays: (days: number) => set({ workingDays: days }),
});

export const useInvoiceStore = create<IInvoiceStore>()(createInvoiceStore);

// store.ts
import create from 'zustand';

// Define your store's state.
interface State {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedSemester: string;
  setSelectedSemester: (semester: string) => void;
}

// Create the store.
export const useStore = create<State>((set) => ({
  selectedYear: 'Todos',
  setSelectedYear: (year) => set({ selectedYear: year }),
  selectedSemester: 'Todos',
  setSelectedSemester: (semester) => set({ selectedSemester: semester }),
}));
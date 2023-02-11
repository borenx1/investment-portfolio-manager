import { create } from 'zustand';

interface InvestmentAccount {
  name: string;
}

interface AnonState {
  investmentAccounts: InvestmentAccount[];
  activeAccountIndex: number;
  addAccount: (accountName: string) => void;
  switchAccount: (index: number) => void;
}

/** The store for an anonymous (not logged in) user's data. */
export const useAnonStore = create<AnonState>()((set) => ({
  investmentAccounts: [],
  activeAccountIndex: 0,
  addAccount: (accountName) =>
    set(({ investmentAccounts }) => ({
      investmentAccounts: [...investmentAccounts, { name: accountName }],
    })),
  switchAccount: (index) =>
    set(({ investmentAccounts }) => ({
      activeAccountIndex: Math.max(
        Math.min(Math.floor(index), investmentAccounts.length - 1),
        0,
      ),
    })),
}));

export function useActiveAccount() {
  const accounts = useAnonStore((state) => state.investmentAccounts);
  const activeAccountIndex = useAnonStore((state) => state.activeAccountIndex);
  return accounts[activeAccountIndex];
}

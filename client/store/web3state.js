import { create } from "zustand";

const useWeb3StateStore = create((set) => ({
	state: {
		provider: null,
		signer: null,
		contract: null,
	},
	setState: (new_state) => set((curr_state) => ({ state: new_state })),
	resetState: () =>
		set({ state: { provider: null, signer: null, contract: null } }),
}));

export default useWeb3StateStore;

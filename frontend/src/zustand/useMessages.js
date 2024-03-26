import { create } from "zustand";

const useMessages = create((set) => ({
	messages: [],
	setMessages: (messages) => set({ messages }),
	typing: false,
	setTyping: (typing) => set({ typing }),
}));

export default useMessages;

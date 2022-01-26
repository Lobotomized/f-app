import { writable } from 'svelte/store';

export const UserObserver = writable({});

export const SelectedChatObserver = writable("");

export const NewMessagesCount = writable(0);
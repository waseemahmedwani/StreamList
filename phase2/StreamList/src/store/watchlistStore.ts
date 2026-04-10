import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface WatchlistItem {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  releaseDate: string;
  genreIds: number[];
  mediaType: 'movie' | 'tv';
}

export interface WatchlistStore {
  items: WatchlistItem[];
  addItem: (item: WatchlistItem) => void;
  removeItem: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  count: number;
  hydrated: boolean;
}

type WatchlistPersisted = Pick<WatchlistStore, 'items'>;

const storage = createJSONStorage<WatchlistPersisted>(() => AsyncStorage);

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      hydrated: false,
      addItem: (item) => {
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) {
            return state;
          }
          const items = [...state.items, item];
          return { items, count: items.length };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const items = state.items.filter((i) => i.id !== id);
          return { items, count: items.length };
        });
      },
      isInWatchlist: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: 'watchlist-storage',
      storage,
      partialize: (state): WatchlistPersisted => ({ items: state.items }),
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          useWatchlistStore.setState({ hydrated: true });
          return;
        }
        const { items } = useWatchlistStore.getState();
        useWatchlistStore.setState({
          hydrated: true,
          count: items.length,
        });
      },
    },
  ),
);

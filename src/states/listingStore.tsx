import { create } from 'zustand';
import { v4 as uuidv4 } from "uuid";

export type ListingContent = {
  id: string;
  title: string;
  desc: string;
  location: string;
  tags: string[];
  owner: string;
  price: any;
  images: string[];
  email: string;
  phone: string;
};

type ListingsStore = {
  title: string;
  desc: string;
  location: string;
  tags: string[];
  price: string | null;
  images: string[];
  listings: ListingContent[];
  fav: ListingContent[];
  owner: string;
  email: string;
  phone: string;
  setListing: (listing: Omit<ListingContent, 'id'>) => void;
  setFav: (listing: ListingContent) => void;
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
  setLocation: (location: string) => void;
  setTags: (tag: string[]) => void;
  setOwner: (owner: string) => void;
  setPrice: (price: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  addImage: (image: string) => void;
  updateL: (id: any, newData: ListingContent) => void;
  reset: () => void;
  remove: (index: number) => void;
};

export const useListingStore = create<ListingsStore>(
  ((set, get) => ({
  title: '',
  desc: '',
  location: '',
  tags: [],
  price: null,
  images: [],
  listings: [],
  fav: [],
  owner: '',
  email: '',
  phone: '',
  setTitle: (title) => set({ title }),
  setDesc: (desc) => set({ desc }),
  setLocation: (location) => set({ location }),
  setTags: (tags: string[]) => {
    set({ tags });
  },
  setPrice: (price) => set({ price }),
  addImage: (image) => {
    const currentImages = get().images;
    set({ images: [...currentImages, image] });
  },
  setOwner: (owner) => set({ owner }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),

  updateL: (id: any, newData: ListingContent) => {
    set((state) => ({
      listings: state.listings.map((listing, index) =>
        index === parseInt(id) ? { ...listing, ...newData } : listing
      ),
    }));
  },

  setListing: (listing: Omit<ListingContent, 'id'>) => {
    const { listings } = get();
    const newListing: ListingContent = { ...listing, id: uuidv4() };
    set({ listings: [...listings, newListing] });
  },
  

  setFav: (listing: ListingContent) => {
    const currentFavs = get().fav;
    const isAlreadyFav = currentFavs.some(
      (item) => item.title === listing.title && item.owner === listing.owner
    );
    if (isAlreadyFav) {
      set({
        fav: currentFavs.filter(
          (fav) => !(fav.title === listing.title && fav.owner === listing.owner)
        ),
      });
    } else {
      set({ fav: [...currentFavs, listing] });
    }
  },

  reset: () =>
    set({
      title: '',
      desc: '',
      location: '',
      tags: [],
      price: null,
      images: [],
      owner: '',
      email: '',
      phone: '',
    }),

  remove: (index: number) => {
    const { listings } = get();
    set({ listings: listings.filter((_, i) => i !== index) });
  }})));

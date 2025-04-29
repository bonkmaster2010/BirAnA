import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Booking = {
  id: string;
  checkin: string;
  checkout: string;
  nights: string;
  img: string[];      
  tit: string;
  price: string;
};

export type BookStoreType = {
  bookings: Booking[];
  checkin: string;
  checkout: string;
  nights: string;
  setCheckin: (checkin: string) => void;
  setCheckout: (checkout: string) => void;
  setNights: (nights: string) => void;
  setBook: (book: Omit<Booking, "id">) => void; 
  remove: (id: string) => void;
  reset: () => void;
  isListingBooked: (tit: string) => boolean;
};

export const BookStore = create<BookStoreType>(
 ((set, get) => ({
  checkin: "",
  checkout: "",
  nights: "",
  bookings: [],
  setCheckin: (checkin) => set({ checkin }),
  setCheckout: (checkout) => set({ checkout }),
  setNights: (nights) => set({ nights }),
  setBook: (book) => {
    const { bookings } = get();
    if (get().isListingBooked(book.tit)) {
      alert("This listing has already been booked.");
      return;
    }
    const newBooking: Booking = { ...book, id: uuidv4() }; 
    set({ bookings: [...bookings, newBooking] });
  },
  reset: () => {
    set({
      checkin: "",
      checkout: "",
      nights: ""
    });
  },
  remove: (id) => {
    const { bookings } = get();
    const filtered = bookings.filter((booking) => booking.id !== id);
    set({ bookings: filtered });
  },
  isListingBooked: (tit) => {
    const { bookings } = get();
    return bookings.some((booking) => booking.tit === tit);
  }})));

import { NavLink } from "react-router";
import { BookStore } from "../states/BookStore";
import { useState } from "react";

export default function Bookings() {
  const { bookings, remove } = BookStore();
  const [checkingId, setCheckingId] = useState<string | null>(null); 
  function cancel(id: string) {
    remove(id);
    setCheckingId(null);
  }

  return (
    <div className="Home-cont">
      {bookings.length === 0 && (
        <h2 style={{ textAlign: "center", opacity: "0.7" }}>
          No Bookings Found 🥀
        </h2>
      )}
      {bookings.length > 0 &&
        bookings.map((book, i) => {
          return (
            <div key={`listing-${i}`} className="listing">
              <div className="img-cont">
                <NavLink to={`/bookings/${i}`}>
                  <img src={book.img[0]} alt={book.tit} />
                </NavLink>
              </div>
              <h1>{book.tit}</h1>
              <p>CheckIn: {book.checkin}</p>
              <p>CheckOut: {book.checkout}</p>
              <p>Nights: {book.nights}</p>
              <p>Total: ${parseInt(book.nights) * parseInt(book.price)}</p>
              <div id="remove-book">
                {checkingId !== book.id ? (
                  <button onClick={() => setCheckingId(book.id)}>Cancel</button>
                ) : (
                  <button onClick={() => cancel(book.id)}>Are You Sure?</button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

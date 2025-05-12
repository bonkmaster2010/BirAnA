import { useParams, useNavigate } from "react-router";
import { useListingStore } from "../states/listingStore";
import { BookStore } from "../states/BookStore";
import { useEffect, useState } from "react";
import "../styles/ListingDetails.css";

export default function FavoriteListing() {
  const { id } = useParams();
  const navi = useNavigate();
  const { updateL, listings, setFav, fav } = useListingStore();
  const { checkin, checkout, nights, setCheckin, setCheckout, setNights, setBook, reset } = BookStore();
  
  const [listing, setListing] = useState(() => listings.find((l) => l.id === id));
  const [showModal, setShowModal] = useState(false);
  const [imgin, setImgin] = useState(0);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({ 
    id: listing?.id ?? "",
    title: listing?.title ?? "",
    desc: listing?.desc ?? "",
    location: listing?.location ?? "",
    tags: listing?.tags ?? [],
    owner: listing?.owner ?? "",
    price: listing?.price ?? 0,
    images: listing?.images ?? [],
    email: listing?.email ?? "",
    phone: listing?.phone ?? "",
  });

  useEffect(() => {
    const updatedListing = listings.find((l) => l.id === id);
    if (updatedListing) {
      setListing(updatedListing);
      setFormData(updatedListing);
    }
  }, [listings, id]);

  if (!listing) {
    return <div className="not-found">⚠️ Oops! Listing not found.</div>;
  }

  const isFavorited = fav.some((f) => f.id === listing.id);

  function isValidPrice(price: number) {
    return !isNaN(price) && price > 0;
  }

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidForm(formData: any) {
    return (
      isValidPrice(Number(formData.price)) &&
      formData.title &&
      formData.location &&
      isValidEmail(formData.email)
    );
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    if (!isValidForm(formData)) {
      alert("Please fill all fields correctly.");
      return;
    }
    updateL(id, formData);
    setEdit(false);
  }

  function handleBooking() {
    const { bookings } = BookStore.getState();
    const existingBooking = bookings.find((b) => b.tit === listing!.title);

    if (existingBooking) {
      alert("This listing is already booked.");
      return;
    }

    if (!checkin || !checkout || !nights) {
      alert("Please fill all booking details.");
      return;
    }

    setBook({
      checkin,
      checkout,
      nights,
      img: listing!.images,
      tit: listing!.title,
      price: String(listing!.price),
    });

    alert("Successfully booked! Go to 'My Bookings' to see details.");
    setShowModal(false);
    reset();
  }

  function left() {
    if (imgin > 0) setImgin(imgin - 1);
  }

  function right() {
    if (imgin < listing!.images.length - 1) setImgin(imgin + 1);
  }

  return (
    <div className="listing-page">
      <div className="listing-gallery">
        <img
          src={listing.images[imgin]}
          alt={listing.title}
          className="main-image"
          loading="lazy"
        />
        {listing.images.length > 1 && (
          <div className="image-buttons">
            <button onClick={left}>←</button>
            <button onClick={right}>→</button>
          </div>
        )}
      </div>

      <div className="Details-fav-cont">
        <button onClick={() => setFav(listing)}>
          <span className={`star ${isFavorited ? "favorite" : "empty"}`}>
            {isFavorited ? "★" : "☆"}
          </span>
        </button>
      </div>

      <div className="listing-content">
        {edit ? (
          <>
            <div>
              <label>Title</label>
              <input name="title" value={formData.title} onChange={handleEditChange} />
            </div>
            <div>
              <label>Price</label>
              <input name="price" type="number" min="1" value={formData.price} onChange={handleEditChange} />
            </div>
            <div>
              <label>Location</label>
              <input name="location" value={formData.location} onChange={handleEditChange} />
            </div>
            <div>
              <label>Description</label>
              <textarea name="desc" rows={5} value={formData.desc} onChange={handleEditChange} />
            </div>
            <div>
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleEditChange} />
            </div>
            <div>
              <label>Phone</label>
              <input name="phone" value={formData.phone} onChange={handleEditChange} />
            </div>
            <button onClick={handleSave} disabled={!isValidForm(formData)}>Save</button>
          </>
        ) : (
          <>
            <h1>{listing.title}</h1>
            <p>${Number(listing.price).toLocaleString()} <span>/ one-time</span></p>
            <p><strong>Location:</strong> {listing.location}</p>
            <p><strong>Listed by:</strong> {listing.owner}</p>
            <p>{listing.desc}</p>
            <p><strong>Email:</strong> {listing.email}</p>
            <p><strong>Phone:</strong> {listing.phone}</p>
            <button onClick={() => setEdit(true)}>Edit</button>
          </>
        )}

        <div id="book-cont">
          <button onClick={() => setShowModal(true)}>Book</button>
        </div>

        {showModal && (
          <div className="overlay">
            <div className="modal">
              <input
                placeholder="Check in"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
              <input
                placeholder="Check out"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
              />
              <input
                placeholder="Number of Nights"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
              />
              <button onClick={handleBooking}>Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div id="rev-cont">
        <button onClick={() => navi(`/reviews/${listing.id}`)}>Reviews</button>
        </div>
      </div>
    </div>
  );
}

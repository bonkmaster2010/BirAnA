import { useParams, useNavigate } from "react-router";
import { useListingStore } from "../states/listingStore";
import { useState } from "react";
import "../styles/ListingDetails.css";

export default function BookingDetails(){
    const { id } = useParams();
    const navi = useNavigate();
    const { updateL, listings, setFav, fav } = useListingStore();
    const listing = listings[parseInt(id || "0")];
    
    const [imgin, setImgin] = useState(0);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ ...listing });
  
    // Validation functions
    function isValidPrice(price: number) {
      return !isNaN(price) && price > 0;
    }
  
    function isValidEmail(email: string) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
    }
  
    function isValidForm(formData: any) {
      return (
        isValidPrice(formData.price) &&
        formData.title &&
        formData.location &&
        isValidEmail(formData.email)
      );
    }

  
    function editText(e: any) {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  
    function handleSave() {
      if (!isValidForm(formData)) {
        alert("Please make sure all fields are correctly filled.");
        return; 
      }
  
      updateL(id, formData);
      setEdit(false);
    }
  
    if (!listing) {
      return <div className="not-found">⚠️ Oops! Listing not found.</div>;
    }
  
    function left() {
      if (imgin > 0) setImgin((prev) => prev - 1);
    }
  
    function right() {
      if (imgin < listing.images.length - 1) setImgin((prev) => prev + 1);
    }
  
    const isFavorited = fav.some(
      (f) => f.title === listing.title && f.owner === listing.owner
    );
  
    return (
      <div className="listing-page">
        {/* Image gallery */}
        <div className="listing-gallery">
          <img
            key={listing.images[imgin]}
            src={listing.images[imgin]}
            alt={listing.title}
            className="main-image"
            loading="lazy"
          />
          {listing.images.length > 1 && (
            <div className="image-buttons">
              <button onClick={left} aria-label="Previous image">←</button>
              <button onClick={right} aria-label="Next image">→</button>
            </div>
          )}
        </div>
  
        {/* Favorite button */}
        <div className="Details-fav-cont">
          <button onClick={() => setFav(listing)}>
            <span className={`star ${isFavorited ? 'favorite' : 'empty'}`}>
              {isFavorited ? '★' : '☆'}
            </span>
          </button>
        </div>
  
        {/* Main content */}
        {edit !== true ? (
          <button id="edit" onClick={() => setEdit(!edit)}>Edit</button>
        ) : (
          <button id="edit" onClick={handleSave} disabled={!isValidForm(formData)}>
            Save
          </button>
        )}
  
        <div className="listing-content">
          {edit === false ? (
            <h1 className="listing-title">{listing.title}</h1>
          ) : (
            <div>
              <label htmlFor="title">Title</label>
              <input id="title" name="title" value={formData.title} onChange={editText} />
            </div>
          )}
  
          {edit === false ? (
            <p className="listing-price">
              ${listing.price?.toLocaleString()} <span className="subtle">/ one-time</span>
            </p>
          ) : (
            <>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={editText}
                  type="number"
                  min="1"
                />
              </div>
              {edit && !isValidPrice(formData.price) && (
                <span className="error-message">Please enter a valid price.</span>
              )}
            </>
          )}
  
          {/* Location and Owner */}
          <div className="listing-tags">
            {edit === false ? (
              <span className="tag">Location: {listing.location}</span>
            ) : (
              <div>
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={editText}
                />
              </div>
            )}
            {edit === false && <span className="tag">Listed by: {listing.owner}</span>}
          </div>
  
          {/* Description */}
          <div className="listing-section">
            <h2 className="section-title"> Description</h2>
            {edit === false ? (
              <p className="listing-desc">{listing.desc}</p>
            ) : (
              <div>
                <textarea
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={editText}
                  rows={5}
                  cols={50}
                />
              </div>
            )}
          </div>
          <hr />
  
          {/* Contact */}
          <div className="contact-details">
            <h2>Contact</h2>
            {edit === false ? (
              <>
                <p>Email: {listing.email}</p>
                <p>Phone: {listing.phone}</p>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={editText}
                    type="email"
                  />
                  {edit && !isValidEmail(formData.email) && (
                    <span className="error-message">Please enter a valid email.</span>
                  )}
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={editText}
                    type="tel"
                  />
                </div>
              </>
            )}
          </div>
          <hr />
  
          <div className="listing-section">
            <h2 className="section-title">Details</h2>
            <ul className="listing-info">
              <li><strong>Rating:</strong> 4.5<span id="rating-star">★</span></li>
              <li><strong>Category:</strong> Home / Product</li>
              <li><strong>Status:</strong> Available</li>
              <li><strong>Delivery:</strong> Within 3-5 days (if applicable)</li>
            </ul>
          </div>
        </div>
  

  
  
        <div id="rev-cont">
        <button onClick={() => navi(`/reviews/${listing.id}`)}>Reviews</button>
        </div>
      </div>
    );
}
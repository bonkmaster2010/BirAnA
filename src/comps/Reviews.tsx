import { useParams } from "react-router";
import { useListingStore } from "../states/listingStore";
import { useState, useCallback, useEffect, useRef } from 'react';
import '../styles/Reviews.css';

export default function Reviews() {
  const { id } = useParams();
  const { listings } = useListingStore();
  const listing = listings.find((l) => l.id === id);


  if (!listing) {
    return <h2 style={{ textAlign: 'center' }}>Listing not found.</h2>;
  }
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<string[]>([]);
  const [currentReview, setCurrentReview] = useState('');
  const lastReviewRef = useRef<HTMLDivElement | null>(null);



  const showPreviousImage = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  }, [currentImageIndex]);

  const showNextImage = useCallback(() => {
    if (currentImageIndex < listing.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  }, [currentImageIndex, listing.images.length]);

  const submitReview = () => {
    if(currentReview.length >= 250){
      alert("Max Characters reached (Max (250), Min (3)")
      return;
    }else if(currentReview.length < 3){
      alert("please enter at least a 3 character review")
      return;
    }
    if (currentReview.trim() !== '') {
      setReviews(prev => [...prev, currentReview.trim()]);
      setCurrentReview('');
    }
  };

  useEffect(() => {
    if (lastReviewRef.current) {
      lastReviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reviews]);

  return (
    <>
      <section className="small-product-showcase">
        <img
          key={listing.images[currentImageIndex]}
          src={listing.images[currentImageIndex]}
          alt={`${listing.title} Image ${currentImageIndex + 1}`}
        />

        <div style={{ flexGrow: 1 }}>
          <h3>{listing.title}</h3>
          <h3>{listing.price}</h3>
        </div>

        {listing.images.length > 1 && (
          <div className="small-image-buttons">
            <button onClick={showPreviousImage} aria-label="Previous image">←</button>
            <button onClick={showNextImage} aria-label="Next image">→</button>
          </div>
        )}
      </section>

      <section className="review-input">
        <textarea
          placeholder="Write your review here..."
          value={currentReview}
          onChange={(e) => setCurrentReview(e.target.value)}
          autoFocus
        />
        <button onClick={submitReview}>Submit Review</button>
      </section>

      <section className="Reviews">
        <h1>Reviews</h1>
        {reviews.length === 0 ? (
          <h2 style={{textAlign: "center", opacity: '0.8'}}>No reviews yet. Be the first!</h2>
        ) : (
          reviews.map((review, index) => (
            <div
              key={`${review}-${index}`}
              className="review fade-in"
              ref={index === reviews.length - 1 ? lastReviewRef : null}
            >
              <textarea value={review} readOnly disabled />
            </div>
          ))
        )}
      </section>
    </>
  );
}

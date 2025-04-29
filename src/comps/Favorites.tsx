import { useListingStore } from "../states/listingStore";
import { NavLink } from 'react-router'; 
import { useState, useEffect } from "react"; 
import '../styles/Favorites.css';

export default function Favorites() {
  const { setFav, fav, listings } = useListingStore();
  const [imageIndices, setImageIndices] = useState<number[]>([]);

  useEffect(() => {
    setImageIndices(Array(listings.length).fill(0));
  }, [listings]);



  const handleLeft = (index: number) => {
    setImageIndices(prev => {
      const newIndices = [...prev];
      if (newIndices[index] > 0) newIndices[index]--;
      return newIndices;
    });
  };

  const handleRight = (index: number) => {
    setImageIndices(prev => {
      const newIndices = [...prev];
      if (newIndices[index] < listings[index]?.images.length - 1) newIndices[index]++;
      return newIndices;
    });
  };

  return ( 
    <>
        <h1 id="fav-title">Favorites</h1>
    <div className="Home-cont">
      {fav.length === 0 ? (
        <div className="empty-message">
          <h1 id="noListings"> its lonely in here 😔 </h1>
        </div>
      ) : (
        fav.map((listing, i) => {
          const isFavorited = fav.some(
            (f) => f.title === listing.title && f.owner === listing.owner
          );
         
         return(
          <>
         <div key={`listing-${i}`} className="listing">
            <div className="img-cont">        
              <NavLink to={`/favorite/${listing.id}`}>
                <img src={listing.images[imageIndices[i] || 0]} alt={listing.title} />  
              </NavLink>
              {listing.images.length > 1 && (
                <div className="img-btn-cont">
                  <button onClick={() => handleLeft(i)}>←</button>
                  <button onClick={() => handleRight(i)}>→</button>
                </div>
              )}
            </div>
            <div className="fav-cont">
            <button onClick={() => setFav(listing)}>
            <span
              className={`star ${isFavorited ? 'favorite' : 'empty'}`}
               >
               {isFavorited ? '★' : '☆'}
            </span>
            </button>
            </div>
            <h1>{listing.title}</h1>
            <p>Lister: {listing.owner}</p>
            <p>{listing.desc}</p>
            <h3>{listing.location}</h3>
            <p>{Array.isArray(listing.tags) ? listing.tags.join(", ") : listing.tags}</p>
            <p>${listing.price}</p>
          </div>
          </>
          )
          })
      )}
    </div>
    </>
  );
}

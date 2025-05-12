import { useListingStore } from "../states/listingStore";
import { NavLink } from 'react-router'; 
import { useState, useEffect } from "react"; 
import { Amenities } from "../utils/Amenities";
import '../styles/Home.css';

export default function Home() {
  const { setFav, fav, listings } = useListingStore();
  const [imageIndices, setImageIndices] = useState<number[]>([]);
  // State for filters
  const [filterTitle, setFilterTitle] = useState('');
  const [filterPriceMin, setFilterPriceMin] = useState<number>(0);
  const [filterPriceMax, setFilterPriceMax] = useState<number>(10000000);
  const [filterLister, setFilterLister] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    setImageIndices(Array(listings.length).fill(0));
  }, [listings]);

  const filteredListings = listings.filter((listing) => {
    const matchesTitle = listing.title.toLowerCase().includes(filterTitle.toLowerCase());
    const matchesLister = listing.owner.toLowerCase().includes(filterLister.toLowerCase());
    const matchesLocation = listing.location.toLowerCase().includes(filterLocation.toLowerCase());

    const price = listing.price ? parseFloat(listing.price) : NaN;
    const matchesPrice = !isNaN(price) && price >= filterPriceMin && price <= filterPriceMax;

    const matchesTag = filterTag ? listing.tags.includes(filterTag) : true;

    return matchesTitle && matchesLister && matchesLocation && matchesPrice && matchesTag;
  });

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
    <div className="Home-cont">
      {/* Filter UI */}
      {listings.length > 0 && (
        <div className="filters">
          <input
            type="text"
            placeholder="Search by title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Price"
            value={filterPriceMin}
            onChange={(e) => setFilterPriceMin(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filterPriceMax}
            onChange={(e) => setFilterPriceMax(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Lister"
            value={filterLister}
            onChange={(e) => setFilterLister(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="">Amenties</option>
            {Amenities.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>
        </div> 
      )}    

      {/* Displaying the listings */}
      {filteredListings.length === 0 ? (
        <div className="empty-message">
          <h1 id="noListings">No Listings Found</h1>
        </div>
      ) : (
        filteredListings.map((listing, i) => {
          const isFavorited = fav.some(
            (f) => f.title === listing.title && f.owner === listing.owner
          );

          return (
            <div key={`listing-${i}`} className="listing">
              <div className="img-cont">        
                <NavLink to={`/listing/${i}`}>
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
                  <span className={`star ${isFavorited ? 'favorite' : 'empty'}`}>
                    {isFavorited ? '★' : '☆'}
                  </span>
                </button>
              </div>
              <h1>{listing.title}</h1>
              <p>Lister: {listing.owner}</p>
              <h3>Location: {listing.location}</h3>
              <div className="tags">
                <p id="tag">Amenities: {Array.isArray(listing.tags) ? listing.tags.join(", ") : listing.tags}</p>
              </div>
              <p>${listing.price}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './Layout.tsx';
import Home from './comps/Home.tsx';
import Create from './comps/Create.tsx';
import ListingDetail from './comps/ListingDetails.tsx';
import Favorites from './comps/Favorites.tsx';
import FavoriteListing from './comps/FavoriteListing.tsx';
import Reviews from './comps/Reviews.tsx';
import Bookings from './comps/Bookings.tsx';
import BookingDetails from './comps/BookingDetails.tsx';
import NotFound from './comps/PageNotFound.tsx';
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/favs' element={<Favorites/>}/>
          <Route path='/favorite/:id' element={<FavoriteListing/>} />
          <Route path='/listing/:id' element={<ListingDetail />} />
          <Route path='/reviews/:id' element={<Reviews />}/>
          <Route path='Bookings' element={<Bookings/>}/>
          <Route path='bookings/:id' element={<BookingDetails/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
);

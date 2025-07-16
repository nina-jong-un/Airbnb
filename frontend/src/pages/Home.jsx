// Home.jsx
import React, { useContext } from 'react';
import Nav from '../Component/Nav';
import Card from '../Component/Card';
import ErrorBoundary from '../Component/ErrorBoundary'; // Adjust the path if needed
import { listingDataContext } from '../Context/ListingContext';

function Home() {
  const { newListData } = useContext(listingDataContext);

  return (
    <div>
      <Nav />
      <div className='w-[100vw] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]'>
        {Array.isArray(newListData) && newListData.length > 0 ? (
          newListData.map((list) =>
            list ? (
              <ErrorBoundary key={list._id}>
                <Card
                  title={list.title || ''}
                  landMark={list.landMark || ''}
                  city={list.city || ''}
                  image1={list.image1 || ''}
                  image2={list.image2 || ''}
                  image3={list.image3 || ''}
                  rent={list.rent || 0}
                  id={list._id}
                  ratings={list.ratings || 0}
                  isBooked={list.isBooked || false}
                  host={list.host || ''}
                />
              </ErrorBoundary>
            ) : null
          )
        ) : (
          <p className="text-center text-gray-500 text-lg">No listings available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;

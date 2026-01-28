import React from 'react';
import PlaceHolder from './PlaceHolder';

const PlaceHolderContainer = () => {
  const placeNumbers = Array.from({ length: 6 }, (_, i) => i); // Create [0,1,2,3,4,5]

  return (
    <section className="py-5" id="shop">
      <h4 style={{ textAlign: "center" }}>Our Products</h4>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
          {placeNumbers.map(num => <PlaceHolder key={num} />)}
        </div>
      </div>
    </section>
  );
};

export default PlaceHolderContainer;

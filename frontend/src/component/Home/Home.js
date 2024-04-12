import React from 'react';
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import Product from "./Product";


const product = {
    name:"Blue Tshirt",
    price:3000,
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    _id:"Sangu"
}
const Home = () => {
  return (
    <>
    <div className='banner'>
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href='#containers'>
            <button>
                Scroll <CgMouse/>
            </button>
        </a>
    </div>
    <h2 className='homeHeading'>Featured Products</h2>
    <div className="containers" id="containers">
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    </div>
    </>
  )
}

export default Home
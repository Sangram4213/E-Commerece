import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import Metadata from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, productCount, error } = useSelector(
    (state) => state.product
  );
  console.log({ pp: products });

  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch,error]);

  return (
    <>
      {!products ? (
        <Loader/>
      ) : (
        <>
          <Metadata title="ECommerce" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#containers">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="containers" id="containers">
            {products &&
              products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

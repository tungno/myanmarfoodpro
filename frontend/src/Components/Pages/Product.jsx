import React, {useContext, useEffect} from 'react';
import {ShopContext} from "../../Context/ShopContext";
import {useParams} from "react-router-dom";
import Breadcrum from "./Product/Breadcrums/Breadcrum";
import ProductDisplay from "./Product/ProductDisplay/ProductDisplay";
import DescriptionBox from "./Product/DescriptionBox/DescriptionBox";
import RelatedProducts from "./Product/RelatedProducts/RelatedProducts";

const Product = () => {
    const  {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e) => e.id === Number(productId))

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when this component mounts
    }, [productId]);

  return (
    <div>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts id ={product.id} category={product.category}/>
    </div>
  );
};

export default Product ;
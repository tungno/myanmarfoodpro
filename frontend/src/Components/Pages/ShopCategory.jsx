import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './CSS/ShopCategory.css';
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from '../Asset/dropdown_icon.png';
import Items from "../Items/Items";

const ShopCategory = (props) => {
    const { t } = useTranslation();
    const { all_product } = useContext(ShopContext);

    // Filter products by category
    const filteredProducts = all_product.filter(item => item.category === props.category);

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt={t('category_banner_alt')} />
            <div className="shopcategory-indexSort">
                <p>
                    <span>{t('showing', { start: 1, end: Math.min(12, filteredProducts.length), total: filteredProducts.length })}</span> {t('out_of')} {filteredProducts.length} {t('products')}
                </p>
                <div className="shopcategory-sort">
                    {t('sort_by')} <img src={dropdown_icon} alt={t('dropdown_icon_alt')} />
                </div>
            </div>
            <div className="shopcategory-products">
                {filteredProducts.map(item => (
                    <Items
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                        stock_quantity={item.stock_quantity}
                        description={item.description}
                    />
                ))}
            </div>
            <div className="shopcategory-loadmore">
                {t('explore_more')}
            </div>
        </div>
    );
};

export default ShopCategory;

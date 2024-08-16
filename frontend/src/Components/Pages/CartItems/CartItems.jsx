import React, { useContext } from 'react';
import './CartItems.css';
import { useTranslation } from "react-i18next";
import { ShopContext } from "../../../Context/ShopContext";
import remove_icon from '../../Asset/cart_cross_icon.png';

const CartItems = () => {
    const { t } = useTranslation();
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>{t('products')}</p>
                <p>{t('title')}</p>
                <p>{t('price')}</p>
                <p>{t('quantity')}</p>
                <p>{t('total')}</p>
                <p>{t('remove')}</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}> {/* Add a unique key prop here */}
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>{e.new_price} NOK</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>{e.new_price * cartItems[e.id]} NOK</p>
                                <img
                                    className='cartitems-remove-icon'
                                    src={remove_icon}
                                    onClick={() => removeFromCart(e.id)}
                                    alt={t('remove_item')}
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>{t('cart_totals')}</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>{t('subtotal')}</p>
                            <p>{getTotalCartAmount()} NOK</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>{t('shipping_fee')}</p>
                            <p>{t('free')}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>{t('total')}</h3>
                            <h3>{getTotalCartAmount()} NOK</h3>
                        </div>
                    </div>
                    <button>{t('proceed_to_checkout')}</button>
                </div>
                <div className="cartitems-promocode">
                    <p>{t('promo_code_text')}</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder={t('promo_code_placeholder')} />
                        <button>{t('submit')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;

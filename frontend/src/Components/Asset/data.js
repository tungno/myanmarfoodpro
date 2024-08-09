import p1_img from './product_1.png'
import p2_img from './product_2.png'
import p3_img from './product_3.png'
import p4_img from './product_4.png'

let data_product = [
  {
    id: 1,
    name: "Kyaw kya",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "seafood",
    stock_quantity: 4,
    image: p1_img,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Flutter Blouse",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "farm_food",
    stock_quantity: 3, // Few in stock
    image: p2_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 3,
    name: "Overlap Blouse",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "traditionalfood",
    stock_quantity: 0,
    image: p3_img,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    name: "Peplum Top",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "snackfood",
    stock_quantity: 15,
    image: p4_img,
    new_price: 100.0,
    old_price: 150.0,
  },
];

export default data_product;

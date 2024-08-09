import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";

let all_product = [
  {
    id: 1,
    name: "Kyaw kya",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "seafood",
    stock: "in stock", // few in stock, out of stock
    image: p1_img,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Flutter Blouse",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "farmfood",
    stock: "few in stock",
    image: p2_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 3,
    name: "Overlap Blouse",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "traditionalfood",
    stock: "out of stock",
    image: p3_img,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    name: "Peplum Top",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "snackfood",
    stock: "in stock",
    image: p4_img,
    new_price: 100.0,
    old_price: 150.0,
  },
  {
    id: 5,
    name: "Striped Blouse",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "seafood",
    stock: "few in stock",
    image: p5_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 6,
    name: "Sleeve Blouse",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "farmfood",
    stock: "out of stock",
    image: p6_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 7,
    name: "Collar Blouse",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "traditionalfood",
    stock: "in stock",
    image: p7_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 8,
    name: "Flutter Sleeve",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "snackfood",
    stock: "few in stock",
    image: p8_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 9,
    name: "Overlap Collar",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "seafood",
    stock: "out of stock",
    image: p9_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 10,
    name: "Peplum Blouse",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "farmfood",
    stock: "in stock",
    image: p10_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 11,
    name: "Striped Top",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "traditionalfood",
    stock: "few in stock",
    image: p11_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 12,
    name: "Sleeve Top",
    description: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "snackfood",
    stock: "out of stock",
    image: p12_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 13,
    name: "Green Jacket",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "seafood",
    stock: "in stock",
    image: p13_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 14,
    name: "Slim Fit",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "farmfood",
    stock: "few in stock",
    image: p14_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 15,
    name: "Full-Zip Bomber",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "traditionalfood",
    stock: "out of stock",
    image: p15_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 16,
    name: "Bomber Jacket",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "snackfood",
    stock: "in stock",
    image: p16_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 17,
    name: "Green Bomber",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "seafood",
    stock: "few in stock",
    image: p17_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 18,
    name: "Zippered Jacket",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "farmfood",
    stock: "out of stock",
    image: p18_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 19,
    name: "Solid Jacket",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "traditionalfood",
    stock: "in stock",
    image: p19_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 20,
    name: "Men's Jacket",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "snackfood",
    stock: "few in stock",
    image: p20_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 21,
    name: "Slim Bomber",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "seafood",
    stock: "out of stock",
    image: p21_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 22,
    name: "Bomber Fit",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "farmfood",
    stock: "in stock",
    image: p22_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 23,
    name: "Zippered Bomber",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "traditionalfood",
    stock: "few in stock",
    image: p23_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 24,
    name: "Green Fit",
    description: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "snackfood",
    stock: "out of stock",
    image: p24_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 25,
    name: "Orange Hoodie",
    description: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "seafood",
    stock: "in stock",
    image: p25_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 26,
    name: "Colorblocked Hoodie",
    description: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "farmfood",
    stock: "few in stock",
    image: p26_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 27,
    name: "Hooded Sweatshirt",
    description: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "traditionalfood",
    stock: "out of stock",
    image: p27_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 28,
    name: "Orange Sweatshirt",
    description: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "snackfood",
    stock: "in stock",
    image: p28_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 29,
    name: "Colorblocked Sweatshirt",
    description: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "seafood",
    stock: "few in stock",
    image: p29_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 30,
    name: "Orange Blocked",
    description: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "farmfood",
    stock: "out of stock",
    image: p30_img,
    new_price: 85.0,
    old_price: 120.5,
  }
];


export default all_product;

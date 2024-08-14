import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Pagination from "../../../Pagination";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3, count: 400 },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 400 },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 250 },
  },
  {
    id: 14,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: { rate: 2.2, count: 140 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: { rate: 2.9, count: 340 },
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: { rate: 3.8, count: 679 },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: { rate: 4.7, count: 130 },
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: { rate: 3.6, count: 145 },
  },
];
////
const Tproducts = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    tags: ["beauty", "mascara"],
    brand: "Essence",
    sku: "RCH45Q1A",
    weight: 2,
    dimensions: { width: 23.17, height: 14.43, depth: 28.01 },
    warrantyInformation: "1 month warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "Low Stock",
    reviews: [
      {
        rating: 2,
        comment: "Very unhappy with my purchase!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "John Doe",
        reviewerEmail: "john.doe@x.dummyjson.com",
      },
      {
        rating: 2,
        comment: "Not as described!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Nolan Gonzalez",
        reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Scarlett Wright",
        reviewerEmail: "scarlett.wright@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 24,
    meta: {
      createdAt: "2024-05-23T08:56:21.618Z",
      updatedAt: "2024-05-23T08:56:21.618Z",
      barcode: "9164035109868",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description:
      "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    category: "beauty",
    price: 19.99,
    discountPercentage: 5.5,
    rating: 3.28,
    stock: 44,
    tags: ["beauty", "eyeshadow"],
    brand: "Glamour Beauty",
    sku: "MVCFH27F",
    weight: 3,
    dimensions: { width: 12.42, height: 8.63, depth: 29.13 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Liam Garcia",
        reviewerEmail: "liam.garcia@x.dummyjson.com",
      },
      {
        rating: 1,
        comment: "Very disappointed!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Nora Russell",
        reviewerEmail: "nora.russell@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Highly impressed!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Elena Baker",
        reviewerEmail: "elena.baker@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 32,
    meta: {
      createdAt: "2024-05-23T08:56:21.618Z",
      updatedAt: "2024-05-23T08:56:21.618Z",
      barcode: "2817839095220",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
  },
  {
    id: 3,
    title: "Powder Canister",
    description:
      "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    category: "beauty",
    price: 14.99,
    discountPercentage: 18.14,
    rating: 3.82,
    stock: 59,
    tags: ["beauty", "face powder"],
    brand: "Velvet Touch",
    sku: "9EN8WLT2",
    weight: 8,
    dimensions: { width: 24.16, height: 10.7, depth: 11.07 },
    warrantyInformation: "2 year warranty",
    shippingInformation: "Ships in 1-2 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Very happy with my purchase!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Ethan Thompson",
        reviewerEmail: "ethan.thompson@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Great value for money!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Levi Hicks",
        reviewerEmail: "levi.hicks@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Highly impressed!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Hazel Gardner",
        reviewerEmail: "hazel.gardner@x.dummyjson.com",
      },
    ],
    returnPolicy: "60 days return policy",
    minimumOrderQuantity: 25,
    meta: {
      createdAt: "2024-05-23T08:56:21.618Z",
      updatedAt: "2024-05-23T08:56:21.618Z",
      barcode: "0516267971277",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
  },
  {
    id: 4,
    title: "Red Lipstick",
    description:
      "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    category: "beauty",
    price: 12.99,
    discountPercentage: 19.03,
    rating: 2.51,
    stock: 68,
    tags: ["beauty", "lipstick"],
    brand: "Chic Cosmetics",
    sku: "O5IF1NTA",
    weight: 5,
    dimensions: { width: 14.37, height: 13.94, depth: 14.6 },
    warrantyInformation: "Lifetime warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Great product!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Leo Rivera",
        reviewerEmail: "leo.rivera@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Oscar Powers",
        reviewerEmail: "oscar.powers@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Carter Rivera",
        reviewerEmail: "carter.rivera@x.dummyjson.com",
      },
    ],
    returnPolicy: "90 days return policy",
    minimumOrderQuantity: 6,
    meta: {
      createdAt: "2024-05-23T08:56:21.619Z",
      updatedAt: "2024-05-23T08:56:21.619Z",
      barcode: "9444582199406",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
  },
  {
    id: 5,
    title: "Red Nail Polish",
    description:
      "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    category: "beauty",
    price: 8.99,
    discountPercentage: 2.46,
    rating: 3.91,
    stock: 71,
    tags: ["beauty", "nail polish"],
    brand: "Nail Couture",
    sku: "YUIIIP4W",
    weight: 9,
    dimensions: { width: 8.11, height: 10.89, depth: 29.06 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 1 week",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Leo Rivera",
        reviewerEmail: "leo.rivera@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Great product!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Evan Reed",
        reviewerEmail: "evan.reed@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Highly recommended!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Evelyn Sanchez",
        reviewerEmail: "evelyn.sanchez@x.dummyjson.com",
      },
    ],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 46,
    meta: {
      createdAt: "2024-05-23T08:56:21.619Z",
      updatedAt: "2024-05-23T08:56:21.619Z",
      barcode: "3212847902461",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png",
  },
  {
    id: 6,
    title: "Calvin Klein CK One",
    description:
      "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    category: "fragrances",
    price: 49.99,
    discountPercentage: 0.32,
    rating: 4.85,
    stock: 17,
    tags: ["fragrances", "perfumes"],
    brand: "Calvin Klein",
    sku: "DZM2JQZE",
    weight: 5,
    dimensions: { width: 11.53, height: 14.44, depth: 6.81 },
    warrantyInformation: "5 year warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Great value for money!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Sophia Brown",
        reviewerEmail: "sophia.brown@x.dummyjson.com",
      },
      {
        rating: 3,
        comment: "Very disappointed!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Madison Collins",
        reviewerEmail: "madison.collins@x.dummyjson.com",
      },
      {
        rating: 1,
        comment: "Poor quality!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Maya Reed",
        reviewerEmail: "maya.reed@x.dummyjson.com",
      },
    ],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 20,
    meta: {
      createdAt: "2024-05-23T08:56:21.619Z",
      updatedAt: "2024-05-23T08:56:21.619Z",
      barcode: "2210136215089",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png",
  },
  {
    id: 7,
    title: "Chanel Coco Noir Eau De",
    description:
      "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    category: "fragrances",
    price: 129.99,
    discountPercentage: 18.64,
    rating: 2.76,
    stock: 41,
    tags: ["fragrances", "perfumes"],
    brand: "Chanel",
    sku: "K71HBCGS",
    weight: 4,
    dimensions: { width: 21.27, height: 28, depth: 11.89 },
    warrantyInformation: "1 week warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 1,
        comment: "Disappointing product!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Lincoln Kelly",
        reviewerEmail: "lincoln.kelly@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Great product!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Lincoln Kelly",
        reviewerEmail: "lincoln.kelly@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Excellent quality!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Lucas Allen",
        reviewerEmail: "lucas.allen@x.dummyjson.com",
      },
    ],
    returnPolicy: "60 days return policy",
    minimumOrderQuantity: 5,
    meta: {
      createdAt: "2024-05-23T08:56:21.619Z",
      updatedAt: "2024-05-23T08:56:21.619Z",
      barcode: "1435582999795",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/2.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
  },
  {
    id: 8,
    title: "Dior J'adore",
    description:
      "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    category: "fragrances",
    price: 89.99,
    discountPercentage: 17.44,
    rating: 3.31,
    stock: 91,
    tags: ["fragrances", "perfumes"],
    brand: "Dior",
    sku: "E70NB03B",
    weight: 10,
    dimensions: { width: 21.51, height: 7, depth: 26.51 },
    warrantyInformation: "Lifetime warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Fast shipping!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Zoe Nicholson",
        reviewerEmail: "zoe.nicholson@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Excellent quality!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Addison Wright",
        reviewerEmail: "addison.wright@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Clara Berry",
        reviewerEmail: "clara.berry@x.dummyjson.com",
      },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 8,
    meta: {
      createdAt: "2024-05-23T08:56:21.619Z",
      updatedAt: "2024-05-23T08:56:21.619Z",
      barcode: "0887083199279",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/1.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/2.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
  },
  {
    id: 9,
    title: "Dolce Shine Eau de",
    description:
      "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    category: "fragrances",
    price: 69.99,
    discountPercentage: 11.47,
    rating: 2.68,
    stock: 3,
    tags: ["fragrances", "perfumes"],
    brand: "Dolce & Gabbana",
    sku: "1NBFK980",
    weight: 5,
    dimensions: { width: 17, height: 24.57, depth: 13.3 },
    warrantyInformation: "5 year warranty",
    shippingInformation: "Ships in 1-2 business days",
    availabilityStatus: "Low Stock",
    reviews: [
      {
        rating: 4,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Xavier Wright",
        reviewerEmail: "xavier.wright@x.dummyjson.com",
      },
      {
        rating: 1,
        comment: "Poor quality!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Mila Hernandez",
        reviewerEmail: "mila.hernandez@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very happy with my purchase!",
        date: "2024-05-23T08:56:21.619Z",
        reviewerName: "Sophia Brown",
        reviewerEmail: "sophia.brown@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 9,
    meta: {
      createdAt: "2024-05-23T08:56:21.619Z",
      updatedAt: "2024-05-23T08:56:21.619Z",
      barcode: "1939383392674",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/2.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png",
  },
  {
    id: 10,
    title: "Gucci Bloom Eau de",
    description:
      "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    category: "fragrances",
    price: 79.99,
    discountPercentage: 8.9,
    rating: 2.69,
    stock: 93,
    tags: ["fragrances", "perfumes"],
    brand: "Gucci",
    sku: "FFKZ6HOF",
    weight: 10,
    dimensions: { width: 22.28, height: 17.81, depth: 27.18 },
    warrantyInformation: "No warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Great value for money!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Aria Parker",
        reviewerEmail: "aria.parker@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Excellent quality!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Natalie Harris",
        reviewerEmail: "natalie.harris@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Fast shipping!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Ava Harris",
        reviewerEmail: "ava.harris@x.dummyjson.com",
      },
    ],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 10,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "8232190382069",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/2.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png",
  },
  {
    id: 11,
    title: "Annibale Colombo Bed",
    description:
      "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    category: "furniture",
    price: 1899.99,
    discountPercentage: 0.29,
    rating: 4.14,
    stock: 47,
    tags: ["furniture", "beds"],
    brand: "Annibale Colombo",
    sku: "4KMDTZWF",
    weight: 3,
    dimensions: { width: 28.75, height: 26.88, depth: 24.47 },
    warrantyInformation: "2 year warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Great value for money!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Julian Newton",
        reviewerEmail: "julian.newton@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Madison Collins",
        reviewerEmail: "madison.collins@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Clara Berry",
        reviewerEmail: "clara.berry@x.dummyjson.com",
      },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "7113807059215",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/2.png",
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
  },
  {
    id: 12,
    title: "Annibale Colombo Sofa",
    description:
      "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    category: "furniture",
    price: 2499.99,
    discountPercentage: 18.54,
    rating: 3.08,
    stock: 16,
    tags: ["furniture", "sofas"],
    brand: "Annibale Colombo",
    sku: "LUU95CQP",
    weight: 3,
    dimensions: { width: 20.97, height: 19.11, depth: 25.81 },
    warrantyInformation: "1 month warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Tyler Davis",
        reviewerEmail: "tyler.davis@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Excellent quality!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Hannah Robinson",
        reviewerEmail: "hannah.robinson@x.dummyjson.com",
      },
      {
        rating: 3,
        comment: "Waste of money!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Madison Collins",
        reviewerEmail: "madison.collins@x.dummyjson.com",
      },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "0426785817074",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/2.png",
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png",
  },
  {
    id: 13,
    title: "Bedside Table African Cherry",
    description:
      "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    category: "furniture",
    price: 299.99,
    discountPercentage: 9.58,
    rating: 4.48,
    stock: 16,
    tags: ["furniture", "bedside tables"],
    brand: "Furniture Co.",
    sku: "OWPLTZYX",
    weight: 10,
    dimensions: { width: 25.43, height: 20.2, depth: 24.95 },
    warrantyInformation: "6 months warranty",
    shippingInformation: "Ships in 1-2 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Very happy with my purchase!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "John Doe",
        reviewerEmail: "john.doe@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Highly recommended!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Avery Carter",
        reviewerEmail: "avery.carter@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Evelyn Sanchez",
        reviewerEmail: "evelyn.sanchez@x.dummyjson.com",
      },
    ],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 5,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "2913244159666",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/2.png",
      "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png",
  },
  {
    id: 14,
    title: "Knoll Saarinen Executive Conference Chair",
    description:
      "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    category: "furniture",
    price: 499.99,
    discountPercentage: 15.23,
    rating: 4.11,
    stock: 47,
    tags: ["furniture", "office chairs"],
    brand: "Knoll",
    sku: "RKHVJ4FE",
    weight: 3,
    dimensions: { width: 16.59, height: 21.46, depth: 29.07 },
    warrantyInformation: "Lifetime warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Very happy with my purchase!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Leah Gutierrez",
        reviewerEmail: "leah.gutierrez@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Nolan Gonzalez",
        reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
      },
      {
        rating: 2,
        comment: "Waste of money!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Stella Morris",
        reviewerEmail: "stella.morris@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 5,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "0726316339746",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/2.png",
      "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png",
  },
  {
    id: 15,
    title: "Wooden Bathroom Sink With Mirror",
    description:
      "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    category: "furniture",
    price: 799.99,
    discountPercentage: 11.22,
    rating: 3.26,
    stock: 95,
    tags: ["furniture", "bathroom"],
    brand: "Bath Trends",
    sku: "7OLTIEVO",
    weight: 6,
    dimensions: { width: 7.32, height: 22.64, depth: 12.37 },
    warrantyInformation: "6 months warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Highly recommended!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Charlotte Lopez",
        reviewerEmail: "charlotte.lopez@x.dummyjson.com",
      },
      {
        rating: 1,
        comment: "Would not recommend!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "William Gonzalez",
        reviewerEmail: "william.gonzalez@x.dummyjson.com",
      },
      {
        rating: 2,
        comment: "Not worth the price!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Ava Harrison",
        reviewerEmail: "ava.harrison@x.dummyjson.com",
      },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "7839797529453",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/2.png",
      "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png",
  },
  {
    id: 16,
    title: "Apple",
    description:
      "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    category: "groceries",
    price: 1.99,
    discountPercentage: 1.97,
    rating: 2.96,
    stock: 9,
    tags: ["fruits"],
    sku: "QTROUV79",
    weight: 8,
    dimensions: { width: 8.29, height: 5.58, depth: 12.41 },
    warrantyInformation: "2 year warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Great product!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Logan Lee",
        reviewerEmail: "logan.lee@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Great product!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Elena Long",
        reviewerEmail: "elena.long@x.dummyjson.com",
      },
      {
        rating: 1,
        comment: "Not as described!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Grayson Coleman",
        reviewerEmail: "grayson.coleman@x.dummyjson.com",
      },
    ],
    returnPolicy: "60 days return policy",
    minimumOrderQuantity: 44,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "2517819903837",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: ["https://cdn.dummyjson.com/products/images/groceries/Apple/1.png"],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
  },
  {
    id: 17,
    title: "Beef Steak",
    description:
      "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
    category: "groceries",
    price: 12.99,
    discountPercentage: 17.99,
    rating: 2.83,
    stock: 96,
    tags: ["meat"],
    sku: "BWWA2MSO",
    weight: 9,
    dimensions: { width: 23.35, height: 13.48, depth: 26.4 },
    warrantyInformation: "1 month warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Ethan Martinez",
        reviewerEmail: "ethan.martinez@x.dummyjson.com",
      },
      {
        rating: 3,
        comment: "Disappointing product!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Owen Fisher",
        reviewerEmail: "owen.fisher@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Very happy with my purchase!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Scarlett Wright",
        reviewerEmail: "scarlett.wright@x.dummyjson.com",
      },
    ],
    returnPolicy: "90 days return policy",
    minimumOrderQuantity: 21,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "8335515097879",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png",
  },
  {
    id: 18,
    title: "Cat Food",
    description:
      "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
    category: "groceries",
    price: 8.99,
    discountPercentage: 9.57,
    rating: 2.88,
    stock: 13,
    tags: ["pet supplies", "cat food"],
    sku: "C3F8QN6O",
    weight: 9,
    dimensions: { width: 15.4, height: 13.97, depth: 25.13 },
    warrantyInformation: "3 months warranty",
    shippingInformation: "Ships in 1-2 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Mateo Bennett",
        reviewerEmail: "mateo.bennett@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Aurora Barnes",
        reviewerEmail: "aurora.barnes@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Great value for money!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Ellie Stewart",
        reviewerEmail: "ellie.stewart@x.dummyjson.com",
      },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 48,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "5503491330693",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png",
  },
  {
    id: 19,
    title: "Chicken Meat",
    description:
      "Fresh and tender chicken meat, suitable for various culinary preparations.",
    category: "groceries",
    price: 9.99,
    discountPercentage: 10.46,
    rating: 4.61,
    stock: 69,
    tags: ["meat"],
    sku: "G5YEHW7B",
    weight: 7,
    dimensions: { width: 15.96, height: 29.24, depth: 26.25 },
    warrantyInformation: "Lifetime warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Sophia Jones",
        reviewerEmail: "sophia.jones@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Great value for money!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Maya Reed",
        reviewerEmail: "maya.reed@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Highly recommended!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Harper Turner",
        reviewerEmail: "harper.turner@x.dummyjson.com",
      },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 46,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "0966223559510",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/1.png",
      "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/2.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png",
  },
  {
    id: 20,
    title: "Cooking Oil",
    description:
      "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
    category: "groceries",
    price: 4.99,
    discountPercentage: 18.89,
    rating: 4.01,
    stock: 22,
    tags: ["cooking essentials"],
    sku: "Q6ZP1UY8",
    weight: 8,
    dimensions: { width: 8.18, height: 27.45, depth: 27.88 },
    warrantyInformation: "Lifetime warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Mason Parker",
        reviewerEmail: "mason.parker@x.dummyjson.com",
      },
      {
        rating: 3,
        comment: "Poor quality!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Jonathan Pierce",
        reviewerEmail: "jonathan.pierce@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Alexander Hernandez",
        reviewerEmail: "alexander.hernandez@x.dummyjson.com",
      },
    ],
    returnPolicy: "60 days return policy",
    minimumOrderQuantity: 2,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "6707669443381",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png",
  },
  {
    id: 21,
    title: "Cucumber",
    description:
      "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
    category: "groceries",
    price: 1.49,
    discountPercentage: 11.44,
    rating: 4.71,
    stock: 22,
    tags: ["vegetables"],
    sku: "6KGF2K6Z",
    weight: 9,
    dimensions: { width: 11.04, height: 20.5, depth: 8.18 },
    warrantyInformation: "5 year warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Elijah Hill",
        reviewerEmail: "elijah.hill@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Fast shipping!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Liam Garcia",
        reviewerEmail: "liam.garcia@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Excellent quality!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Ella Cook",
        reviewerEmail: "ella.cook@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 7,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "2597004869708",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Cucumber/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png",
  },
  {
    id: 22,
    title: "Dog Food",
    description:
      "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
    category: "groceries",
    price: 10.99,
    discountPercentage: 18.15,
    rating: 2.74,
    stock: 40,
    tags: ["pet supplies", "dog food"],
    sku: "A6QRCH37",
    weight: 2,
    dimensions: { width: 29.39, height: 29.77, depth: 20.54 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Highly impressed!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Leo Rivera",
        reviewerEmail: "leo.rivera@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Highly recommended!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Alexander Jones",
        reviewerEmail: "alexander.jones@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Addison Wright",
        reviewerEmail: "addison.wright@x.dummyjson.com",
      },
    ],
    returnPolicy: "90 days return policy",
    minimumOrderQuantity: 29,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "7957222289508",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png",
  },
  {
    id: 23,
    title: "Eggs",
    description:
      "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
    category: "groceries",
    price: 2.99,
    discountPercentage: 5.8,
    rating: 4.46,
    stock: 10,
    tags: ["dairy"],
    sku: "YA617RI7",
    weight: 4,
    dimensions: { width: 12.3, height: 10.99, depth: 15.53 },
    warrantyInformation: "3 year warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 2,
        comment: "Very unhappy with my purchase!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Mateo Perez",
        reviewerEmail: "mateo.perez@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Very happy with my purchase!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Cameron Perez",
        reviewerEmail: "cameron.perez@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very happy with my purchase!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Aurora Barnes",
        reviewerEmail: "aurora.barnes@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 43,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "7095702028776",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: ["https://cdn.dummyjson.com/products/images/groceries/Eggs/1.png"],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png",
  },
  {
    id: 24,
    title: "Fish Steak",
    description:
      "Quality fish steak, suitable for grilling, baking, or pan-searing.",
    category: "groceries",
    price: 14.99,
    discountPercentage: 7,
    rating: 4.83,
    stock: 99,
    tags: ["seafood"],
    sku: "XNIH1MTA",
    weight: 8,
    dimensions: { width: 20.14, height: 8.4, depth: 10.01 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Great value for money!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Michael Johnson",
        reviewerEmail: "michael.johnson@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Julian Newton",
        reviewerEmail: "julian.newton@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Excellent quality!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Lila Hudson",
        reviewerEmail: "lila.hudson@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 49,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "4250692197342",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png",
  },
  {
    id: 25,
    title: "Green Bell Pepper",
    description:
      "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
    category: "groceries",
    price: 1.29,
    discountPercentage: 15.5,
    rating: 4.28,
    stock: 89,
    tags: ["vegetables"],
    sku: "HU7S7VQ0",
    weight: 7,
    dimensions: { width: 7.32, height: 14.31, depth: 21.38 },
    warrantyInformation: "5 year warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Excellent quality!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Maya Reed",
        reviewerEmail: "maya.reed@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Madison Collins",
        reviewerEmail: "madison.collins@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Would buy again!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Ethan Thompson",
        reviewerEmail: "ethan.thompson@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "7583442707568",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png",
  },
  {
    id: 26,
    title: "Green Chili Pepper",
    description:
      "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
    category: "groceries",
    price: 0.99,
    discountPercentage: 18.51,
    rating: 4.43,
    stock: 8,
    tags: ["vegetables"],
    sku: "Y4RM3JCB",
    weight: 2,
    dimensions: { width: 18.67, height: 21.17, depth: 25.26 },
    warrantyInformation: "No warranty",
    shippingInformation: "Ships in 1-2 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 2,
        comment: "Disappointing product!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Mateo Bennett",
        reviewerEmail: "mateo.bennett@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Natalie Price",
        reviewerEmail: "natalie.price@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Avery Barnes",
        reviewerEmail: "avery.barnes@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 43,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "8400326844874",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png",
  },
  {
    id: 27,
    title: "Honey Jar",
    description:
      "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
    category: "groceries",
    price: 6.99,
    discountPercentage: 1.91,
    rating: 3.5,
    stock: 25,
    tags: ["condiments"],
    sku: "BTBNIIOU",
    weight: 9,
    dimensions: { width: 26.53, height: 27.11, depth: 6.63 },
    warrantyInformation: "2 year warranty",
    shippingInformation: "Ships overnight",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Fast shipping!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Nicholas Bailey",
        reviewerEmail: "nicholas.bailey@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Awesome product!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Gabriel Hayes",
        reviewerEmail: "gabriel.hayes@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Highly impressed!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "James Garcia",
        reviewerEmail: "james.garcia@x.dummyjson.com",
      },
    ],
    returnPolicy: "90 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "0668665656044",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png",
  },
  {
    id: 28,
    title: "Ice Cream",
    description:
      "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
    category: "groceries",
    price: 5.49,
    discountPercentage: 7.58,
    rating: 3.77,
    stock: 76,
    tags: ["desserts"],
    sku: "VEZMU1EQ",
    weight: 5,
    dimensions: { width: 17.66, height: 24.49, depth: 25.98 },
    warrantyInformation: "2 year warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Great product!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Elena Baker",
        reviewerEmail: "elena.baker@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Highly impressed!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Madeline Simpson",
        reviewerEmail: "madeline.simpson@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very happy with my purchase!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Caleb Nelson",
        reviewerEmail: "caleb.nelson@x.dummyjson.com",
      },
    ],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 19,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "9603960319256",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/1.png",
      "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/2.png",
      "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/3.png",
      "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/4.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png",
  },
  {
    id: 29,
    title: "Juice",
    description:
      "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
    category: "groceries",
    price: 3.99,
    discountPercentage: 5.45,
    rating: 3.41,
    stock: 99,
    tags: ["beverages"],
    sku: "M2K19S06",
    weight: 2,
    dimensions: { width: 8.97, height: 12.26, depth: 15.05 },
    warrantyInformation: "1 week warranty",
    shippingInformation: "Ships in 1-2 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Leo Rivera",
        reviewerEmail: "leo.rivera@x.dummyjson.com",
      },
      {
        rating: 2,
        comment: "Not worth the price!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Ethan Martinez",
        reviewerEmail: "ethan.martinez@x.dummyjson.com",
      },
      {
        rating: 4,
        comment: "Excellent quality!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Max Parker",
        reviewerEmail: "max.parker@x.dummyjson.com",
      },
    ],
    returnPolicy: "90 days return policy",
    minimumOrderQuantity: 26,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "8546824122355",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: ["https://cdn.dummyjson.com/products/images/groceries/Juice/1.png"],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Juice/thumbnail.png",
  },
  {
    id: 30,
    title: "Kiwi",
    description:
      "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
    category: "groceries",
    price: 2.49,
    discountPercentage: 10.32,
    rating: 4.37,
    stock: 1,
    tags: ["fruits"],
    sku: "0X3NORB9",
    weight: 8,
    dimensions: { width: 27.3, height: 7.48, depth: 15.08 },
    warrantyInformation: "6 months warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "Low Stock",
    reviews: [
      {
        rating: 5,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Nora Russell",
        reviewerEmail: "nora.russell@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very pleased!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Dylan Wells",
        reviewerEmail: "dylan.wells@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Great product!",
        date: "2024-05-23T08:56:21.620Z",
        reviewerName: "Noah Hernandez",
        reviewerEmail: "noah.hernandez@x.dummyjson.com",
      },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 8,
    meta: {
      createdAt: "2024-05-23T08:56:21.620Z",
      updatedAt: "2024-05-23T08:56:21.620Z",
      barcode: "3325493172934",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: ["https://cdn.dummyjson.com/products/images/groceries/Kiwi/1.png"],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png",
  },
];

////
const oldproducts = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];
const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Productlist = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                    <div className="mt-2  grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="group relative border-2 p-2 border-gray-300"
                        >
                          <div className="min-h-64  aspect-h-1 aspect-w- w-full overflow-hidden  bg-gray-400 lg:aspect-none group-hover:opacity-80 lg:h-64">
                            <img
                              alt={product.title}
                              src={product.image}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-2 flex justify-between">
                            <div className=" px-2 py-2">
                              <h3 className="text-sm text-gray-700">
                                <Link to={"/productdetails"}>
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                  />
                                  <p className="hover:under text-wrap">
                                    {product.title}
                                  </p>
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.category}
                              </p>
                            </div>
                            <div className="px-2 py-2 ">
                              <p className="text-sm text-nowrap font-medium text-gray-900">
                                $ {product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Pagination */}
          <Pagination />
        </main>
      </div>
    </div>
  );
};

export default Productlist;

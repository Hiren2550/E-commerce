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
  StarIcon,
} from "@heroicons/react/20/solid";
import Pagination from "../../../Pagination";
import { Link } from "react-router-dom";

const products = [
  {
    _id: 1,
    title: "Long sleeve Jacket",
    isNew: true,
    oldPrice: "200",
    price: 150,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
  },
  {
    _id: 2,
    title: "Jacket with wollen hat",
    isNew: true,
    oldPrice: "70",
    price: 65,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
  },
  {
    _id: 3,
    title: "Compact fashion t-shirt",
    isNew: true,
    oldPrice: "70",
    price: 55.99,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2752045/pexels-photo-2752045.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
  },
  {
    _id: 4,
    title: "Blue jins",
    isNew: true,
    oldPrice: "70",
    price: 50,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
  },
  {
    _id: 5,
    title: "Skirts with full setup",
    isNew: true,
    oldPrice: "800",
    price: 695,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
  },
  {
    _id: 6,
    title: "Yellow Hoody",
    isNew: false,
    oldPrice: "200",
    price: 180,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "men",
    image:
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
  },
  {
    _id: 7,
    title: "Black t-shirt for women",
    isNew: false,
    oldPrice: "60",
    price: 20,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2010812/pexels-photo-2010812.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 2,
  },
  {
    _id: 8,
    title: "Gouwn with Red velvet",
    isNew: false,
    oldPrice: "500",
    price: 350,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2233703/pexels-photo-2233703.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
  },
  {
    _id: 9,
    title: "Pink beauty",
    isNew: false,
    oldPrice: "150",
    price: 100,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
  },
  {
    _id: 10,
    title: "Jean's stylish Jacket",
    isNew: false,
    oldPrice: "250",
    price: 245,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "men",
    image:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
  },
  {
    _id: 11,
    title: "Jamdani Saree",
    isNew: false,
    oldPrice: "1000",
    price: 800,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/3363204/pexels-photo-3363204.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
  },
  {
    _id: 12,
    title: "Black Jacket",
    isNew: false,
    oldPrice: "200",
    price: 140,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "men",
    image:
      "https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
  },
  {
    _id: 13,
    title: "Black top with jeans",
    isNew: false,
    oldPrice: "130",
    price: 120,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/3672825/pexels-photo-3672825.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
  },
  {
    _id: 14,
    title: "Clothes with bag",
    isNew: false,
    oldPrice: "80",
    price: 50,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "kids",
    image:
      "https://images.pexels.com/photos/36029/aroni-arsa-children-little.jpg?auto=compress&cs=tinysrgb&w=600",
    rating: 2,
  },
  {
    _id: 15,
    title: "Stylish jeans in lightblue",
    isNew: false,
    oldPrice: "120",
    price: 100,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2738792/pexels-photo-2738792.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
  },
  {
    _id: 16,
    title: "Unknown horizon",
    isNew: false,
    oldPrice: "400",
    price: 350,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "men",
    image:
      "https://images.pexels.com/photos/2866077/pexels-photo-2866077.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
  },
  {
    _id: 17,
    title: "Light tops",
    isNew: false,
    oldPrice: "140",
    price: 120,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2010925/pexels-photo-2010925.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
  },
  {
    _id: 18,
    title: "Khakhi jeans",
    isNew: false,
    oldPrice: "250",
    price: 190,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/3054973/pexels-photo-3054973.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
  },
  {
    _id: 19,
    title: "Black full sleeve",
    isNew: false,
    oldPrice: "180",
    price: 170,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/2693849/pexels-photo-2693849.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
  },
  {
    _id: 20,
    title: "Formal for Men",
    isNew: false,
    oldPrice: "500",
    price: 490,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
    category: "women",
    image:
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
  },
  {
    _id: 101,
    title: "Canon EOS Rebel T100",
    des: "Canon EOS Rebel T100 Digital SLR Camera with 18-55mm Lens Kit, 18 Megapixel Sensor, Wi-Fi, DIGIC4+, SanDisk 32GB Memory Card and Live View Shooting",
    oldPrice: "700.00",
    price: "559.99",
    brand: "Canon",
    image: "https://i.ibb.co/1r28gMk/1.webp",
    isNew: true,
    category: "Electronics",
  },
  {
    _id: 102,
    title: "DJI Air",
    des: "DJI Mini 2 Fly More Combo - Ultralight Foldable Drone, 3-Axis Gimbal with 4K Camera, 12MP Photos, 31 Min Flight Time",
    oldPrice: "1050.00",
    price: "999.00",
    brand: "DJI",
    image: "https://i.ibb.co/qdfB3s6/2.webp",
    isNew: true,
    category: "Electronics",
  },
  {
    _id: 103,
    title: "Apple 10.2-inch iPad",
    des: "2021 Apple 10.2-inch iPad Wi-Fi 64GB - Space Gray (9th Generation)",
    oldPrice: "329.00",
    price: "269.00",
    brand: "Apple",
    image: "https://i.ibb.co/VL1Dnv1/4.webp",
    isNew: true,
    category: "Electronics",
  },
  {
    _id: 104,
    title: "iPhone 14",
    des: "AT&T iPhone 14 128GB Midnight",
    oldPrice: "1745.99",
    price: "1200.00",
    brand: "Apple",
    image: "https://i.ibb.co/5F3nWv6/7.webp",
    isNew: true,
    category: "Electronics",
  },
  {
    _id: 105,
    title: "Apple Watch SE",
    des: "Apple Watch SE (2nd Gen) GPS 40mm Midnight Aluminum Case with Midnight Sport Band - S/M",
    price: "249.00",
    brand: "Apple",
    image: "https://i.ibb.co/xgZWmdq/8.jpg",
    isNew: true,
    category: "Electronics",
  },
  {
    _id: 106,
    title: "Beats Solo3",
    des: "Beats Solo3 Wireless On-Ear Headphones with Apple W1 Headphone Chip, Black, MX432LL/A",
    oldPrice: "120.99",
    price: "130.09",
    brand: "Beats by Dr. Dre",
    image: "https://i.ibb.co/rQKjVC2/5.webp",
    isNew: true,
    category: "Electronics",
  },
  {
    _id: 107,
    title: "uhomepro TV Stand Cabinet",
    des: "uhomepro TV Stand Cabinet for Living Room up to 55 Television, Entertainment Center with RGB LED Lights and Storage Shelves Furniture, Black High Gloss TV Cabinet Console Table, Q15709",
    oldPrice: "219.99",
    price: "125.99",
    brand: "uhomepro",
    image: "https://i.ibb.co/Ycz8hkV/6.webp",
    isNew: true,
    category: "Home Decoration",
  },
  {
    _id: 108,
    title: "T-Shirt Men",
    des: "St Patricks Day T-Shirt Men -Image by Shutterstock, Male XX-Large",
    oldPrice: "15.00",
    price: "18.99",
    brand: "Smartprints",
    image: "https://i.ibb.co/BLCDw7v/3.webp",
    isNew: true,
    category: "Fashion",
  },
  {
    _id: 109,
    title: "Picnic Table Bench Set",
    des: "Costway Picnic Table Bench Set Outdoor Backyard Patio Garden Party Dining All Weather Black",
    oldPrice: "169.99",
    price: "298.00",
    brand: "Costway",
    image: "https://i.ibb.co/qCXcPhq/8.webp",
    isNew: true,
    category: "Home Decoration",
  },
  {
    _id: 110,
    title: "Grill Heavy Duty",
    des: "Expert Grill Heavy Duty 24-Inch Charcoal Grill, Black",
    price: "107.00",
    brand: "Expert Grill",
    image: "https://i.ibb.co/TTS9wY4/9.webp",
    isNew: true,
    category: "Equipments",
  },
  {
    _id: 111,
    title: "Girls Cropped",
    des: "Free Assembly Girls Cropped Mixed Cable Knit Fair Isle Sweater, Sizes 4-18",
    oldPrice: "20.00",
    price: "15.31",
    brand: "Free Assembly",
    image: "https://i.ibb.co/BVzsqvz/10.webp",
    isNew: true,
    category: "Fashion",
  },
  {
    _id: 112,
    title: "Night of Olay Firming Night Cream Face Moisturizer, 1.9 oz",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    price: "7.98",
    brand: "Olay",
    image: "https://i.ibb.co/zPDcCQY/top4.webp",
    isNew: true,
    category: "Beauty Product",
  },
  {
    _id: 113,
    title: "Face LiquidSweet Lightweight Beauty Products for Women",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    price: "7.62",
    brand: "unknown",
    image: "https://i.ibb.co/QC4L3RF/top8.jpg",
    isNew: true,
    category: "Beauty Product",
  },
  {
    _id: 114,
    title:
      "L'Oreal Paris Revitalift Triple Power Anti-Aging Cream Face Moisturizer 1.7 oz",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    oldPrice: "35.00",
    price: "21.91",
    brand: "L'Oreal Paris",
    image: "https://i.ibb.co/dKmw2sC/top2.webp",
    isNew: true,
    category: "Beauty Product",
  },
  {
    _id: 115,
    title:
      "L'Oreal Paris 55+ Moisturizer Anti-Aging Face Moisturizer, Wrinkle Expert, 1.7 oz",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    oldPrice: "23.65",
    price: "10.63",
    brand: "L'Oreal Paris",
    image: "https://i.ibb.co/sJwg0YF/top1.webp",
    isNew: true,
    category: "Beauty Product",
  },
  {
    _id: 116,
    title:
      "Vaseline Intensive Care™ Advanced Repair Unscented Body Lotion, 20.3 oz",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    oldPrice: "9.99",
    price: "6.98",
    brand: "Vaseline",
    image: "https://i.ibb.co/v1sPXLq/top5.webp",
    isNew: true,
    category: "Beauty Product",
  },
  {
    _id: 117,
    title: "CeraVe Healing Ointment, Protects and Soothes Cracked Skin, 12 oz",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    oldPrice: "25.35",
    price: "20.87",
    brand: "CeraVe",
    image: "https://i.ibb.co/yPJjB3r/top6.webp",
    isNew: false,
    category: "Beauty Product",
  },
  {
    _id: 118,
    title:
      "Neutrogena Hydro Boost Hyaluronic Acid Water Gel Face Moisturizer, 1.7 oz",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    oldPrice: "29.00",
    price: "19.97",
    brand: "Neutrogena",
    image: "https://i.ibb.co/zmw8xFY/top7.webp",
    isNew: true,
    category: "Beauty Product",
  },
  {
    _id: 119,
    title:
      "L'Oreal Paris Collagen Moisture Filler Facial Treatment Day Night Cream, Anti-Aging, 1.7 oz",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    oldPrice: "14.00",
    price: "8.98",
    brand: "L'Oreal Paris",
    image: "https://i.ibb.co/vHJkwzt/top3.webp",
    isNew: false,
    category: "Beauty Product",
  },
  {
    _id: 120,
    title: "Girls Sleeveless Cutout",
    des: "Free Assembly Girls Sleeveless Cutout Jumpsuit, Sizes 4-18",
    oldPrice: "52.00",
    price: "22.00",
    brand: "Free Assembly",
    image: "https://i.ibb.co/BNXTLkq/12.webp",
    isNew: false,
    category: "Fashion",
  },
  {
    _id: 9001,
    title: "Acer Nitro 5 AN515-57-79TD Gaming Laptop",
    price: 739.99,
    oldPrice: 1000.99,
    description:
      "Acer Nitro 5 AN515-57-79TD Gaming Laptop | Intel Core i7-11800H | NVIDIA GeForce RTX 3050 Ti Laptop GPU | 15.6 FHD 144Hz IPS Display | 8GB DDR4 | 512GB NVMe SSD | Killer Wi-Fi 6 | Backlit Keyboard",
    category: "Electronics",
    image: "https://i.ibb.co/jTMbP5r/nextamazon1.jpg",
    isNew: true,
    brand: "Acer",
  },
  {
    _id: 9002,
    title: "Acer Aspire 5 A515-45-R74Z Slim Laptop",
    price: 399.99,
    oldPrice: 599.45,
    description:
      "Acer Aspire 5 A515-45-R74Z Slim Laptop | 15.6 Full HD IPS | AMD Ryzen 5 5500U Hexa-Core Mobile Processor | AMD Radeon Graphics | 8GB DDR4 | 256GB NVMe SSD | WiFi 6 | Backlit KB | Windows 11 Home",
    category: "Electronics",
    image: "https://i.ibb.co/2vwS6HR/nextamazon2.jpg",
    isNew: true,
    brand: "Acer",
  },
  {
    _id: 9003,
    title: "2020 Apple iPad Pro",
    price: 747.07,
    oldPrice: 850.99,
    description:
      "2020 Apple iPad Pro (12.9-inch, Wi-Fi, 256GB) - Space Gray (Renewed)",
    category: "Electronics",
    image: "https://i.ibb.co/SybqWjf/nextamazon3.jpg",
    isNew: true,
    brand: "Apple",
  },
  {
    _id: 9004,
    title: "Smart Watches for Men",
    price: 56.99,
    oldPrice: 65.85,
    description:
      "Smart Watches for Men (Answer/Make Call) 100 Sport Modes Fitness Tracker Heart Rate Blood Oxygen Sleep Monitor IP68 Waterproof Fitness Watch Activity Tracker and Smartwatches iPhone Android Compatible",
    category: "Smart watch",
    image: "https://i.ibb.co/0Gvx3Sk/nextImg.jpg",
    isNew: true,
    brand: "ENOMIR",
  },
  {
    _id: 9005,
    title: "KOORUI 24 Inch Computer Monitor -FHD 1080P Gaming Monitor",
    price: 118.9,
    oldPrice: 180.58,
    description:
      "KOORUI 24 Inch Computer Monitor -FHD 1080P Gaming Monitor 165Hz VA 1ms Build-in FreeSync™, Compatible G-sync, LED Monitors with Ultra-Thin, HDMI X2 /DP, VESA Compatible, Tilt Adjustable, Eye Care 24E4",
    category: "Electronics",
    image: "https://i.ibb.co/xD7nDq5/nextamazon5.jpg",
    isNew: true,
    brand: "KOORUI",
  },
  {
    _id: 9006,
    title: "GMKtec Mini PC Window 11 Pro",
    price: 338,
    oldPrice: 450,
    description:
      "GMKtec Mini PC Window 11 Pro, AMD Ryzen 7 3750H Micro Desktop Computers 16GB DDR4 512GB PCIe SSD, 4K UHD Triple Screen Mini Computer for Light Gaming Business Office Video Editing",
    category: "Computer",
    image: "https://i.ibb.co/pv6ZG1b/nextamazon6.jpg",
    isNew: true,
    brand: "GMKtec",
  },
  {
    _id: 9007,
    title: "larco Gaming PC Desktop Computer Intel i7",
    price: 499.99,
    oldPrice: 520.5,
    description:
      "Alarco Gaming PC Desktop Computer Intel i7 3.40GHz,16GB Ram,1TB Hard Drive,Windows 10 pro,WiFi Ready,Video Card Nvidia GTX 750 4GB, 6 RGB Fans with Remote",
    category: "Computer",
    image: "https://i.ibb.co/9HPcTJv/nextamazon7.jpg",
    isNew: true,
    brand: "larco",
  },
  {
    _id: 9008,
    title: "SkyTech Shadow 3.0 Gaming Computer PC",
    price: 899.99,
    oldPrice: 950,
    description:
      "SkyTech Shadow 3.0 Gaming Computer PC Desktop - Ryzen 5 3600 6-Core 3.6GHz, GTX 1660 Super 6G, 1TB SSD, 16GB DDR4 3000, AC WiFi, Windows 10 Home 64-bit, Black",
    category: "Computer",
    image: "https://i.ibb.co/DYmhxf8/nextamazon8.jpg",
    isNew: true,
    brand: "SkyTech",
  },
  {
    _id: 9009,
    title: "Skullcandy Crusher Evo Wireless Over-Ear Bluetooth Headphones",
    price: 147.9,
    oldPrice: 190.5,
    description:
      "Skullcandy Crusher Evo Wireless Over-Ear Bluetooth Headphones for iPhone and Android with Mic / 40 Hour Battery Life / Extra Bass Tech / Best for Music, School, Workouts, and Gaming - Black",
    category: "Electronics",
    image: "https://i.ibb.co/ZG9t4RL/nextamazon9.jpg",
    isNew: true,
    brand: "Skullcandy ",
  },
  {
    _id: 9010,
    title: "Garmin 010-02430-01 Venu 2",
    price: 319.98,
    oldPrice: 450.5,
    description:
      "Garmin 010-02430-01 Venu 2, GPS Smartwatch with Advanced Health Monitoring and Fitness Features, Slate Bezel with Black Case and Silicone Band",
    category: "Smart watch",
    image: "https://i.ibb.co/z7yV4zf/nextamazon10.jpg",
    isNew: true,
    brand: "Garmin",
  },
  {
    _id: 9011,
    title: "Canon EOS Rebel T100",
    description:
      "Canon EOS Rebel T100 Digital SLR Camera with 18-55mm Lens Kit, 18 Megapixel Sensor, Wi-Fi, DIGIC4+, SanDisk 32GB Memory Card and Live View Shooting",
    price: 559.99,
    oldPrice: 700,
    image: "https://i.ibb.co/1r28gMk/1.webp",
    isNew: true,
    category: "Electronics",
    brand: "Canon",
  },
  {
    _id: 9012,
    title: "DJI Air",
    description:
      "DJI Mini 2 Fly More Combo - Ultralight Foldable Drone, 3-Axis Gimbal with 4K Camera, 12MP Photos, 31 Min Flight Time",
    oldPrice: 1050,
    price: 999,
    brand: "DJI",
    image: "https://i.ibb.co/qdfB3s6/2.webp",
    isNew: true,
    category: "Electronics",
  },
  {
    _id: 9013,
    title: "Apple 10.2-inch iPad",
    description:
      "2021 Apple 10.2-inch iPad Wi-Fi 64GB - Space Gray (9th Generation)",
    oldPrice: 329,
    price: 269,
    image: "https://i.ibb.co/VL1Dnv1/4.webp",
    isNew: true,
    category: "Electronics",
    brand: "Apple",
  },
  {
    _id: 9014,
    title: "iPhone 14",
    description: "AT&T iPhone 14 128GB Midnight",
    oldPrice: 1745.99,
    price: 1200,
    image: "https://i.ibb.co/5F3nWv6/7.webp",
    isNew: true,
    category: "Electronics",
    brand: "Apple",
  },
  {
    _id: 9015,
    title: "Apple Watch SE",
    description:
      "Apple Watch SE (2nd Gen) GPS 40mm Midnight Aluminum Case with Midnight Sport Band - S/M",
    price: 249,
    oldPrice: 350,
    image: "https://i.ibb.co/xgZWmdq/8.jpg",
    isNew: true,
    category: "Smart watch",
    brand: "Apple",
  },
  {
    _id: 9016,
    title: "Beats Solo3",
    description:
      "Beats Solo3 Wireless On-Ear Headphones with Apple W1 Headphone Chip, Black, MX432LL/A",
    oldPrice: 120.99,
    price: 130.09,
    image: "https://i.ibb.co/rQKjVC2/5.webp",
    isNew: true,
    category: "Electronics",
    brand: "Beats by Dr. Dre",
  },
  {
    _id: 9017,
    title: "uhomepro TV Stand Cabinet",
    description:
      "uhomepro TV Stand Cabinet for Living Room up to 55 Television, Entertainment Center with RGB LED Lights and Storage Shelves Furniture, Black High Gloss TV Cabinet Console Table, Q15709",
    oldPrice: 219.99,
    price: 125.99,
    image: "https://i.ibb.co/Ycz8hkV/6.webp",
    isNew: true,
    category: "Home Decoration",
    brand: "uhomepro",
  },
  {
    _id: 9018,
    title: "Pupuskyer Smart Watch",
    description:
      "Pupuskyer Smart Watch, 1.7inchs Fitness Tracker with Heart Rate Monitor,Blood Oxygen Tracking, Sleep Tracking for Android iPhone Samsung,Water Resistant Smart Watches for Men Women with Watch Talking",
    oldPrice: 49.99,
    price: 55.9,
    image: "https://i.ibb.co/VC2VWGL/nextamazon11.jpg",
    isNew: true,
    category: "Smart watch",
    brand: "Pupuskyer",
  },
  {
    _id: 9019,
    title: "SAMSUNG Galaxy S23 Ultra Cell Phone",
    description:
      "SAMSUNG Galaxy S23 Ultra Cell Phone, Factory Unlocked Android Smartphone, 512GB Storage, 200MP Camera, Night Mode, Long Battery Life, S Pen, US Version, 2023, Cream",
    oldPrice: 1279.99,
    price: 1500,
    image: "https://i.ibb.co/THwjSTK/nextamazon12.jpg",
    isNew: true,
    category: "Smart Phones",
    brand: "SAMSUNG",
  },
  {
    _id: 9020,
    title: "Apple iPhone 12 Mini 5G",
    description:
      "Apple iPhone 12 Mini 5G, US Version, 128GB, Blue - Unlocked (Renewed)",
    oldPrice: 344,
    price: 365,
    image: "https://i.ibb.co/nry7WRZ/nextamazon13.jpg",
    isNew: true,
    category: "Smart Phones",
    brand: "Apple",
  },
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
                          className="group relative border-2 p-2 border-gray-300 "
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
                                <span className="m-1">$</span>
                                {product.price}
                              </p>

                              <p className={`text-sm text-nowrap font-medium `}>
                                {product.brand}
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

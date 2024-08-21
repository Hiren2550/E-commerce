import React from "react";
import Navbar from "../features/Navbar/Navbar";

const Aboupage = () => {
  return (
    <>
      <Navbar>
        <section className="bg-white">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light text-gray-500 sm:text-lg ">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                About Us
              </h2>
              <p className="mb-4">
                Welcome to Ecommerce website, your one-stop destination for
                high-quality products that cater to your every need. Whether
                you're shopping for the latest trends, everyday essentials, or
                something special, we have a wide range of carefully curated
                items just for you. Our commitment to exceptional customer
                service and unbeatable prices ensures that your shopping
                experience is seamless and satisfying.enjoy fast, reliable
                shipping straight to your door.
              </p>
              <p>
                Feel free to customize it to better fit your brand and
                offerings!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <img
                className="w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                alt="office content 1"
              />
              <img
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                alt="office content 2"
              />
            </div>
          </div>
        </section>
      </Navbar>
    </>
  );
};

export default Aboupage;

import React from "react";

const Temp = () => {
  return (
    <div class="min-h-screen bg-gray-300">
      <div class="container mx-auto p-10 max-w-screen-lg">
        <div class="bg-white rounded shadow p-8">
          <div class="w-full bg-orange-200 text-yellow-900 px-4 py-2 flex items-center">
            <img
              src="https://svgsilh.com/svg/151889.svg"
              class="w-10 block pr-2"
            />
            <div class="text-sm">
              Congrats you're eligible for a <b>Coupon Code</b> in this order{" "}
            </div>
          </div>

          <div>
            <h3 class="text-xl mt-4 font-bold">Order Summary</h3>
            <div class="border w-full rounded mt-5 flex p-4 justify-between items-center flex-wrap">
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/41KufN65f8L.jpg"
                class="w-12"
              />
              <div class="w-2/3">
                <h3 class="text-lg font-medium">Black Jacket XL</h3>
                <p class="text-gray-600 text-xs">
                  Sold by <b>Aashir Khan</b>
                </p>
                <h4 class="text-red-700 text-xs font-bold mt-1">
                  Only 2 left in stock
                </h4>
              </div>
              <div>
                <h4 class="text-3xl font-medium">
                  <sup class="text-lg text-purple-800">$</sup> 89
                </h4>
                <h5 class="text-sm font-bold text-purple-800">60% OFF</h5>
              </div>
              <div class="w-full flex justify-between mt-4">
                <button class="text-red-700 hover:bg-red-100 px-2">
                  DELETE
                </button>
                <label
                  class="block uppercase tracking-wide text-gray-700"
                  for="grid-first-name"
                >
                  QTY
                  <select
                    class="ml-3 text-sm bg-purple-700 border border-purple-200 text-white p-2 rounded leading-tight"
                    id="grid-state"
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="border w-full rounded mt-5 flex p-4 justify-between items-center flex-wrap">
              <img
                src="https://cdn11.bigcommerce.com/s-tboh32g/images/stencil/1280x1280/products/385314/492280/104C_BlackBlackHQ__07610.1557157866.jpg?c=2?imbypass=on"
                class="w-12"
              />
              <div class="w-2/3">
                <h3 class="text-lg font-medium">Black Hat</h3>
                <p class="text-gray-600 text-xs">
                  Sold by <b>Taha Dildar</b>
                </p>
                <h4 class="text-red-700 text-xs font-bold mt-1">
                  Only 1 left in stock
                </h4>
              </div>
              <div>
                <h4 class="text-3xl font-medium">
                  <sup class="text-lg text-purple-800">$</sup> 20
                </h4>
                <h5 class="text-sm font-bold text-purple-800">40% OFF</h5>
              </div>
              <div class="w-full flex justify-between mt-4">
                <button class="text-red-700 hover:bg-red-100 px-2">
                  DELETE
                </button>
                <label
                  class="block uppercase tracking-wide text-gray-700"
                  for="grid-first-name"
                >
                  QTY
                  <select
                    class="ml-3 text-sm bg-purple-700 border border-purple-200 text-white p-2 rounded leading-tight"
                    id="grid-state"
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          <button class="px-4 py-4 bg-purple-700 text-white w-full mt-3 rounded shadow font-bold hover:bg-purple-900">
            PROCEED TO CHECKOUT SCREEN
          </button>
        </div>
        <div class="flex justify-between mt-8 flex-wrap lg:justify-center">
          <div class="bg-white rounded shadow p-2 w-full lg:w-2/4">
            <div class="w-full bg-orange-200 px-8 py-6">
              <h3 class="text-2xl mt-4 font-bold">Price Breakdown</h3>
              <div class="flex justify-between mt-3">
                <div class="text-xl text-orange-900 font-bold">Amount</div>
                <div class="text-xl text-right font-bold ">$102</div>
              </div>
              <div class="flex justify-between mt-3">
                <div class="text-xl text-orange-900 font-bold">VAT (15%)</div>
                <div class="text-xl text-right font-bold">$12</div>
              </div>
              <div class="bg-orange-300 h-1 w-full mt-3"></div>
              <div class="flex justify-between mt-3">
                <div class="text-xl text-orange-900 font-bold">
                  Total Amount
                </div>
                <div class="text-2xl text-orange-900 font-bold">$114</div>
              </div>
              <button class="px-4 py-4 bg-purple-700 text-white w-full mt-3 rounded shadow font-bold hover:bg-purple- 900">
                {" "}
                CHECKOUT
              </button>
            </div>
          </div>
          <div class="bg-white rounded shadow px-10 py-6 w-full mt-4 flex flex-wrap justify-center lg:w-2/4 lg:ml-3">
            <div class="pr-8">
              <h3 class="text-2xl mt-4 font-bold text-purple-900">
                Thank You, Alex
              </h3>
              <h4 class="text-sm text-gray-600 font-bold">ORDER #5624</h4>
            </div>
            <img
              src="https://image.flaticon.com/icons/svg/1611/1611768.svg"
              alt=""
              class="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp;

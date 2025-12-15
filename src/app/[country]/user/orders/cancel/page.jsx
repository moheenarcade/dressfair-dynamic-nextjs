"use client";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import React, { useState } from "react";
import TrackOrderModal from "@/components/models/TrackOrderModal";
import AddressModal from "@/components/models/AddressModal";
import ViewOrderDetailsModal from "@/components/models/ViewOrderDetailsModal";

const orders = [
  {
    status: "Canceled",
    image: "/deals-product5.avif",
    items: 1,
    price: "AED 153.0000",
    time: "2025-11-24 17:03:36 pm",
    orderId: 530,
  },
  {
    status: "Canceled",
    image: "/deals-product5.avif",
    items: 1,
    price: "AED 153.0000",
    time: "2025-11-24 17:03:36 pm",
    orderId: 531,
  },
  {
    status: "Canceled",
    image: "/deals-product5.avif",
    items: 1,
    price: "AED 153.0000",
    time: "2025-11-24 17:03:36 pm",
    orderId: 532,
  },
];

const CancelOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewOrderDetailModelOpen, setViewOrderDetailModelOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeTrackModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const closeViewOrderModal = () => {
    setSelectedOrder(null);
    setViewOrderDetailModelOpen(false);
  };

  return (
    <>
      <>
        <div className="your-orders px-2 lg:px-0 pt-4 flex flex-col gap-3">
          {orders.map((order, index) => (
            <div
              key={index}
              className="single-order border border-gray-200 rounded-sm"
            >
              <div className="order-header px-3 py-2 bg-gray-100 flex items-center justify-between">
                <p className="font-semibold text-[15px]">{order.status}</p>
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setViewOrderDetailModelOpen(true);
                  }}
                  className="text-[#fb7701] flex items-center gap-1 text-[14px] hover:underline transition-all duration-[300] ease-in-out font-semibold">
                  View Order Details <FaChevronRight />
                </button>
              </div>

              <div className="order-detail">
                <div className="flex items-start justify-between px-3 pt-2 pb-2 border-b border-b-gray-200">
                  <div>
                    <Image
                      className="rounded-sm shadow-lg"
                      width={100}
                      height={100}
                      src={order.image}
                      alt="product"
                    />
                  </div>

                  {order.status !== "Canceled" && (
                    <div className="flex flex-col gap-1">
                      <button onClick={() => openModal(order)} className="text-[14px] md:text-[16px] rounded-full w-[160px] md:w-[200px] py-1 px-4 text-white transition-all duration-[500] ease-in-out hover:bg-[#fb5d01fc] bg-[#fb7701] font-semibold border-2 border-transparent">
                        Track
                      </button>
                      <button onClick={() => setIsAddressModalOpen(true)} className="text-[14px] md:text-[16px] rounded-full w-[160px] md:w-[200px] py-1 px-4 transition-all duration-[500] ease-in-out hover:text-black hover:border-black text-gray-600 font-semibold border-2 border-gray-600">
                        Change Address
                      </button>
                    </div>
                  )}
                </div>

                <div className="px-3 py-2">
                  <div className="flex gap-1 md:gap-4 flex-wrap items-center justify-start md:justify-end">
                    <p className="text-black text-[13px] font-semibold">
                      <span className="text-gray-500">{order.items} Items :</span>{" "}
                      {order.price}
                    </p>
                    <p className="text-black text-[13px] font-semibold">
                      <span className="text-gray-500">Order Time :</span>{" "}
                      {order.time}
                    </p>
                    <p className="text-black text-[13px] font-semibold">
                      <span className="text-gray-500">Order ID :</span>{" "}
                      {order.orderId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <TrackOrderModal
          isOpen={isModalOpen}
          onClose={closeTrackModal}
          order={selectedOrder}
        />

        <ViewOrderDetailsModal
          isOpen={viewOrderDetailModelOpen}
          onClose={closeViewOrderModal}
          order={selectedOrder}
        />

        <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
      </>
      {/* <div className="no-order h-[50vh] flex flex-col justify-center text-center items-center">
        <div className="w-20">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" strokeWidth="0"><path d="M287.6 320l0 17.1-8.5 0c-12.4 0-23.7 6.8-29.7 17.5l-0.8 1.7-64.7 133.8 126.8 0 0-49 17 0 0 49 370.3 0 0-23.1 17 0 0 23.1 123.8 0-64.6-133.8c-5.4-11.2-16.4-18.5-28.7-19.2l-1.9 0-8.5 0 0-17.1 8.5 0c18.9 0 36.1 10.4 45 27l0.9 1.9 64.7 133.8c1 2 1.5 4.1 1.6 6.2l0.1 1.2 0 294.4c0 23.6-19.1 42.7-42.7 42.7l0 0-604.1 0c-23.6 0-42.7-19.1-42.7-42.7l0 0 0-294.4 0.4 0 0 0c0-2.1 0.4-4.1 1.1-6l0.6-1.4 64.7-133.8c8.2-17 25.1-28.1 43.8-28.9l2.1 0 8.5 0z m-104 187.2l-0.1 0 0 277.3c0 13.6 10.7 24.8 24.1 25.6l0 0 1.5 0 604.1 0c14.1 0 25.6-11.5 25.6-25.6l0 0 0-277.3-654.9 0-0.3 0z m275-206.8l54.3 54.3 54.3-54.3c3.1-3.1 7.9-3.3 11.2-0.7l0.8 0.7c3.3 3.3 3.3 8.7 0 12.1l0 0-54.3 54.3 54.3 54.3c3.3 3.3 3.3 8.7 0 12.1-3.3 3.3-8.7 3.3-12 0l-54.3-54.3-54.3 54.3c-3.1 3.1-7.9 3.3-11.3 0.7l-0.8-0.7c-3.3-3.3-3.3-8.7 0-12.1l0 0 54.3-54.3-54.3-54.3c-3.3-3.3-3.3-8.7 0-12.1 3.3-3.3 8.7-3.3 12.1 0z m256.4 74.4l0 58-17 0 0-58 17 0z m-387.3-25.9l0 58-17 0 0-58 17 0z m387.3-66.2l0 58-17 0 0-58 17 0z m-387.3-26l0 58.1-17 0 0-58.1 17 0z m358-64l7.5 4.1c13 7 21.5 20.7 21.8 36.2l0 0 0.1 15.5-17.1 0 0-15.3c-0.2-9.1-5.2-17.3-12.9-21.4l0 0-7.5-4 8.1-15.1z m-315.2-0.7l0 17.1-19.1 0c-7.8 0-15 4-19.4 10.6l0 0-4.8 7.1-14.2-9.5 4.8-7.1c7.5-11.3 20-18.2 33.6-18.2l0 0 19.1 0z m92.2 0l0 17.1-58.1 0 0-17.1 58.1 0z m92.1 0l0 17.1-58 0 0-17.1 58 0z m92.2 0l0 17.1-58 0 0-17.1 58 0z" fill="#cdcdcd" stroke="none" strokeWidth="8.533333333333333"></path></svg>
        </div>
        <p className='text-md font-semibold'>You don't have any orders</p>
      </div> */}
    </>
  )
}

export default CancelOrders;

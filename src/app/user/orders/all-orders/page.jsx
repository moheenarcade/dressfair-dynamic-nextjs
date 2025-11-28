"use client";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import React, { useState } from "react";
import TrackOrderModal from "@/components/models/TrackOrderModal";
import AddressModal from "@/components/models/AddressModal";
import ViewOrderDetailsModal from "@/components/models/ViewOrderDetailsModal";

const orders = [
  {
    status: "Pending",
    image: "/deals-product5.avif",
    items: 1,
    price: "AED 153.0000",
    time: "2025-11-24 17:03:36 pm",
    orderId: 530,
  },
  {
    status: "Pending",
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

const Orders = () => {
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
  );
};

export default Orders;

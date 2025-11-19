"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { MdLock } from "react-icons/md";

const countries = ["Pakistan", "United States", "United Kingdom", "Canada", "Australia", "India", "Germany", "France", "UAE"];

const EditAddressMobileModelSidebar = ({ isOpen, onClose, address, onSave }) => {
  const [country, setCountry] = useState(address?.country || "Pakistan");
  const [isDefault, setIsDefault] = useState(address?.isDefault || false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fullAddress: "",
    city: "",
  });

  useEffect(() => {
    if (address) {
      setFormData({
        name: address.name,
        phone: address.phone,
        fullAddress: address.address,
        city: address.city,
      });
      setCountry(address.country || "Pakistan");
      setIsDefault(address.isDefault || false);
    }
  }, [address]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...address,
      name: formData.name,
      phone: formData.phone,
      address: formData.fullAddress,
      city: formData.city,
      country,
      isDefault,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-[999999999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* RIGHT → LEFT sliding modal */}
        <motion.div
          className="fixed right-0 top-0 h-full w-[90%] max-w-[700px] bg-white shadow-xl px-6 py-6 rounded-l-2xl overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        >
          {/* Close button */}
          <button onClick={onClose} className="p-1 absolute right-3 top-3 hover:bg-gray-200 rounded-full">
            <CgClose className="text-xl" />
          </button>

          {/* Header */}
          <div className="text-center pb-3 mt-3">
            <h3 className="text-[20px] font-semibold text-[#222]">Edit Address</h3>
            <p className="text-[#0a8800] font-[500] text-[13px] flex items-center justify-center gap-1">
              <MdLock />
              All data is safeguarded
            </p>
          </div>

          {/* Country Dropdown */}
          <div className="flex items-center gap-1">
            <label className="font-[600] text-[14px] text-[#222]">Country / Region:</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}
              className="outline-none font-[600] text-[14px] text-[#222]">
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-2 mt-3">
            {[
              ["Full Name", "name"],
              ["Phone number", "phone"],
              ["Province, City", "city"],
              ["Address", "fullAddress"],
            ].map(([label, key]) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="font-[600] text-[14px] text-[#222]">{label} <span className="text-red-600">*</span></label>
                <input
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="border border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222]"
                />
              </div>
            ))}
          </div>

          {/* Default checkbox */}
          <div onClick={() => setIsDefault(!isDefault)} className="flex items-center gap-2 cursor-pointer mt-4">
            <div className="w-5 h-5 flex justify-center items-center border rounded-full">
              {isDefault && <BsCheckLg className="text-black text-[14px]" />}
            </div>
            <p className="font-[500] text-[14px]">Set as my default address</p>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="mt-6 w-full py-3 rounded-full text-white bg-[#fb5d01] text-md font-bold hover:bg-[#fb7701] transition"
          >
            Save
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditAddressMobileModelSidebar;

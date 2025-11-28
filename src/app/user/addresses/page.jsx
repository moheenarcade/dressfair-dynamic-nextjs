"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import { MdLock, MdOutlineContentCopy } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import EditAddressModal from "@/components/models/EditAddressModal";
import Select from "react-select";


const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "50px",
    minHeight: "50px",
    borderRadius: "4px",
    borderColor: state.isFocused ? "#fb7701" : "#99a1af",
    boxShadow: "none",       // remove blue outline
    outline: "0",            // remove outline
    fontSize: "14px",
    fontWeight: "600",
    "&:hover": {
      borderColor: "#fb7701",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    padding: "10px",
    backgroundColor: state.isSelected
      ? "#fb7701"
      : state.isFocused
      ? "#ffe7d4"
      : "white",
    color: state.isSelected ? "white" : "#222",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
    fontSize: "14px",
  }),
};

const countries = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Germany",
  "France",
  "UAE",
];

const notify = () =>
  toast.success("Copied successfully!", {
    icon: "✔️",
    style: {
      borderRadius: "8px",
      background: "#fff",
      color: "#333",
      fontSize: "14px",
      fontWeight: "600"
    },
  });

const cityOptions = [
  { value: "Punjab", label: "Punjab", states: ["Lahore", "Multan", "Faisalabad", "Bahawalpur"] },
  { value: "Sindh", label: "Sindh", states: ["Karachi", "Hyderabad", "Sukkur"] },
  { value: "KPK", label: "KPK", states: ["Peshawar", "Abbottabad", "Swat"] },
  { value: "Balochistan", label: "Balochistan", states: ["Quetta", "Gwadar"] },
];

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(1);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addingAddress, setAddingAddress] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState(null);
  const [selectedAddressToEdit, setSelectedAddressToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(null);
  const [country, setCountry] = useState("Pakistan");
  const [isDefault, setIsDefault] = useState(false);
  const [selectedCityObj, setSelectedCityObj] = useState(null);
  const [selectedState, setSelectedState] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fullAddress: "",
    city: "",
  });
  const addresses = [
    {
      id: 1,
      name: "Home",
      phone: "+92 433 4343434",
      address: "test address",
      city: "ARIF WALA, Punjab Pakistan",
    },
    {
      id: 2,
      name: "Office",
      phone: "+92 355 455555",
      address: "Street 10, Model Town",
      city: "Lahore, Punjab Pakistan",
    },
  ];

  const handleSelect = (item) => {
    setSelectedAddress(item.id);
    setDefaultAddress(item.id);
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.city || !formData.fullAddress) return;

    const newAddress = {
      ...formData,
      country,
      isDefault,
    };
    onSave(newAddress);
  };

  return (
    <>

      <div className="address-main px-2 lg:px-0">
        <div className="w-full lg:w-[80%]">
          {!addingAddress && (
            <>
              <div className="flex items-center justify-between">
                <div className="">
                  <h1 className='text-xl font-bold'>Addresses</h1>
                  <p className='flex items-center gap-1 text-[#0a8800] font-[500] text-[14px]'><MdLock /> All data is safeguarded</p>
                </div>
                <button onClick={() => setAddingAddress(true)} className='text-[14px] md:text-[16px] rounded-full py-2 px-6 text-white transition-all duration-[500] ease-in-out hover:bg-[#fb5d01fc] bg-[#fb7701] font-semibold border-2 border-transparent'>
                  Add new address
                </button>
              </div>
              <div className="address-list">
                <div className="space-y-3 h-[380px] overflow-y-auto mt-4 pr-2">
                  {addresses.map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-3 cursor-pointer transition hover:shadow ${selectedAddress === item.id
                        ? "border-gray-300"
                        : "border-gray-300"
                        }`}

                    >
                      <div className="flex items-center justify-between">
                        <div className="">
                          <p className="text-[15px] font-bold text-black">{item.name}</p>
                          <p className="text-[14px] text-black">{item.phone}</p>
                          <p className="text-[14px] font-bold text-[#FB7701]">{item.address}</p>
                          <p className="text-[14px] text-black font-medium">{item.city}</p>
                        </div>

                        <div className="">
                          {defaultAddress === item.id ? <>
                            <p className="text-3xl py-1 text-md font-semibold px-4 rounded-full">
                              <BsCheckLg className="text-[#fb7701]" />
                            </p>
                          </> : <>
                            <button onClick={() => handleSelect(item)} className="py-1 text-md font-semibold px-4 rounded-full text-white bg-[#fb7701]">Use</button>
                          </>}

                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        {defaultAddress === item.id ? (
                          <button className="flex items-center gap-1 text-[#757575] text-[14px] font-[600] cursor-default">
                            <div className="h-5 w-5 rounded-full border flex justify-center items-center bg-black">
                              <p className="h-2 w-2 rounded-full bg-white"></p>
                            </div>
                            <p>Default</p>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSelect(item)}
                            className="flex items-center gap-1 text-[#757575] text-[14px] font-[500]"
                          >
                            <div className="h-5 w-5 rounded-full border flex justify-center items-center">
                              <p className="h-2 w-2 rounded-full bg-white"></p>
                            </div>
                            <p>Set as default</p>
                          </button>
                        )}

                        <div className="flex items-center gap-4">
                          <button onClick={notify} className="flex items-center gap-1 text-[#222] text-[15px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                            <MdOutlineContentCopy />
                            Copy
                          </button>
                          <button onClick={(e) => {
                            setSelectedAddressToEdit(item);
                            setIsEditModalOpen(true);
                          }} className="flex items-center gap-1 text-[#222] text-[15px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                            <FiEdit />
                            Edit
                          </button>
                          <button onClick={() => setDeletingAddress(item)} className="flex items-center gap-1 text-[#222] text-[15px] font-[500] hover:text-[#fb7701] transition-all duration-300 ease-in-out">
                            <AiOutlineDelete />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {addingAddress && (
            <div className="w-full lg:w-[80%]">
              <div className="add-new-address-sec">
                <div className="">
                  <h1 className='text-xl font-bold'>Add a new addres</h1>
                  <p className='flex items-center gap-1 text-[#0a8800] font-[500] text-[14px]'><MdLock /> All data is safeguarded</p>
                </div>

                {/* Country Dropdown */}
                <div className="flex items-center gap-1 pt-4">
                  <label htmlFor="country" className="font-[600] text-[14px] text-[#222]">
                    Country / Region:
                  </label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="outline-none w-fit font-[600] text-[14px] text-[#222]"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label className="font-[600] text-[14px] text-[#222]">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border border-gray-400 
                      outline-none 
    focus:ring-0 
    focus:outline-none 
    focus:border-[#fb7701]
                      rounded px-3 py-3 font-[600] text-[14px] text-[#222]"

                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label className="font-[600] text-[14px] text-[#222]">
                      Phone number <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center border border-gray-400 rounded px-1">
                      <p className="w-20 px-2">
                        Pk +92
                      </p>
                      <input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="px-3 py-3 border-l 
                        outline-none 
    focus:ring-0 
    focus:outline-none 
    focus:border-[#fb7701]
                        border-l-gray-400 font-[600] w-full outline-0 text-[14px] text-[#222]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label className="font-[600] text-[14px] text-[#222]">
                      Province, City <span className="text-red-600">*</span>
                    </label>
                    <Select
                      options={cityOptions}
                      value={selectedCityObj}
                      styles={customSelectStyles}
                      onChange={(city) => {
                        setSelectedCityObj(city);
                        setSelectedState(null);
                        setFormData({ ...formData, city: city.value });
                      }}
                      isSearchable
                      placeholder="Select City / Province"
                      className="text-[14px] font-[600]"
                    />

                    {selectedCityObj && (
                      <div className="mt-2">
                        <label className="font-[600] text-[14px] text-[#222]">
                          State <span className="text-red-600">*</span>
                        </label>
                        <Select
                          options={selectedCityObj.states.map((s) => ({ value: s, label: s }))}
                          value={selectedState}
                          styles={customSelectStyles}
                          onChange={(state) => {
                            setSelectedState(state);
                            setFormData({ ...formData, state: state.value });
                          }}
                          isSearchable
                          placeholder="Select Area / State"
                          className="text-[14px] font-[600]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label className="font-[600] text-[14px] text-[#222]">
                      Building, street, and area etc <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.fullAddress}
                      onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                      className="border 
                      outline-none 
    focus:ring-0 
    focus:outline-none 
    focus:border-[#fb7701]
                      border-gray-400 rounded px-3 py-3 font-[600] text-[14px] text-[#222]"
                      placeholder="House / Street / Area"
                    />
                  </div>
                </div>

                {/* Default Checkbox */}
                <div
                  onClick={() => setIsDefault(!isDefault)}
                  className="flex items-center w-fit gap-2 mt-4 rounded-lg cursor-pointer transition"
                >
                  <div className="w-5 h-5 rounded-full border flex justify-center items-center bg-white">
                    {isDefault && <BsCheckLg className="text-[#fb7701]" />}
                  </div>
                  <p className="font-[500] text-[14px]">Set as my default address</p>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-center gap-3 py-12">
                <button onClick={() => setAddingAddress(false)} className="w-[40%] py-2 rounded-full font-semibold text-[#444] border border-gray-400 hover:bg-gray-100 duration-200">Cancel</button>
                <button
                  onClick={() => setAddingAddress(false)}
                  className="hover:bg-[#fb7701] hover:scale-[1.03] text-lg transition-all duration-300 ease-in-out w-[50%] mx-auto py-[10px] px-4 rounded-full border border-transparent text-white bg-[#fb5d01] text-md font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div >


      {/* Delete Confirmation Modal */}
      < AnimatePresence >
        {deletingAddress && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-[999999999999999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-[90%] max-w-[480px] shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-2xl font-semibold text-[#222] text-center">
                Are you sure you want to delete this address?

              </h3>
              <div className="text-[15px] py-3 text-start mt-2 font-medium text-gray-600">
                <p className="text-[14px] text-black">{deletingAddress.phone}</p>
                <p className="text-[14px] font-bold text-[#FB7701]">{deletingAddress.address}</p>
                <p className="text-[14px] text-black font-medium">{deletingAddress.city}</p>
              </div>

              <p className="text-[#888] text-[14px]">
                Deleting this address will not delete any pending orders being dispatched to this address.

              </p>

              <div className="flex items-center justify-between gap-4 mt-6">
                <button
                  onClick={() => setDeletingAddress(null)}
                  className="w-full py-2 rounded-full font-semibold text-[#444] border border-gray-400 hover:bg-gray-100 duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Deleted:", deletingAddress);
                    // here call backend delete API if needed
                    setDeletingAddress(null);
                  }}
                  className="w-full py-2 rounded-full font-semibold text-white bg-red-600 hover:bg-red-700 duration-200"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )
        }
      </AnimatePresence >

      <EditAddressModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        address={selectedAddressToEdit}
      />

    </>
  )
}

export default Addresses;

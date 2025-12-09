"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on client only
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) setCartItems(parsedCart);
        else setCartItems([]);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
      setCartItems([]);
    }
  }, []);

  // Sync cartItems to localStorage whenever it changes
  useEffect(() => {
    if (cartItems !== null) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  //   // Add to cart
  const addToCart = (product, selectedColorSku, selectedSizeObj, quantity = 1, openSidebar = true) => {
    if (!product || !selectedColorSku || !selectedSizeObj) return;

    const colorObj = product.colors.find(c => c.sku === selectedColorSku);
    const originalPrice = parseFloat(product.price || 0);
    const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;

    const finalPrice = salePrice && salePrice > 0 ? salePrice : originalPrice;

    let discountPercent = 0;
    if (salePrice && originalPrice && originalPrice > salePrice) {
      discountPercent = Number((((originalPrice - salePrice) / originalPrice) * 100).toFixed(0));
    }
    const cartItemPayload = {
      product_id: product.product_id || product.id || product.sku,
      product_sku: product.sku,
      name: product.name,
      images: product.images?.map(img => img.image) || [],
      color: {
        sku: colorObj?.sku,
        name: colorObj?.name,
        image: colorObj?.image,
        quantity: colorObj?.quantity,
      },
      size: {
        product_option_id: selectedSizeObj.product_option_id,
        value: selectedSizeObj.value,
        available_quantity: selectedSizeObj.available_quantity,
      },
      qty: quantity,
      price: originalPrice,
      sale_price: salePrice,
      final_price: finalPrice,
      discount_percent: discountPercent,
      selected: true
    };

    // Compare product_id + color + size_id
    const existingItemIndex = cartItems.findIndex(
      item =>
        item.product_id === cartItemPayload.product_id &&
        item.color.sku === selectedColorSku &&
        item.size.product_option_id === selectedSizeObj.product_option_id
    );

    if (existingItemIndex !== -1) {
      // If same item exists, just update quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].qty += quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item for new size/color
      setCartItems([...cartItems, cartItemPayload]);
    }

    // openCart();
    if (openSidebar) openCart();
  };


  // Update quantity
  const updateQty = (productId, colorSku, sizeId, qty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product_id === productId &&
          item.color.sku === colorSku &&
          item.size.product_option_id === sizeId
          ? { ...item, qty }
          : item
      )
    );
  };

  const removeItem = (productId, colorSku, sizeId) => {
    setCartItems(prev =>
      prev.filter(
        item =>
          !(
            item.product_id === productId &&
            item.color.sku === colorSku &&
            item.size.product_option_id === sizeId
          )
      )
    );
  };

  // Toggle selected state of a single item
  const toggleSingle = (productId, colorSku, sizeId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product_id === productId &&
          item.color.sku === colorSku &&
          item.size.product_option_id === sizeId
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  // Toggle select all items
  const toggleSelectAll = () => {
    // If all are selected, then we set all to false, else set all to true.
    const newSelectedState = !allSelected;
    setCartItems(prev => prev.map(item => ({ ...item, selected: newSelectedState })));
  };

  // const subtotal = useMemo(() => {
  //   if (!cartItems) return 0;
  //   return cartItems.reduce((acc, item) => acc + item.final_price * item.qty, 0);
  // }, [cartItems]);

  // // Total without discount (original × qty)
  // const originalTotal = useMemo(() => {
  //   if (!cartItems) return 0;
  //   return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  // }, [cartItems]);

  // const totalQty = useMemo(() => {
  //   if (!cartItems) return 0;
  //   return cartItems.reduce((acc, item) => acc + item.qty, 0);
  // }, [cartItems]);

  const totalQty = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((acc, item) => {
      const qty = Number(item?.qty) || 0;
      return acc + qty;
    }, 0);
  }, [cartItems]);


  // Final subtotal (user will pay)
  // const subtotal = useMemo(() => {
  //   if (!cartItems) return 0;
  //   return cartItems.reduce((acc, item) => acc + item.final_price * item.qty, 0);
  // }, [cartItems]);
  const subtotal = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((acc, item) => {
      const price = Number(item?.final_price) || 0;
      const qty = Number(item?.qty) || 0;
      return acc + (price * qty);
    }, 0);
  }, [cartItems]);

  // Total without discount (original price × qty)
  const originalTotal = useMemo(() => {
    if (!cartItems) return 0;
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cartItems]);

  // Savings amount in currency
  const totalDiscount = useMemo(() => originalTotal - subtotal, [originalTotal, subtotal]);

  // Savings percentage
  const discountPercent = useMemo(() => {
    if (!originalTotal || originalTotal === 0) return 0;
    return Number(((totalDiscount / originalTotal) * 100).toFixed(0));
  }, [totalDiscount, originalTotal]);




  const allSelected = useMemo(() => {
    if (!cartItems) return false;
    return cartItems.length > 0 && cartItems.every(item => item.selected);
  }, [cartItems]);

  // Total savings in currency
  // const totalDiscount = useMemo(() => {
  //   if (!cartItems) return 0;
  //   return cartItems.reduce((acc, item) => {
  //     if (item.sale_price && item.price > item.sale_price) {
  //       return acc + (item.price - item.sale_price) * item.qty;
  //     }
  //     return acc;
  //   }, 0);
  // }, [cartItems]);

  // // Overall discount percentage (based on subtotal)
  // const discountPercent = useMemo(() => {
  //   if (!subtotal || subtotal === 0) return 0;
  //   return Number(((totalDiscount / subtotal) * 100).toFixed(0));
  // }, [totalDiscount, subtotal]);


  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // Render nothing until cartItems loaded
  if (cartItems === null) return null;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        subtotal,
        totalQty,
        allSelected,
        toggleSingle, // Make sure to include these new functions
        toggleSelectAll, // Make sure to include these new functions
        totalDiscount,
        discountPercent,
        originalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
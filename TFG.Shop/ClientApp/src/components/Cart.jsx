import React, { useState, useEffect, useMemo } from "react";
import { DropdownItem } from "reactstrap";
import { ordersService } from "../shared/orders.service";

export default function Cart() {
  const [cart, setCart] = useState({});
  const cartHasSomething = useMemo(
    () => cart && Object.entries(cart).length > 0,
    [cart]
  );

  useEffect(() => {
    const cartText = localStorage.getItem("cart");
    if (cartText) setCart(JSON.parse(cartText));
  }, []);

  const checkoutCart = () => {
    const createOrder = async () => {
      if (!cartHasSomething) return;

      const order = {
        lines: Object.entries(cart).map((entry) => {
          const [key, value] = entry;
          return { productId: key, quantity: value };
        }),
      };

      await ordersService.create(order);

      localStorage.setItem("cart", "{}");
    };

    createOrder();
  };

  return (
    <>
      {cartHasSomething ? (
        Object.entries(cart).map((entry) => {
          const [key, value] = entry;
          return (
            <>
              <DropdownItem>
                <h6>Product: {key}</h6>
                <h6>Quantity: {value}</h6>
              </DropdownItem>
              <DropdownItem divider />
            </>
          );
        })
      ) : (
        <h6>Your cart is empty!</h6>
      )}
      {cartHasSomething && (
        <DropdownItem onClick={() => checkoutCart()}>Checkout</DropdownItem>
      )}
    </>
  );
}

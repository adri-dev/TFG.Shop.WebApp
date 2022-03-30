import React, { useEffect, useState } from "react";
import { ordersService } from "../shared/orders.service";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const requestedOrders = await ordersService.getAll();
      console.log(requestedOrders?.data);
      setOrders(requestedOrders?.data);
    };

    getAllOrders();
  }, []);

  return (
    <>
      {orders &&
        orders.map((o) => {
          return (
            <>
              <h5>Order: {o.id}</h5>

              <table className="table" aria-labelledby="tabelLabel">
                <thead>
                  <tr>
                    <th> </th>
                    <th>ProductId</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {o.lines.map((l) => (
                    <tr>
                      <td>{}</td>
                      <td>{l.productId}</td>
                      <td>{l.quantity}</td>
                    </tr>
                  ))}
                </tbody>{" "}
              </table>
            </>
          );
        })}
    </>
  );
}

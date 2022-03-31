import React, { useEffect, useState } from "react";
import { catalogService } from "../shared/catalog.service";
import { Card, Button, Container } from "react-bootstrap";
import "./Products.css";

export default function Products({ categoryId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategoryProducts = async () => {
      const catProducts = categoryId
        ? await catalogService.getCategoryProducts(categoryId)
        : [];

      setProducts(catProducts);
    };

    getCategoryProducts();
  }, [categoryId]);

  const onBuy = (id) => {
    const cart = localStorage.getItem("cart");

    if (!cart) {
      const item = {};
      item[id] = 1;
      localStorage.setItem("cart", JSON.stringify(item));
      return;
    }

    const items = JSON.parse(cart);
    if (items[id]) {
      items[id] += 1;
    } else {
      items[id] = 1;
    }
    localStorage.setItem("cart", JSON.stringify(items));
  };

  return (
    <>
      <Container className="products-container" fluid>
        {products &&
          products.map((p) => (
            <Card>
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>{p.description}</Card.Text>
                <Button onClick={() => onBuy(p.id)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </>
  );
}

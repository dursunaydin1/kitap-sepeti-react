import React from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useThemeHook } from "../ThemaProvide";
import { BsCartCheck, BsCartX } from "react-icons/bs";

const Cart = () => {
  const [theme] = useThemeHook();
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  return (
    <Container className="py-4 mt-5">
      <h1
        className={theme ? "theme-light" : "text-light-primary"}
        my-5
        text-center
      >
        {isEmpty ? "Sepetinizde ürün yok" : "Alışveriş Sepeti"}
      </h1>
      <Row className="justify-content-center">
        <Table
          responsive="sm"
          striped
          bordered
          hover
          variant={theme ? "dark" : "light"}
          className="mb-5"
        >
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div
                      style={{
                        background: "white",
                        height: "8rem",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ padding: "5rem" }}>
                        <img
                          src={item.image}
                          style={{ width: "4rem" }}
                          alt={item.title}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <h5
                      style={{
                        whiteSpace: "nowrap",
                        width: "14rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </h5>
                    <h6
                      style={{
                        whiteSpace: "nowrap",
                        width: "14rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.author}
                    </h6>
                    <p
                      style={{
                        width: "14rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.description}
                    </p>
                  </td>
                  <td>Tutar: &#8378;{item.price}</td>
                  <td>Miktar ({item.quantity})</td>
                  <td>
                    <Button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                      className="ms-2"
                    >
                      -
                    </Button>
                    <Button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                      className="ms-2"
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeItem(item.id)}
                      className="ms-2"
                    >
                      Sepetten Çıkart
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {!isEmpty && (
          <Row
            style={{ position: "fixed", bottom: 0 }}
            className={`${
              theme ? "bg-light-black text-light" : "bg-light text-black"
            } justify-content-center w-100`}
          >
            <Row className="justify-content-center py-2">
              <Col className="text-center">
                <h3>Toplam Tutar :&#8378; {cartTotal}</h3>
              </Col>
              <Col className="p-0 md-2 text-center">
                <Button
                  variant="danger"
                  className="m-2"
                  onClick={() => emptyCart()}
                >
                  <BsCartX size="1.7rem" />
                  Sepeti Boşalt
                </Button>
                <Button variant="success" className="md-2">
                  <BsCartCheck size="1.7rem" />
                  Sepeti Onayla
                </Button>
              </Col>
            </Row>
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default Cart;

import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Card, Container, Row, Col, Badge, Button } from "react-bootstrap";
import { deleteWarranty } from "./saveToFirebase";
import ExpiryCalendar from "../Calendar";
//import "./WarrantyList.css";

export default function WarrantyList() {
  const [warranties, setWarranties] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return; // not logged in yet

    const q = query(
        collection(db, "warranties"),
        where("userId", "==", user.uid)  // ⭐ filter by uid
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));

        setWarranties(data);
    });

    return unsubscribe;
    }, []);


  return (
    <>
    <Container className="mt-5">
      <h2 className="mb-4 fw-bold text-center">My Warranties</h2>

      <Row xs={1} sm={2} lg={3} className="g-4">
        {warranties.map((w) => {
          const isExpired = new Date(w.expiryDate) < new Date();

          return (
            <Col key={w.id}>
              <Card className="warranty-card shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title className="fw-bold">{w.product}</Card.Title>

                    <Badge bg={isExpired ? "danger" : "success"}>
                      {isExpired ? "Expired" : "Active"}
                    </Badge>
                  </div>

                  <hr />

                  <Card.Text className="mb-2">
                    <strong>Serial Number:</strong> {w.serialNumber}
                  </Card.Text>

                  <Card.Text className="mb-2">
                    <strong>Purchase Date:</strong> {w.purchaseDate}
                  </Card.Text>

                  <Card.Text className="mb-2">
                    <strong>Warranty Length:</strong> {w.warrantyLength}
                  </Card.Text>

                  <Card.Text className="mb-2">
                    <strong>Expiry Date:</strong>{" "}
                    <span
                      className={isExpired ? "text-danger fw-bold" : "fw-bold"}
                    >
                      {w.expiryDate}
                    </span>
                  </Card.Text>
                </Card.Body>
                <Button
                    variant="danger"
                    size="sm"
                    className="mt-2"
                    onClick={() => deleteWarranty(w.id)}
                    >
                    Delete
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
    <ExpiryCalendar warranties={warranties}/>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { Card, Container, Row, Col, Badge, Button } from "react-bootstrap";

export default function SubscriptionList() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubs(data);
    });

    return () => unsubscribe();
  }, []);

  const deleteSubscription = async (id) => {
    await deleteDoc(doc(db, "subscriptions", id));
  };

  const getStatusBadge = (renewalDate) => {
    if (!renewalDate) return <Badge bg="secondary">Unknown</Badge>;

    const today = new Date();
    const date = new Date(renewalDate);
    const diffDays = (date - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return <Badge bg="danger">Expired</Badge>;
    if (diffDays < 7) return <Badge bg="warning">Renewing Soon</Badge>;
    return <Badge bg="success">Active</Badge>;
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">My Subscriptions</h2>

      {subs.length === 0 && (
        <p className="text-muted">No subscriptions scanned yet.</p>
      )}

      <Row xs={1} sm={2} lg={3} className="g-4">
        {subs.map((s) => (
          <Col key={s.id}>
            <Card className="shadow-sm p-3 bg-dark text-light h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="fw-bold">{s.service || "Unknown Service"}</Card.Title>
                    {getStatusBadge(s.renewalDate)}
                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteSubscription(s.id)}
                  >
                    Delete
                  </Button>
                </div>

                <Card.Text className="mt-3">
                  <strong>Plan:</strong> {s.plan || "N/A"} <br />
                  <strong>Price:</strong> {s.price || "N/A"} <br />
                  <strong>Billing Cycle:</strong> {s.billingCycle || "N/A"} <br />
                  <strong>Renewal Date:</strong> {s.renewalDate || "N/A"} <br />
                  <strong>Next Charge:</strong> {s.nextCharge || "N/A"} <br />
                  <strong>Payment Method:</strong> {s.paymentMethod || "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

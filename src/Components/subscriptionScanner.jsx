import React, { useState } from "react";
import { Container, Card, Form, Button, Image, Spinner } from "react-bootstrap";
import { extractSubscriptionData } from "./gptExtractInfo.js";
import { saveSubscription } from "./saveToFirebase.js";
import { useNavigate  } from "react-router-dom";

export default function SubscriptionScanner() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_OCR; // OCR key

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setText("");
  };

  const runOcr = async () => {
    if (!file) return;

    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("language", "eng");
    form.append("isOverlayRequired", "false");

    try {
      const res = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: { apikey: API_KEY },
        body: form
      });

      const json = await res.json();
      const rawText = json?.ParsedResults?.[0]?.ParsedText || "";

      setText(rawText);

      const info = await extractSubscriptionData(rawText);
      console.log("Extracted:", info);

      await saveSubscription(info);
      navigate("/subs", { replace: true });
    } catch (err) {
      console.error(err);
      setText("OCR failed.");
    }

    setLoading(false);
  };

  return (
    <Container className="py-4">
      <Card className="p-3 shadow-sm align-items-center">
        <h2>Scan Subscription</h2>

        <Form.Group className="mb-3">
          <Form.Label>Select subscription screenshot / receipt</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        {preview && (
          <div className="mb-3">
            <Image src={preview} style={{ maxWidth: "300px" }} rounded fluid />
          </div>
        )}

        <Button onClick={runOcr} disabled={!file || loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" /> Reading...
            </>
          ) : (
            "Extract Subscription"
          )}
        </Button>

        {text && (
          <Card className="bg-light p-3 mt-4">
            <h5>Extracted Text:</h5>
            <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
          </Card>
        )}
      </Card>
    </Container>
  );
}

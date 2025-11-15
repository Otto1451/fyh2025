import React, { useState } from "react";
import { Container, Card, Form, Button, Image, Spinner } from "react-bootstrap";
import "./ocrComponent.css";
import {extractWarrantyData} from'./gptExtractInfo.js'
import { saveWarrantyToFirebase } from './saveToFirebase.js'
import { useNavigate  } from "react-router-dom";


export default function OcrTest() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_KEY = "K81545091988957";

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setText("");
  };

  const runOcr = async () => {
  if (!file) return;

  setLoading(true);
  setText("");

  const form = new FormData();
  form.append("file", file);
  form.append("language", "eng");
  form.append("isOverlayRequired", "false");

  // Detect PDF vs image
  if (file.type === "application/pdf") {
    form.append("filetype", "pdf");
    form.append("isSearchablePdf", "false");
    form.append("OCREngine", "1"); // best for PDFs
  } else {
    form.append("OCREngine", "2"); // best for handwritten/printed images
  }

  try {
    const res = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      headers: { apikey: API_KEY },
      body: form,
    });

    const json = await res.json();
    console.log("OCR result:", json);

    const parsed = json?.ParsedResults?.[0]?.ParsedText;

    if (parsed) {
      setText(parsed);
      await handleProcessWarranty(parsed);
    } else {
      setText("No text recognized.");
    }
  } catch (err) {
    console.error(err);
    setText("OCR failed.");
  }

  setLoading(false);
};

  const handleProcessWarranty = async (currText) => {
    const info = await extractWarrantyData(currText);
    console.log("GPT Json:", info);
    await saveWarrantyToFirebase(info, preview)
    navigate("/warranties", { replace: true });
    };

  return (
    <Container className="py-4">
      <Card className="p-3 shadow-sm align-items-center">
        <Form.Group className="mb-3 selectText">
          <Form.Label>Select image </Form.Label>
          <Form.Control type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
        </Form.Group>

        {preview && (
          <div className="text-center mb-3">
            <Image src={preview} style={{ maxWidth: "300px" }} rounded fluid />
          </div>
        )}

        <Button className="extractButton" onClick={runOcr} disabled={loading || !file}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Reading...
            </>
          ) : (
            "Extract Text"
          )}
        </Button>

        {text && (
          <Card className="bg-light p-3 ">
            <h5>Upload</h5>
            <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
          </Card>
        )}
      </Card>
    </Container>
  );
}

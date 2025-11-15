import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function extractWarrantyData(ocrText) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },   // 👈 FORCE JSON
    messages: [
      {
        role: "user",
        content: `
Extract warranty information from this text.

Return a JSON object with:
- product
- serialNumber
- purchaseDate
- warrantyLength
- expiryDate

Convert dates to YYYY-MM-DD. 
If a field is missing, return null.

Text:
${ocrText}
`
      }
    ],
    temperature: 0
  });

  return JSON.parse(res.choices[0].message.content);
}

export async function extractSubscriptionData(text) {
  const prompt = `
    Extract subscription information from this text.

    Fields to return in VALID JSON:
    - service
    - plan
    - price
    - billingCycle
    - renewalDate
    - nextCharge
    - paymentMethod

    If missing, return null.

    Text:
    "${text}"
  `;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1
  });

  return JSON.parse(res.choices[0].message.content);
}
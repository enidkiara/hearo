const HF_API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { text } = req.body;
  if (!text || !text.trim()) return res.json({ tone: "Neutral" });

  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    });

    const data = await response.json();
    const labels = data[0];
    const top = labels.reduce((a, b) => a.score > b.score ? a : b);

    const toneMap = {
      positive: "😊 Positive",
      negative: "😟 Negative",
      neutral: "😐 Neutral"
    };

    const tone = toneMap[top.label.toLowerCase()] || top.label;
    res.json({ tone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ tone: "Unknown" });
  }
}

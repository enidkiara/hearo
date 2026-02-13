export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
  
    const { text, target } = req.body;
    if (!text || !target) return res.json({ translatedText: text });
  
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`);
      const data = await response.json();
      res.json({ translatedText: data.responseData.translatedText });
    } catch (err) {
      console.error(err);
      res.status(500).json({ translatedText: "[Translation failed]" });
    }
  }
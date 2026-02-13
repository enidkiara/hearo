export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
  
    const { text, target } = req.body;
    if (!text || !target) return res.json({ translatedText: text });
  
    try {
      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Authorization": `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `text=${encodeURIComponent(text)}&target_lang=${target.toUpperCase()}`
      });
  
      const data = await response.json();
      res.json({ translatedText: data.translations[0].text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ translatedText: "[Translation failed]" });
    }
  }
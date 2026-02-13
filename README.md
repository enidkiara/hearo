# Hearo

## The Problem

Communication barriers happen everywhere. People who are deaf or hard of hearing can't follow conversations easily. Language differences make it hard to understand people who speak different languages. And even when we understand the words, we often miss the emotion behind them, whether someone sounds happy, upset, or neutral.

Most solutions only fix one problem at a time. Caption apps help with hearing, translation apps help with language, and emotion is just left up to guessing. No tool does all three together.

## Our Solution

We built Hearo, a web app that solves all three problems at once. Hearo gives you:

1. **Live captions** that turn speech into text instantly
2. **Tone detection** that tells you if someone sounds positive, negative, or neutral
3. **Translation** that converts captions into different languages

All three features work together in one simple app. You just open it in your browser, click to start, and Hearo does everything: transcribing, analyzing tone, and translating in real-time. It's completely free and works on any modern browser.

Hearo uses the Web Speech API for captions, Hugging Face AI for tone detection, and the MyMemory API for translation.

---

# Work Log

| Date | Task | Time Spent | Team Members | Description |
|------|------|------------|--------------|-------------|
| 2/11/2026 | Testing & Final Polish | 1.5 hrs | Kiara, Jean Paul | Tested language switching, fixed translation bugs, added "Translating..." loading message, tested on different browsers and with different accents |
| 2/10/2026 | Styling & Design | 2.5 hrs | Kiara, Jean Paul | Made everything centered, added custom colors, made buttons look better with hover effects, made it work on phones, improved error messages |
| 2/9/2026 | Deployment | 2 hrs | Kiara, Jean Paul | Pushed code to GitHub, deployed to Vercel, fixed routing issues so the API functions work, added API key to Vercel settings, tested the live website |
| 2/8/2026 | Translation Feature | 3 hrs | Kiara, Jean Paul | Tried different translation APIs, picked MyMemory (free but has daily limit), made toggle button and language picker, created function to send text to translation API, made it show both original and translated text |
| 2/7/2026 | Tone Detection | 2.5 hrs | Kiara, Jean Paul | Found Hugging Face sentiment model that works with conversation, made account and got API key, built function to send captions to the AI and get tone back, made it wait 800ms after speaking to analyze, tested with happy/sad/neutral phrases |
| 2/6/2026 | Live Captions | 3 hrs | Kiara, Jean Paul | Got speech-to-text working using Web Speech API, added 6 different languages, fixed bug where mic would stop listening, made it automatically restart so it keeps transcribing |
| 2/5/2026 | Planning & Setup | 2 hrs | Kiara, Jean Paul | Researched how to do speech recognition, picked Web Speech API because it's free and built into Chrome, set up file folders and basic HTML page, tested if microphone access works |

**Total Time: ~16.5 hours**

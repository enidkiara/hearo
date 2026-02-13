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

## Work Log

| Date | Task | Time Spent | Description |
|------|------|------------|-------------|
| 2/12/2026 | Final Styling | 1.5 hrs | Changed colors to earth tones, centered everything, made buttons and dropdowns look better |
| 2/12/2026 | API Testing | 2 hrs | Tested different translation APIs, picked MyMemory because it's actually free, fixed API setup |
| 2/11/2026 | Translation Feature | 3.5 hrs | Made toggle button for translation, added language picker, made it show original and translated text side-by-side, fixed bugs |
| 2/11/2026 | Language Switch Fix | 1.5 hrs | Fixed bug where mic stopped working when changing languages, added delay to restart properly |
| 2/11/2026 | Design Improvements | 2 hrs | Made the website look cleaner, added smooth animations and hover effects |
| 2/10/2026 | Deployment | 2.3 hrs | Pushed code to GitHub, deployed to Vercel, set up serverless functions, fixed routing issues, organized files into folders |
| 2/4/2026 | Tone Detection | 1.5 hrs | Researched sentiment analysis, connected Hugging Face AI, debugged display issues, got tone detection working |
| 2/2/2026 | Planning | 1 hr | Started project, researched different ways to detect emotion, explored options before deciding on text analysis |

**Total Time: ~15.3 hours**

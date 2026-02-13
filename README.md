# Hearo

## The Problem

Communication barriers exist everywhere in our daily lives. People who are deaf or hard of hearing struggle to follow conversations in real-time. Language differences prevent clear understanding between speakers of different languages. And even when we can hear and understand the words, we often miss the emotional context—whether someone sounds happy, upset, or neutral—which is crucial for effective communication.

Traditional solutions address these issues separately: live captions help with hearing accessibility, translation apps bridge language gaps, and tone is left to interpretation. But no single tool combines all three to give users a complete picture of what's being communicated.

## Our Solution

We created Hearo—a web application that breaks down all three communication barriers at once. Hearo provides:

1. **Real-time live captions** that transcribe speech as it happens, making conversations accessible to everyone
2. **Emotional tone detection** that analyzes the speaker's words and identifies whether they sound positive, negative, or neutral
3. **Instant translation** that converts captions into multiple languages, allowing users to understand conversations in languages they don't speak

All three features work together seamlessly in a single, easy-to-use interface. Users simply open the app in their browser, click to start, and Hearo handles the rest—transcribing, analyzing tone, and translating in real-time. The app is completely free, works on any modern browser, and requires no downloads or installations.

By combining speech recognition, AI-powered sentiment analysis from Hugging Face, and translation through the MyMemory API, Hearo creates a comprehensive communication solution that's accessible to everyone.

---

## Work Log

| Date | Task | Time Spent | Team Members | Description |
|------|------|------------|--------------|-------------|
| 2/12/2026 | Final Styling & Color Update | 1.5 hrs | Kiara, Jean Paul | Updated color scheme to earth tones (#F7F5F1, #E0DCD1, #D5E3E8, #E4E3BC, #344945), centered all layout elements for better visual balance, refined button and dropdown styling |
| 2/12/2026 | API Switching & Translation Setup | 2 hrs | Kiara | Tested multiple translation APIs (DeepL, Azure, LibreTranslate), settled on MyMemory API due to being truly free with no card required, switched back to original sentiment API configuration |
| 2/11/2026 | Translation Feature Development | 3.5 hrs | Kiara, Jean Paul | Built toggle button for translation enable/disable, added dropdown for target language selection, implemented side-by-side display of original and translated text, fixed syntax errors in translation function, switched between LibreTranslate and MyMemory APIs to find most reliable option |
| 2/11/2026 | Language Switching Bug Fix | 1.5 hrs | Kiara | Fixed bug where changing input language caused microphone to stop working, added delay and proper restart logic when user switches languages, improved user feedback during language changes |
| 2/11/2026 | Website Styling & Design | 2 hrs | Jean Paul | Created minimalist design aesthetic, added smooth transitions and hover effects, improved overall visual hierarchy and spacing |
| 2/10/2026 | Vercel Deployment & Configuration | 3 hrs | Kiara, Jean Paul | Set up GitHub repository and pushed code, deployed to Vercel with serverless functions, created and configured vercel.json for proper routing, moved HTML/CSS/JS files into /public folder, created /api folder for serverless functions (analyze-tone.js, translate.js), removed server.js in favor of serverless architecture, fixed CORS and routing issues, removed node_modules from git tracking and added .gitignore |
| 2/4/2026 | Tone Detection Implementation | 4 hrs | Kiara, Jean Paul | Researched and tested multiple sentiment analysis libraries, switched from face-based emotion detection to text-based tone analysis, linked sentiment.js library, debugged tone detection not displaying results, fixed tone logic to properly analyze caption text, changed terminology from "emotion" to "tone of voice" for accuracy, successfully integrated Hugging Face sentiment API |
| 2/3/2026 | Initial Facial Recognition Attempt | 2.5 hrs | Kiara | Attempted to implement facial expression analysis using face-api.js, added and linked face detection models, debugged camera access issues, fixed model loading problems, ultimately decided this approach was too complex and unreliable for the use case |
| 2/2/2026 | Project Setup & Initial Research | 1.5 hrs | Kiara, Jean Paul | Added face detection models to project, began exploring emotion detection through facial expressions before pivoting to voice-based tone analysis |

**Total Time: ~21.5 hours**

# ms-word-download
The sole purpose of this repository is to demonstrate a working Word download on Mac from an online application.
It is used to troubleshoot an ongoing issue with a vendor.

Created in React Next.js

TypeScript: No
App Router: Yes
Tailwind CSS: Yes
ESLint: No
src directory: No

Project structure:
json-to-word-js/
├── app/
│   └── page.js
├── components/
│   └── WordGenerator.js
├── utils/
│   └── createWordDoc.js

Download the repository & navigate to the folder "cd ms-word-download"
npm install
npm run dev
npm start

Open it up on your browser: http://localhost:3000/

Modify the Header Text and Footer Text (Optional)
Body JSON begins with page: 1
Body JSON accepts paragraph text and bullet points only ("bullet": true or false)
Logo accepts an image
Logo position is center and beneath the Header
Logo repeats on every page

Click "Download Word Document" when ready.

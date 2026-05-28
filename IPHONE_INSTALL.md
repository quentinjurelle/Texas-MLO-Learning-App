# iPhone Install Instructions

## Important

iPhone cannot install this app directly from `file:///` or from a Windows folder. To use it like a mobile app, host the `interactive_learning_app` folder on an HTTPS service, then add it to the iPhone Home Screen from Safari.

## Best hosting options

Use one of these:

- GitHub Pages
- Netlify Drop
- Vercel
- Cloudflare Pages

Netlify Drop is the simplest if you do not want to set up Git:

1. Go to `https://app.netlify.com/drop`.
2. Drag the entire `interactive_learning_app` folder into the page.
3. Netlify gives you an HTTPS link.
4. Open that link on your iPhone in Safari.
5. Tap the Share button.
6. Tap `Add to Home Screen`.
7. Name it `Texas MLO`.
8. Open it from the Home Screen.

## Progress on iPhone

Progress will save continuously on the iPhone in Safari's local storage, just like it does on the computer.

Progress does not automatically sync between computer and iPhone in this version.

Use `Export progress` on each device if you want backups.

## Offline use

After opening the hosted app once on the iPhone, it can cache the core app files for offline use. The PDFs are included inside the app folder and are also cached by the service worker when supported.

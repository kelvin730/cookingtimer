# CookCue Landing Page

This is a static validation landing page for overseas traffic tests.

## Local preview

Open `landing/index.html` directly in a browser, or run a small local server from the repository root:

```bash
python3 -m http.server 5174 -d landing
```

Then visit `http://127.0.0.1:5174`.

## Validation notes

- The page is written for English-speaking overseas audiences.
- The story angle is healthy home cooking, not calorie tracking or medical nutrition.
- The core product hook is still the cooking timer that knows when to start.
- The form posts to `data-endpoint` when configured; otherwise it stores test signups in `localStorage`.
- UTM parameters are captured from the page URL and stored with the local test signup.

## Next integrations

- Set `data-endpoint` on `#signupForm` to connect ConvertKit, Mailchimp, Airtable, Supabase, or a lightweight FastAPI endpoint.
- Add analytics events for hero CTA click, reserve scroll depth, price selection, and form submit.
- Replace local signup storage before paid traffic goes live.

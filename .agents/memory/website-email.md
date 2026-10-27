---
name: Website email provider
description: Owner-specified SMTP provider and transport for public website forms.
---

The owner specifies SMTP2GO for public website forms, matching the existing application's provider: mail.smtp2go.com, port 587, STARTTLS, with server-only SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and SMTP_FROM.

**Why:** The owner explicitly supplied this provider and transport requirement. SMTP credentials are SMTP2GO SMTP credentials, not the dashboard login; the sender must be verified.

**How to apply:** Keep credentials on the server, never in frontend-prefixed variables or browser JavaScript. The browser calls a backend endpoint. Confirm the destination inbox separately; SMTP_FROM is not a recipient specification. Do not access or modify the existing application's credentials.

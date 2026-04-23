# EmailJS Template Setup For Contact Form

This project now sends Contact form submissions from `src/components/ContactSection.tsx` using EmailJS.

## 1) Install and connect EmailJS

1. Create or log in to your EmailJS account.
2. Add your email service (Gmail, Outlook, etc.) and note the `service_id`.
3. Create a new email template and note the `template_id`.
4. Copy your EmailJS public key from account settings.

## 2) Add environment variables

Create or update `.env.local` with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Important:
- Variable names must start with `VITE_`.
- Restart dev server after changing `.env.local`.

## 3) Template fields expected by the app

The contact form sends these template params:

- `from_name`
- `phone`
- `email`
- `service`
- `message`
- `page_url`
- `submitted_at`

## 4) Suggested EmailJS template subject

```txt
New enquiry: {{service}} from {{from_name}}
```

## 5) Suggested EmailJS template body

```txt
You received a new enquiry from Jupiter Fast Finance website.

Name: {{from_name}}
Phone: {{phone}}
Email: {{email}}
Interested Service: {{service}}
Message: {{message}}

Submitted At (UTC): {{submitted_at}}
Page URL: {{page_url}}
```

## 6) Optional auto-reply template (recommended)

You can create a second template for customer acknowledgment.

Subject:

```txt
We received your enquiry - Jupiter Fast Finance
```

Body:

```txt
Hi {{from_name}},

Thank you for contacting Jupiter Fast Finance.
We have received your enquiry for {{service}}.
Our team will get in touch with you shortly.

If urgent, call us on +91 97571 90200.

Regards,
Jupiter Fast Finance
```

## 7) Test checklist

1. Fill form on site and submit.
2. Confirm success toast appears.
3. Confirm email is received at your destination inbox.
4. Confirm values render correctly (name, phone, service, message).
5. Test with missing optional fields (email/message).

## 8) Troubleshooting

- If toast says form not configured: check `.env.local` variable names.
- If submission fails: verify service/template IDs and public key.
- If emails are not delivered: check EmailJS dashboard logs and service authorization.

# Email Setup Guide for GitHub Pages

## EmailJS Setup (Recommended)

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Set up Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact

Hi Aayush,

You have a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Portfolio Contact Form
```

4. Save and note your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update script.js
Replace these values in `script.js`:
- `YOUR_PUBLIC_KEY` → Your actual public key
- `YOUR_SERVICE_ID` → Your service ID
- `YOUR_TEMPLATE_ID` → Your template ID

### Step 6: Deploy to GitHub Pages
1. Commit all changes to your repository
2. Push to GitHub
3. Enable GitHub Pages in repository settings
4. Your contact form will now send emails!

## Alternative Options

### Option 2: Formspree (Free tier available)
- Go to [formspree.io](https://formspree.io/)
- Create account and get form endpoint
- Update form action to Formspree endpoint

### Option 3: Netlify Forms (If hosting on Netlify)
- Add `netlify` attribute to form
- Netlify automatically handles form submissions

### Option 4: Getform.io
- Simple form backend service
- Free tier available
- Easy integration

## Testing
After setup, test your contact form by:
1. Filling out all fields
2. Clicking "Send Message"
3. Check your email for the message
4. Verify the success/error messages work

## Troubleshooting
- Check browser console for JavaScript errors
- Verify all API keys are correctly set
- Ensure EmailJS service is properly configured
- Check spam folder for test emails
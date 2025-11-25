# Contact Form Setup

To make the contact form fully functional, follow these steps:

## Option 1: Using FormSpree (Recommended - Free)

1. Go to [formspree.io](https://formspree.io)
2. Sign up with your email
3. Create a new form and get your form ID (e.g., `f/abc123def456`)
4. Open `contact.html` and replace the form action:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with your actual form ID from FormSpree
5. Save the file and test the form

## Option 2: Using Netlify Forms

If you deploy on Netlify:
1. Add `netlify` attribute to the form
2. Update the form:
   ```html
   <form id="contactForm" name="contact" method="POST" netlify>
   ```

## How It Works

- When a user fills out and confirms the form submission, the data is sent to your backend
- You'll receive an email notification for each submission
- The form shows a success message after sending

## Testing

Fill out the contact form with test data and click "Send message" → confirm in the modal. You should receive an email with the submission details.


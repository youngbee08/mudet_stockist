# Affluence Global Affiliate Platform

A modern, frontend-first web experience designed to support product enquiries, affiliate onboarding, and purchase verification through a seamless WhatsApp-based workflow.

---

## Overview

This platform provides a simple and user-friendly way for customers and prospective affiliates to:

- Contact the business via a structured form
- Place product orders without a traditional checkout system
- Submit payment receipts via WhatsApp
- Track payment status directly on the website

The system is intentionally lightweight and optimized for regions where WhatsApp is the primary communication channel.

---

## Core Features

### 1. Contact Page (WhatsApp-First Communication)

- Structured contact form (Name, Email, Subject, Message)
- No backend dependency
- On submit, user is redirected to WhatsApp with a **pre-filled message**
- Ensures clear, consistent communication format
- Mobile-first and fully responsive

**Why this works**
- Reduces friction
- Builds trust
- Allows users to review and edit messages before sending

---

### 2. Purchase Page (Order & Payment Flow)

- Product quantity is retrieved from `sessionStorage` (with fallback to 1)
- Displays clear bank transfer details
- Includes:
  - Product summary
  - Quantity selector
  - Shipping information
  - Total amount calculation
- Users can upload/select a receipt file (image or PDF)
- On submit:
  - Order details are saved in `sessionStorage`
  - Order status is set to **Pending**
  - WhatsApp opens with a pre-filled payment verification message

**Note:**  
File uploads are handled locally. The actual receipt is attached by the user inside WhatsApp.

---

### 3. Bank Transfer Details

Displayed clearly on the purchase page with copy support.

**Bank Information**
- **Bank Name:** UBA  
- **Account Name:** AFFLUENCE GLOBAL NUTRITION AND WELLNESS LTD  
- **Account Number:** 10**********434  
- **Branch:** POWA PLAZA, ABUJA  

Features:
- One-click copy for account number
- Clear instruction to include customer name in transfer narration

---

### 4. Payment Status Page

After submitting an order, users are redirected to a status page that:

- Reads order details from `sessionStorage`
- Displays:
  - Order ID
  - Product name
  - Quantity
  - Amount
  - Date
  - Current status (Pending / Verified)
- Allows users to:
  - Re-upload or change receipt
  - Re-open WhatsApp with the order details
  - Start a new order if needed

This ensures continuity even if the user leaves and returns to the site.

---

## Order Lifecycle

1. User selects product and quantity
2. User fills shipping information
3. Payment is made via bank transfer
4. Receipt is uploaded locally
5. Order is saved in `sessionStorage` with status `pending`
6. WhatsApp opens with a structured verification message
7. Admin verifies payment manually
8. Order status can later be updated (future enhancement)

---

## Technical Notes

- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS
- **State Persistence:** `sessionStorage`
- **Communication:** WhatsApp deep links
- **No backend required** for the current flow

---

## UX Principles Applied

- Mobile-first design
- Clear call-to-actions
- Minimal cognitive load
- Familiar communication channel (WhatsApp)
- Transparent order tracking

---

## Future Enhancements (Optional)

- Persist order history instead of single pending order
- Auto-expire pending orders after a defined time
- Admin verification dashboard
- Backend integration for receipt uploads
- Email + WhatsApp dual notifications

---

## Designed and maintained by

**Zenith Dev**  
Professional web solutions for modern digital businesses.

---

© Affluence Global Nutrition & Wellness Ltd

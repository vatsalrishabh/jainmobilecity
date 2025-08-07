# 🖥️ Frontend - Next.js + Clerk + Tailwind CSS

This is the frontend of the application built with **Next.js App Router**, **Clerk Authentication**, **Tailwind CSS**, and **React Hot Toast**.

## 📁 Project Structure

```app/
├── layout.tsx # Root layout - includes <Toaster /> and {children}
├── (client)/ # Main client-side layout and pages
│ ├── layout.tsx # Includes <Header />, <Footer />, and Clerk Provider
│ └── page.tsx # Main landing or dashboard page
```
## 📦 Tech Stack

- ✅ Next.js (App Router)
- 🔐 Clerk (Authentication)
- 🎨 Tailwind CSS (Utility-first CSS)
- 🔔 React Hot Toast (Toasts and Notifications)

---

## 📄 `app/layout.tsx`

This is the **root layout**, which wraps the entire application. It only includes the `<Toaster />` and `{children}`.

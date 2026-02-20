# Shared Guest List

A mobile-first, collaborative guest list built with **Next.js 14 (App Router)**, **Supabase**, and **Tailwind CSS**.

---

## Features

| Feature | Detail |
|---|---|
| 👤 Guest Identity | Sticky header input — name saved to `localStorage` |
| ➕ Create | Add items with your name auto-attributed |
| ✅ Toggle | Tap the circle to strike-through & mark complete |
| ✏️ Edit | Inline edit with Save / Cancel |
| 🗑️ Delete | One-tap remove with optimistic update |
| 📱 Mobile-first | Tailwind CSS card layout, touch-friendly tap targets |

---

## Setup

### 1 — Clone & install

```bash
npm install
```

### 2 — Supabase database

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New Query** and run the file at [`supabase/schema.sql`](supabase/schema.sql).

### 3 — Environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase **Project URL** and **anon public key** from  
`Dashboard → Settings → API`.

### 4 — Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (Inter font, viewport meta)
│   ├── page.tsx            # Main page — data fetching & CRUD handlers
│   └── globals.css         # Tailwind directives
├── components/
│   ├── GuestNameHeader.tsx # Sticky header with localStorage name input
│   ├── AddItemForm.tsx     # Controlled form for new items
│   ├── GuestList.tsx       # List renderer (pending / completed sections)
│   └── GuestListItem.tsx   # Single item card (toggle, edit, delete)
├── lib/
│   └── supabaseClient.ts   # Typed Supabase client
├── types/
│   └── index.ts            # Shared TypeScript interfaces
└── supabase/
    └── schema.sql          # Database schema + RLS policies
```

---

## Database Schema

```sql
create table public.guest_list (
  id           uuid      primary key default gen_random_uuid(),
  created_at   timestamptz            default now(),
  task_name    text      not null,
  is_completed boolean   not null     default false,
  author_name  text      not null
);
```
# list

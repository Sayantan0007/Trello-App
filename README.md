# Trello Kanban Board

A modern, highly interactive Trello-style Kanban Board application built with Next.js 16, React 19, Clerk Authentication, and Supabase for real-time-backed data persistence.

---

## 🚀 Project Setup

Follow these steps to set up and run the project locally:

### 1. Clone & Navigate
```bash
git clone <repository-url>
cd trello-kanban-board
```

### 2. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
```

### 3. Environment Variables Setup
Create a `.env` file in the root of the project and populate it with your Clerk and Supabase keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### 4. Database Setup
Create the following tables in your Supabase database to match the application data model:

```sql
-- Boards table
create table boards (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  color text not null,
  user_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Columns table
create table columns (
  id uuid default gen_random_uuid() primary key,
  board_id uuid references boards(id) on delete cascade not null,
  title text not null,
  sort_order integer not null,
  user_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  column_id uuid references columns(id) on delete cascade not null,
  title text not null,
  description text,
  assignee text,
  due_date timestamp with time zone,
  priority text check (priority in ('low', 'medium', 'high')) default 'medium' not null,
  sort_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🛠️ Technologies Used

### Frontend & Core:
- **Next.js 16** (App Router, Server Actions, SSR support via `@supabase/ssr`)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (for premium responsive design and styling)

### Authentication & Authorization:
- **Clerk** (`@clerk/nextjs`)

### Database & Backend Integration:
- **Supabase** (`@supabase/ssr`)

### User Interaction & Animation:
- **dnd-kit** (`@dnd-kit/core`, `@dnd-kit/sortable`) for fluid drag-and-drop mechanics
- **Radix UI** / **Shadcn** components for clean, accessible modals, dialogs, and forms
- **Hugeicons React** & **Lucide React** for modern icon sets

---

## 🤖 AI Tools Used During Development

- **Antigravity**: An agentic AI coding assistant designed by the Google DeepMind team, used for codebase exploration, code edits, structural design, and project planning.
- **ChatGPT / Codex**: Used for initial prototyping, syntax assistance, debugging guidelines, and boilerplate generation.

---

## ⚠️ Assumptions and Limitations

- **Authentication Requirement**: Access to boards, columns, and tasks requires a valid Clerk session. Unauthenticated users are redirected to sign-in/sign-up.
- **Real-Time Synchronization**: Changes reflect on reload or server action revalidation. Fully real-time collaborative updates (e.g. multi-user cursor tracking or instant edits without page/state refresh) are limited to the current user's session scope.
- **Supabase Schema Match**: The application assumes the database tables (`boards`, `columns`, and `tasks`) match the schemas defined above. Deviations in column names or types might cause runtime errors.

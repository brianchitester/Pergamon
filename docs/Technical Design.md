Pergamon Technical Design

🚀Super-Prompt: “Pergamon Bookshelf Project”
/\*\*

- ============================================================
- 0.  PROJECT OVERVIEW
- ============================================================
- We’re creating “Pergamon” — a visual bookshelf catalog app.
- This prompt bootstraps the repo, sets default Cursor rules,
- and adds two implementation tracks:
- A) CLIENT-ONLY DEMO (static JSON viewer)
- B) FULL-STACK MVP (Supabase + Vision OCR)
-
- Cursor should execute section 1 immediately, commit, and
- leave sections 2 & 3 as context for later generations.
-
- ============================================================
- 1.  REPO BOOTSTRAP TASKS
- ============================================================
- 1.1 Initialize Git → `git init`
- 1.2 Create `.cursorrules`:
-      ---
-      # Cursor Rules
-      - Use TypeScript throughout.
-      - Prefer React Server Components unless state/hook needed.
-      - JSDoc every exported function.
-      - Tailwind class order: display → position → box model → typography → color → misc.
-      - Commit messages follow Conventional Commits: <type>(scope): <subject>.
-      - PR titles must reference an open issue/TODO.
-      ---
- 1.3 Generate essential configs:
-      • `.gitignore`   (Node/Vercel)
-      • `.editorconfig`
-      • `.prettierrc`  ({ singleQuote: true, semi: false, trailingComma: 'all' })
-      • `.eslintrc.json` (Next.js + Tailwind plugin)
- 1.4 Add `LICENSE` (MIT; author: <TBD>)
- 1.5 Create `README.md` with:
-      ## Pergamon — Visual Bookshelf
-      - One-sentence pitch
-      - Screenshot placeholder
-      - **Quick Start** (pnpm install / pnpm dev)
-      - **Deploy to Vercel** badge
-      - Tech stack bullets
-      - Folder structure diagram
-      - License badge
- 1.6 Initial commit:
-      `chore(repo): bootstrap with cursor rules, readme, configs`
-
- ============================================================
- 2.  TRACK A — CLIENT-ONLY DEMO (static JSON viewer)
- ============================================================
- GOAL:
- Build a static Next.js 14 (App Router, TS) site that:
-     ▸ Loads `public/user_bookshelf.json`
-     ▸ Renders a filterable/searchable table (React-Table)
-     ▸ Filters: Genre, Language; keyword search Title/Author
-     ▸ Opens Goodreads links in new tab
-     ▸ Offers download JSON button
-
- FILES TO GENERATE:
- - `public/user_bookshelf.json` ← placeholder
- - `app/page.tsx`
- - `components/BookTable.tsx`
- - `lib/useBooks.ts`
- - `types/book.ts`
-
- Styling: TailwindCSS + Heroicons
-
- ============================================================
- 3.  TRACK B — FULL-STACK MVP (Supabase + Vision OCR)
- ============================================================
- GOAL:
- Full product with auth, image upload, OCR enrichment, and DB.
-
- STACK:
- ▸ Next.js 14 (App Router, TS, Server Actions)
- ▸ Supabase (Auth, Postgres, Storage)
- ▸ OpenAI Vision (or GCP Vision) for spine OCR
-
- FEATURES:
- 1.  Login (Supabase Auth)
- 2.  Upload multiple bookshelf photos → Storage
- 3.  `/api/process-image` server action:
-        – Call Vision → extract title/author
-        – `/api/enrich-book` to add genre, language, Goodreads link
-        – Insert into tables:
-              book(id, title, author, genre, lang, goodreads_url, user_id)
-              image(id, storage_path, user_id, uploaded_at)
-              bookImageMap(image_id, book_id, bbox_json)
- 4.  Library page: sortable/filterable grid
- 5.  Stats page: charts of genre / language counts
- 6.  Export CSV / JSON
-
- SUPABASE `schema.sql` to be generated later.
-
- ============================================================
- NOTE TO CURSOR
- ============================================================
- Do not start yet, wait for the bootstrap prompt then proceed
- with subsequent prompts (no code generation yet).
  \*/

📄 Bootstrap Prompt — Repo, Context Rules & README
/\*\*

- GOAL
- ***
- Initialize a fresh Git repository for the Bookshelf Viewer demo with:
- 1.  `.cursorrules` file — default coding & review rules Cursor will inject into every chat/context.
- 2.  A well-structured `README.md` that explains project purpose, setup, and deployment.
- 3.  Essential project boilerplate: `.gitignore`, `LICENSE` (MIT), and dev-experience configs.

- ACTION STEPS
- ***
- 1.  `git init` the workspace.
- 2.  Create `.cursorrules` with the following:
-      ---
-      # Cursor Rules
-      - Use TypeScript across the repo.
-      - Prefer Server Components unless a hook/state is required.
-      - All functions must have JSDoc.
-      - Tailwind class order: display → position → box model → typography → color → misc.
-      - Commit messages: `<type>(scope): <subject>` (Conventional Commits).
-      - PR titles must reference an open issue or TODO.
-      ---
- 3.  Generate `.gitignore` (Node/Vercel defaults) & `.editorconfig`.
- 4.  Add `.prettierrc` (singleQuote=true, semi=false, trailingComma=all) and `.eslintrc.json` (Next.js + Tailwind plugin).
- 5.  Draft `README.md` containing:
-      ## Pergamon — Bookshelf Viewer (Client-Only)
-      - Short elevator pitch.
-      - Demo screenshot placeholder.
-      - **Quick Start**
-        ```bash
-        pnpm install
-        pnpm dev
-        ```
-      - **Deploy on Vercel** button markdown.
-      - Stack: Next.js 14 · TailwindCSS · React Table · TypeScript
-      - Folder structure diagram.
-      - License badge.
- 6.  Add `LICENSE` (MIT, fill author TBD).
- 7.  Make an initial commit: `chore(repo): bootstrap with cursor rules, readme, configs`.
      \*/

📦 Client-Only Bookshelf Viewer (Next.js + JSON)

/\*\*

- GOAL:
- ***
- Build a client-only demo of a Bookshelf App in Next.js (App Router, TypeScript) that:
- ▸ Loads a local `user_bookshelf.json` file (static asset)
- ▸ Parses the book list and renders it in a beautiful UI
- ▸ Allows filtering by Genre, Language, and simple search by Title/Author
- ▸ Displays:
-       – Title
-       – Author
-       – Genre
-       – Language
-       – Link to Goodreads
- ▸ No Supabase, no auth — static build, runs fully in browser
- ▸ Deployable to Vercel as a demo site

- FILES:
- ***
- - `public/user_bookshelf.json` ← place JSON here, copy from root
- - `app/page.tsx` ← home page with table UI
- - `components/BookTable.tsx` ← displays sortable/filterable table
- - `lib/useBooks.ts` ← fetches and filters data from JSON
- - `types/book.ts` ← TS types for Book

- TECH STACK:
- ***
- - Next.js (App Router, TypeScript)
- - Tailwind CSS (for styling)
- - React Table (for filterable/sortable UI)
- - Optional: lucide-react or Heroicons for UI polish

- ACTIONS:
- ***
- - Scaffold layout using Tailwind
- - Add a dropdown filter for genre and language
- - Add a text input for keyword search
- - Open Goodreads link in new tab
- - Optional: Add download JSON button

- NOTE:
- ***
- Use `fetch('/user_bookshelf.json')` inside `useBooks.ts` to load data at runtime.
  \*/

📁 Once you paste this prompt into Cursor, drop your user_bookshelf.json into the public/ folder and it will Just Work™.
🥞 Full stack
/\*\*

- GOAL

- ***

- Build a full-stack Next.js app (13+/App Router) I can deploy to **Vercel** that:

- 1.  Lets a logged-in user upload multiple bookshelf photos.

- 2.  Extracts book spines (title + author) with OCR / vision (OpenAI Vision or Google Cloud Vision).

- 3.  Normalizes results, lets the user confirm / edit.

- 4.  Enriches each book with:

-        – Genre (fiction, non-fiction, memoir, etc.)                 – Language tag (English / Chinese / …)

-        – Goodreads URL + rating (fallback to Amazon search if none)

- 5.  Stores structured data (JSON) + original images in **Supabase**:

-        – `book` table  (id, title, author, genre, lang, goodreads_url, user_id)

-        – `image` table (id, storage_path, user_id, uploaded_at)

-        – `bookImageMap` (image_id, book_id, bbox json)

- 6.  Provides:

-        – “My Library” page (table/grid, sortable/filterable)

-        – CSV / JSON export

-        – Simple stats (counts by genre / language)

-

- HIGH-LEVEL ARCH

- ***

- ▸ Next.js (TypeScript) w/ App Router

- ▸ Auth: Supabase Auth (email + OAuth)

- ▸ DB + file storage: Supabase

- ▸ OCR / vision: server action calling OpenAI Vision (or swapable provider)

- ▸ Goodreads enrichment: server action that hits Goodreads REST via RapidAPI or scrapes OG tags.

-

- KEY TASKS

- ***

- 1.  **Scaffold**

- npx create-next-app … --ts --app – Example: “supabase” template.

- Install: @supabase/auth-ui-react, @supabase/supabase-js, lucide-react, class-variance-authority, tailwindcss, react-query, zod, openai.

-

- 2.  **Supabase setup**

- Tables & policies (SQL):

-      see “schema.sql” below ➜ run in Supabase dashboard.

-

- 3.  **Auth wrapper**

- `/middleware.ts` to redirect unauthenticated → /login.

- `AuthProvider` + `useUser`.

-

- 4.  **Image upload**

- Route /app/upload

-      – `<Dropzone>` component → uploads to Supabase Storage (`images/{userId}/{uuid}.jpg`)

-      – After successful upload call POST `/api/process-image` with public URL.

-

- 5.  **/api/process-image (server action)**

- Input: { imageUrl, userId }

-      ▸ Call OpenAI Vision (multipart). Parse title/author with regex heuristics.

-      ▸ For each candidate book:

-          – Call `/api/enrich-book` (below)

-          – Insert into `book` and `bookImageMap`

-

- 6.  **/api/enrich-book (server action)**

- Input: { title, author }

-      ▸ Search Goodreads → first match → pull URL + rating.

-      ▸ Genre & language:

-          – quick heuristic call to OpenAI ‟Given title/author return {genre, language}”.

-      ▸ Return enriched book object.

-

- 7.  **UI Pages**

-      /library           – data grid (react-table) with filters + export buttons.

-      /stats             – pie charts (react-charts) for genre/lang counts.

-      /image/[id]        – zoomable image overlay with bounding boxes (Konva canvas).

-

- 8.  **CLI export script**

-      `supabase functions deploy export-csv`  (Edge Function) or local script hitting REST.

-

- 9.  **Deploy**

-      – Add env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, OPENAI_API_KEY, GOODREADS_KEY)

-      – Push to GitHub, connect Vercel.

-

- OPTIONAL NICE-TO-HAVES

- ***

- ▸ Stripe for paid tier (more image quota)

- ▸ Background jobs via Vercel Cron / Supabase Edge Functions

- ▸ Offline PWA caching

-

- FILES TO GENERATE NOW

- ***

- - `schema.sql` (Supabase tables + RLS)

- - `lib/supabase.ts`

- - `app/upload/page.tsx`

- - `app/library/page.tsx`

- - `app/api/process-image/route.ts` (edge runtime)

- - `app/api/enrich-book/route.ts`

-

- Focus on clear, typed endpoints and stub the vision/enrichment calls with TODO comments so I can swap in keys.

\*/

🔊 Audible Export CLI
/\*\*

- GOAL
- ***
- Build a cross-platform **Node.js CLI** that logs into an Audible account and
- exports the user’s entire library to **CSV or JSON**.

- HIGH-LEVEL SPECS
- ***
- 1.  Command: `audible-export [--csv | --json] [--outfile <path>]`
- 2.  Auth:
-      ▸ Use `audible-tools/audible` npm API (OAuth flow) **or** fallback to
-        cookie capture if token already present in `~/.audible/config`.
- 3.  Fetch:
-      ▸ All library pages via Audible REST (`/api/library`)
-      ▸ Fields:  title, author, series, runtime, purchaseDate, asin
- 4.  Output:
-      ▸ Default:  JSON to stdout
-      ▸ `--csv`   : writes RFC-4180 CSV
-      ▸ `--outfile` saves file, else prints to stdout
- 5.  DX niceties:
-      ▸ Progress spinner (ora) while fetching
-      ▸ Pretty error messages (chalk)
-      ▸ Auto-opens browser for OAuth if tokens missing
- 6.  Package:
-      ▸ TypeScript (+ ts-node for dev, compiled to `/dist`)
-      ▸ Publish-ready `package.json` with `"bin": "dist/index.js"`
-      ▸ MIT license

- FILES TO GENERATE
- ***
- - `src/index.ts` → CLI entry (yargs)
- - `src/api/auth.ts` → handles OAuth / token storage
- - `src/api/fetchLibrary.ts`→ paginated fetch helper
- - `src/output/toCsv.ts` → JSON ➜ CSV
- - `src/types.ts` → AudibleBook interface
- - `tsconfig.json`
- - `package.json`
- - `.gitignore`
- - `README.md` (install, usage, examples)

- BONUS (Stretch)
- ***
- ▸ `audible-export --sync <supabase-url>` (POST books to a Supabase REST endpoint)
- ▸ Unit tests with vitest

- COMMIT STEPS
- ***
- 1.  Scaffold repo & configs.
- 2.  Implement `types.ts`, `auth.ts`, `fetchLibrary.ts` with dummy data.
- 3.  Wire CLI (`index.ts`) parsing & stub the fetch.
- 4.  Add CSV output helper.
- 5.  Replace dummy with real Audible API, test with env vars.
      \*/

Paste this into Cursor.
It will scaffold a TypeScript-based CLI, ready to npm link and run:
audible-export --csv --outfile my_audible_library.csv

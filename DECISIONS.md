# Decisions

## Product Decisions

### Which features did you include and why?

The three core features — Team Directory, Onboarding Checklist, and Resources Hub — were chosen directly from personal experience as a new hire at a large engineering company.

**Team Directory:** On my first day I had no idea who my colleagues were, which team each person belonged to, or who to approach for a specific topic or feature. I had to ask one person who would point me to another, who would point me to yet another. A filterable directory with department badges solves this from minute one.

**Resources Hub:** Internal documentation was scattered across multiple platforms — wikis, shared drives, email threads, Confluence pages — with no central reference point and no clear ownership. Everything was unorganised, outdated, and unsynchronised. Finding a simple setup guide meant interrupting colleagues repeatedly. A categorised, centralised hub with direct links directly solves this pain. Better organisation, better company.

**Onboarding Checklist:** Starting a new job is overwhelming. You don't know the company's rules, projects, culture, or how things work. A structured, week-by-week checklist tells the new hire exactly what to do and when, reduces anxiety, and accelerates the ramp-up period. The faster a new hire gets up to speed, the more value they bring to the team.

The irony of my Bosch experience was that managers would say "that's exactly why we hired you — to fix this." But without any structure to onboard me first, I was supposed to fix the very problem I was suffering from.

### How did you prioritise them?

The navbar order reflects the natural onboarding journey:
1. **My Profile** — understand who you are in the system
2. **Team** — understand who your colleagues are
3. **Checklist** — understand what you need to do
4. **Resources** — find what you need to do it

### Which features did you intentionally leave out of scope?

**Kanban board:** Task management at that level belongs either in a dedicated app or as a future expansion of this platform if it becomes the central hub for all company operations. The checklist covers the onboarding-specific workflow sufficiently for v1.

**Email and Slack notifications:** Highly valuable — the admin should be notified when employees complete tasks, and the new hire should receive updates back. But this requires external service integrations (SendGrid, Slack API) which add significant complexity and time. Left for a future iteration.

**Mobile responsiveness:** The assumption is that new employees access the app on a company-provided laptop, configured to open this app as the browser's default home page. Mobile is planned but not a v1 priority.

**HR email invitations with magic links:** In v1, new employees self-register. A proper HR-initiated invitation flow — where HR adds the employee, the system sends a welcome email with a magic link, and the employee just sets their password — is a natural and important next step.

**Scrum/Kanban cycles:** If this platform evolves into a full company hub, sprint planning and task management could be added as a dedicated section. For now, out of scope.

## Technical Decisions

### Why FastAPI?

FastAPI has a richer development ecosystem and solves more problems out of the box than Flask, with far less boilerplate than Django. Automatic Swagger UI documentation, native Pydantic validation, and async support made it the clear choice. It is also genuinely faster at runtime — and as a bonus, learning it was significantly easier than expected coming from a Java Spring background.

### Why PostgreSQL?

Prior familiarity with PostgreSQL from university projects made it the natural choice. It is also the most professional and production-ready option — robust, widely supported, and well-suited for the relational data model implemented here, particularly the `user_id` foreign key linking users to their employee profiles.

### Why React + Vite?

Prior experience with React from university made it the natural frontend choice. Vite's build tooling is fast, modern, and deployment-friendly — particularly relevant when deploying to Netlify. TypeScript was added to mirror the type safety of the Pydantic schemas on the backend, creating a consistent data contract across the full stack.

### Why this database structure?

The data model is kept intentionally simple for v1:
- `users` table handles authentication only
- `employees` table handles the directory and profile
- The two are linked via a `user_id` foreign key, set at signup
- `checklist_tasks` and `resources` are global — shared across all employees in v1

This separation keeps concerns clean while allowing future expansion (per-employee checklists, role-based resource visibility, team-level organisation).

Relationships between tables were intentionally kept minimal to reduce complexity and keep the scope manageable. This is documented as a known limitation and a clear area for future development.

### If you had more time, what would you build differently?

- Implement Alembic migrations instead of relying on `create_all` for schema management
- Add proper backend route protection using JWT middleware on all endpoints
- Refactor repeated Tailwind class strings into reusable CSS components in `index.css`
- Add comprehensive error handling and loading states throughout the frontend

## UX Decisions

### Why dark theme?

Dark theme is the natural choice for a developer-facing tool. It conveys a modern, technical, and futuristic aesthetic. Most engineers prefer it — including me. It gives the app a distinctive, professional feel without requiring heavy design resources.

### Why this user flow?

The navigation order (Profile → Team → Checklist → Resources) mirrors the natural mental journey of a new employee:
- First, understand your own place in the company
- Then, meet your colleagues and know who to talk to
- Then, understand what tasks you need to complete
- Finally, find the tools and resources you need to complete them

This order was shaped directly by reflecting on what I needed most urgently on my own first days at work.

### Did you test it with anyone?

UX decisions were validated against personal experience as a new hire, rather than formal user testing. That lived experience directly shaped the feature prioritisation and the information architecture of the app.

### What changed during development?

The signup flow was refined to include cascading department/role dropdowns after realising that free-text input would lead to inconsistent data in the employee directory. Confirm password was added to the signup form for basic security hygiene. The default landing page was changed from Checklist to Profile after reflecting on the most natural first step for a new employee arriving at the app.
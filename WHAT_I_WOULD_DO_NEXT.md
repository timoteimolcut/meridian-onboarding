# What I Would Do Next

Imagine two additional weeks of development. Here is what I would build, in order of impact.

## Priority 1 — Features that would fundamentally improve the experience

**1. HR email invitations with magic links**
Instead of new employees self-registering, HR would add the employee to the system, which automatically sends a welcome email with a secure magic link. The employee clicks the link, sets their password, and their profile is already pre-filled. This removes friction on day one and ensures data consistency. Implementation: SendGrid integration + token-based invitation system.

**2. Per-employee checklist progress**
Currently all employees share the same checklist and the same completion state. In a real onboarding scenario, each new hire should have their own independent progress. This requires linking checklist completions to specific users rather than being a global state. The data model foundation (user_id on Employee) is already in place to support this.

**3. Backend route protection with JWT middleware**
Currently the frontend enforces role-based access, but the backend API endpoints are unprotected — anyone with the URL can call them directly. A proper JWT middleware dependency on all protected routes would make the authentication system complete and production-ready.

**4. Merge User and Employee into a unified onboarding flow**
Currently User (authentication) and Employee (directory) are two separate records linked by a foreign key. The HR admin should be able to invite a new employee in one action that creates both records simultaneously, sends the welcome email, and sets up their profile. This unified flow is the most natural UX for HR.

**5. HR notifications and two-way communication**
The admin should receive notifications when a new employee completes key milestones (e.g. finished Week 1 tasks, completed security training). The new hire should also receive notifications back from HR or the system via email or Slack. This creates a feedback loop between the new hire and HR without requiring manual check-ins. Implementation: in-app notification system + Slack webhook + email integration.

**6. Automatic name-to-email and Slack handle linking**
When a new employee signs up, their username should automatically generate their company email (e.g. `tim` → `tim@meridian.com`) and Slack handle (`@tim`). This removes manual entry errors and ensures consistency across the directory, the checklist, and all internal tools.

## Priority 2 — Features that would add significant value

**7. Team and sub-team organisation with org chart**
Currently employees are organised only by department. A real company has teams within departments, reporting lines, and a full organisational structure. Implementing a proper org chart view (similar to Microsoft Teams) would allow new hires to understand not just who works at the company, but exactly who they work with, who their manager is, and who to approach for specific topics. This would include an interactive, visual organigram.

**8. Meridian as the central company hub**
The long-term vision for this app is not just onboarding — it is the central hub for all company processes. Checklist for new hires today, but sprint planning, task management, resource centralisation, and HR processes for the whole company tomorrow. Every tool and process the company uses should have an entry point here.

**9. Internal tool integration (Jarvis, GPU cluster)**
For engineering-heavy companies, the app should have deeper integration with internal tools beyond simple links. For example: a request flow inside the app to apply for GPU cluster access, status tracking for that request, and direct links to Jarvis (the internal neural network training platform) with contextual onboarding guides embedded directly in the app.

**10. Automatic new employee scheduling**
A background scheduler (APScheduler) that simulates the regular arrival of new employees (2-3 per month as per Meridian's hiring cadence). In production this would be replaced by an HRIS integration that automatically triggers the onboarding flow when a new hire is added to the HR system.

**11. Admin analytics dashboard**
HR should be able to see at a glance: how many new hires are currently onboarding, what percentage of tasks each has completed, who is behind schedule, and which resources are most accessed. A simple dashboard would make the admin experience significantly more powerful.

**12. Edit functionality for employees, tasks and resources in admin panel**
Currently the admin can only add and delete. Full inline editing of all records would make content management significantly more practical for HR.

**13. Completely separate admin and employee experiences**
Currently both roles see the same pages. In a future version, the admin would have a dedicated management dashboard with analytics and controls, while the employee would have a fully personalised experience tied to their specific team and role.

**14. Search functionality**
A search bar across the Team Directory and Resources Hub would allow new hires to quickly find colleagues by name or role, and resources by keyword. Essential as the company grows.

## Priority 3 — Nice-to-have improvements

**15. Kanban board for tasks**
Transform the onboarding checklist into a proper Kanban board (To Do / In Progress / Done / Blocked) to better reflect real onboarding workflows where tasks aren't always binary complete/incomplete. If the app evolves into a full company hub, this could expand into full sprint planning and scrum cycles.

**16. Mobile responsiveness**
The app is currently optimised for desktop. Since new employees might check their onboarding status from their phone before their laptop is set up, a responsive mobile layout would be valuable.

**17. Profile picture upload**
Allow employees to upload a profile photo. This makes the team directory significantly more human and easier to navigate. Implementation requires file storage (AWS S3 or Cloudinary).

**18. CSS component refactoring**
Tailwind utility classes are currently repeated across many components. Extracting common patterns into reusable CSS components in `index.css` would improve maintainability and reduce code duplication.

**19. Alembic database migrations**
Currently the database schema is managed with `Base.metadata.create_all`, which is suitable for development but not for production. Alembic would allow incremental, reversible schema migrations — essential as the data model evolves.

**20. Proper refresh token system**
Currently the JWT token is stored in localStorage and never refreshed. A proper refresh token system would improve security and user experience — tokens expire gracefully and the user is re-authenticated transparently.
# Assumptions

## About the Users

**Primary user: the new employee**
The main user is a recently hired employee, likely accessing the app on their first day or even before starting. The app serves as a ramp-up organiser — a single place to understand the company, meet the team, and track onboarding progress.

**Secondary user: HR admin**
HR operates in the background, managing the content the new hire sees. In a future version, the admin would receive notifications when employees complete tasks, and could send updates or alerts back to the new hire via email or Slack.

**What the new employee already knows:**
The new hire knows their department and role when they join — these are selected during account creation. Everything else (who their colleagues are, what tools to use, what tasks to complete, how the company operates) is discovered through the app.

**What the new employee does NOT know:**
- Who their colleagues are and how to reach them
- What tools and systems the company uses
- What tasks need to be completed and in what order
- How the hybrid work model works in practice
- Where to find documentation and internal resources

## About the Data

**Who enters the information:**
The HR admin is responsible for maintaining the content — checklist tasks, resources, and employee directory. In v1, HR manually adds this data through the admin panel. In a future version, data entry would be partially automated (e.g. new employees automatically appear in the directory upon account creation, which already happens in the current signup flow).

**When is information added:**
Data is pre-populated by HR before the first new hire joins. The checklist and resources are global and shared across all employees in v1.

**What happens if information is missing or incorrect:**
The HR admin is the single point of contact to fix any missing or incorrect data. The admin panel allows real-time edits. In a future version, the new hire could flag incorrect information directly from the app.

## About the Context

**Device:**
The new employee accesses the app on a company-provided laptop. The assumption is that the browser is configured to open Meridian Onboarding as the default home page, making the app immediately accessible from day one without any setup required.

**Access before first day:**
The app is accessible before the first working day. HR can share the signup link in the welcome email, allowing the new hire to create their account and familiarise themselves with the team and resources in advance.

**Browser and platform:**
The app is optimised for modern desktop browsers (Chrome, Firefox). Mobile responsiveness is not a priority for v1 but is planned for a future iteration.

**Meridian context:**
- 200 employees, hybrid work model (3 days office, 2 days remote)
- 5 departments: Engineering, HR, Sales, Marketing, Finance
- Internal communication via Slack and Google Meet
- 2-3 new hires per month
- HR consists of a single person
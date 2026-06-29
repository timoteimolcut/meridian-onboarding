from app.database import SessionLocal
from app.models.employee import Employee
from app.models.checklist import ChecklistTask
from app.models.resource import Resource


employees = [
    Employee(name="Sarah Chen", department="HR", role="HR Manager", slack_handle="@sarah.chen", email="sarah.chen@meridian.com"),
    Employee(name="Marcus Webb", department="Engineering", role="Senior Backend Engineer", slack_handle="@marcus.webb", email="marcus.webb@meridian.com"),
    Employee(name="Priya Nair", department="Engineering", role="Frontend Engineer", slack_handle="@priya.nair", email="priya.nair@meridian.com"),
    Employee(name="Tom Bakker", department="Engineering", role="DevOps Engineer", slack_handle="@tom.bakker", email="tom.bakker@meridian.com"),
    Employee(name="Lucia Ferrero", department="Sales", role="Sales Lead", slack_handle="@lucia.ferrero", email="lucia.ferrero@meridian.com"),
    Employee(name="James Okafor", department="Marketing", role="Marketing Manager", slack_handle="@james.okafor", email="james.okafor@meridian.com"),
    Employee(name="Ana Popescu", department="Finance", role="Finance Analyst", slack_handle="@ana.popescu", email="ana.popescu@meridian.com"),
    Employee(name="David Müller", department="Engineering", role="ML Engineer", slack_handle="@david.muller", email="david.muller@meridian.com"),
]


tasks = [
    ChecklistTask(title="Set up your laptop", description="Install required software: Slack, Chrome, VS Code", week=1, is_completed=False),
    ChecklistTask(title="Join Slack workspace", description="Ask Sarah Chen for the invite link", week=1, is_completed=False),
    ChecklistTask(title="Set up company email", description="Contact IT to configure your @meridian.com email", week=1, is_completed=False),
    ChecklistTask(title="Meet your team lead", description="Schedule a 30 min intro call on Google Meet", week=1, is_completed=False),
    ChecklistTask(title="Get access to Git repository", description="Ask your team lead to add you to the company GitHub org", week=1, is_completed=False),
    ChecklistTask(title="Read the engineering handbook", description="Available in the Resources section", week=2, is_completed=False),
    ChecklistTask(title="Complete security training", description="Mandatory online course, link sent by HR", week=2, is_completed=False),
    ChecklistTask(title="Meet the other departments", description="Short intro calls with Sales, Marketing and Finance leads", week=2, is_completed=False),
    ChecklistTask(title="Set up your development environment", description="Follow the setup guide in Resources", week=3, is_completed=False),
    ChecklistTask(title="Complete first task assignment", description="Pick a starter task from the backlog with your team lead", week=3, is_completed=False),
    ChecklistTask(title="One month check-in with HR", description="Schedule a 30 min call with Sarah Chen", week=4, is_completed=False),
]


resources = [
    Resource(title="Engineering Handbook", description="How we work, coding standards and best practices", url="https://notion.so/meridian/engineering", category="Processes"),
    Resource(title="Development Environment Setup", description="Step by step guide to set up your local environment", url="https://notion.so/meridian/dev-setup", category="Processes"),
    Resource(title="Company GitHub Organization", description="Access to all internal repositories", url="https://github.com/meridian", category="Repos"),
    Resource(title="Slack Workspace", description="Main communication tool — all team channels", url="https://meridian.slack.com", category="Tools"),
    Resource(title="Google Meet", description="Video calls and meetings", url="https://meet.google.com", category="Tools"),
    Resource(title="IT Helpdesk", description="For laptop issues, software access and account problems", url="https://it.meridian.com", category="HR"),
    Resource(title="HR Portal", description="Time off requests, payslips and company policies", url="https://hr.meridian.com", category="HR"),
    Resource(title="Hybrid Work Policy", description="Guidelines for office and remote days", url="https://notion.so/meridian/hybrid-policy", category="Processes"),
    Resource(title="Company Org Chart", description="Full organizational structure and reporting lines", url="https://notion.so/meridian/org-chart", category="HR"),
    Resource(title="CI/CD Pipeline Guide", description="How to deploy — staging and production workflows", url="https://notion.so/meridian/cicd", category="Processes"),
]

def seed():
    db = SessionLocal()
    try:
        db.add_all(employees)
        db.add_all(tasks)
        db.add_all(resources)
        db.commit()
        print("Database seeded successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
# Reflection

## What turned out to be harder than expected?

The most challenging part was deployment. Getting the Python version correct on Render, fixing CORS between the Netlify frontend and the Render backend, and solving the React Router 404 issue on page refresh — none of these were things I had encountered before. Each one required understanding why it was happening, not just applying a fix blindly.

The external conditions also played a role. Working through a heatwave in France, with mosquito bites disrupting sleep, while simultaneously preparing for a national teaching certification exam (titularizare) on July 21 — focus was hard to maintain. But somehow, by finding cool places to work and breaking the project into small daily goals, I managed to stay on track and deliver everything I set out to build.

## Which decision would I make differently if I started over?

The most significant architectural decision I would change is the separation between the `User` and `Employee` models. I initially kept authentication and the employee directory as two completely separate tables, linked only by a foreign key. This created friction throughout the project — deleting an employee didn't delete their user account, the profile page couldn't find HR-created employees, and the admin had no visible profile.

If I started over, I would design a single unified model from day one: one record per person that handles both authentication and directory information. The signup flow, the profile page, and the admin panel would all be simpler and more coherent as a result.

## What did I learn about myself as a developer?

This project reminded me how much I have grown since university. I had built something similar in Java Spring and React during my studies, but this time the concepts clicked at a deeper level — REST endpoints, CRUD operations, JWT authentication, database relationships. I wasn't just following instructions; I was understanding the reasoning behind each decision.

FastAPI surprised me with how much faster and cleaner it is compared to Spring. Python's expressiveness made what felt complex in Java feel natural here. TypeScript was the genuinely new thing — and it turned out to be more intuitive than expected, especially coming from a statically typed background.

I also noticed something about how I learn: I don't like to just receive information and apply it blindly. I need to understand why something works before I'm comfortable using it. This slowed me down occasionally, but it means I can actually defend every decision in this project — which matters more in an interview than having moved faster.

The moments when something broke and I had to debug it were actually the most satisfying. That feeling of tracking down a bug, understanding its root cause, and fixing it properly — it reminded me of late nights working on hard university projects. That's the part of engineering I enjoy most.

Finally — I want to be honest about this — I built this project with the help of Claude (Anthropic's AI assistant). Claude guided me through FastAPI, helped me debug issues, and suggested architectural decisions. But I typed every line of code myself, asked questions when I didn't understand, and made the product decisions based on my own experience and judgment. I believe that using AI tools effectively while maintaining genuine understanding of the underlying concepts is itself a relevant skill for a modern developer — and one I actively practiced throughout this project.
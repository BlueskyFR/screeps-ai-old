# Techniques

## Ressources (energy)

Take a source, and get the number of workers that can be assigned to it by calculating the number of free (walkable) tiles around it.

## Multiple roles

Create a RoleManager.js.
Make it so that a single worker has an array of roles instead of a role. When a role is not available, the next one is called.

## Constants.js

Create a file containing the number of workers in each category for example, and even the worker classes registration!

- Builder x2
- Upgrader (more move and more carry) x2
- Harvester x2 -> keep supplying while > 0

Create interfaces for roles

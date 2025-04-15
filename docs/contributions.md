# Contributing Guidelines

We welcome contributions to the Weasydoo project! Please follow these guidelines:

## Code Style
- Follow existing patterns and conventions
- Use TypeScript for all new code
- Prefer functional components with hooks
- Keep components small and focused

## Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 50 characters
- Reference issues with #123

## Pull Requests
1. Fork the repository
2. Create a feature branch
3. Submit PR to `main` branch
4. Include tests for new features
5. Update documentation if needed

## Development Workflow
```bash
# Run tests
pnpm test

# Format code
pnpm format

# Check types
pnpm type-check
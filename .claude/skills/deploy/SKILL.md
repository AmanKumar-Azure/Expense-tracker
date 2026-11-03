---
name: deploy
description: Deploy the app to staging. Runs all tests, builds the production bundle, then pushes the current commit to the staging branch. Use when the user asks to deploy or ship to staging.
disable-model-invocation: true
allowed-tools: Bash(npm test*), Bash(npm run *), Bash(git status*), Bash(git rev-parse*), Bash(git log*), Bash(git fetch*), Bash(git push origin HEAD:staging*)
---

# Deploy to staging

Run these steps in order. **Stop at the first failure**, show the user the error output, and do not continue to the next step.

## 1. Pre-flight checks

- Run `git status --porcelain`. If there are uncommitted changes, stop and ask the user to commit or stash them first. A deploy must match a real commit.
- Note the current branch (`git rev-parse --abbrev-ref HEAD`) and commit (`git log -1 --oneline`) so you can report what was deployed.

## 2. Run all tests

- If `package.json` defines a `test` script, run `npm test`. It must exit with code 0.
- This project currently has no test runner. If there is no `test` script, tell the user that, and run `npm run lint` as the quality gate instead. Lint errors fail the deploy; warnings do not.

## 3. Build the production bundle

- Run `npm run build`.
- Confirm it exits with code 0 and that `dist/index.html` exists.
- Report the bundle size summary Vite prints.

## 4. Push to staging

- Run `git fetch origin`.
- Push the current commit to the remote `staging` branch:

  ```bash
  git push origin HEAD:staging
  ```

- If the push is rejected as non-fast-forward, **do not force-push**. Stop and tell the user that `origin/staging` has commits not in the current branch, and let them decide how to proceed.

## 5. Report

Summarize in a few lines:

- Commit deployed (hash + message) and source branch
- Test/lint result
- Build result and bundle size
- Push result (`origin/staging` now points to that commit)

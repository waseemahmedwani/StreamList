Stage all changes, generate a meaningful commit message based on the diff, and commit the changes using git.

Rules:
- Analyze the code changes carefully
- Write a clear, concise commit message (max 1–2 lines)
- Do not include unnecessary details
- Do not commit and push this particular(commit_push) file
Follow these steps carefully:

1. Run `git status`
2. If there are no changes → tell user "Nothing to commit"
3. If changes exist:
   - Run `git add .`
   - If user provided message → use it
   - Else → generate a concise commit message based on changes
4. Commit changes
5. Push to current branch

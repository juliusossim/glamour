# Prettier Quick Reference

## 🚀 Commands

```bash
# Format all files
npm run format

# Check if files are formatted (CI)
npm run format:check

# Format only changed files
npm run format:affected
```

## 📝 Key Settings

| Setting         | Value    | Why                            |
| --------------- | -------- | ------------------------------ |
| Print Width     | 80       | Readability, fits most screens |
| Tab Width       | 2 spaces | Web development standard       |
| Quotes          | Single   | JS ecosystem convention        |
| Semicolons      | Required | Explicit, prevents ASI bugs    |
| Trailing Commas | ES5      | Better git diffs               |
| Arrow Parens    | Always   | Consistency                    |
| Bracket Spacing | true     | `{ foo }` not `{foo}`          |
| JSX Quotes      | Double   | HTML convention                |
| End of Line     | LF       | Unix-style                     |
| Format on Save  | Enabled  | Automatic in VS Code           |

## 🎯 File Overrides

| File Type | Special Settings                   |
| --------- | ---------------------------------- |
| JSON      | 120 char width, no trailing commas |
| Markdown  | 100 char width, wrap prose         |
| YAML      | Double quotes                      |
| HTML      | 120 char width                     |

## ✅ Pre-commit Hooks

Automatic formatting on commit:

- **TS/TSX/JS/JSX**: ESLint → Prettier
- **JSON/MD/HTML/CSS/YAML**: Prettier

## 📚 Documentation

- [Full Setup Details](./PRETTIER_SETUP.md)
- [Configuration Docs](./.prettierrc.md)
- [Official Prettier Docs](https://prettier.io)

## 🔧 VS Code Setup

1. Install "Prettier - Code formatter" extension
2. Reload VS Code
3. Format on save is already enabled!

## 💡 Tips

- Trust Prettier's decisions
- Use `// prettier-ignore` sparingly
- Keep `.prettierignore` updated
- Run `npm run format` before committing

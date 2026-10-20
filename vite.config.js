import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // Claude Code session worktrees live in .claude/worktrees, each a full
    // copy of the repo; without this, npm test runs every copy's tests too.
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
})

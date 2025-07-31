<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# kanban_board

A modern, responsive **Kanban board** built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Dnd Kit](https://dndkit.com/).  
Supports **drag and drop**, adding tasks dynamically, and includes social profile links in each task card.

---

## 🚀 Features

- 🔁 Drag-and-drop tasks across columns
- ➕ Add new tasks with:
  - Project title
  - Description
  - Deadline
  - LinkedIn & GitHub profile links
- 🎨 Colored tags per priority level
- 🧱 Responsive UI with modern layout
- ⭐ Starred Kanban board header

---

## 📦 Built With

- ⚛️ React + TypeScript
- ⚡ Vite (blazing fast build tool)
- 🎨 Tailwind CSS v4.1
- 🧲 Dnd Kit (drag-and-drop)
- 📦 Lucide React (icons)

---

## 📁 Folder Structure

src/
├── components/ # TaskCard, Column, KanbanBoard
├── data/ # initialData.ts
├── App.tsx
└── main.tsx

yaml
Copy
Edit

---

## 🛠️ Setup & Run Locally

```bash
# Clone repo
git clone https://github.com/your-username/kanban-board.git
cd kanban-board

# Install dependencies
npm install

# Start development server
npm run dev
>>>>>>> ce25ecc89da1a1f8778ec1e079d52ea1c5482aad
# mykanbanboard

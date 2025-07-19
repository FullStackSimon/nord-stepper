# nord-stepper

A lightweight, accessible stepper web component built with [Lit](https://lit.dev), designed to integrate seamlessly with [Nord Design System](https://nordhealth.design/).

This project was created to explore the design philosophy, component patterns, and integration approach of the Nord ecosystem while I apply for the Staff Engineer role with them.

---

## ✨ Features

- ✅ Progress indicator (`steps`, `bar`, or `both`)
- ✅ Responsive layout (mobile and desktop)
- ✅ Customizable back/next button labels
- ✅ Emits `step-change` and `completed` events
- ✅ Built with web standards using [Lit](https://lit.dev)
- ✅ Uses [@nordhealth/components](https://nordhealth.design/components) and design tokens

---

## 🚀 Usage

```html
<nord-stepper total-steps="3" progress="both">
  <div slot="step-1">
    <h2>Step 1</h2>
    <p>Intro content</p>
  </div>

  <div slot="step-2">
    <h2>Step 2</h2>
    <p>Details here</p>
  </div>

  <div slot="step-3">
    <h2>Finish</h2>
    <p>Complete the process</p>
  </div>
</nord-stepper>
```

---

## 🎛️ Props

| Property      | Type                                     | Default   | Description                                  |
|---------------|------------------------------------------|-----------|----------------------------------------------|
| `totalSteps`  | `number`                                 | `3`       | Number of steps                              |
| `progress`    | `"steps"`, `"bar"`, `"both"`, `"none"`   | `"both"`  | Controls progress display format             |
| `backLabel`   | `string`                                 | `"Back"`  | Label for the back button                    |
| `nextLabel`   | `string`                                 | `"Next"`  | Label for the next/finish button             |

---

## 📡 Events

- `step-change` – Emitted when the current step changes  
  → `event.detail = { step: number }`

- `completed` – Emitted when the final step is completed

---

## 🧱 Development

```bash
npm install
npm run dev
```

Uses [Vite](https://vitejs.dev/) for development.

---

## 📐 Design Philosophy

This project aligns with [Nordhealth’s design principles](https://nordhealth.design/principles/):

- Clarity and simplicity in UI
- Consistency via design tokens and components
- Accessibility and flexibility as first-class goals

---

## 📄 License

MIT — see [LICENSE](./LICENSE)

---

## 🧪 Roadmap

- [ ] Accessibility (keyboard navigation, ARIA)
- [ ] Unit tests (Vitest)
- [ ] E2E tests (Playwright)
- [ ] Localisation support (i18n)
- [ ] Animations / transitions
- [ ] Vue/React wrappers

---

> Built for learning. Inspired by Nord.

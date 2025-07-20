# nord-stepper

A lightweight, accessible stepper web component built with [Lit](https://lit.dev), designed to integrate seamlessly with [Nord Design System](https://nordhealth.design/).

This project was created to explore the design philosophy, component patterns, and integration approach of the Nord ecosystem while applying for a Staff Engineer role.

---

## ✨ Features

- ✅ Progress indicator: step count, bar, both, or none
- ✅ Responsive layout (mobile and desktop)
- ✅ Keyboard navigation (←/→ keys)
- ✅ Emits `step-change` and `completed` events
- ✅ Built with web standards using [Lit](https://lit.dev)
- ✅ Integrated with [@nordhealth/components](https://nordhealth.design/components)
- ✅ Accessible (ARIA roles, live regions, visually hidden labels)
- ✅ Localized text via internal i18n bundle

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

| Property      | Type                                   | Default   | Description                              |
|---------------|----------------------------------------|-----------|------------------------------------------|
| `totalSteps`  | `number`                               | `3`       | Total number of steps                    |
| `progress`    | `'steps' | 'bar' | 'both' | 'none'` | `'both'`  | Controls progress indicator visibility   |

---

## 📡 Events

| Event         | When it fires                             | Payload                      |
|---------------|--------------------------------------------|------------------------------|
| `step-change` | When the step is changed (next/back/arrow) | `{ step: number }`           |
| `completed`   | When the user completes the final step     | none                         |

---

## ⌨️ Keyboard Support

| Key           | Action              |
|---------------|---------------------|
| `ArrowRight`  | Go to next step     |
| `ArrowLeft`   | Go to previous step |

---

## 🧱 Development

```bash
npm install
npm run dev
```

- Local dev server via [Vite](https://vitejs.dev/)
- Tests:
  - Unit: `npm run test:unit`
  - Coverage: `npm run test:coverage`
  - E2E: `npx playwright test`

---

## 📐 Design Philosophy

This component follows [Nordhealth’s design principles](https://nordhealth.design/principles/):

- Clarity and simplicity in UI
- Accessibility and flexibility by default
- Component modularity and system consistency

---

## 📄 License

MIT — see [LICENSE](./LICENSE)

---

## 🧪 Roadmap

- ✅ Accessibility (keyboard nav, ARIA)
- ✅ Unit tests (Vitest)
- ✅ E2E tests (Playwright)
- ✅ Localisation support (i18n)
- [ ] Animations / transitions
- [ ] Vue/React wrappers
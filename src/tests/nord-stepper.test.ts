import { fixture, html, expect, oneEvent } from '@open-wc/testing'
import { describe, it } from 'vitest'
import '../nord-stepper'
import type { NordStepper } from '../nord-stepper'

describe('nord-stepper', () => {
  it('renders default labels and first step', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3"></nord-stepper>`)

    const back = el.shadowRoot?.querySelector('nord-button[variant="secondary"]')
    const next = el.shadowRoot?.querySelector('nord-button[variant="primary"]')
    const badge = el.shadowRoot?.querySelector('nord-badge')

    expect(back).to.exist
    expect(back?.textContent?.trim()).to.equal('Back')

    expect(next).to.exist
    expect(next?.textContent?.trim()).to.equal('Next')

    expect(badge).to.exist
    expect(badge?.textContent?.trim()).to.equal('1/3')
  })

  it('emits step-change on next', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3"></nord-stepper>`)

    const nextButton = el.shadowRoot?.querySelector('nord-button[variant="primary"]') as HTMLElement
    setTimeout(() => nextButton.click())

    const event = await oneEvent(el, 'step-change')
    expect(event.detail.step).to.equal(2)
  })

  it('emits step-change on back', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3"></nord-stepper>`)
    ;(el as any).currentStep = 2
    await el.updateComplete

    const backButton = el.shadowRoot?.querySelector('nord-button[variant="secondary"]') as HTMLElement
    setTimeout(() => backButton.click())

    const event = await oneEvent(el, 'step-change')
    expect(event.detail.step).to.equal(1)
  })

  it('disables back button on first step', async () => {
    const el = await fixture(html`<nord-stepper total-steps="3"></nord-stepper>`)
    const backButton = el.shadowRoot?.querySelector('nord-button[variant="secondary"]')

    expect(backButton?.hasAttribute('disabled')).to.be.true
  })

  it('fires completed event on final step', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3"></nord-stepper>`)
    ;(el as any).currentStep = 3
    await el.updateComplete

    const nextButton = el.shadowRoot?.querySelector('nord-button[variant="primary"]') as HTMLElement
    setTimeout(() => nextButton.click())

    const event = await oneEvent(el, 'completed')
    expect(event).to.exist
  })

  it('responds to arrow keys for navigation', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3"></nord-stepper>`)
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    await el.updateComplete
    expect(el).to.have.property('currentStep', 2)

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
    await el.updateComplete
    expect(el).to.have.property('currentStep', 1)
  })

  it('renders only the progress bar when progress is "bar"', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3" progress="bar"></nord-stepper>`)
    const badge = el.shadowRoot?.querySelector('nord-badge')
    const progressBar = el.shadowRoot?.querySelector('nord-progress-bar')

    expect(badge).to.be.null
    expect(progressBar).to.exist
  })

  it('renders only the step badge when progress is "steps"', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3" progress="steps"></nord-stepper>`)
    const badge = el.shadowRoot?.querySelector('nord-badge')
    const progressBar = el.shadowRoot?.querySelector('nord-progress-bar')

    expect(badge).to.exist
    expect(progressBar).to.be.null
  })

  it('renders both badge and progress bar when progress is "both"', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3" progress="both"></nord-stepper>`)
    const badge = el.shadowRoot?.querySelector('nord-badge')
    const progressBar = el.shadowRoot?.querySelector('nord-progress-bar')

    expect(badge).to.exist
    expect(progressBar).to.exist
  })

  it('renders no progress indicators when progress is "none"', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3" progress="none"></nord-stepper>`)
    const badge = el.shadowRoot?.querySelector('nord-badge')
    const progressBar = el.shadowRoot?.querySelector('nord-progress-bar')

    expect(badge).to.be.null
    expect(progressBar).to.be.null
  })

  it('falls back to no progress indicators on invalid progress value', async () => {
    const el = await fixture<NordStepper>(html`<nord-stepper total-steps="3" .progress=${'foo' as any}></nord-stepper>`)
    const badge = el.shadowRoot?.querySelector('nord-badge')
    const progressBar = el.shadowRoot?.querySelector('nord-progress-bar')

    expect(badge).to.be.null
    expect(progressBar).to.be.null
  })

})

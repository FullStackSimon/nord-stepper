import { LitElement, html, css, type TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('nord-stepper')
export class NordStepper extends LitElement {
  /**
   * Controls how progress is shown at the top.
   * - "bar": show only the progress bar
   * - "steps": show only the step count (e.g. 1/3)
   * - "both": show both (default)
   * - "none": hide all progress indicators
   */
  @property({ type: String }) progress: 'bar' | 'steps' | 'both' | 'none' = 'both'
  @property({ type: Number }) totalSteps: number = 3
  @property({ type: String }) buttonLabelBack: string = 'Back'
  @property({ type: String }) buttonLabelNext: string = 'Next'
  @property({ type: String }) buttonLabelFinish: string = 'Finish'

  @state() private currentStep: number = 1

  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--n-font-family);
      position: relative;
      padding: var(--n-space-m);
    }

    .progress-bar {
      width: 3.5rem;
    }

    .step ::slotted(*) {
      font-family: var(--n-font-family, sans-serif);
    }
  `

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeyDown)
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this.handleKeyDown)
    super.disconnectedCallback()
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      this.goNext()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      this.goBack()
    }
  }

  private goNext = async (): Promise<void> => {
    if (this.currentStep < this.totalSteps) {
      this.currentStep = this.currentStep + 1
      await this.updateComplete
      this.emitChange()
    } else {
      this.dispatchEvent(new CustomEvent('completed', { bubbles: true }))
    }
  }

  private goBack = async (): Promise<void> => {
    if (this.currentStep > 1) {
      this.currentStep = this.currentStep - 1
      await this.updateComplete
      this.emitChange()
    }
  }

  private emitChange = (): void => {
    this.dispatchEvent(new CustomEvent('step-change', {
      detail: { step: this.currentStep },
      bubbles: true,
    }))
  }

  render = (): TemplateResult => html`
    <nord-stack gap="l">
      ${this.progress !== 'none'
        ? html`
            <nord-stack
              direction="horizontal"
              align-items="center"
              justify-content="space-between"
              role="region"
            >
              ${['steps', 'both'].includes(this.progress)
                ? html`<nord-badge class="n-margin-is-s">${this.currentStep}/${this.totalSteps}</nord-badge>`
                : null}
              ${['bar', 'both'].includes(this.progress)
                ? html`<nord-progress-bar .value=${(this.currentStep / this.totalSteps) * 100} class="progress-bar"></nord-progress-bar>`
                : null}
            </nord-stack>
          `
        : null}

      <!-- live region now contains both the step text and the slot content -->
      <div
        id="step-container"
        aria-live="polite"
        aria-atomic="true"
      >
        <nord-visually-hidden>Step ${this.currentStep} of ${this.totalSteps}</nord-visually-hidden> 
        <slot name=${`step-${this.currentStep}`}></slot>
      </div>

      <nord-stack justify-content="space-between" direction="horizontal" role="navigation">
        <nord-button
          variant="secondary"
          @click=${this.goBack}
          ?disabled=${this.currentStep === 1}
          ?aria-disabled=${this.currentStep === 1}
        >
          ${this.buttonLabelBack}
        </nord-button>
        <nord-button
          variant="primary"
          @click=${this.goNext}
        >
          ${this.currentStep === this.totalSteps
            ? this.buttonLabelFinish
            : this.buttonLabelNext}
        </nord-button>
      </nord-stack>
    </nord-stack>
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'nord-stepper': NordStepper
  }
}

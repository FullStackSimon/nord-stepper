import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('nord-stepper')
export class NStepper extends LitElement {

  /**
   * Controls how progress is shown at the top.
   * - "bar": show only the progress bar
   * - "steps": show only the step count (e.g. 1/3)
   * - "both": show both (default)
   * - "none": hide all progress indicators
   */
  @property({ type: String }) progress: 'bar' | 'steps' | 'both' | 'none' = 'both'
  @property({ type: Number }) totalSteps = 3
  @property({ type: String }) buttonLabelBack = 'Back'
  @property({ type: String }) nexbuttonLabelNext = 'Next'
  @property({ type: String }) buttonLabelFinish = 'Finish'

  @state() private currentStep = 1

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

  private goNext = () => {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++
      this.emitChange()
    } else {
      this.dispatchEvent(new CustomEvent('completed', { bubbles: true }))
    }
  }

  private goBack = () => {
    if (this.currentStep > 1) {
      this.currentStep--
      this.emitChange()
    }
  }

  private emitChange() {
    this.dispatchEvent(
      new CustomEvent('step-change', {
        detail: { step: this.currentStep },
        bubbles: true,
      })
    )
  }

  render() {
    return html`
      <nord-stack gap="l">
        
        ${this.progress !== 'none'
          ? html`
              <nord-stack
                direction="horizontal"
                align-items="center"
                justify-content="space-between"
              >
                ${['steps', 'both'].includes(this.progress)
                  ? html`
                      <nord-badge class="n-margin-is-s">
                        ${this.currentStep}/${this.totalSteps}
                      </nord-badge>
                    `
                  : null}
                ${['bar', 'both'].includes(this.progress)
                  ? html`
                      <nord-progress-bar
                        value=${(this.currentStep / this.totalSteps) * 100}
                        class="progress-bar"
                      ></nord-progress-bar>
                    `
                  : null}
              </nord-stack>
            `
          : null}

        <div class="step">
          <slot name="step-${this.currentStep}"></slot>
        </div>

        <nord-stack justify-content="space-between" direction="horizontal">
          <nord-button
            variant="secondary"
            @click=${this.goBack}
            ?disabled=${this.currentStep === 1}
          >
            Back
          </nord-button>
          <nord-button variant="primary" @click=${this.goNext}>
            ${this.currentStep === this.totalSteps ? 'Finish' : 'Next'}
          </nord-button>
        </nord-stack>
      </nord-stack>
    `
  }
}

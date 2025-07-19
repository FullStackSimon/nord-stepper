import type { Translation } from '@nordhealth/components'

type NordStepper = {
    'nord-stepper': {
        back: string
        next: string
        finish: string
        stepXofY: (current: number, total: number) => string
    }
}

export const enTranslation: Translation & NordStepper = {
  $lang: 'en',
  $name: 'English',
  $dir: 'ltr',
  'nord-stepper': {
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    stepXofY: (current: number, total: number) => `Step ${current} of ${total}`,
  },
} as Translation & NordStepper
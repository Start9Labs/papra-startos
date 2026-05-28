import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  contentExtractionEnabled: Value.toggle({
    name: i18n('Text Extraction (OCR)'),
    description: i18n(
      'Extract searchable text from uploaded documents and scans. Disable to reduce CPU usage on low-powered servers.',
    ),
    default: true,
  }),
  ocrLanguages: Value.text({
    name: i18n('OCR Languages'),
    description: i18n(
      'Comma-separated Tesseract language codes used for text extraction, for example "eng,fra,deu".',
    ),
    required: true,
    default: 'eng',
    placeholder: 'eng',
  }),
  maxUploadSizeMb: Value.number({
    name: i18n('Maximum Upload Size'),
    description: i18n(
      'The largest size, in megabytes, Papra will accept for a single document. Set to 0 for unlimited.',
    ),
    required: true,
    default: 25,
    min: 0,
    integer: true,
    units: 'MB',
  }),
})

export const configureDocuments = sdk.Action.withInput(
  'configure-documents',

  async ({ effects }) => ({
    name: i18n('Document Settings'),
    description: i18n(
      'Configure how Papra processes and stores your documents.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const config = await configJson.read().once()
    return {
      contentExtractionEnabled: config?.contentExtractionEnabled ?? true,
      ocrLanguages: config?.ocrLanguages ?? 'eng',
      maxUploadSizeMb: config?.maxUploadSizeMb ?? 25,
    }
  },

  async ({ effects, input }) => configJson.merge(effects, input),
)

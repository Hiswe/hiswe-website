import antfu from '@antfu/eslint-config'

export default antfu(
  {
    markdown: false,
    yaml: false,
    ignores: [
      `*/public/*`,
    ],
  },
)

import { CSSObject } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { GlobalStyles } from '@mui/material'

export const lexicalTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: 'lexical-paragraph',
  quote: 'lexical-quote',
  heading: {
    h1: 'lexical-heading-h1',
    h2: 'lexical-heading-h2',
    h3: 'lexical-heading-h3',
    h4: 'lexical-heading-h4',
    h5: 'lexical-heading-h5',
    h6: 'lexical-heading-h6',
  },
  list: {
    nested: {
      listitem: 'lexical-nested-listitem',
    },
    ol: 'lexical-list-ol',
    ul: 'lexical-list-ul',
    listitem: 'lexical-listItem',
    listitemChecked: 'lexical-listItemChecked',
    listitemUnchecked: 'lexical-listItemUnchecked',
  },
  hashtag: 'lexical-hashtag',
  image: 'lexical-image',
  link: 'lexical-link',
  text: {
    bold: 'lexical-textBold',
    code: 'lexical-textCode',
    italic: 'lexical-textItalic',
    strikethrough: 'lexical-textStrikethrough',
    subscript: 'lexical-textSubscript',
    superscript: 'lexical-textSuperscript',
    underline: 'lexical-textUnderline',
    underlineStrikethrough: 'lexical-textUnderlineStrikethrough',
  },
}

// This object maps MUI theme to CSS classes, that are used in Lexical theme.
// See:
// https://lexical.dev/docs/getting-started/theming
// https://mui.com/material-ui/customization/how-to-customize/#4-global-css-override
// https://mui.com/material-ui/api/global-styles/
// It is possible to achieve similar thing with tss-react
// https://mui.com/material-ui/migration/migrating-from-jss/#2-use-tss-react
export const lexicalGlobalStyles = (
  <GlobalStyles
    styles={(theme): CSSObject => ({
      // Content
      '.lexical-paragraph': theme.typography.body1 as CSSInterpolation,
      '.lexical-quote': {},
      '.lexical-heading-h1': theme.typography.h1 as CSSInterpolation,
      '.lexical-heading-h2': theme.typography.h2 as CSSInterpolation,
      '.lexical-heading-h3': theme.typography.h3 as CSSInterpolation,
      '.lexical-heading-h4': theme.typography.h4 as CSSInterpolation,
      '.lexical-heading-h5': theme.typography.h5 as CSSInterpolation,
      '.lexical-heading-h6': theme.typography.h6 as CSSInterpolation,
      '.lexical-nested-listitem': {},
      '.lexical-list-ol': {},
      '.lexical-list-ul': {},
      '.lexical-listItem': {},
      '.lexical-listItemChecked': {},
      '.lexical-listItemUnchecked': {},
      '.lexical-hashtag': {},
      '.lexical-image': {},
      '.lexical-link': {},
      '.lexical-textBold': {
        fontWeight: 700,
      },
      '.lexical-textCode': {},
      '.lexical-textItalic': {
        fontStyle: 'italic',
      },
      '.lexical-textStrikethrough': {},
      '.lexical-textSubscript': {},
      '.lexical-textSuperscript': {},
      '.lexical-textUnderline': {
        textDecoration: 'underline',
      },
      '.lexical-textUnderlineStrikethrough': {},

      // Editor
      '.lexical-editor-container': {},
      '.lexical-editor-inner': {
        position: 'relative',
      },
      '.lexical-editor-input': {
        outline: 0,
        position: 'relative',
      },
      '.lexical-editor-placeholder': {
        color: theme.palette.text.secondary,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: theme.typography.body1.fontSize,
        userSelect: 'none',
        display: 'inline-block',
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
      },
    })}
  />
)

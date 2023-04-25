// This file is adapted from:
// https://mui.com/material-ui/guides/localization/
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/locale/index.ts

import { ComponentsPropsList } from '@mui/material'

export interface Localization {
  components?: {
    MuiAlert?: {
      defaultProps: Pick<ComponentsPropsList['MuiAlert'], 'closeText'>
    }
    MuiBreadcrumbs?: { defaultProps: Pick<ComponentsPropsList['MuiBreadcrumbs'], 'expandText'> }
    MuiTablePagination?: {
      defaultProps: Pick<
        ComponentsPropsList['MuiTablePagination'],
        'labelRowsPerPage' | 'labelDisplayedRows' | 'getItemAriaLabel'
      >
    }
    MuiRating?: {
      defaultProps: Pick<ComponentsPropsList['MuiRating'], 'emptyLabelText' | 'getLabelText'>
    }
    MuiAutocomplete?: {
      defaultProps: Pick<
        ComponentsPropsList['MuiAutocomplete'],
        'clearText' | 'closeText' | 'loadingText' | 'noOptionsText' | 'openText'
      >
    }
    // The core package has no dependencies on the @mui/lab components.
    // We can't use ComponentsPropsList, we have to duplicate and inline the definitions.
    MuiPagination?: {
      defaultProps: Pick<ComponentsPropsList['MuiPagination'], 'aria-label' | 'getItemAriaLabel'>
    }
  }
}

// TODO: Fill untranslated values
export const lt: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Show path',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Go to first page'
          }
          if (type === 'last') {
            return 'Go to last page'
          }
          if (type === 'next') {
            return 'Go to next page'
          }
          // if (type === 'previous') {
          return 'Go to previous page'
        },
        labelRowsPerPage: 'Rows per page:',
        labelDisplayedRows: ({ from, to, count }) => `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Star${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Empty',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Ištrinti',
        closeText: 'Uždaryti',
        loadingText: 'Kraunama…',
        noOptionsText: 'Nėra pasirinkimų',
        openText: 'Atidaryti',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Uždaryti',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Pagination navigation',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Go to '}page ${page}`
          }
          if (type === 'first') {
            return 'Go to first page'
          }
          if (type === 'last') {
            return 'Go to last page'
          }
          if (type === 'next') {
            return 'Go to next page'
          }
          // if (type === 'previous') {
          return 'Go to previous page'
        },
      },
    },
  },
}

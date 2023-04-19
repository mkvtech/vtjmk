import './styles.css'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { EditorState } from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode } from '@lexical/rich-text'
import ToolbarPlugin from './plugins/Toolbar'

const editorConfig = {
  namespace: 'Lexical',
  onError: (error: unknown): void => console.log(error),
  nodes: [HeadingNode],
  theme: {
    text: {
      underline: 'editor-text-underline',
    },
  },
}

// Note: This component uses useImperativeHandle to expose methods of reading its state. Normally in React useState()
// should be used instead for this case (to store input data).
// Relevant:
// https://react.dev/reference/react/useImperativeHandle
// https://react.dev/reference/react/useRef
// https://lexical.dev/docs/react/plugins#lexicalonchangeplugin
// https://stackoverflow.com/questions/62210286/declare-type-with-react-useimperativehandle
// https://adrianfdez469.medium.com/keep-react-child-state-on-the-child-if-possible-d531f0715408
// https://github.com/facebook/lexical/discussions/1937

export interface LexicalEditorHandle {
  getEditorState: () => EditorState
}

export default forwardRef(function LexicalEditor(
  { initialEditorState }: { initialEditorState?: string | null },
  ref
): JSX.Element {
  const editorStateRef = useRef<EditorState>()

  useImperativeHandle(ref, () => ({
    getEditorState: () => editorStateRef.current,
  }))

  return (
    <LexicalComposer initialConfig={{ ...editorConfig, editorState: initialEditorState || null }}>
      <div className='editor-container'>
        <ToolbarPlugin />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className='editor-input'
                // TODO: Disabling `spellCheck` attribute here. Currently, this element does not permit HTML5 `lang`
                // attribute, however it should be trivial to add it manually.
                // See this file:
                // https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalContentEditable.tsx
                // Also:
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck
                spellCheck='false'
              />
            }
            placeholder={<div className='editor-placeholder'>Enter text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <OnChangePlugin
            onChange={(editorState): void => {
              editorStateRef.current = editorState
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  )
})

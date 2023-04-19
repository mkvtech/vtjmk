import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode } from '@lexical/rich-text'
import { lexicalGlobalStyles, lexicalTheme } from './theme'

const editorConfig = {
  namespace: 'Lexical',
  onError: (error: unknown): void => console.log(error),
  nodes: [HeadingNode],
  theme: lexicalTheme,
  editable: false,
}

// This component renders saved Lexical JSON state. Internally, it is a read-only editor, however visually it appears as rendered HTML.
export default function LexicalView({ initialEditorState }: { initialEditorState?: string | null }): JSX.Element {
  // Note: This is only an initial state. Lexical will not update itself 'reactively', you have to use editorState.update() with React.useRef() instead
  return (
    <>
      {lexicalGlobalStyles}
      <LexicalComposer initialConfig={{ ...editorConfig, editorState: initialEditorState || null }}>
        <div className='lexical-editor-container'>
          <div className='lexical-editor-inner'>
            <RichTextPlugin
              contentEditable={<ContentEditable className='lexical-editor-input' />}
              placeholder={null}
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
        </div>
      </LexicalComposer>
    </>
  )
}

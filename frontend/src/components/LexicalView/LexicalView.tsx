import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode } from '@lexical/rich-text'

const editorConfig = {
  namespace: 'Lexical',
  onError: (error: unknown): void => console.log(error),
  nodes: [HeadingNode],
  theme: {
    text: {
      underline: 'editor-text-underline',
    },
  },
  editable: false,
}

// This component renders saved Lexical JSON state. Internally, it is a read-only editor, however visually it appears as rendered HTML.
export default function LexicalView({ initialEditorState }: { initialEditorState: string }): JSX.Element {
  // Note: This is only an initial state. Lexical will not update itself 'reactively', you have to use editorState.update() with React.useRef() instead
  return (
    <LexicalComposer initialConfig={{ ...editorConfig, editorState: initialEditorState }}>
      <div className='editor-container'>
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<div className='editor-placeholder'>Enter text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
    </LexicalComposer>
  )
}

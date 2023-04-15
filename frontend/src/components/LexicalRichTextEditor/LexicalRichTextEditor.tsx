import './styles.css'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
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

export default function LexicalRichTextEditor(): JSX.Element {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className='editor-container'>
        <ToolbarPlugin />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<div className='editor-placeholder'>Enter text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  )
}

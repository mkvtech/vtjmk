import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { CLEAR_EDITOR_COMMAND, CLEAR_HISTORY_COMMAND } from 'lexical'
import { useMemo } from 'react'

// Updates Lexical editor when provided state changes (just like all React components)
// https://github.com/facebook/lexical/discussions/2583
export default function UpdatePlugin({ editorState }: { editorState: string | null | undefined }): null {
  const [editor] = useLexicalComposerContext()

  useMemo(() => {
    if (editorState) {
      const parsedEditorState = editor.parseEditorState(editorState)
      editor.setEditorState(parsedEditorState)
    } else {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
    }

    editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)
  }, [editorState])

  return null
}

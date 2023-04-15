import { useCallback, useEffect, useState } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { $createParagraphNode, $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text'
import { $wrapNodes } from '@lexical/selection'

import { Box, Checkbox, Divider, FormControl, IconButton, MenuItem, Select, Stack } from '@mui/material'

import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import LinkIcon from '@mui/icons-material/Link'

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()

  const [blockType, setBlockType] = useState('paragraph')

  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))

      const anchorNode = selection.anchor.getNode()
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)

      if (elementDOM !== null) {
        const type = $isHeadingNode(element) ? element.getTag() : element.getType()
        setBlockType(type)
      }
    }
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      })
    )
  }, [updateToolbar, editor])

  return (
    <div>
      <Stack
        direction='row'
        divider={<Divider orientation='vertical' flexItem />}
        spacing={1}
        sx={{ px: 4, py: 1, alignItems: 'center' }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            variant='standard'
            value={blockType}
            onChange={(event): void => {
              const { value } = event.target

              if (value === 'paragraph' && blockType !== 'paragraph') {
                editor.update(() => {
                  const selection = $getSelection()

                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createParagraphNode())
                  }
                })
              } else if (value === 'h1' && blockType !== 'h1') {
                editor.update(() => {
                  const selection = $getSelection()

                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode('h1'))
                  }
                })
              } else if (value === 'h2' && blockType !== 'h2') {
                editor.update(() => {
                  const selection = $getSelection()

                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode('h2'))
                  }
                })
              }
            }}
          >
            <MenuItem value='paragraph'>Normal</MenuItem>
            <MenuItem value='h1'>Heading 1</MenuItem>
            <MenuItem value='h2'>Heading 2</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Checkbox
            onClick={(): void => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
            }}
            checked={isBold}
            inputProps={{ 'aria-label': 'Bold' }}
            icon={<FormatBoldIcon />}
            checkedIcon={<FormatBoldIcon />}
          />
          <Checkbox
            onClick={(): void => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
            }}
            checked={isItalic}
            inputProps={{ 'aria-label': 'Italic' }}
            icon={<FormatItalicIcon />}
            checkedIcon={<FormatItalicIcon />}
          />
          <Checkbox
            onClick={(): void => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
            }}
            checked={isUnderline}
            inputProps={{ 'aria-label': 'Underlined' }}
            icon={<FormatUnderlinedIcon />}
            checkedIcon={<FormatUnderlinedIcon />}
          />
          <Checkbox inputProps={{ 'aria-label': 'Link' }} icon={<LinkIcon />} checkedIcon={<LinkIcon />} />
        </Box>

        <Box>
          <IconButton>
            <FormatAlignLeftIcon />
          </IconButton>
          <IconButton>
            <FormatAlignCenterIcon />
          </IconButton>
          <IconButton>
            <FormatAlignRightIcon />
          </IconButton>
          <IconButton>
            <FormatAlignJustifyIcon />
          </IconButton>
        </Box>
      </Stack>

      <Divider />
    </div>
  )
}

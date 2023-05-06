import { useEffect, useState } from 'react'
import { Droppable, DroppableProps } from 'react-beautiful-dnd'

// This component is adapted to work with React 18
// Source: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1175638194

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}

// Code in this directory is adapted from examples related to 'react-beautiful-dnd'
// Source: https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src

import { DraggableLocation } from 'react-beautiful-dnd'

export function reorder<T>(list: readonly T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function isCorrectDraggableLocation<Key extends string>(
  location: DraggableLocation,
  validDroppableIds: readonly Key[]
): location is DraggableLocation & { droppableId: Key } {
  return validDroppableIds.some((id) => id === location.droppableId)
}

export function reorderItemMap<T, K extends string, IDraggableLocation extends DraggableLocation & { droppableId: K }>({
  itemMap,
  source,
  destination,
  transformItem,
}: {
  itemMap: Record<K, readonly T[]>
  source: IDraggableLocation
  destination: IDraggableLocation
  transformItem?: (item: T) => T
}): Record<K, readonly T[]> {
  // Note: this function does not check if itemMap[droppableId] !== undefined
  const current = [...itemMap[source.droppableId]]
  const next = [...itemMap[destination.droppableId]]
  const target = transformItem ? transformItem(current[source.index]) : current[source.index]

  if (source.droppableId === destination.droppableId) {
    // moving within the same list

    const reordered = reorder(current, source.index, destination.index)
    return {
      ...itemMap,
      [source.droppableId]: reordered,
    }
  }

  // moving to different list
  current.splice(source.index, 1)
  next.splice(destination.index, 0, target)

  return {
    ...itemMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  }
}

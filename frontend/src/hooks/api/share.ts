import { UseQueryResult } from 'react-query'

type PolicyQuery<Record extends string, Action extends string> = UseQueryResult<{
  policies: {
    [record in Record]: {
      items: {
        [id: string]: {
          [action in Action]: boolean
        }
      }
    }
  }
}>

// Note: this annotates Action as string, not as union of actions
// export function isAllowed<Record extends string, Action extends string>(
//   policiesQuery: PolicyQuery<Record, Action>,
//   record: Record,
//   id: string,
//   action: Action
// ): boolean {
//   return policiesQuery.isSuccess ? policiesQuery.data.policies[record].items[id][action] : false
// }

export function useIsAllowed<Record extends string, Action extends string>(
  policiesQuery: PolicyQuery<Record, Action>,
  record: Record,
  id: string
): (action: Action) => boolean {
  return (action) => (policiesQuery.isSuccess ? policiesQuery.data.policies[record].items[id][action] : false)
}

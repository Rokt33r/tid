import { SyncSelector } from 'prismy'

export const bodySelector: SyncSelector<any> = (context) => {
  return (context.req as any).body
}

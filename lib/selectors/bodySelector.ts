import { SyncSelector } from 'prismy'

export const bodySelector: SyncSelector<any> = (ctx) => {
  return (ctx.req as any).body
}

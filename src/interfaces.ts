export interface GetNxAffectedProps {
  base?: string
  head?: string
  type: 'apps' | 'libs'
  workspace: string
}

export interface ExecuteNxCommandProps {
  commands: string[]
  workspace: string
}

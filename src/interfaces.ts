export interface GetNxAffectedProps {
  base?: string
  head?: string
  affectedToIgnore?: string
  workspace: string
}

export interface ExecuteNxCommandProps {
  commands: string[]
  workspace: string
}

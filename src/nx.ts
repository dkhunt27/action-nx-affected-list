import * as core from '@actions/core'
import {ExecuteNxCommandProps, GetNxAffectedProps} from './interfaces'
import {execSync} from 'child_process'

const executeNxCommandsUntilSuccessful = ({
  commands,
  workspace
}: ExecuteNxCommandProps): string | null => {
  let cmdSuccessful = false
  let result: string | null = null

  for (const cmd of commands) {
    try {
      core.debug(`Attempting to run command: ${cmd}`)
      result = execSync(cmd, {cwd: workspace}).toString()
      core.debug(`Command Result: ${result}`)
      cmdSuccessful = true
      break
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      core.error(`Command "${cmd}" failed: ${(err as any).message}`)
    }
  }

  if (!cmdSuccessful) {
    throw Error(
      'Could not run NX cli...Did you install it globally and in your project? Also, try adding this npm script: "nx":"nx"'
    )
  }

  return result
}

const executeNxCommands = ({
  commands,
  workspace
}: ExecuteNxCommandProps): string | null => {
  let result: string | null = null

  for (const cmd of commands) {
    try {
      core.debug(`Attempting to run command: ${cmd}`)
      result = execSync(cmd, {cwd: workspace}).toString()
      core.debug(`Command Result: ${result}`)
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      core.error(`Command "${cmd}" failed: ${(err as any).message}`)
    }
  }

  return result
}

export function prepNx({workspace}: GetNxAffectedProps): void {
  const commands = [
    `./node_modules/.bin/nx --version`,
    // running nx reset to ensure we have a clean state
    // this resolved "CreateNodesError: Unable to create nodes for yarn.lock using plugin nx-js-graph-plugin."
    `./node_modules/.bin/nx reset`
  ]
  executeNxCommands({commands, workspace})
}

export function getNxAffected({
  base,
  head,
  affectedToIgnore,
  workspace
}: GetNxAffectedProps): string[] {
  const args = `${base ? `--base=${base}` : ''} ${head ? `--head=${head}` : ''}`
  const commands = [
    `./node_modules/.bin/nx show projects --affected ${args}`,
    `yarn nx show projects --affected ${args}`
  ]
  const result = executeNxCommandsUntilSuccessful({commands, workspace})

  const affected = parseAffected({result, affectedToIgnore})

  return affected || []
}

export function parseAffected(params: {
  result: string | null
  affectedToIgnore?: string
}): string[] {
  const {result, affectedToIgnore} = params

  if (!result) {
    core.info('Looks like no changes were found...')
    return []
  }

  core.info(`Parsing affected: ${result}`)

  const toIgnore = affectedToIgnore ? affectedToIgnore.split(',') : []

  const affected = result
    .split(' ')
    .map(x => x.trim())
    .filter(x => !toIgnore.includes(x))
    .filter(x => x.length > 0)

  return affected || []
}

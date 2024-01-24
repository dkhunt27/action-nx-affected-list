import * as core from '@actions/core'
import {ExecuteNxCommandProps, GetNxAffectedProps} from './interfaces'
import {execSync} from 'child_process'

const executeNxCommands = ({
  commands,
  workspace
}: ExecuteNxCommandProps): string | null => {
  let cmdSuccessful = false
  let result: string | null = null

  result = execSync('ls -la', {
    cwd: `${workspace}/.nx/cache`
  }).toString()
  core.info(`/home/runner/work/rkt-artemis/rkt-artemis/.nx/cache: ${result}`)

  result = execSync('ls -la', {
    cwd: `/home/runner/work/rkt-artemis/rkt-artemis/node_modules/.bin`
  }).toString()
  core.info(
    `/home/runner/work/rkt-artemis/rkt-artemis/node_modules/.bin: ${result}`
  )

  result = execSync('yarn nx --version', {
    cwd: `/home/runner/work/rkt-artemis/rkt-artemis`
  }).toString()
  core.info(`yarn nx --version: ${result}`)

  result = execSync('npm run nx --version', {
    cwd: `/home/runner/work/rkt-artemis/rkt-artemis`
  }).toString()
  core.info(`npm run nx --version: ${result}`)

  for (const cmd of commands) {
    try {
      core.debug(`Attempting to run command: ${cmd}`)
      result = execSync(cmd, {cwd: workspace}).toString()
      cmdSuccessful = true
      break
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      core.debug(`Command failed: ${(err as any).message}`)
    }
  }

  if (!cmdSuccessful) {
    throw Error(
      'Could not run NX cli...Did you install it globally and in your project? Also, try adding this npm script: "nx":"nx"'
    )
  }

  return result
}

export function getNxAffected({
  base,
  head,
  workspace
}: GetNxAffectedProps): string[] {
  const args = `${base ? `--base=${base}` : ''} ${head ? `--head=${head}` : ' --select=projects'}`
  const commands = [
    `yarn nx print-affected --plain ${args}`,
    `nx print-affected --plain ${args}`,
    `npx nx print-affected --plain ${args}`
  ]
  const result = executeNxCommands({commands, workspace})

  if (!result) {
    core.info('Looks like no changes were found...')
    return []
  }

  const affected = result
    .split(', ')
    .map(x => x.trim())
    .filter(x => x.length > 0)

  return affected || []
}

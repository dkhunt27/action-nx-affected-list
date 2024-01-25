import * as core from '@actions/core'
import {ExecuteNxCommandProps, GetNxAffectedProps} from './interfaces'
import {execSync} from 'child_process'

const executeNxCommandsUntilSuccessful = ({
  commands,
  workspace
}: ExecuteNxCommandProps): string | null => {
  let cmdSuccessful = false
  let result: string | null = null

  result = execSync('ls -la', {
    cwd: `${workspace}/.nx/cache`
  }).toString()
  core.info(`/home/runner/work/rkt-artemis/rkt-artemis/.nx/cache: ${result}`)

  // result = execSync('npm run nx --version', {
  //   cwd: workspace
  // }).toString()
  // core.info(`npm run nx --version: ${result}`)

  for (const cmd of commands) {
    try {
      core.info(`Attempting to run command: ${cmd}`)
      result = execSync(cmd, {cwd: workspace}).toString()
      core.info(`Command Result: ${result}`)
      cmdSuccessful = true
      break
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      core.info(`Command failed: ${(err as any).message}`)
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

  result = execSync('ls -la', {
    cwd: `${workspace}/.nx/cache`
  }).toString()
  core.info(`/home/runner/work/rkt-artemis/rkt-artemis/.nx/cache: ${result}`)

  result = execSync('yarn nx --version', {
    cwd: workspace
  }).toString()
  core.info(`yarn nx --version: ${result}`)

  // result = execSync('npm run nx --version', {
  //   cwd: workspace
  // }).toString()
  // core.info(`npm run nx --version: ${result}`)

  for (const cmd of commands) {
    try {
      core.info(`Attempting to run command: ${cmd}`)
      result = execSync(cmd, {cwd: workspace}).toString()
      core.info(`Command Result: ${result}`)
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      core.info(`Command failed: ${(err as any).message}`)
    }
  }

  return result
}

export function getNxVersion({workspace}: GetNxAffectedProps): string[] {
  const commands = [
    `./node_modules/.bin/nx --version`,
    `yarn nx --version`
    // `nx --version`,
    // `npx nx --version`
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

export function getNxAffected({
  base,
  head,
  workspace
}: GetNxAffectedProps): string[] {
  const args = `${base ? `--base=${base}` : ''} ${head ? `--head=${head}` : ' --select=projects'}`
  const commands = [
    `./node_modules/.bin/nx print-affected ${args}`,
    `yarn nx print-affected ${args}`
    // `nx print-affected ${args}`,
    // `npx nx print-affected ${args}`
  ]
  const result = executeNxCommandsUntilSuccessful({commands, workspace})

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

import * as core from '@actions/core'
import {getNxAffected, prepNx} from './nx'

export async function run(workspace = '.'): Promise<void> {
  try {
    const {GITHUB_WORKSPACE = workspace} = process.env
    const base = core.getInput('base')
    const head = core.getInput('head')
    const affectedToIgnore = core.getInput('affectedToIgnore')

    core.info(`using dir: ${GITHUB_WORKSPACE}`)

    prepNx({
      workspace: GITHUB_WORKSPACE
    })

    const affected = getNxAffected({
      base,
      head,
      affectedToIgnore,
      workspace: GITHUB_WORKSPACE
    })
    core.setOutput('affected', affected)
    core.setOutput('hasAffected', affected.length > 0)
    core.info(`Affected: ${affected.length > 0 ? affected.join() : 'none'}`)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    core.setFailed((error as any).message)
  }
}

run()

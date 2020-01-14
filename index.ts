import { getInput, setFailed } from '@actions/core'
import { exec } from '@actions/exec'

const debug = isTrue(getInput('debug'))
const token = getInput('token', { required: true })

const deployment = getInput('deployment', { required: true })
const alias = getInput('alias', { required: true })
const scope = input('scope')

;(async () => {
  try {
    await assignAlias()
  } catch (e) {
    setFailed(`error: ${e.stack}`)
  }
})()

async function assignAlias () {
  const args: string[] = []

  // NOTE: MUST BE FIRST!
  args.push('alias', 'set', deployment, alias)

  args.push(`--token=${token}`)

  if (scope) {
    args.push(`--scope=${scope}`)
  }

  if (debug) {
    args.push('--debug')
  }

  return now(args)
}

async function now (args: string[]) {
  if (debug) {
    console.debug('command', 'now', args)
  }

  return exec('now', args)
}

function input (name: string, defaultValue?: string): string | null {
  let value = getInput(name)

  if (!value || value === '') {
    value = defaultValue
  }

  if (debug) {
    console.debug('got input', name, value)
  }

  return value
}

function isTrue (value: boolean | string): boolean {
  return value === true || value === 'true'
}

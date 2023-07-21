#!/usr/bin/env node
/**TODO: Make it mac compatible */
/**TODO: Make program into an exe */

import process from 'process'
import inquirer from 'inquirer'
import PressToContinuePrompt from 'inquirer-press-to-continue'
import type { KeyDescriptor } from 'inquirer-press-to-continue'
import chalk from 'chalk'
// import chalkAnimation from 'chalk-animation'
// import { createSpinner } from 'nanospinner'
import { generateFullSysReport } from './scripts/generateFullSysReport'
import { generateSystemReport } from './scripts/generateSysReport'
import { submitNewAsset } from './scripts/submitNewAsset'
;(async () => {
  console.log(chalk.redBright.bold('ArchSnipe Automation Tool'))
  const list = [
    {
      type: 'list',
      name: 'function',
      message: 'What do you want to do?',
      choices: [
        { name: 'Add this computer to inventory (New Asset)', value: 1 },
        { name: 'Generates a system report (Display system information)', value: 2 },
        { name: 'Generate a detailed system report ', value: 3 },
      ],
    },
  ]
  // const spinner = createSpinner()
  const prompt = await inquirer.prompt(list)
  try {
    inquirer.registerPrompt('press-to-continue', PressToContinuePrompt)
    if (prompt.function === 1) {
      await submitNewAsset()
      await inquirer.prompt<{ key: KeyDescriptor }>({
        name: 'key',
        type: 'press-to-continue',
        anyKey: true,
        pressToContinueMessage: 'Press a key to exit...',
      })
      process.exit(0)
    }
    if (prompt.function === 2) {
      await generateSystemReport()
      await inquirer.prompt<{ key: KeyDescriptor }>({
        name: 'key',
        type: 'press-to-continue',
        anyKey: true,
        pressToContinueMessage: 'Press a key to continue...',
      })
      process.exit(0)
    }
    if (prompt.function === 3) {
      await generateFullSysReport()
      await inquirer.prompt<{ key: KeyDescriptor }>({
        name: 'key',
        type: 'press-to-continue',
        anyKey: true,
        pressToContinueMessage: 'Press a key to continue...',
      })
      process.exit(0)
    }
  } catch (err) {
    console.error(err)
    // spinner.error()
  }
})()

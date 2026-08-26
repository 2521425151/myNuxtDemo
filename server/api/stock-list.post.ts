import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

function sanitizeName(name: string): string {
  return String(name || '')
    .replace(/'/g, '')
    .replace(/[\r\n]/g, '')
    .trim()
}

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({
      statusCode: 403,
      statusMessage: '仅开发环境允许写入 stockList'
    })
  }

  const body = await readBody(event)
  const code = typeof body?.code === 'string' ? body.code.trim() : ''
  const name = sanitizeName(typeof body?.name === 'string' ? body.name : code)

  if (!/^\d{6}$/.test(code)) {
    throw createError({
      statusCode: 400,
      statusMessage: '股票代码必须为6位数字'
    })
  }

  const entry = `${code}-${name || code}`
  const filePath = join(process.cwd(), 'public', 'tz.html')
  const html = await readFile(filePath, 'utf8')

  const listMatch = html.match(/var\s+stockList\s*=\s*\[/)
  if (!listMatch || listMatch.index === undefined) {
    throw createError({
      statusCode: 500,
      statusMessage: '未找到 stockList 定义'
    })
  }

  const arrayBlockMatch = html.slice(listMatch.index).match(/var\s+stockList\s*=\s*\[[\s\S]*?\n\s*\];/)
  const arrayBlock = arrayBlockMatch ? arrayBlockMatch[0] : ''
  if (!arrayBlock) {
    throw createError({
      statusCode: 500,
      statusMessage: '未能解析 stockList 数组范围'
    })
  }

  if (
    arrayBlock.includes(`'${code}-`)
    || arrayBlock.includes(`"${code}-`)
    || arrayBlock.includes(`'${code}'`)
    || arrayBlock.includes(`"${code}"`)
  ) {
    return {
      ok: true,
      skipped: true,
      entry
    }
  }

  const arrayStart = listMatch.index + listMatch[0].length
  const insertText = `\n            '${entry}',`
  const nextHtml = html.slice(0, arrayStart) + insertText + html.slice(arrayStart)

  await writeFile(filePath, nextHtml, 'utf8')

  return {
    ok: true,
    skipped: false,
    entry
  }
})

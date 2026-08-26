import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

function normalizeCodes(codes: unknown): string[] {
  if (!Array.isArray(codes)) return []
  return codes
    .filter((code): code is string => typeof code === 'string' && /^\d{6}$/.test(code))
    .filter((code, index, arr) => arr.indexOf(code) === index)
}

function formatWatchlistArray(codes: string[]): string {
  if (codes.length === 0) {
    return 'var WATCHLIST_CODES = [\n        ];'
  }
  const lines = codes.map(code => `            '${code}',`).join('\n')
  return `var WATCHLIST_CODES = [\n${lines}\n        ];`
}

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({
      statusCode: 403,
      statusMessage: '仅开发环境允许写入 WATCHLIST_CODES'
    })
  }

  const body = await readBody(event)
  const codes = normalizeCodes(body?.codes)
  const filePath = join(process.cwd(), 'public', 'tz.html')
  const html = await readFile(filePath, 'utf8')

  if (!/var\s+WATCHLIST_CODES\s*=\s*\[[\s\S]*?\];/.test(html)) {
    throw createError({
      statusCode: 500,
      statusMessage: '未找到 WATCHLIST_CODES 定义'
    })
  }

  const nextHtml = html.replace(
    /var\s+WATCHLIST_CODES\s*=\s*\[[\s\S]*?\];/,
    formatWatchlistArray(codes)
  )

  await writeFile(filePath, nextHtml, 'utf8')

  return {
    ok: true,
    codes
  }
})

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { choice } = req.body

  const message = choice === 'yes'
    ? `🌸 She chose — *Let's be friends again* 💕`
    : `🕊️ She chose — *It's time to say goodbye*`

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }),
  })

  res.status(200).json({ ok: true })
}
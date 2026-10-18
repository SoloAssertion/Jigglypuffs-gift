import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { choice } = req.body

  let message: string

  if (choice === 'yes') {
    message = `🌸 She chose — *Let's be friends again* 💕`
  } else if (choice === 'no') {
    message = `🕊️ She chose — *It's time to say goodbye*`
  } else if (choice === 'dont know') {
    message = `❓ She chose — *Doesn't want to answer*`
  } else if (choice === 'destroyed') {
    message = `⚠️ **Kill switch activated.** She terminated the site.`
  } else {
    return res.status(400).json({ error: 'Invalid choice' })
  }

  try {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    return res.status(200).json({ ok: token }) // Keep your existing response logic
  } catch (err) {
    console.error('Telegram API error:', err)
    return res.status(500).json({ error: 'Failed to send notification' })
  }
}

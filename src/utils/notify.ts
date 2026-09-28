const TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

export async function notify(choice: 'yes' | 'no') {
  const message = choice === 'yes'
    ? `🌸 She chose — *Let's be friends again* 💕`
    : `🕊️ She chose — *It's time to say goodbye*`

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })
  } catch (err) {
    // fail silently — she should never know this exists
    console.error('Notify error:', err)
  }
}
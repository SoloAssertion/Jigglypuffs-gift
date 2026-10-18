export async function notify(choice: 'yes' | 'no' | 'dont know') {
  try {
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ choice }),
    })
  } catch (err) {
    console.error('Notify error:', err)
  }
}
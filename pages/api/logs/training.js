export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const batch = req.body

        console.log(batch)

        return res.status(200).json({ success: true })
    
      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}
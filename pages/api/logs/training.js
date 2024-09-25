export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        
        return
    
      default:
        return res.status(400).json({ sucess: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}
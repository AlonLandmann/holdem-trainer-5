export default function apiRoute(method, handler) {
  return async (req, res) => {
    try {
      if (req.method === method) {
        return await handler(req, res);
      }

      console.log('Inavlid request method received.');
      return res.status(400).json({ success: false, message: 'Invalid request.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }
}
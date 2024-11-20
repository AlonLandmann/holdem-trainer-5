export default function apiRoute(method, action) {
  return async (req, res) => {
    try {
      if (req.method === method) {
        return await action(req, res);
      }

      console.log('Inavlid request method received.');
      return res.status(400).json({ success: false, message: 'Invalid request.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }
}
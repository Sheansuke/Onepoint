export default async function handler(req, res) {
    // Check for token to confirm this is a valid request
    // this token is set in .env

    if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    try {
      await res.unstable_revalidate('/')
      if (req.query.slug){
        await res.unstable_revalidate(`/product/${req.query.slug}`)
      }
      return res.json({ revalidated: true })
    } catch (err) {
      return res.status(500).send('Error revalidating')
    }
  }
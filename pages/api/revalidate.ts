// This function is running with supabase webhook
export default async function handler(req, res) {
  // Check for token to confirm this is a valid request
  // this token is set in .env

  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  try {
    await res.revalidate('/')
    if (req.body.hasOwnProperty('type')) {
      switch (req.body.type) {
        case 'INSERT':
          return await res.revalidate(`/product/${req?.body?.record?.slug}`)

        case 'UPDATE':
          return (
            await res.revalidate(`/product/${req?.body?.old_record?.slug}`),
            await res.revalidate(`/product/${req?.body?.record?.slug}`)
          )

        case 'DELETE':
          return await res.revalidate(`/product/${req?.body?.old_record?.slug}`)

        default:
          return
      }
    }
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

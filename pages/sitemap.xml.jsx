export default function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')
    // Instructing the Vercel edge to cache the file
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
    // generate sitemap here
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="<a href="http://www.sitemaps.org/schemas/sitemap/0.9">http://www.sitemaps.org/schema...</a>"> 
    <url>
      <loc><a href="http://www.myexample.com/foo.html<">http://www.myexample.com/foo.h...</a>;/loc>
      <lastmod>2022-01-01</lastmod>
    </url>
    </urlset>`
  res.end(xml)
}
import fetch from 'node-fetch';

export default async (req, res) => {
  const targetUrl = req.query.url;

  console.log('Received request for URL:', targetUrl);

  if (!targetUrl) {
    res.status(400).json({ error: 'Missing target URL' });
    return;
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Origin': req.headers.origin,
        'x-requested-with': 'XMLHttpRequest'
      }
    });

    console.log('Received response with status:', response.status);

    const data = await response.text();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(data);
  } catch (error) {
    console.error('Error fetching the target URL:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
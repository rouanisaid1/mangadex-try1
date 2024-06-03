import fetch from 'node-fetch';

export default async (req, res) => {
  const targetUrl = req.query.url;

  console.log('Received request for URL:', targetUrl);

  if (!targetUrl) {
    console.log('Missing target URL');
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

    if (!response.ok) {
      console.log('Response not ok');
      res.status(response.status).send('Error fetching the target URL');
      return;
    }

    const headers = {};
    response.headers.forEach((value, name) => {
      if (name.toLowerCase() !== 'x-frame-options' && name.toLowerCase() !== 'content-security-policy') {
        headers[name] = value;
      }
    });

    const data = await response.text();
    console.log('Response data length:', data.length);

    res.writeHead(response.status, headers);
    res.end(data);
  } catch (error) {
    console.error('Error fetching the target URL:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

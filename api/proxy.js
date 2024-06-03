const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const targetUrl = req.query.url;
  
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

    const data = await response.text();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

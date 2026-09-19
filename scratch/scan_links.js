const fs = require('fs');
const files = fs.readdirSync('theme_v2_stitch').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const c = fs.readFileSync('theme_v2_stitch/' + f, 'utf8');
  const matches = c.match(/href="[^"]*"/g) || [];
  const unique = Array.from(new Set(matches)).filter(h => !h.includes('fonts.googleapis') && !h.includes('gstatic'));
  console.log(f, 'unique non-font hrefs:', unique);
});

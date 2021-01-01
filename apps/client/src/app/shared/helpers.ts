export function saveAs(uri: any, filename: string) {
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

export function buildTwitterIntent(content: string) {
  return (
    'https://twitter.com/intent/tweet?url=' +
    encodeURI('https://gitalytics.shhdharmen.me') +
    '&text=' +
    encodeURIComponent(content) +
    '&via=gitalytics_app&hashtags=2020Coded'
  );
}

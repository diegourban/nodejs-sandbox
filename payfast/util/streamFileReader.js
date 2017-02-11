var fs = require('fs');

fs.creteReadStream('image.jpg')
  .pipe(fs.createWriteStream('image3.png'))
  .on('finish', function() {
    console.log('Arquivo escrito com stream');
  });

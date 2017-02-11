var fs = require('fs');

fs.readFile('image.jpg', function(err, buffer) {
  console.log("Arquivo lido");
  
  fs.writeFile('image2.jpg', buffer, function(err) {
    console.log('Arquivo escrito');
  });
});

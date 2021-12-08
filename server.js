const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
    
    //deklarasi method dan url untuk request
    const { method, url } = request;
 
    //yang dilakukan jika url http://localhost:5000
    if(url === '/') {
        
        if(method === 'GET') {
            response.statusCode = 200;
            response.end('<h1>Ini adalah homepage!</h1>');
        }else{
            response.statusCode = 400;
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);

        }
    }
    //yang dilakukan jika url http://localhost:5000/about 
    else if(url === '/about') {
        
        if(method === 'GET') {
            response.statusCode = 200;
            response.end('<h1>Halo! Ini adalah halaman about</h1>');
        }else if (method === 'POST'){
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.statusCode = 200;
                response.end(`<h1>HAlo, ${name}! Ini adalah halaman about<h1>`);
            });
        }
        else{
            response.statusCode = 400;
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    }
    //yang dilakukan jika url selain http://localhost:5000/ dan http://localhost:5000/about 
    else {
        
        response.statusCode = 404;
        response.end('<h1>Halaman tidak ditemukan!</h1>');
    }

    
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
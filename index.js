const http = require('http');
const url = require ('url');
const path = require ('path');
const fs = require ('fs');

const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    "js": "text/javascript",
    "js": "js\bootstrap-material-design",
    "map": "js\bootstrap-material-design",
    "css": "text/css",
    "map": "text/map",
    
}

//create Server

http.createServer((req,res)=>{
    let  uri = url.parse(req.url).pathname;
    let fileName = path.join(process.cwd(), unescape(uri));
    console.log('loading' + uri)

    let stats;

    try {
        stats = fs.lstatSync (fileName);

    } catch(e){
        res.writeHead(404,  {"Content-type": "text/plain"});
        res.write('404 Page Not Found \n');
        res.end();
        return;
    }

    //check if file/directory
    if(stats.isFile()){
        let mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200,{"Content-type": mimeType});
        let fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    }else if(stats.isDirectory()){
        res.writeHead(302,{
            'location': 'index.html'
        });
        res.end();

    }else{
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write('500 Internal error\n');
        res.end();
    }

}).listen(3000, () =>console.log("server now listen to local port"))
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const serialport = require('serialport');

var output = 
    `<h2 class="page-header">App Version Data</h2>
    <ul class="list-group">
        <li class="list-group-item">Node: ${process.versions.node}</li>
        <li class="list-group-item">Chrome: ${process.versions.chrome}</li>
        <li class="list-group-item">Electron: ${process.versions.electron}</li>
    </ul>
    `;

serialport.list()
    .then(function(ports){
        console.log('ports', ports);
        var message = '';
        if(ports.length === 0){
            message = 
                `<div class="alert alert-danger">No serial ports found</div>`;
        }
        else{
            message = 
                `<div class="alert alert-success">Serial ports found</div>`;
            
            var portlist = 
            `<h2 class="page-header">Serial Ports Found</h2>
            <ul class="list-group">`;
            ports.forEach(port => {
                portlist += 
                `<li class="list-group-item">
                    Port Name: ${port.comName}, 
                    Manufacturer: ${port.manufacturer},
                    ProductID: ${port.productId},
                    VendorID: ${port.vendorId}
                    </li>`;
                if(port.productId === "0043" && port.vendorId === "2341"){
                    console.log("Arduino found!!!");
                }
            });
            portlist += `</ul>`;
            document.getElementById('portlist').innerHTML = portlist;
        }
        document.getElementById('message').innerHTML = message;
    })
    .catch(function(error){
        document.getElementById('message').innerHTML = error.message;
    });

document.getElementById('output').innerHTML = output;



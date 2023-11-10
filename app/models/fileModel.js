'use strict';
var util = require('../utils/util');
var formidable = require('formidable');
var fs   = require('fs');
var randomstring = require("randomstring");
const config = require('../config');
const jimp = require('jimp');

var File = {
  uploadImage: async function(type, req, usrId, recordImageId, uploadFile, notRemove, callback) {
    util.logConsole(0,'file/uploadImage ('+type+')');
    var vFiles = [];
    var form = new formidable.IncomingForm();

    form.on('file', function(name, file) {
        vFiles.push(file);
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log('progress %: '+percent_complete.toFixed(2));
    });
    form.on('error', function(err) {
        console.error(err);
    });
    form.once('end', function() {
        console.error('call uploadImage <-- ('+vFiles.length+' files)');
        if (vFiles.length>0) {
          vFiles.forEach(function (itemFile) {
            File.saveImageOnDisk(type, itemFile, usrId, recordImageId, uploadFile, notRemove, callback);
          });
        }
        else callback(undefined);
    });
    form.parse(req);
  },
  saveImageOnDisk: function(type, pFile, usrId, idRecord, uploadFile, notRemove, callback) {
    var nameFile = randomstring.generate({
      length: 41,
      capitalization: 'lowercase'
    }) + '.' + pFile.mimetype.split('/')[1];
    console.log('--> Read file: '+pFile.filepath);
    uploadFile(
      usrId,
      idRecord,
      nameFile,
      pFile.size,
      function (task) {
        if (task.data.code==0) {
          var newFile = task.data.newFile;
          var oldFile = task.data.oldFile;
          if (newFile) {
            var filePathNew = process.cwd() + config.files[type].path;
            var filePathOld = filePathNew;
            //save large
            jimp.read(pFile.filepath, (err, lenna) => {
              if (err) callback(newFile);
              lenna
                .cover(config.files[type].size.large[0], config.files[type].size.large[1]) // resize
                .quality(60) // set JPEG quality
                .write(filePathNew + 'large/' + newFile, (err, image) => {
                  console.log("success large file write: "+newFile);
                  if (!notRemove && oldFile) {
                    //remove large
                    fs.unlink(filePathOld + 'large/' + oldFile, function(err) {
                        if (!err) console.log("success remove large file: "+oldFile);
                    });
                  };
                  // save small
                  jimp.read(pFile.filepath, (err, lenna) => {
                    if (err) callback(newFile);
                    lenna
                      .cover(config.files[type].size.small[0], config.files[type].size.small[1]) // resize
                      .quality(60) // set JPEG quality
                      .write(filePathNew + 'small/' + newFile, (err, image) => {
                        console.log("success small file write: "+newFile);
                        if (!notRemove && oldFile) {
                          //remove small
                          fs.unlink(filePathOld + 'small/' + oldFile, function(err) {
                              if (!err) console.log("success remove small file: "+oldFile);
                          });
                        };
                        callback(newFile);
                      }); // save

                  });
                }); // save

            });

          };
        }
        else {
          callback(undefined);
        }
      });
  },
  viewFile: async function(req, res) {
  	var fileName = req.query['file'];
  	if (fileName) {
  		var size = (req.query['size'])?(req.query['size']+'/'):'small/';
  		var type = (req.query['type'])?req.query['type']:'project';
  		var extension = req.query['file'].split('.')[1];
  		if (extension=="") extension = "pdf";
      if (req.query['lang']) {
        fileName=req.query['file'].split('.')[0]+"-"+req.query['lang']+"."+extension;
      }
      util.logConsole(1,'file/viewFile: '+fileName);
      var contentType = "";
      switch (extension) {
        case "pdf":
          contentType = "application/pdf";
          break;
        case "htm":
        case "txt":
          contentType = "text/plain; charset=utf-8";
          size = "";
          break;
        default:
          contentType = "image/" + extension;
          break;
      };
  		var filePath = process.cwd() + config.files[type].path + size + fileName;
  		fs.exists(filePath, function(exists){
  			if (exists) {
  				res.writeHead(200, {
  					"Content-Type": contentType,
  					"Content-Disposition": "inline; filename=" + fileName
  				});
  				fs.createReadStream(filePath).pipe(res);
  			} else {
  				res.writeHead(400, {"Content-Type": "text/plain"});
  				res.end("ERROR - El archivo no existe");
  			}
  		});
  	}
  	else {
  		res.writeHead(400, {"Content-Type": "text/plain"});
  		res.end("ERROR - Nombre del archivo vacio");
  	}
  },
  writeFileOnDisk: async function(type, fileName, content, callback) {
    var filePathNew = process.cwd() + config.files[type].path;
    fs.writeFile(filePathNew + fileName, content, function(err) {
        if(err) console.log(err);
        else console.log("The file "+fileName+" was saved!");
        callback();
    });
  },
  removeFileOnDisk: async function(type, fileName, callback) {
    var filePathNew = process.cwd() + config.files[type].path;
    fs.unlink(filePathNew + 'large/' + fileName, function(err) {
        if (!err) console.log("success remove large file: "+fileName);
        fs.unlink(filePathNew + 'small/' + fileName, function(err) {
            if (!err) console.log("success remove small file: "+fileName);
            callback();
        });
    });
  }
};

module.exports = File;

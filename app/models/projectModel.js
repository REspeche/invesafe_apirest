'user strict';
const config = require('../config');
const response = require('./_response');
const storage = require('node-persist');
const mailTemplates = require('../mailTemplates');
var conn = require('../utils/db');
var util = require('../utils/util');
var mail = require('../utils/mail');

//Constructor
var Project = {
  getProjects: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getProject: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROJECT("+usrId+", "+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            if (row) {
              ret.data = row;
            }
            else {
              ret.code = 308;
            };
        };
        result(ret);
    });
  },
  insertUpdateProject: function(
    usrId,
    proId,
    title,
    catId,
    couId,
    staId,
    excerpt,
    description,
    status,
    progress,
    lookingInvestor,
    estimatedAvailability,
    image,
    strArrDeals,
    strArrMentors,
    changeStatus,
    addressNbr,
    addressStreet,
    addressCity,
    addressZip,
    etherscanAddress,
    maxTokenPurchase,
    editMode,
    result) {
    var ret = new response;
    var spName = (editMode)?"SP_UPDATE_PROJECT":"SP_INSERT_PROJECT";

    var strSQL = "CALL "+spName+"("+
                  ((editMode)?"'"+proId+"',":"'"+usrId+"',")+
                  "'"+title+"',"+
                  catId+","+
                  couId+","+
                  staId+","+
                  "'"+excerpt+"',"+
                  description+","+
                  status+","+
                  progress+","+
                  lookingInvestor+","+
                  "'"+estimatedAvailability+"',"+
                  "'"+image+"',"+
                  "'"+strArrDeals+"',"+
                  "'"+strArrMentors+"',"+
                  "'"+addressNbr+"',"+
                  "'"+addressStreet+"',"+
                  "'"+addressCity+"',"+
                  "'"+addressZip+"',"+
                  "'"+etherscanAddress+"',"+
                  maxTokenPurchase+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, async function (err, rows) {
        if(err) {
          console.log("error: ", err);
          ret.data = {
            code: 300
          };
          result(ret);
        }
        else{
          var row = JSON.parse(JSON.stringify(rows))[0][0];
          if (row && row.code == 0) {
            storage.removeItem('lstProjectsSite');
            ret.data = row;
            if (proId==0) proId = row.proId;
            //send email
            if (changeStatus==1) {
              switch (parseInt(status)) {
                case 1:
                  // Send mail draft project
                  mail.sendMail(
                    row.email,
                    mailTemplates.draftProject,
                    {
                      'name': row.name,
                      'email': row.email,
                      'projectName': title,
                      'proId': proId}
                  );
                  break;
                case 2:
                  // Send mail your project is in analysis
                  mail.sendMail(
                    row.email,
                    mailTemplates.toApproveProject,
                    {
                      'name': row.name,
                      'email': row.email,
                      'projectName': title,
                      'proId': proId
                    }
                  );
                  break;
                case 3:
                  // Send mail your project is approved
                  mail.sendMail(
                    row.email,
                    mailTemplates.approveProject,
                    {
                      'name': row.name,
                      'email': row.email,
                      'projectName': title,
                      'proId': proId
                    }
                  );
                  break;
                case 4:
                  // Send mail your project is rejected
                  mail.sendMail(
                    row.email,
                    mailTemplates.denyProject,
                    {
                      'name': row.name,
                      'email': row.email,
                      'projectName': title,
                      'proId': proId
                    }
                  );
                  break;
              };
            };
            strSQL = 'CALL SP_GET_PARTNERS_SEND_EMAIL(\''+proId+'\',\'0\')';
            util.logConsole(2,strSQL);
            conn.query(strSQL, function (err, resultPartners) {
              if(err) {
                console.log("error: ", err);
                ret.data = {
                  code: 215
                };
              }
              else{
                var rowMentors = JSON.parse(JSON.stringify(resultPartners))[0];
                rowMentors.forEach(function (vPartner) {
                  // Send mail to mentor
                  mail.sendMail(
                      vPartner.email,
                      mailTemplates.needSponsorMyProject,
                      {
                        'email': vPartner.email,
                        'message': vPartner.message,
                        'projectName': vPartner.projectName,
                        'proId': vPartner.proId
                      }
                  );
                  conn.query('UPDATE prp_project_partners SET prp_sent = 1 WHERE prp_id = ?', [vPartner.id]);
                });
              }
              result(ret);
            });
          }
          else {
            ret.data = {
              code: (row && row.code)?row.code:300,
              message: (row && row.message)?row.message:undefined
            };
            result(ret);
          };
        };
    });
  },
  updateProjectActive: function(usrId, proId, description, image, progress, lookingInvestor, estimatedAvailability, strArrDeals, strArrMentors, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_PROJECT_ACTIVE ("+
                  "'"+proId+"',"+
                  description+","+
                  progress+","+
                  lookingInvestor+","+
                  "'"+estimatedAvailability+"',"+
                  "'"+strArrDeals+"',"+
                  "'"+strArrMentors+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
            result(ret);
        }
        else{
          var row = JSON.parse(JSON.stringify(rows))[0][0];
          if (row && row.code == 0) {
            storage.removeItem('lstProjectsSite');
            ret.data = row;
            strSQL = 'CALL SP_GET_PARTNERS_SEND_EMAIL(\''+proId+'\',\'0\')';
            util.logConsole(2,strSQL);
            conn.query(strSQL, function (err, resultPartners) {
              if(err) {
                console.log("error: ", err);
                ret.data = {
                  code: 215
                };
              }
              else{
                var rowMentors = JSON.parse(JSON.stringify(resultPartners))[0];
                rowMentors.forEach(function (vPartner) {
                  // Send mail to mentor
                  mail.sendMail(
                      vPartner.email,
                      mailTemplates.needSponsorMyProject,
                      {
                        'email': vPartner.email,
                        'message': vPartner.message,
                        'projectName': vPartner.projectName,
                        'proId': vPartner.proId
                      }
                  );
                  conn.query('UPDATE prp_project_partners SET prp_sent = 1 WHERE prp_id = ?', [vPartner.id]);
                });
              }
              result(ret);
            });
          }
          else {
            ret.code = (row && row.code)?row.code:300;
            ret.message = (row && row.message)?row.message:undefined;
            result(ret);
          };
        };
    });
  },
  updateGallery: function(usrId, proId, updId, strArrItemGallery, result) {
    var ret = new response;
    var strSQL = "CALL SP_MANAGMENT_GALLERY ("+
                  "'"+usrId+"',"+
                  "'"+proId+"',"+
                  "'"+updId+"',"+
                  "'"+strArrItemGallery+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
      if(err) {
          console.log("error: ", err);
          ret.code = 300;
          ret.message = err.message;
      }
      else{
          ret.data = JSON.parse(JSON.stringify(rows))[0][0];
      };
      result(ret);
    });
  },
  removeProject: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_PROJECT("+usrId+","+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  uploadImage: function(usrId, proId, fileName, fileSize, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPLOAD_IMAGE_PROJECT ("+usrId+", "+proId+", '"+fileName+"', '"+fileSize+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  uploadGallery: function(usrId, proId, fileName, fileSize, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPLOAD_GALLERY_PROJECT ("+usrId+", "+proId+", '"+fileName+"', '"+fileSize+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  uploadImageUpdate: function(usrId, updId, fileName, fileSize, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPLOAD_IMAGE_PROJECT_ACTIVE ("+usrId+", "+updId+", '"+fileName+"', '"+fileSize+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  changeStatusProject: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_CHANGE_STATUS_PROJECT ("+usrId+", "+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else {
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            if (row && row.code == 0) {
              if (row.proStatus==2) {
                // Send mail your project is in analysis
                mail.sendMail(
                    row.email,
                    mailTemplates.toApproveProject,
                    {
                      'name': row.name,
                      'email': row.email,
                      'projectName': row.proTitle,
                      'proId': proId
                    }
                );
              }
              ret.data = row;
            }
            else {
              ret.code = (row && row.code)?row.code:300;
              ret.message = (row && row.message)?row.message:undefined;
            };
        };
        result(ret);
    });
  },
  getFavoriteProjects: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_FAVORITE_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getDealProjects: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_DEAL_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  removeFavoriteProject: function(usrId, prfId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_FAVORITE_PROJECT("+usrId+","+prfId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  setFavoriteProject: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_SET_FAVORITE_PROJECT("+usrId+","+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  setLikeProject: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_SET_LIKE_PROJECT("+usrId+","+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  getDeals: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROJECT_DEALS("+usrId+","+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getPurchaseProjects: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PURCHASE_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getReportedProjects: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_REPORTED_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  removeReportedProject: function(usrId, prrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_REPORTED_PROJECT("+usrId+","+prrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            et.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  rejectReportedProject: function(usrId, prrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REJECT_REPORTED_PROJECT("+usrId+","+prrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getQuestionsProjects: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_QUESTIONS_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getStoryByProject: function(proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_STORY_BY_PROJECT("+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  getStoryUpdate: function(updId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_DETAILS_UPDATE("+updId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  getQuestionsByProject: function(proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_QUESTIONS_BY_PROJECT("+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getUpdatesByProject: function(proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_UPDATES_BY_PROJECT("+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  removeQuestionsProject: function(usrId, prqId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_QUESTIONS_PROJECT("+usrId+","+prqId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  updateAnswerProject: function(usrId, prqId, answer, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_ANSWER_PROJECT("+usrId+","+prqId+",'"+answer+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            let row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.data = row;
            util.logConsole(3,ret);

            // Send mail with message contact us
            mail.sendMail(
              row.askEmail,
              mailTemplates.answerOwnerProject,
              {
                'proId': row.proId,
                'projectName': row.projectName,
                'askName': row.askName,
                'ownerName': row.ownerName,
                'answer': answer,
                'server': config.app.site
              }
            );
        };
        result(ret);
    });
  },
  getPartners: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROJECT_PARTNERS("+usrId+","+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getSponsorProjects: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_SPONSOR_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  toSponsorProject: function(usrId, prpId, result) {
    var ret = new response;
    var strSQL = "CALL SP_TO_SPONSOR_PROJECT ("+usrId+", "+prpId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            let row = JSON.parse(JSON.stringify(rows))[0][0];
            if (row.accepted==2) {
              // Send mail draft project
              mail.sendMail(
                row.email,
                mailTemplates.projectMentored,
                {
                  'name': row.name,
                  'email': row.email,
                  'projectName': row.projectName,
                  'proId': row.proId,
                  'mentorBusinessName': row.mentorBusinessName
                }
              );
            }
            ret.data = row;
        };
        result(ret);
    });
  },
  getProjectsHomeSite: async function(result) {
    var ret = new response;
    var retStorage = await storage.getItem('lstProjectsSite');
    if (!retStorage) {
      var strSQL = "CALL SP_GET_PROJECTS_HOME_SITE()";
      util.logConsole(2,strSQL);
      conn.query(strSQL, async function (err, rows) {
          if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
          }
          else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
            await storage.setItem('lstProjectsSite',ret, {ttl: 1000*60*10 /* 10 mins */ });
            util.logConsole(3,ret);
          };
          result(ret);
      });
    }
    else {
      util.logConsole(5,'Return of Storage');
      result(retStorage);
    }
  },
  getProjectsByCat: function(catId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROJECTS_BY_CAT("+catId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
          console.log("error: ", err);
          ret.code = 300;
          ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getProjectSite: function(usrId, proId, ip, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROJECT_SITE("+usrId+","+proId+",'"+ip+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = {
            main: JSON.parse(JSON.stringify(rows))[0][0],
            meta: JSON.parse(JSON.stringify(rows))[1][0]
          };
        };
        result(ret);
    });
  },
  askOwnerProject: function(usrId, proId, question, result) {
    var ret = new response;
    var strSQL = "CALL SP_ASK_QUESTION_PROJECT("+usrId+","+proId+",'"+question+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          let row= JSON.parse(JSON.stringify(rows))[0][0];
          ret.data = row;
          util.logConsole(3,ret);

          // Send mail with message contact us
          mail.sendMail(
            row.ownerEmail,
            mailTemplates.askOwnerProject,
            {
              'proId': row.proId,
              'projectName': row.projectName,
              'askId': row.askId,
              'askName': row.askName,
              'ownerName': row.ownerName,
              'question': question,
            }
          );
        };
        result(ret);
    });
  },
  contactUsProject: function(usrId, proId, message, result) {
    var ret = new response;
    var strSQL = "CALL SP_CONTACT_US_PROJECT("+usrId+","+proId+",'"+message+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.data = row;

            // Send mail with message contact us
            mail.sendMail(
              mailTemplates.contactUsProject.email,
              mailTemplates.contactUsProject,
              {
                'proId': proId,
                'invId': usrId,
                'invFullName': row.buyerName,
                'invEmail': row.buyerEmail,
                'invMessage': message,
                'projectName': row.proTitle
              }
            );
        };
        result(ret);
    });
  },
  buyDealProject: function(usrId, prdId, result) {
    var ret = new response;
    var strSQL = "CALL SP_BUY_DEAL_PROJECT("+usrId+","+prdId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
          console.log("error: ", err);
          ret.code = 300;
          ret.message = err.message;
        }
        else{
          var row = JSON.parse(JSON.stringify(rows))[0][0];
          if (row && row.code == 0) {
            ret.data = row;
            util.logConsole(3,row);

            // Send mail to buyer
            mail.sendMail(
                row.buyerEmail,
                mailTemplates.dealBuyer,
                {
                  'name': row.name,
                  'sellerName': row.sellerName,
                  'sellerCountry': row.sellerCountry,
                  'sellerCity': row.sellerCity,
                  'sellerEmail': row.sellerEmail,
                  'sellerPhone': row.sellerPhone,
                  'projectName': row.projectName,
                  'proId': row.proId
                }
            );
            // Send mail to seller
            mail.sendMail(
                row.sellerEmail,
                mailTemplates.dealSeller,
                {
                  'name': row.sellerName,
                  'buyerName': row.buyerName,
                  'buyerCountry': row.buyerCountry,
                  'buyerCity': row.buyerCity,
                  'buyerEmail': row.buyerEmail,
                  'buyerPhone': row.buyerPhone,
                  'projectName': row.projectName,
                  'proId': row.proId
                }
            );
          }
          else {
            ret.code = (row && row.code)?row.code:300;
            ret.message = (row && row.message)?row.message:undefined;
          };
        };
        result(ret);
    });
  },
  reportProject: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_SET_REPORT_PROJECT("+usrId+","+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  changeActiveQuestion: function(usrId, prqId, result) {
    var ret = new response;
    var strSQL = "CALL SP_CHANGE_ACTIVE_QUESTION ("+usrId+", "+prqId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  changeExecutedDeal: function(usrId, depId, result) {
    var ret = new response;
    var strSQL = "CALL SP_CHANGE_EXECUTED_DEAL ("+usrId+", "+depId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  sendMailPartnerAgain: function(prpId, result) {
    var ret = new response;
    var strSQL = 'CALL SP_GET_PARTNERS_SEND_EMAIL(\'0\',\''+prpId+'\')';
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, resultPartners) {
      if(err) {
        console.log("error: ", err);
        ret.data = {
          code: 215
        };
      }
      else{
        var rowMentors = JSON.parse(JSON.stringify(resultPartners))[0];
        rowMentors.forEach(function (vPartner) {
          // Send mail to mentor
          mail.sendMail(
              vPartner.email,
              mailTemplates.needSponsorMyProject,
              {
                'email': vPartner.email,
                'message': vPartner.message,
                'projectName': vPartner.projectName,
                'proId': vPartner.proId
              }
          );
        });
      };
      result(ret);
    });
  },
  getProjectsSite: function(usrId, search, limit, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROJECTS_SITE("+usrId+",'"+search+"',"+limit+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getInvestedProjects: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_INVESTED_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  addCartToken: function(usrId, proId, quantityToken, result) {
    var ret = new response;
    var strSQL = "CALL SP_ADD_CART_TOKEN("+usrId+", "+proId+", "+quantityToken+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  saveMetaProperties: function(
    usrId,
    proId,
    idHighlights,
    needRemodelation,
    assetAnnualReturn,
    assetRenovationTargetYield,
    assetRentStartDate,
    assetRentPerToken,
    assetTokenPrice,
    assetTotalTokens,
    assetPropertyType,
    assetConstructionYear,
    assetNeighborhood,
    assetSquareFeet,
    assetLandSquareFeet,
    assetTotalUnits,
    assetBedroomBath,
    assetHasTenants,
    assetSection8,
    gpsLatitude,
    gpsLongitude,
    idFinancials,
    grossRentAnual,
    grossRent,
    monthlyCosts,
    propertyManagement,
    platformCost,
    propertyMaintenance,
    propertyTaxes,
    propertyInsurance,
    propertyUtilities,
    netRentMonthly,
    netRentAnnual,
    assetPrice,
    underlyingAssetPrice,
    platformListingFee,
    initMaintenanceReserve,
    renovationReserve,
    result) {
    var ret = new response;
    var strSQL = "CALL SP_SAVE_META_PROPERTIES ("+
                  "'"+usrId+"',"+
                  "'"+proId+"',"+
                  "'"+idHighlights+"',"+
                  needRemodelation+","+
                  ((assetAnnualReturn)?"'"+assetAnnualReturn+"',":"null,")+
                  ((assetRenovationTargetYield)?"'"+assetRenovationTargetYield+"',":"null,")+
                  ((assetRentStartDate)?"'"+assetRentStartDate+"',":"null,")+
                  ((assetRentPerToken)?"'"+assetRentPerToken+"',":"null,")+
                  ((assetTokenPrice)?"'"+assetTokenPrice+"',":"null,")+
                  ((assetTotalTokens)?"'"+assetTotalTokens+"',":"null,")+
                  ((assetPropertyType)?"'"+assetPropertyType+"',":"null,")+
                  ((assetConstructionYear)?"'"+assetConstructionYear+"',":"null,")+
                  ((assetNeighborhood)?"'"+assetNeighborhood+"',":"null,")+
                  ((assetSquareFeet)?"'"+assetSquareFeet+"',":"null,")+
                  ((assetLandSquareFeet)?"'"+assetLandSquareFeet+"',":"null,")+
                  ((assetTotalUnits)?"'"+assetTotalUnits+"',":"null,")+
                  ((assetBedroomBath)?"'"+assetBedroomBath+"',":"null,")+
                  ((assetHasTenants)?"'"+assetHasTenants+"',":"null,")+
                  ((assetSection8)?"'"+assetSection8+"',":"null,")+
                  "'"+idFinancials+"',"+
                  ((grossRentAnual)?"'"+grossRentAnual+"',":"null,")+
                  ((grossRent)?"'"+grossRent+"',":"null,")+
                  ((monthlyCosts)?"'"+monthlyCosts+"',":"null,")+
                  ((propertyManagement)?"'"+propertyManagement+"',":"null,")+
                  ((platformCost)?"'"+platformCost+"',":"null,")+
                  ((propertyMaintenance)?"'"+propertyMaintenance+"',":"null,")+
                  ((propertyTaxes)?"'"+propertyTaxes+"',":"null,")+
                  ((propertyInsurance)?"'"+propertyInsurance+"',":"null,")+
                  ((propertyUtilities)?"'"+propertyUtilities+"',":"null,")+
                  ((netRentMonthly)?"'"+netRentMonthly+"',":"null,")+
                  ((netRentAnnual)?"'"+netRentAnnual+"',":"null,")+
                  ((assetPrice)?"'"+assetPrice+"',":"null,")+
                  ((underlyingAssetPrice)?"'"+underlyingAssetPrice+"',":"null,")+
                  ((platformListingFee)?"'"+platformListingFee+"',":"null,")+
                  ((initMaintenanceReserve)?"'"+initMaintenanceReserve+"',":"null,")+
                  ((renovationReserve)?"'"+renovationReserve+"',":"null,")+
                  ((gpsLatitude)?"'"+gpsLatitude+"',":"null,")+
                  ((gpsLongitude)?"'"+gpsLongitude+"')":"null)");
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
      if(err) {
          console.log("error: ", err);
          ret.code = 300;
          ret.message = err.message;
      }
      else{
          ret.data = JSON.parse(JSON.stringify(rows))[0][0];
      };
      result(ret);
    });
  },
  getMetaProperties: function(usrId, proId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_META_PROPERTIES("+usrId+", "+proId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            var row1 = JSON.parse(JSON.stringify(rows))[0];
            var row2 = JSON.parse(JSON.stringify(rows))[1];
            if (row1 && row2) {
              ret.data = {
                highlights: JSON.stringify(row1),
                financials: JSON.stringify(row2)
              };
            }
            else {
              ret.code = 308;
            };
        };
        result(ret);
    });
  }
};

module.exports = Project;

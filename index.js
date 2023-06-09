import  https from 'https';
import path from "path";
import express from 'express';
// import fs from 'fs';
// import  out  from './output.json' assert {type: 'json'};
// import  AlertManagements  from './resource/AlertManagements.json' assert {type: 'json'};

import cors from "cors";



const fetchP = import('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args));
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

//  #CREDENCIALS SAP
var login = {
    "CompanyDB": "PRUEBAS_ENERO",
    "Password": "Milan2023*",
    "UserName": "1005331526"
}


//  #SERVIDOR       --------------------
const app = express();
// app.use(cors({
//     origin: 'file://192.168.10.211/Anexos_SAP/Images/luis%20arias.PNG'
// }));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json({
//     type: '*/*'
// }));
app.use(express.json());
app.listen(8081, () => {
    console.log("Server running 8081port                              ＼(ﾟｰﾟ＼)");
})

//  #VARIABLES & CONSTANTES         --------------------
app.use(express.static("public"));//Permite el acceso a los archivos de la carpeta
const urlLogin = 'https://192.168.10.201:50000/b1s/v1/Login';
const url_asesores = "https://192.168.10.201:50000/b1s/v1/sml.svc/ASESORES_COMERCIALES"

// const cors = require('cors');

let sesion = {
    "cookieId": ""
    // "timeFuture": "",
    // "hour": ""
};


// #ROUTER        --------------------

app.get("/", (req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./views/index.html'));
    res.sendFile(path.join(__dirname,'./public/index.html'));
    // res.send('heee');
})

app.post("/asesores", (req,res)=>{
    Reqlogin().then((resp)=>{
        sesion.cookieId = "B1SESSION=" + resp.SessionId;
        var options = {
            method: 'GET',
            headers: {
                cookie: sesion.cookieId,
                "Content-Type": "application/json",
                'Prefer' : 'odata.maxpagesize=0'//paginado
            }
            , agent: httpsAgent
        }
        fetch(url_asesores,options).then((resp)=>resp.json()).then((data)=>{
            res.send(data);
            // console.log(data);
        }).catch(err=>{console.log(err)})
    }).catch(err=>{console.log(err)})
})

app.post("/clientes", (req,res)=>{
    let datos = req.body;
    let user_code = datos.user_code;
    Reqlogin().then((resp)=>{
        sesion.cookieId = "B1SESSION=" + resp.SessionId;
        var options = {
            method: 'GET',
            headers: {
                cookie: sesion.cookieId,
                "Content-Type": "application/json",
                'Prefer' : 'odata.maxpagesize=0'//paginado
            }
            , agent: httpsAgent
        }
        const urlClientes_asesor = "https://192.168.10.201:50000/b1s/v1/sml.svc/CLIENTES_ASESORParameters(i_schema='"+login['CompanyDB']+"',i_user_code='"+user_code+"')/CLIENTES_ASESOR";
        fetch(urlClientes_asesor,options).then((resp)=>resp.json()).then((data)=>{
            res.send(data);
            // console.log(data);
        }).catch(err=>{console.log(err)})
    }).catch(err=>{console.log(err)})
})

app.post("/clientes/owner", (req,res)=>{
    // let datos = req.body;
    // let user_code = datos.user_code;

    Reqlogin().then((resp)=>{

        console.log('clientes/owner :>> ');

        const cnl = '000000000000802'

        sesion.cookieId = "B1SESSION=" + resp.SessionId;

        var options = {
            method: 'PATCH',
            headers: {
                cookie:sesion.cookieId,
                "Content-Type": "application/json"
            }
            , agent: httpsAgent
            , body: JSON.stringify(
                {
                    // "Phone1": "7859508001"
                    "OwnerCode": -1,
                    "SalesPersonCode": -1   //-1 sin propietario
                }
            )
        }

        // const urlClientes_change_owner = "https://192.168.10.201:50000/b1s/v1/BusinessPartners('CNL1007182842')";
        const urlClientes_change_owner = "https://192.168.10.201:50000/b1s/v1/BusinessPartners('"+cnl+"')";

        fetch(urlClientes_change_owner,options).then((data)=>{//.then((resp)=>resp.json())
            // res.send(data);
            console.log(data);

        }).catch(err=>{console.log(err)})

    }).catch(err=>{console.log(err)})
})





//##################################################################################################################################


//   #METHODS        --------------------

// sesion.timeFuture = dateFuture();

function Reqlogin() {//Post login service layer

    return  new Promise((resolve, reject) => {
        fetch(urlLogin, {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(login),
            agent: httpsAgent
        }).then((resp) => {

            // var a= resp.text();
            // console.log(a);
            // console.log(resp.SessionId+'sesionId')

            // sesion.timeFuture = dateFuture();
            // sesion.cookieId = resp.SessionId;
            // createJson(sesion);
            return resolve(resp.json());
            // sesion= resp.SessionId;
        }).catch(err => { return reject(err) });
    })
}

function Reqlogin2() {//Post login service layer; no sirve

    fetch(urlLogin, {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify(login),
        agent: httpsAgent
    }).then((resp) => {
        return (resp.json());

    }).catch(err => { return (err) });
}

function getUserid_sap(param1,options) {
    // console.log(param1,options  )

    return  new Promise((resolve, reject) => {
        // var x = param1+"'"
        // console.log(x + 'x')
        // urlUserid_sap += x;
        var urlUserid_sap = "https://192.168.10.201:50000/b1s/v1/SQLQueries('SQLQueries0002')/List?cedula='"+param1+"'" ;//1005331526

        fetch(urlUserid_sap,options)
            .then((resp) => {
                // return resolve(resp.json());
                
                console.log(resp.status)

                return resolve(resp.json());
            }).catch(err => {
                console.log(err)
                // return reject(err);
                return reject(err);
            });
    })
}

function dateFuture(){// retorna la fecha con 1 hora adelantada
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date

    var numberOfMlSeconds = currentDateObj.getTime();
    var addMlSeconds = 60 * 60000;
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    sesion.hour=newDateObj.getUTCHours()
    return newDateObj;
}

function getAlert(options,cedula1) {
    return  new Promise((resolve, reject) => {
        
        // var url = "https://192.168.10.201:50000/b1s/v1/SQLQueries('SQLalertUser')/List?cedula='"+cedula1+"'";
        var url ="https://192.168.10.201:50000/b1s/v1/SQLQueries('SQLQueries0001')/List?cedula='"+cedula1+"'"; // <- usuario a tomar alertas 'MILANPROD'

        fetch(url,options)
            .then((resp) => {
                // console.log(">>>")
                return resolve(resp.json());
                // console.log(alerts);
            }).catch(err => {
                // console.log(err)
                console.log(err+' < - - error getAlert')
                return reject(err);
            });
    })
}

function getAlert3(options,cedula1) {
    return  new Promise((resolve, reject) => {

        const DB = 'PRUEBAS_ENERO';
        // const DB = 'MILANPROD';
        // var url = "https://192.168.10.201:50000/b1s/v1/SQLQueries('SQLalertUser')/List?cedula='"+cedula1+"'";
        // var url_="https://192.168.10.201:50000/b1s/v1/sml.svc/USER_ALERTSParameters(i_user_code='"+cedula1+"')/USER_ALERTS";
        var url_="https://192.168.10.201:50000/b1s/v1/sml.svc/USER_ALERTSParameters(i_schema='"+DB+"', i_user_code='"+cedula1+"')/USER_ALERTS";
        
        fetch(url_,options).then(resp=>resp.json())
            .then((data) => {
                console.log(data)
                return resolve(data);
                // console.log(alerts);
            }).catch(err => {
                // console.log(err)
                console.log(err)
                return reject(err);
            });
    })
}

function getAlert2(options,cedula1) {
    return  new Promise((resolve, reject) => {

        var url = "https://192.168.10.201:50000/b1s/v1/SQLQueries('SQLalertUser')/List?cedula='"+cedula1+"'";
        fetch(url,options)
            .then((resp) => {
                // console.log(">>>")
                return resolve(resp.json());
            }).catch(err => {
                // console.log(err)
                console.log(err)
                return reject(err);
            });
    })
}

async function setAlertUser(options,alertId) {

    var uri = "https://192.168.10.201:50000/b1s/v1/AlertManagements("+alertId+")";
    // console.log(uri)

    await fetch(uri, options)
    // .then((response) => response.json() )
    .then((resp) => {
            // console.log('1.5 up alert')

            // var data = resp;
            // if (data.status == 204) {
                // console.log('alerta asignada');
                return {
                    message: 'Alerta Asiganada Correctamente'
                }
            // }else{
            //     return reject({message: 'Alertas Asiganadas MAL'})
            // }
        })
        .catch((err) => {
            console.log(err + " < - - error asignando alerta "+alertId);
            return err
        })
}

async function alertUserDrop(options,alertId) {
    return await new Promise((resolve, reject) => {

        var uri = "https://192.168.10.201:50000/b1s/v1/AlertManagements("+alertId+")";
        fetch(uri, options)
            // .then((response) => response.json() )
            .then((resp) => {
                var data = resp;
                // console.log(data);
                if (data.status == 204) {
                    return resolve({
                        message: 'Alertas Eliminadas Correctamente'
                    })
                }
            })
            .catch((err) => {
                console.log(err + " < - - error Eliminando la alerta del usuario -"+alertId);
                return reject(err)
            })
    })
}

function alertUserDrop2(options,alertId) {
    return  new Promise((resolve, reject) => {
        var uri = "https://192.168.10.201:50000/b1s/v1/AlertManagements("+alertId+")";
        fetch(uri, options)
        // .then((response) => response.json() )
        .then((resp) => {
            
            var data = resp;
            console.log(data.status);
            if (data.status == 204) {
                return resolve({
                    message: 'Alertas Eliminadas Correctamente'
                })
            }
        })
        .catch((err) => {
            console.log(err + " < - - error Eliminando la alerta del usuario -"+alertId);
            return reject(err)
        })
    })
}

// async function createJson(session){
//     console.log('1.2-createJson')
//     var jsonContent = JSON.stringify(session);
//     return await new Promise((resolve, reject) => {

//         fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
            
//             if (err ) {
//                 console.log("An error occured while writing JSON Object to File.");
//                 return reject(err);
//             }
//             return resolve(true);
//         });
//     });

//     // const fs = require('fs');

//     // var jsonContent = JSON.stringify(session);

//     // fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
        
//     //     if (err ) {
//     //         console.log("An error occured while writing JSON Object to File.");
//     //         return console.log(err);
//     //     }
//     //     return true;
//     // });
// }

async function createJson2(options){

    console.log('1.2')
    var all_alerts;
    const url="https://192.168.10.201:50000/b1s/v1/AlertManagements?$select=Name,Code,Active &$filter=(Active eq 'Y') &$orderby=Code asc";

    return await new Promise((resolve, reject) =>{

        fetch(url,options).then(resp => resp.json())
        .then((data) => {
            // console.log(data.value)
            all_alerts=data;
            var jsonContent = JSON.stringify(all_alerts);
        
            fs.writeFile("./resource/AlertManagements.json", jsonContent, 'utf8', function (err) {
                
                if (err ) {
                    console.log("An error occured while writing JSON Object to File.");
                    return reject(err);
                }
                return resolve(true);
            });
        })
    })
}

//      #ROUTES        --------------------

app.get("/alert",  (req, res0) => {
    // alertId.pop();//borra el último elemeto del array-no usar
    Reqlogin().then((res) => {

        console.log(res.SessionId);//cokkie
        sesion.cookieId = "B1SESSION=" + res.SessionId;
        var options = {
            method: 'GET',
            headers: {
                cookie: sesion.cookieId,
                "Content-Type": "application/json",
                'Prefer' : 'odata.maxpagesize=0'//paginado
            }
            , agent: httpsAgent
            // ,agent:httpsAgent
            // ,body: {ParamList:"cedula='1005331526'"}
        }

        console.log('Enviando petición para las alertas')

        sesion.timeFuture = dateFuture();
        sesion.cookieId = res.SessionId;

        getAlert(options,'1005331526').then((res) => {
            alertas = res.value;
            // console.log(alertas);
            for (var i in alertas) {
                sesion.alertId.push(alertas[i]['Code'])
                // console.log(alertId[i] +'   <');
            }
            // res0.json(alertas);
            console.log('alertId '+sesion.alertId)
            createJson(sesion);
            res0.send(sesion.alertId);
            // res0.send(printAlert(alertas));
        }).catch(err => {
            alertas = err;
            console.log(err)
        });
    }).catch((err) => { console.log(err) })
    // res0.send(alertas);
});

app.post("/alert/get",(req, res0)=>{
    let data = req.body;
    var txtUsersap=data.txtUsersap;
    console.log('1')
    console.log(data)
    // res0.json(data);

    Reqlogin().then((res) => {
        console.log(res.SessionId);//cokkie
        sesion.cookieId = "B1SESSION=" + res.SessionId;
        var options = {
            method: 'GET',
            headers: {
                cookie: sesion.cookieId,
                "Content-Type": "application/json",
                'Prefer' : 'odata.maxpagesize=0'//paginado
            }
            , agent: httpsAgent
        }

        console.log('Enviando petición para las alertas')

        sesion.timeFuture = dateFuture();
        sesion.cookieId = res.SessionId;

        //-----------------load alerts

        // createJson2(options);no usar, innecesario
        // console.log(AlertManagements[0]['Name'])


        //-----------------load alerts

        getAlert3(options,txtUsersap).then((res) => {//getAlert3
            alertas = res.value;
            console.log('2')
            console.log(alertas)
            res0.json({message:alertas})

        }).catch(err => {
            alertas = err;
            console.log(err)
        });
    }).catch((err) => { console.log(err) })
})

app.get("/alerts", async (req, res) => {

    var options = {
        method: 'PATCH',
        headers: {
            cookie:sesion.cookieId,
            "Content-Type": "application/json"
        }
        , agent: httpsAgent
        , body: JSON.stringify({
            "AlertManagementRecipients": [
                {
                    "UserCode": 41,
                    "SendInternal": "tYES"
                }
            ]
        })
    }
    var info;
    for (var i in alertId){

        console.log("alerta "+i+" asignada al usuario");
        await setAlertUser(options,alertId[i])
        .then((resp) => {
            info=resp;
        })
    }
    res.json(info);
})

app.get("/json", async (req, res0) => {

    // //asigna un '0' a la izquierda cuando el formato de los minutos no contenga 2 dígitos    
    // var minut = ((fecha.getMinutes()).toString()).length > 1 ? (fecha.getMinutes()).toString() : '0'+(fecha.getMinutes()).toString();
    // var time = fecha.toLocaleTimeString().charAt(0) +minut;
    // var j=fecha.toLocaleTimeString().charAt(9)+fecha.toLocaleTimeString().charAt(10)
    // // var j=fecha.toLocaleTimeString().charAt(8)+fecha.toLocaleTimeString().charAt(9)// 

    // console.log(fecha.getUTCDay())
    // console.log(fecha.getUTCDate())//día del mes
    // console.log(fecha.getUTCHours())
    // console.log(fecha.toJSON())
    // // console.log(moment().hour(Number));
    
    
    // console.log(numberOfMlSeconds);
    
    
    // var h1 = currentDateObj.getUTCHours();//hora actual
    // // var h2 = sesion.timeFuture.getUTCHours();//hora final

    // console.log(currentDateObj.getUTCHours()+ ' <<< '+out.hour);
    
    if (false) {//currentDateObj.getUTCHours() < out.hour
        // console.log('Sesión Cerrada')
        res0.send('sesión Abierta');
    }else{
        console.log('Creando sesión...')

        await Reqlogin().then((res) => {
            
            //tiempo
            sesion.cookieId = res.SessionId;
            sesion.timeFuture = dateFuture();

            createJson(sesion);
    
        }).catch((err) => { console.log(err) })
        res0.send('sesión Creada');
    }
});

app.get("/alertX", async (req, res0) => {

     //asigna un '0' a la izquierda cuando el formato de los minutos no contenga 2 dígitos    
    var minut = ((fecha.getMinutes()).toString()).length > 1 ? (fecha.getMinutes()).toString() : '0'+(fecha.getMinutes()).toString();
    var time = fecha.toLocaleTimeString().charAt(0) +minut;
    var j=fecha.toLocaleTimeString().charAt(8)+fecha.toLocaleTimeString().charAt(9)

    console.log(time)

    if (false /*time > out.SessionTimeout || j != out.jornada*/) {//

        console.log('Sesión Closed')
        
    }else{
        console.log('Usando Sesión...')
        var options = {
            method: 'GET',
            headers: {
                cookie: "B1SESSION=" + out.cookieId,
                "Content-Type": "application/json"
            }
            , agent: httpsAgent
            // ,agent:httpsAgent
            // ,body: {ParamList:"cedula='1005331526'"}
        }
        console.log('Enviando petición para las alertas')
        getAlert(options).then((res) => {
            alertas = res.value;
            console.log(alertas);
            for (var i in alertas) {
                sesion.alertId.push(alertas[i]['Code'])
                // console.log(alertId[i] +'   <');
            }
            // res0.json(alertas);
            res0.send(sesion.alertId);
            // res0.send(printAlert(alertas));
        }).catch(err => {
            alertas = err;
            console.log(err)
        });
    }
    // res0.send(alertas);
});

app.post('/alert/delete', (req, res0) => {
    
    console.log('eliminando alertas')

    let data = req.body;
    // var txtUsersap001=data.txtUsersap001;
    var txtUsersap002=data.txtUsersap002;
    // let userid

    Reqlogin().then((res) => {

        console.log(res.SessionId);//cokkie
        sesion.cookieId = "B1SESSION=" + res.SessionId;
        var options = {
            method: 'GET',
            headers: {
                cookie: sesion.cookieId,
                "Content-Type": "application/json",
                'Prefer' : 'odata.maxpagesize=0'//paginado
            }
            , agent: httpsAgent
        }

        //------------------
        //------------------

        console.log('process ending ...'+txtUsersap002)

        getUserid_sap(txtUsersap002,options).then((res3) => {
            // var userid_2=res3.value[0]['USERID'];
            var userid=res3.value[0]['USERID'];

            let opt = {
                method: 'PATCH',
                headers: {
                    cookie:sesion.cookieId,
                    "Content-Type": "application/json"
                }
                , agent: httpsAgent
                , body: JSON.stringify({
                    "AlertManagementRecipients": [
                        {
                            "UserCode": userid,
                            "SendInternal": "tNO"//eliminador
                        }
                    ]
                })
            }
            sesion.timeFuture = dateFuture();
            sesion.cookieId = res.SessionId;
            getAlert(options,txtUsersap002)//.then(data =>data.json())
            .then((res4) => {

                alertas = res4.value;
                console.log(res4)

                if (alertas.length==0) {
                    res0.json({message:'Not exist alerts'})
                }else{
                    for (var i in alertas) {
                        sesion.alertId.push(alertas[i]['Code'])
                        alertUserDrop(opt,alertas[i]['Code'])
                        .then((resp) => {
                            // info=resp;
                            console.log('Alerta eliminada')
                        })
                    }
                    res0.json({message:true})
                }
            }).catch(err => {
                alertas = err;
                console.log(err)
                res0.json({message:false})
            });
            // console.log('user id:'+userid)

            //------------------
            //------------------
            // console.log('process ending u...'+userid_2)
        }).catch((err) => { console.log(err) })
    }).catch((err) => { console.log(err) })
})

app.get("/dropAlert",(req,res)=>{
    console.log('eliminando alertas')
    console.log(req.body);

    res.json({message:'ok'})

    // // // console.log(out.alertId)
    // // // alert(alertId)


    // // // let uri = 'https://192.168.10.201:50000/b1s/v1/AlertManagements(138)'
    // // var options={
    // //     method: 'PATCH',
    // //     headers: {
    // //         cookie: sesion.cookieId,
    // //         "Content-Type": "application/json"
    // //     }
    // //     , agent: httpsAgent
    // //     , body: JSON.stringify({
    // //         "AlertManagementRecipients": [
    // //             {
    // //                 "UserCode": 567,//   <-- usario a eliminar alertas
    // //                 "SendEMail": "tNO",
    // //                 "SendSMS": "tNO",
    // //                 "SendFax": "tNO",
    // //                 "SendInternal": "tNO"//Asignador
    // //             }
    // //         ]
    //     })
    // }
    // // console.log(options[0]['UserCode'])

    // var info;
    // for (var i in alertId){

    //     console.log('eliminando alerta '+alertId[i]);
    //     alertUserDrop(options,alertId[i])
    //     .then((resp) => {
    //         info=resp;
    //     })
    // }

    // // console.log(info);
    // res.send(info);

    // // fetch(uri,options).then((resp)=>{
    // //     res.send('alerts were removed')
    // // }).catch((err)=>{
    // //     res.send('Error clearing alerts')
    // // })
})

app.post("/new",  (req, res0) => {


    let data = req.body;
    var txtUsersap001=data.txtUsersap001;
    var txtUsersap002=data.txtUsersap002;
    var options = {
        method: 'GET',
        headers: {
            cookie: sesion.cookieId,
            "Content-Type": "application/json",
            'Prefer' : 'odata.maxpagesize=0'//paginado
        }
        , agent: httpsAgent
    }
    
    // //----------------------------------
    // //----------------------------------
    
    Reqlogin().then((resp) => {
        sesion.timeFuture = dateFuture();
        sesion.cookieId = "B1SESSION=" + resp.SessionId;
        options.headers.cookie = sesion.cookieId;

        // createJson(sesion);//comentado, porque retrasa el tiempo de respuesta y no cargan los demás métodos

        // createJson2(sesion);

        getAlert(options,txtUsersap001).then((res2) => {
            sesion.alertId = res2.value;
            alertas = res2.value;
            if (alertas.length == 0) {
                console.log('No hay alertas para este usuario');
                res0.json({message:'Not exist alerts'})
            }else{
                
                
                getUserid_sap(txtUsersap002,options)
                .then((res3) => {
                    console.log('1.4 user id')
                    var userid=res3.value[0]['USERID'];
                    let opt = {
                        method: 'PATCH',
                        headers: {
                            cookie:sesion.cookieId,
                            "Content-Type": "application/json"
                        }
                        , agent: httpsAgent
                        , body: JSON.stringify({
                            "AlertManagementRecipients": [
                                {
                                    "UserCode": userid,
                                    "SendInternal": "tYES"
                                }
                            ]
                        })
                    }
                    alertas.forEach(element => {
                        var alertCode= element['Code'];
                        setAlertUser(opt,alertCode)
                        .then((res4) => {
                            // console.log(res4.message + alertCode)//error
                        }).catch((err)=>{
                            console.error(err);
                            return err;
                        });  
                    }); 
                }).catch((err) => { console.log(err) })
                res0.json({message:true})
            }
        }).catch(err => {
            alertas = err;
            console.log(err)
        });
    }).catch((err) => { console.log(err) })
});

app.post("/new2",  (req, res0) => {
    let data = req.body;
    console.log(data);
    var txtUsersap001=data.txtUsersap001;
    var txtUsersap002=data.txtUsersap002;
    var alerts_user = data.alerts_user;
    var options = {
        method: 'GET',
        headers: {
            cookie: sesion.cookieId,
            "Content-Type": "application/json",
            'Prefer' : 'odata.maxpagesize=0'//paginado
        }
        , agent: httpsAgent
    }

    Reqlogin().then((resp) => {
        // sesion.timeFuture = dateFuture();
        sesion.cookieId = "B1SESSION=" + resp.SessionId;
        options.headers.cookie = sesion.cookieId;
        
        getUserid_sap(txtUsersap002,options).then((res3) => {
            console.log('1.4 user id')
            var userid=res3.value[0]['USERID'];

            let opt = {
                method: 'PATCH',
                headers: {
                    cookie:sesion.cookieId,
                    "Content-Type": "application/json"
                }
                , agent: httpsAgent
                , body: JSON.stringify({
                    "AlertManagementRecipients": [
                        {
                            "UserCode": userid,
                            "SendInternal": "tYES"
                        }
                    ]
                })
            }
            alerts_user.forEach(element => {
                // var alertCode= element['Code'];

                var alertCode= element;
                // console.log(alertCode);
                setAlertUser(opt,alertCode)
                .then((res4) => {
                    // console.log(res4.message + alertCode)//error
                }).catch((err)=>{
                    console.error(err);
                    return err;
                });  
            }); 
        }).catch((err) => { console.log(err) })
        res0.json({message:true})

    }).catch((err) => { console.log(err) })


});




//---------------------------------------------------------------------------------------------------------------------------


// // fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((respuesta) => {
// //     return(respuesta.json())
// // }).then((resp) => {
// //     console.log(resp);
// // }).catch( err => console.log( err + "  "+ "error en la respuesta"));


// fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((respuesta) => {//
//         return(respuesta.json())
//         }).then((resp) => {
//             alerts= resp;
//         console.log(resp);
//         }).catch( err => console.log( err + "  "+ "error en la respuesta"));




/**  INFO HELP
 *
 * #Cómo fucniona fetch
 * https://pablomonteserin.com/curso/javascript/ejemplos-api-fetch/#:~:text=La%20fetch%20API%20nos%20permite,es%20necesario%20usar%20ninguna%20librer%C3%ADa.
 *
 *
 * https://prezi.com/p/nr__rztblbxb/curso-service-layer-sb1/
 *
 * #primera conexión
 * https://www.youtube.com/watch?v=eMjHEkkOURw&feature=youtu.be
 *
 * #Get patch
 * https://www.youtube.com/watch?v=I74a4TEsam0&feature=youtu.be
 *
 * #query options
 * https://www.youtube.com/watch?v=kLSxxrW848A&feature=youtu.be
 *
 * #Aggregation and grouping
 * https://www.youtube.com/watch?v=G7Co4Tr0XN8&feature=youtu.be
 *
 * #Cross Join
 * 
 * 
 * #path
 * https://www.youtube.com/watch?v=7diQjDGdPWo
 *
 * 
 * #Javascript Asíncrono: La guía definitiva
 * https://lemoncode.net/lemoncode-blog/2018/1/29/javascript-asincrono#patrones-as-ncronos-en-javascript
 * https://www.freecodecamp.org/espanol/news/tutorial-de-async-await-de-javascript/
 *
    */


// API
// https://pokeapi.co/api/v2/pokemon/ditto




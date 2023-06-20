
let total_clientes = 0;
let total_clientes2 = 0;
let clientes = [];
let asesor_salesPrson = '';
let asesor_empID = '';

let bandera = false
let b1 = false, b2 = false

let params = []

function x() {
	// $("select").mouseleave(function () {

        // alert("This input field has lost its focus.");


        // get_clientes(this,'tabla1','options_select','Ncnl_asesor','SalesPrson','empID','USER_CODE','name_asesor')
        // // $(this).hide();
    // });


	console.log(params);
	get_clientes(params[0].elemento,params[0].table,params[0].select,params[0].Ncnl_asesor,params[0].SalesPrson,params[0].empID,params[0].USER_CODE,params[0].name_asesor)
	get_clientes(params[1].elemento,params[1].table,params[1].select,params[1].Ncnl_asesor,params[1].SalesPrson,params[1].empID,params[1].USER_CODE,params[1].name_asesor)

}

// $(document).ready(function () {


// 	$("select").mouseleave(function () {

// 	  // alert("This input field has lost its focus.");

// 	  // get_clientes(this,'tabla1','options_select','Ncnl_asesor','SalesPrson','empID','USER_CODE','name_asesor')
// 	  // // $(this).hide();
// 	});

// });

function get_asesores() {
	fetch("/asesores",
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json()).then(data => {//
		let str = '';//creamos una variable para concatenar los datos
		var Sbody = document.getElementById('options_select');//obtenemos el cuerpo de la comboBox
		var Sbody2 = document.getElementById('options_select2');//obtenemos el cuerpo de la comboBox
		str +=  '<option selected value="0">Open this select menu</option>';

		// console.log('object :>> ', object);

		for (let i = 0; i < data.value.length; i++) {

			let x = JSON.stringify( data.value[i]);
			str += '<option onchange="alert()" value=\''+x+'\'>'+data.value[i]['U_NAME']+'</option>';
		}
		// console.log(str);
		Sbody.innerHTML = str;//agregamos la variable str al cuerpo de la comboBox
		Sbody2.innerHTML = str;//agregamos la variable str al cuerpo de la comboBox
	})
}

function get_clientes(elemento,table,select,Ncnl_asesor,SalesPrson,empID,USER_CODE,name_asesor) {

	document.getElementById(table).innerHTML = '';
	var u_code =JSON.parse(document.getElementById(select).value);
	// console.log(u_code.length);

	if (u_code == 0) {
		bandera = false;
		document.getElementById(table).innerHTML = '';
		elemento.options[elemento.selectedIndex].text= '';
		console.log('Ncnl_asesor :>> ', Ncnl_asesor);
		document.getElementById(Ncnl_asesor).innerHTML = '';
		document.getElementById(SalesPrson).innerHTML = '';
		document.getElementById(empID).innerHTML = '';
		document.getElementById(USER_CODE).innerHTML = '';
		document.getElementById(name_asesor).innerText = '';
		document.getElementById('btn_tranferirclientes').disabled = true;

	}else{
		fetch("/clientes",
		{
			method: 'POST',
			body: JSON.stringify({
				user_code: u_code.USER_CODE //'1098723420'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(data => {
			// console.log('data :>> ', data.value.length);		
			var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla
			let str='';//creamos una variable para concatenar los datos
			

			// for (var i = 0; i < data.value.length; i++) {//recorremos el arreglo de datos
			// 	str += '<tr id="fila' + i + '">'
			// 		+ '<td>' + i + '</td>'
			// 		+ '<td>' + data.value[i]['CardName'] + '</td>'
			// 		+ '<td>' + data.value[i]['CardCode'] + '</td>'
			// 		+ '<td >' +//class="form-check form-switch"
			// 			'<div class="form-check form-switch">' +
			// 									'<input  onchange="imprimir('+i+')" class="form-check-input" type="checkbox" role="switch"' 
			// 														+'id="flexSwitchCheckChecked'+i+'" checked>'
			// 			+'</div>'+
			// 		'</td>' +
			// 		'</tr>';//concatenamos cada dato en la variable str
			// }
			
			if(table == 'tabla1'){
				b1=true;

				let parametros = {elemento,table,select,Ncnl_asesor,SalesPrson,empID,USER_CODE,name_asesor}
				params.push(parametros);

				// if(b1 == true && b2 == true){
				// 	document.getElementById('btn_tranferirclientes').disabled = false;
				// }

				total_clientes = data.value.length;
				for (var i = 0; i < data.value.length; i++) {//recorremos el arreglo de datos
					str += '<tr id="fila' + i + '">'
						+ '<td>' + i + '</td>'
						+ '<td>' + data.value[i]['CardName'] + '</td>'
						+ '<td>' + data.value[i]['CardCode'] + '</td>'
						+ '<td >' +//class="form-check form-switch"
							'<div class="form-check form-switch">' +
													'<input  onchange="change_flexSwitch()" class="form-check-input" type="checkbox" role="switch"' 
																		+'id="flexSwitchCheckChecked'+i+'"  >' //flexSwitchCheckChecked
							+'</div>'+
						'</td>' +
						'</tr>';//concatenamos cada dato en la variable str
				}

				document.getElementById('Ncnl_asesor').innerHTML = data.value.length+' Clientes encontrados';
				document.getElementById(USER_CODE).innerHTML = 'Usuario sap: '+u_code.USER_CODE;
				document.getElementById(SalesPrson).innerHTML = 'SalesPrson: '+u_code.salesPrson;
				document.getElementById(empID).innerHTML = 'empID: '+u_code.empID;
				// document.getElementById('name_asesor').innerText = elemento.options[elemento.selectedIndex].text;//obtinene el texto del elemento seleccionado
				document.getElementById('name_asesor').innerText = u_code.U_NAME;

				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
			}else{
				b2=true;
				let parametros = {elemento,table,select,Ncnl_asesor,SalesPrson,empID,USER_CODE,name_asesor}
				params.push(parametros);

				total_clientes2 = data.value.length;
				for (var i = 0; i < data.value.length; i++) {//recorremos el arreglo de datos
					str += '<tr id="fila' + i + '">'
						+ '<td>' + i + '</td>'
						+ '<td>' + data.value[i]['CardName'] + '</td>'
						+ '<td>' + data.value[i]['CardCode'] + '</td>'
						+ '<td >' +//class="form-check form-switch"
							'<div class="form-check form-switch">' +
													'<input  onchange="imprimir('+i+')" class="form-check-input" type="checkbox" role="switch"' 
																		+'id="flexSwitchCheckChecked_'+i+'" checked>'
							+'</div>'+
						'</td>' +
						'</tr>';//concatenamos cada dato en la variable str
				}

				document.getElementById('Ncnl_asesor2').innerHTML = data.value.length+' Clientes encontrados';
				document.getElementById(USER_CODE).innerHTML = 'Usuario sap:: '+u_code.USER_CODE;
				document.getElementById('name_asesor2').innerText = u_code.U_NAME;
				document.getElementById(SalesPrson).innerHTML = 'SalesPrson: '+u_code.salesPrson;
				document.getElementById(empID).innerHTML = 'empID: '+u_code.empID;
				// document.getElementById('name_asesor2').innerText = elemento.options[elemento.selectedIndex].text;//obtinene el texto del elemento seleccionado
				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
				
				bandera = true;
				asesor_empID = u_code.empID;
				asesor_salesPrson = u_code.salesPrson;
			}

			showToast_G();
		}).catch(err => {
			showToast_E();
		})
	}
}

function getCodeCNL() {//obtener el código de los clientes seleccionados

	clientes = [];

	for (let i = 0; i < total_clientes; i++) {

        var rowCheck = document.getElementById("flexSwitchCheckChecked"+i).checked;
		if (rowCheck == true) {
			var x = document.getElementById("fila" + i).getElementsByTagName("td");
			clientes.push(x[2].innerHTML);
		}
	}
	console.log(total_clientes);
	console.log(clientes.length);
}

function change_owner() {
	// alert('cambio de propietario');



	getCodeCNL();

	if(confirm('¿Desea cambiar el propietario de los clientes seleccionados?') && bandera == true){
		console.log('aceptado');
		fetch("/clientes/owner",
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				clientes: clientes,
				empID: asesor_empID,
				salesPrson: asesor_salesPrson
			}),
		}
		).then(data => {//.then(res => res.json())
			// console.log(data);
			if(data.status == 200){
				// $("#options_select").dblclick();
				// $("#options_select2").dblclick();

				//volver a cargar los clientes
				get_clientes(params[0].elemento,params[0].table,params[0].select,params[0].Ncnl_asesor,params[0].SalesPrson,params[0].empID,params[0].USER_CODE,params[0].name_asesor)
				get_clientes(params[1].elemento,params[1].table,params[1].select,params[1].Ncnl_asesor,params[1].SalesPrson,params[1].empID,params[1].USER_CODE,params[1].name_asesor)
				showToast_G();
			
			}
		}).catch(err => {
			showToast_E
		})
	}else{
		showToast_E();
	}
	

}

function change_flexSwitch_true(table) {

	if (table == 't1') {
		// document.getElementById('btn-tranferirAlertas').disabled = false;//habilita el botón de transferir
		// document.getElementById('btn-asignar-alerta-center').disabled = false;//habilita el botón de transferir

		document.getElementById('btn_tranferirclientes').disabled = false;
		for (let i = 0; i < total_clientes; i++) {
			document.getElementById("flexSwitchCheckChecked"+i).checked = true//cambia el estado del switch
		}
	}else{
		document.getElementById('btn-quitarAlertas').disabled = false;
		for (let i = 0; i < total_clientes; i++) {
			document.getElementById("flexSwitchCheckChecked_"+i).checked = true//cambia el estado del switch
		}
	}
}

function change_flexSwitch_false(table) {

	if (table == 't1') {
		// document.getElementById('btn-tranferirAlertas').disabled = true;//deshabilita el botón de transferir
		// document.getElementById('btn-asignar-alerta-center').disabled = true;//deshabilita el botón de transferir
		
		document.getElementById('btn_tranferirclientes').disabled = true;
		for (let i = 0; i < total_clientes; i++) {
			document.getElementById("flexSwitchCheckChecked"+i).checked = false//cambia el estado del switch
		}
	}else{
		document.getElementById('btn-quitarAlertas').disabled = true;
		for (let i = 0; i < total_clientes; i++) {
			document.getElementById("flexSwitchCheckChecked_"+i).checked = false//cambia el estado del switch
		}
	}
}

function change_all_flexSwitch() {
	
	if (document.getElementById("flexSwitchCheckDefault").checked == true) {
		change_flexSwitch_true('t1');
	}else{
		change_flexSwitch_false('t1');
	}
}

function change_flexSwitch() {
	if(b1 == true && b2 == true){
		document.getElementById('btn_tranferirclientes').disabled = false;
	}
}

function showToast_G() {//https://getbootstrap.com/docs/5.0/components/toasts/
	return new bootstrap.Toast(liveToastGood, {animation:true,autohide:true ,delay:5000}).show();
}
function showToast_E() {//https://getbootstrap.com/docs/5.0/components/toasts/
return new bootstrap.Toast(liveToastErr, {animation:true,autohide:true ,delay:5000}).show();
}

function showToast_N() {//https://getbootstrap.com/docs/5.0/components/toasts/
	return new bootstrap.Toast(liveToastNothing, {animation:true,autohide:true ,delay:5000}).show();
}



//########################################################


// variables globales

let alerts_user = [];
let alerts_total = 0;



function getAlertUser(txtUsersap,table) {
	fetch("/alert/get",
		{
			method: 'POST',
			body: JSON.stringify({
				txtUsersap: txtUsersap
			})
			, headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(data => {

			var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla

			if (table == 'tabla1') {
				// -----------------Tabla-----------------
				let str = '';//creamos una variable para concatenar los datos
				alerts_total = data.message.length;
				for (var i = 0; i < data.message.length; i++) {//recorremos el arreglo de datos

					str += '<tr id="fila' + i + '">'
						// +'<th>&nbsp;<p>   </p></th>'
						+ '<td>' + i + '</td>'
						+ '<td>' + data.message[i]['Name'] + '</td>'
						+ '<td>' + data.message[i]['Code'] + '</td>'
						// +'<td>'+data.message[i]['UserSign']+'</td>'
						+ '<td >' +//class="form-check form-switch"
							// '<input onchange="imprimir(' + i + ')" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked' + i + '" checked>' +
							// '<label class="form-check-label" for="flexSwitchCheckChecked"></label>'
							'<div class="form-check form-switch">' +
													'<input  onchange="imprimir('+i+')" class="form-check-input" type="checkbox" role="switch"' 
																		+'id="flexSwitchCheckChecked'+i+'" checked>'
							+'</div>'+
						'</td>' +
						'</tr>';//concatenamos cada dato en la variable str
					// alert_total=data.message[i]['id__'];
				}
				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
			} else {
				// -----------------Tabla-----------------
				var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla
				let str = '';//creamos una variable para concatenar los datos
				for (var i = 0; i < data.message.length; i++) {//recorremos el arreglo de datos
					str += '<tr>'
						+ '<td>' + i + '</td>'
						+ '<td>' + data.message[i]['Name'] + '</td>' 
						+ '<td>' + data.message[i]['Code'] + '</td>'
						+ '<td >' +
							'<div class="form-check form-switch">' +
																	'<input class="form-check-input" type="checkbox" role="switch"' +
																		+'id="flexSwitchCheckChecked" checked>'
							+'</div>'
							+'</td>' +
					'</tr>';//concatenamos cada dato en la variable str
				}
				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
			}
		})
}

function tranferAlert() {
	// alert('tranferAlert');

	if (window.confirm('Seguro de realizar la acción?')) {
		fetch('/new', {
			method: 'POST',
			body: JSON.stringify({
				txtUsersap001: document.getElementById("txtUsersap001").value,
				txtUsersap002: document.getElementById("txtUsersap002").value
			})
			, headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(data => {
	
			if (data.message == true) {
				alert('Transferencia exitosa');
			} else if (data.message == 'Not exist alerts') {
				alert('No existen alertas para transferir');
			}
			else {
				alert('Error al transferir');
			}
		}).catch(err => {
			// var alert_err = document.getElementById("alert-err");
			// alert_err.classList.remove("d-none");
			// alert_err.innerText = err;
			alert('Error al transferir');
		});
	}
}

function alertDelete() {

    if (window.confirm('¿Seguro de Eliminar las alertas del usuario ' + document.getElementById("txtUsersap002").value + '?')) {

        fetch('/alert/delete', {
            method: 'POST',
            body: JSON.stringify({
                txtUsersap002: document.getElementById("txtUsersap002").value
            })
            , headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {

            if (data.message == true) {
				// alert('Eliminación exitosa');
				showToast_G();
            } else if (data.message == 'Not exist alerts') {
				// alert('No existen alertas para eliminar');
				showToast_E();
            }
            else {
				alert('Error al eliminar');
            }
        });
    }
}



function imprimir(id) {
    
    var flex = document.getElementById("flexSwitchCheckChecked"+id).checked;

    // flex.addEventListener("click", function(e) {
    //     e.value
    // });

    console.log(flex+' '+id);
}

function getElementTable() {
    
    let getFila = document.getElementsByTagName("5");

    let getData = document.getElementsByTagName("td");
    // let getData = document.getElementsByTagName("tr");
    // console.log(getFila );

    // var alert_total;
    
    
    for (let i = 0; i < total_clientes; i++) {
        // const element = array[i];

        
        // var x = getData[i].getElementsByTagName("td");
        var x = getData[i];

        var flex = document.getElementById("flexSwitchCheckChecked"+i).checked;
        // flex.addEventListener("click", function(e) {
        //     e.value
        // });

        if(flex == true){
            // alert('is check');
            console.log(flex +'--s'+i);
        }

        // alert(x)
    }
    // alert(alerts_total);
    alert(total_clientes);

}

function getCodeAlerts() {//obtener el código de las alertas seleccionadas
	
	for (let i = 0; i < total_clientes; i++) {

        var rowCheck = document.getElementById("flexSwitchCheckChecked"+i).checked;
		if (rowCheck == true) {
			var x = document.getElementById("fila" + i).getElementsByTagName("td");
			// console.log(x[2].innerHTML);
			clientes.push(x[2].innerHTML);
		}
	}
	console.log(total_clientes);
	console.log(clientes);
}



function tranferAlert2() {
	getCodeAlerts();
	if (window.confirm('Seguro de realizar la acción?')) {
		fetch('/new2', {
			method: 'POST',
			body: JSON.stringify({
				txtUsersap001: document.getElementById("txtUsersap001").value,
				txtUsersap002: document.getElementById("txtUsersap002").value,
				alerts_user: alerts_user
			})
			, headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(data => {
			console.log('test...');
			
			if (data.message == true) {
				alert('Transferencia exitosa');
			} else if (data.message == 'Not exist alerts') {
				alert('No existen alertas para transferir');
			}
			else {
				alert('Error al transferir');
			}
		}).catch(err => {
			alert('Error al transferir');
			console.log(err);
		});
	}
}













// 		SVGs

// exclamation-circle
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
//   <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
// </svg>


// check-circle
/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
	<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
</svg> */








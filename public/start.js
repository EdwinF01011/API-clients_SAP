

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

function get_clientes(elemento,table,select,Ncnl_asesor,SalesPrson,empID,USER_CODE) {

	document.getElementById(table).innerHTML = '';
	var u_code =JSON.parse(document.getElementById(select).value);
	console.log(u_code);

	if (u_code == 0) {
		document.getElementById(table).innerHTML = '';
		elemento.options[elemento.selectedIndex].text='';
		console.log('Ncnl_asesor :>> ', Ncnl_asesor);
		document.getElementById(Ncnl_asesor).innerHTML = '';
		document.getElementById(SalesPrson).innerHTML = '';
		document.getElementById(empID).innerHTML = '';
		document.getElementById(USER_CODE).innerHTML = '';

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
			for (var i = 0; i < data.value.length; i++) {//recorremos el arreglo de datos
				str += '<tr id="fila' + i + '">'
					+ '<td>' + i + '</td>'
					+ '<td>' + data.value[i]['CardName'] + '</td>'
					+ '<td>' + data.value[i]['CardCode'] + '</td>'
					+ '<td >' +//class="form-check form-switch"
						'<div class="form-check form-switch">' +
												'<input  onchange="imprimir('+i+')" class="form-check-input" type="checkbox" role="switch"' 
																	+'id="flexSwitchCheckChecked'+i+'" checked>'
						+'</div>'+
					'</td>' +
					'</tr>';//concatenamos cada dato en la variable str
			}
			if(table == 'tabla1'){
				document.getElementById('Ncnl_asesor').innerHTML = data.value.length+' Clientes encontrados';
				document.getElementById(USER_CODE).innerHTML = 'Usuario sap:: '+u_code.USER_CODE;
				document.getElementById(SalesPrson).innerHTML = 'SalesPrson: '+u_code.salesPrson;
				document.getElementById(empID).innerHTML = 'empID: '+u_code.empID;
				// document.getElementById('name_asesor').innerText = elemento.options[elemento.selectedIndex].text;//obtinene el texto del elemento seleccionado
				document.getElementById('name_asesor').innerText = u_code.U_NAME;

				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
			}else{
				document.getElementById('Ncnl_asesor2').innerHTML = data.value.length+' Clientes encontrados';
				document.getElementById(USER_CODE).innerHTML = 'Usuario sap:: '+u_code.USER_CODE;
				document.getElementById('name_asesor2').innerText = u_code.U_NAME;
				document.getElementById(SalesPrson).innerHTML = 'SalesPrson: '+u_code.salesPrson;
				document.getElementById(empID).innerHTML = 'empID: '+u_code.empID;
				// document.getElementById('name_asesor2').innerText = elemento.options[elemento.selectedIndex].text;//obtinene el texto del elemento seleccionado
				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
			}
		})
	}
}

function change_owner() {
	// alert('cambio de propietario');
	
	fetch("/clientes/owner",
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	).then(res => res.json()).then(data => {})

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

function showToast_G() {//https://getbootstrap.com/docs/5.0/components/toasts/
	return new bootstrap.Toast(liveToastGood, {animation:true,autohide:true ,delay:5000}).show();
}
function showToast_E() {//https://getbootstrap.com/docs/5.0/components/toasts/
return new bootstrap.Toast(liveToastErr, {animation:true,autohide:true ,delay:5000}).show();
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
    
    
    for (let i = 0; i < alerts_total; i++) {
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
    alert(alerts_total);

}

function getCodeAlerts() {//obtener el código de las alertas seleccionadas
	
	for (let i = 0; i < alerts_total; i++) {

        var rowCheck = document.getElementById("flexSwitchCheckChecked"+i).checked;
		if (rowCheck == true) {
			var x = document.getElementById("fila" + i).getElementsByTagName("td");
			// console.log(x[2].innerHTML);
			alerts_user.push(x[2].innerHTML);
		}
	}
	// console.log(alerts_user);
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








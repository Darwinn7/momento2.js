
// app.js
let clientes = [];
let cuentas = [];

function iniciarSesion() {
    // Aquí deberías implementar la lógica real de autenticación
    document.getElementById('login').style.display = 'none';
    document.getElementById('operaciones').style.display = 'block';
}

function cerrarSesion() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('operaciones').style.display = 'none';
}

function mostrarFormulario(tipo) {
    let formulario = '';
    switch(tipo) {
        case 'crearCliente':
            formulario = `
                <h3>Crear Cliente</h3>
                <input type="text" id="nombre" placeholder="Nombre">
                <input type="text" id="apellido" placeholder="Apellido">
                <input type="text" id="direccion" placeholder="Dirección">
                <input type="text" id="numeroIdentificacion" placeholder="Número de Identificación">
                <button onclick="crearCliente()">Crear Cliente</button>
            `;
            break;
        case 'crearCuenta':
            formulario = `
                <h3>Crear Cuenta</h3>
                <select id="tipoC

uenta">
                    <option value="corriente">Cuenta Corriente</option>
                    <option value="ahorros">Cuenta de Ahorros</option>
                </select>
                <input type="text" id="numeroCuenta" placeholder="Número de Cuenta">
                <input type="number" id="saldoInicial" placeholder="Saldo Inicial">
                <input type="text" id="clienteId" placeholder="ID del Cliente">
                <button onclick="crearCuenta()">Crear Cuenta</button>
            `;
            break;
        case 'realizarTransaccion':
            formulario = `
                <h3>Realizar Transacción</h3>
                <select id="tipoTransaccion">
                    <option value="deposito">Depósito</option>
                    <option value="retiro">Retiro</option>
                    <option value="transferencia">Transferencia</option>
                </select>
                <input type="text" id="numeroCuentaOrigen" placeholder="Número de Cuenta Origen">
                <input type="text" id="numeroCuentaDestino" placeholder="Número de Cuenta Destino (solo para transferencia)">
                <input type="number" id="monto" placeholder="Monto">
                <button onclick="realizarTransaccion()">Realizar Transacción</button>
            `;
            break;
        case 'consultarSaldo':
            formulario = `
                <h3>Consultar Saldo</h3>
                <input type="text" id="numeroCuentaConsulta" placeholder="Número de Cuenta">
                <button onclick="consultarSaldo()">Consultar Saldo</button>
            `;
            break;
    }
    document.getElementById('formularios').innerHTML = formulario;
}

function crearCliente() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const numeroIdentificacion = document.getElementById('numeroIdentificacion').value;
    
    const cliente = new Cliente(nombre, apellido, direccion, numeroIdentificacion);
    clientes.push(cliente);
    alert(`Cliente creado: ${nombre} ${apellido}`);
}

function crearCuenta() {
    const tipoCuenta = document.getElementById('tipoCuenta').value;
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    const saldoInicial = parseFloat(document.getElementById('saldoInicial').value);
    const clienteId = document.getElementById('clienteId').value;
    
    const cliente = clientes.find(c => c.numeroIdentificacion === clienteId);
    if (!cliente) {
        alert('Cliente no encontrado');
        return;
    }
    
    let cuenta;
    if (tipoCuenta === 'corriente') {
        cuenta = new CuentaCorriente(numeroCuenta, saldoInicial);
    } else {
        cuenta = new CuentaAhorros(numeroCuenta, saldoInicial);
    }
    
    cliente.agregarCuenta(cuenta);
    cuentas.push(cuenta);
    alert(`Cuenta creada: ${numeroCuenta}`);
}

function realizarTransaccion() {
    const tipoTransaccion = document.getElementById('tipoTransaccion').value;
    const numeroCuentaOrigen = document.getElementById('numeroCuentaOrigen').value;
    const numeroCuentaDestino = document.getElementById('numeroCuentaDestino').value;
    const monto = parseFloat(document.getElementById('monto').value);
    
    const cuentaOrigen = cuentas.find(c => c.numeroCuenta === numeroCuentaOrigen);
    if (!cuentaOrigen) {
        alert('Cuenta de origen no encontrada');
        return;
    }
    
    let resultado;
    switch(tipoTransaccion) {
        case 'deposito':
            resultado = cuentaOrigen.realizarDeposito(monto);
            break;
        case 'retiro':
            resultado = cuentaOrigen.realizarRetiro(monto);
            break;
        case 'transferencia':
            const cuentaDestino = cuentas.find(c => c.numeroCuenta === numeroCuentaDestino);
            if (!cuentaDestino) {
                alert('Cuenta de destino no encontrada');
                return;
            }
            if (cuentaOrigen instanceof CuentaCorriente) {
                resultado = cuentaOrigen.realizarTransferencia(cuentaDestino, monto);
            } else {
                alert('Solo las cuentas corrientes pueden realizar transferencias');
                return;
            }
            break;
    }
    
    alert(resultado);
}

function consultarSaldo() {
    const numeroCuenta = document.getElementById('numeroCuentaConsulta').value;
    const cuenta = cuentas.find(c => c.numeroCuenta === numeroCuenta);
    if (cuenta) {
        alert(`Saldo de la cuenta ${numeroCuenta}: $${cuenta.consultarSaldo()}`);
    } else {
        alert('Cuenta no encontrada');
    }
}

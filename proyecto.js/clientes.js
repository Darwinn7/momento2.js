// cliente.js
class Cliente {
    constructor(nombre, apellido, direccion, numeroIdentificacion) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.direccion = direccion;
      this.numeroIdentificacion = numeroIdentificacion;
      this.cuentas = [];
    }
  
    agregarCuenta(cuenta) {
      this.cuentas.push(cuenta);
    }
  
    consultarSaldo(numeroCuenta) {
      const cuenta = this.cuentas.find(c => c.numeroCuenta === numeroCuenta);
      return cuenta ? cuenta.consultarSaldo() : "Cuenta no encontrada";
    }
  
    realizarDeposito(numeroCuenta, monto) {
      const cuenta = this.cuentas.find(c => c.numeroCuenta === numeroCuenta);
      return cuenta ? cuenta.realizarDeposito(monto) : "Cuenta no encontrada";
    }
  
    realizarRetiro(numeroCuenta, monto) {
      const cuenta = this.cuentas.find(c => c.numeroCuenta === numeroCuenta);
      return cuenta ? cuenta.realizarRetiro(monto) : "Cuenta no encontrada";
    }
  }
  
  // cuenta.js
  class Cuenta {
    constructor(numeroCuenta, saldoInicial = 0) {
      this.numeroCuenta = numeroCuenta;
      this.saldo = saldoInicial;
    }
  
    consultarSaldo() {
      return this.saldo;
    }
  
    realizarDeposito(monto) {
      if (monto > 0) {
        this.saldo += monto;
        return Depósito (`de ${monto} realizado. Nuevo saldo: ${this.saldo}`);
      }
      return "El monto del depósito debe ser positivo";
    }
  
    realizarRetiro(monto) {
      if (monto > 0 && this.saldo >= monto) {
        this.saldo -= monto;
        return Retiro (`de ${monto} realizado. Nuevo saldo: ${this.saldo}`);
      }
      return "Fondos insuficientes o monto inválido";
    }
  }
  
  // cuentaCorriente.js
  class CuentaCorriente extends Cuenta {
    constructor(numeroCuenta, saldoInicial = 0, descubiertoPermitido = 0) {
      super(numeroCuenta, saldoInicial);
      this.descubiertoPermitido = descubiertoPermitido;
    }
  
    realizarRetiro(monto) {
      if (monto > 0 && (this.saldo + this.descubiertoPermitido) >= monto) {
        this.saldo -= monto;
        return Retiro (`de ${monto} realizado. Nuevo saldo: ${this.saldo}`);
      }
      return "Fondos insuficientes o monto inválido";
    }
  
    realizarTransferencia(cuentaDestino, monto) {
      if (this.realizarRetiro(monto) !== "Fondos insuficientes o monto inválido") {
        cuentaDestino.realizarDeposito(monto);
        return Transferencia (`de ${monto} realizada a la cuenta ${cuentaDestino.numeroCuenta}`);
      }
      return "No se pudo realizar la transferencia";
    }
  }
  
  // cuentaAhorros.js
  class CuentaAhorros extends Cuenta {
    constructor(numeroCuenta, saldoInicial = 0, tasaInteres = 0.01) {
      super(numeroCuenta, saldoInicial);
      this.tasaInteres = tasaInteres;
    }
  
    calcularIntereses() {
      const intereses = this.saldo * this.tasaInteres;
      this.saldo += intereses;
      return Intereses (`calculados: ${intereses} Nuevo saldo: ${this.saldo}`);
    }
  }
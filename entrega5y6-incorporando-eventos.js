//1 - Declaración e inicialización de variables a utilizar
//1. a - variables vinculadas con: (i) cantidad de productos a llevar por tipo (llavero/iman) y equipo + subtotales de la compra + constantes necesarias para el cálculo del valor final de la compra (precios unitarios por llavero e iman + porcentaje de aumento seleccionando las distintas cuotas ofrecidas)
let arrayPedidos = []
let idPedidos = 0
let llaverosCASLA = 0
let imanesCASLA = 0
let llaverosCABJ = 0
let imanesCABJ = 0
let llaverosCARP = 0
let imanesCARP = 0
let llaverosCAI = 0
let imanesCAI = 0
let llaverosRC = 0
let imanesRC = 0
let subtotal = 0
let subtotalImanes = 0
let subtotalLlaveros = 0
const VALOR_UNIDAD_LLAVERO = 170
const VALOR_UNIDAD_IMAN = 200
const PORCENTAJE_AUMENTO_3CUOTAS = 5
const PORCENTAJE_AUMENTO_6CUOTAS = 10
const PORCENTAJE_AUMENTO_12CUOTAS = 15

//inicio de la declaración de las variables vinculadas con DOM (conexión con elementos HTML)
//elementos HTML de pedidos
let selectorEquipo
let selectorTipoProducto
let inputUnidades
let selectorCuotas
    //elementos HTML de datos del cliente
let inputNombre
let inputApellido
let inputDocumento
let inputDireccion
let inputTelContacto
    //elementos HTML de pizarra en donde se escriben los pedidos
let pizarraPedidos
    //elementos HTML de botones
let botonAgregarPedido
let botonResetearEcommerce
    //elementos HTML de labels
let labelResumenCarrito
let labelValoresCarrito
let labelSubTotalCarrito
let labelCuotasCarrito
let labelRecargoCuotasCarrito
let labelValorTotalCarrito
let labelValorTotalPorCuota
let labelMensajeFinal



//1.b - variables vinculadas con datos de envio del cliente
let dniUsuario = ""
let direccionUsuario = ""
let telContactoUsuario = ""
    //2 - Declaración de clases a utilizar en el algoritmo
    //2.a - Declaración de clase 'Pedido': permite, por cada iteración, generar un objeto que represente lo que el cliente/usuario eligió agregar al carrito (equipo elegido en la iteración + tipo de producto que lleva en la iteración + unidades que lleva en la iteración)
class Pedido {
    constructor(id, equipo, tipoProducto, unidades) {
        this.id = id
        this.equipo = equipo
        this.tipoProducto = tipoProducto
        this.unidades = unidades
    }
}
//2.b - Declaración de clase 'Carrito': Permite crear un objeto que 'simula' al carrito de compras del usuario (contiene el resumen de todos los pedidos efectuados en las distintas iteraciones).
//Además de lo explicado en la línea anterior, tiene métodos que permiten obtener datos del carrito de compras
class Carrito {
    constructor() {
        this.llaverosCASLA = 0
        this.imanesCASLA = 0
        this.llaverosCABJ = 0
        this.imanesCABJ = 0
        this.llaverosCARP = 0
        this.imanesCARP = 0
        this.llaverosCAI = 0
        this.imanesCAI = 0
        this.llaverosRC = 0
        this.imanesRC = 0
        this.cuotasElegidas = "1"
        this.subTotal = 0
    }
    devolverCantidadDeImanes() {
        return (this.imanesCABJ + this.imanesCARP + this.imanesCASLA + this.imanesCAI + this.imanesRC)
    }
    devolverCantidadDeLlaveros() {
        return (this.llaverosCABJ + this.llaverosCARP + this.llaverosCASLA + this.llaverosCAI + this.llaverosRC)
    }
    rellenarSubTotal(catalogoPrecios) {
        let cantidadImanes = this.imanesCABJ + this.imanesCARP + this.imanesCASLA + this.imanesCAI + this.imanesRC
        let cantidadLlaveros = this.llaverosCABJ + this.llaverosCARP + this.llaverosCASLA + this.llaverosCAI + this.llaverosRC
        let subTotalSoloDeImanes = cantidadImanes * catalogoPrecios.valorUnitarioIman
        let subTotalSoloDeLlaveros = cantidadLlaveros * catalogoPrecios.valorUnitarioLlavero
        this.subTotal = subTotalSoloDeImanes + subTotalSoloDeLlaveros

    }
    devolverValorFinal(catalogoPrecios) {
        let valorFinal
        let montoAgregado
        switch (this.cuotasElegidas) {
            case "1":
                valorFinal = this.subTotal
                return valorFinal
            case "3":
                montoAgregado = (this.subTotal * catalogoPrecios.recargo3Cuotas) / 100
                valorFinal = this.subTotal + montoAgregado
                return valorFinal
            case "6":
                montoAgregado = (this.subTotal * catalogoPrecios.recargo6Cuotas) / 100
                valorFinal = this.subTotal + montoAgregado
                return valorFinal
            case "12":
                montoAgregado = (this.subTotal * catalogoPrecios.recargo12Cuotas) / 100
                valorFinal = this.subTotal + montoAgregado
                return valorFinal
        }
    }
}

//2.c - Declaración de clase 'Cliente': permite generar un objeto que contiene todos los datos del cliente/usuario del simulador de ecommerce (los cuales son ingresados por el cliente a través de 'prompts')
class Cliente {
    constructor() {
        this.nombre = ""
        this.apellido = ""
        this.dni = ""
        this.direccion = ""
        this.telContacto = ""
    }

    devolverNombreYApellido() {
        return (this.nombre + " " + this.apellido)
    }
}

//2.d - Declaración de clase 'Precios': permite generar un objeto de tipo "catálogo", que en sus propiedades contiene a los valores unitarios de los productos que se venden en la tienda + el porcentaje de recargo que establece el sistema de acuerdo a las cuotas que elija el cliente para pagar
class Precios {
    constructor(valorUnitarioIman, valorUnitarioLlavero, recargo3Cuotas, recargo6Cuotas, recargo12Cuotas) {
        this.valorUnitarioIman = valorUnitarioIman
        this.valorUnitarioLlavero = valorUnitarioLlavero
        this.recargo3Cuotas = recargo3Cuotas
        this.recargo6Cuotas = recargo6Cuotas
        this.recargo12Cuotas = recargo12Cuotas
    }
}


//3 - Declaración de funciones a utilizar en el algoritmo

function calcularValorFinal(subtotal, cuotas) {
    let valorFinal
    let montoAgregado
    switch (cuotas) {
        case "1":
            valorFinal = subtotal
            return valorFinal
        case "3":
            montoAgregado = (subtotal * PORCENTAJE_AUMENTO_3CUOTAS) / 100
            valorFinal = subtotal + montoAgregado
            return valorFinal
        case "6":
            montoAgregado = (subtotal * PORCENTAJE_AUMENTO_6CUOTAS) / 100
            valorFinal = subtotal + montoAgregado
            return valorFinal
        case "12":
            montoAgregado = (subtotal * PORCENTAJE_AUMENTO_12CUOTAS) / 100
            valorFinal = subtotal + montoAgregado
            return valorFinal
    }
}

function calcularValorPorCuota(valorFinal, cuotas) {
    return (valorFinal / parseInt(cuotas))
}



function usuarioCompro() {
    return (arrayPedidos.length > 0)
}





function sumarUnidadesPorEquipoYProducto(equipo, producto, unidades) {
    switch (equipo) {
        case "Boca Juniors":
            if (producto == "Imanes") {
                imanesCABJ = imanesCABJ + unidades
            } else {
                llaverosCABJ = llaverosCABJ + unidades
            }
            break
        case "River Plate":
            if (producto == "Imanes") {
                imanesCARP = imanesCARP + unidades
            } else {
                llaverosCARP = llaverosCARP + unidades
            }
            break
        case "San Lorenzo":
            if (producto == "Imanes") {
                imanesCASLA = imanesCASLA + unidades
            } else {
                llaverosCASLA = llaverosCASLA + unidades
            }
            break
        case "Independiente":
            if (producto == "Imanes") {
                imanesCAI = imanesCAI + unidades
            } else {
                llaverosCAI = llaverosCAI + unidades
            }
            break
        case "Racing":
            if (producto == "Imanes") {
                imanesRC = imanesRC + unidades
            } else {
                llaverosRC = llaverosRC + unidades
            }
            break
        default:
            break
    }

}

function llenarCarrito(arrayPedidos, catalogoPrecios) {
    const carritoADevolver = new Carrito()
    for (const pedido of arrayPedidos) {
        switch (pedido.equipo) {
            case "Boca Juniors":
                if (pedido.tipoProducto == "Imanes") {
                    carritoADevolver.imanesCABJ = carritoADevolver.imanesCABJ + pedido.unidades
                } else {
                    carritoADevolver.llaverosCABJ = carritoADevolver.llaverosCABJ + pedido.unidades
                }
                break
            case "River Plate":
                if (pedido.tipoProducto == "Imanes") {
                    carritoADevolver.imanesCARP = carritoADevolver.imanesCARP + pedido.unidades
                } else {
                    carritoADevolver.llaverosCARP = carritoADevolver.llaverosCARP + pedido.unidades
                }
                break
            case "San Lorenzo":
                if (pedido.tipoProducto == "Imanes") {
                    carritoADevolver.imanesCASLA = carritoADevolver.imanesCASLA + pedido.unidades
                } else {
                    carritoADevolver.llaverosCASLA = carritoADevolver.llaverosCASLA + pedido.unidades
                }
                break
            case "Independiente":
                if (pedido.tipoProducto == "Imanes") {
                    carritoADevolver.imanesCAI = carritoADevolver.imanesCAI + pedido.unidades
                } else {
                    carritoADevolver.llaverosCAI = carritoADevolver.llaverosCAI + pedido.unidades
                }
                break
            case "Racing":
                if (pedido.tipoProducto == "Imanes") {
                    carritoADevolver.imanesRC = carritoADevolver.imanesRC + pedido.unidades
                } else {
                    carritoADevolver.llaverosRC = carritoADevolver.llaverosRC + pedido.unidades
                }
                break
            default:
                break
        }

    }
    let cuotasElegidas = selectorCuotas.value
    carritoADevolver.cuotasElegidas = cuotasElegidas
    return carritoADevolver
}

//función que inicializa todas las variables vinculadas al DOM y conecta variables con elementos HTML
function inicializarDOM() {
    selectorEquipo = document.getElementById("selectorEquipo")
    selectorTipoProducto = document.getElementById("selectorTipoProducto")
    inputUnidades = document.getElementById("inputCantidad")
    inputNombre = document.getElementById("inputNombre")
    inputApellido = document.getElementById("inputApellido")
    inputDocumento = document.getElementById("inputDocumento")
    inputDireccion = document.getElementById("inputDireccion")
    inputTelContacto = document.getElementById("inputTelContacto")
    selectorCuotas = document.getElementById("selectorCuotas")
    pizarraPedidos = document.getElementById("vidrieraPedidos")
    formularioPedidos = document.getElementById("formPedidos")
    formularioPedidos.onsubmit = (event) => agregarPedido(event)
    labelResumenCarrito = document.getElementById("resumenCarrito")
    labelValoresCarrito = document.getElementById("valoresCarrito")
    labelSubTotalCarrito = document.getElementById("subTotalCarrito")
    labelCuotasCarrito = document.getElementById("cuotasCarrito")
    labelRecargoCuotasCarrito = document.getElementById("recargoCuotasCarrito")
    labelValorTotalCarrito = document.getElementById("valorTotalCarrito")
    labelValorTotalPorCuota = document.getElementById("valorPorCuota")
    labelMensajeFinal = document.getElementById("mensajeFinal")
    formularioDatosAdicionales = document.getElementById("formDatosAdicionales")
    formularioDatosAdicionales.onsubmit = (event) => finalizarCompra(event)
    botonResetearEcommerce = document.getElementById("resetearEcommerce")
    botonResetearEcommerce.addEventListener("click", () => resetearEcommerce())
}

function agregarPedido(event) {
    event.preventDefault()
    if (inputUnidades.value == "") {
        alert("Complete todos los campos por favor")
    } else {
        let equipoElegido = selectorEquipo.value
        let tipoProductoElegido = selectorTipoProducto.value
        let unidadesElegidas = parseInt(inputUnidades.value)
        if ((equipoElegido == "") || (tipoProductoElegido == "") || (unidadesElegidas == 0)) {
            alert("El pedido no pudo ser agregado, ingrese valores correctos")
        } else {
            idPedidos = idPedidos + 1
            const nuevoPedido = new Pedido(idPedidos, equipoElegido, tipoProductoElegido, unidadesElegidas)
            arrayPedidos.push(nuevoPedido)
            pintarNuevoPedido(nuevoPedido)
        }
    }
}

//función que se activa cuando el usuario decide apretar en el botón "finalizar compra" (para poder obtener un resultado positivo, deberá tener al menos un pedido en el carrito)
function finalizarCompra(event) {
    event.preventDefault()
    if ((inputNombre.value == "") || (inputApellido.value == "") || (inputDocumento.value == "") || (inputDireccion.value == "") || (inputTelContacto.value == "") || (selectorCuotas.value == "")) {
        alert("La compra no pudo ser procesada. Ingrese todos los campos por favor.")
    } else {
        if (usuarioCompro()) {
            const catalogoPrecios = new Precios(VALOR_UNIDAD_IMAN, VALOR_UNIDAD_LLAVERO, PORCENTAJE_AUMENTO_3CUOTAS, PORCENTAJE_AUMENTO_6CUOTAS, PORCENTAJE_AUMENTO_12CUOTAS)
            const clienteActual = new Cliente()
            clienteActual.nombre = inputNombre.value
            clienteActual.apellido = inputApellido.value
            clienteActual.dni = inputDocumento.value
            clienteActual.direccion = inputDireccion.value
            clienteActual.telContacto = inputTelContacto.value
            const carritoDeCompra = llenarCarrito(arrayPedidos, catalogoPrecios)
            carritoDeCompra.rellenarSubTotal(catalogoPrecios)
            let mensajeResumenPedido =
                `<h6>Productos de Boca: ${carritoDeCompra.imanesCABJ} imanes + ${carritoDeCompra.llaverosCABJ} llaveros</h6>
     <h6>Productos de River: ${carritoDeCompra.imanesCARP} imanes + ${carritoDeCompra.llaverosCARP} llaveros</h6>
     <h6>Productos de San Lorenzo: ${carritoDeCompra.imanesCASLA} imanes + ${carritoDeCompra.llaverosCASLA} llaveros</h6>
     <h6>Productos de Independiente: ${carritoDeCompra.imanesCAI} imanes + ${carritoDeCompra.llaverosCAI} llaveros</h6>
     <h6>Productos de Racing: ${carritoDeCompra.imanesRC} imanes + ${carritoDeCompra.llaverosRC} llaveros</h6>
    `
            let mensajeValoresCarrito =
                `<h6>(Total de imanes: ${carritoDeCompra.devolverCantidadDeImanes()}) x (Valor unitario iman: $${catalogoPrecios.valorUnitarioIman}) = $${carritoDeCompra.devolverCantidadDeImanes() * catalogoPrecios.valorUnitarioIman}</h6>
    <h6>(Total de llaveros: ${carritoDeCompra.devolverCantidadDeLlaveros()}) x (Valor unitario llavero: $${catalogoPrecios.valorUnitarioLlavero}) = $${carritoDeCompra.devolverCantidadDeLlaveros() * catalogoPrecios.valorUnitarioLlavero}</h6>
    `
            let mensajeSubTotal = carritoDeCompra.subTotal
            let cantidadCuotasElegidas = selectorCuotas.value
            let recargoCuotasElegidas
            switch (cantidadCuotasElegidas) {
                case "1":
                    recargoCuotasElegidas = "0%"
                    break
                case "3":
                    recargoCuotasElegidas = PORCENTAJE_AUMENTO_3CUOTAS + "%"
                    break
                case "6":
                    recargoCuotasElegidas = PORCENTAJE_AUMENTO_6CUOTAS + "%"
                    break
                case "12":
                    recargoCuotasElegidas = PORCENTAJE_AUMENTO_12CUOTAS + "%"
                    break
            }
            let mensajeTotalAAbonar = carritoDeCompra.devolverValorFinal(catalogoPrecios)
            let mensajeTotalAAbonarPorCuota = (mensajeTotalAAbonar / parseInt(carritoDeCompra.cuotasElegidas))
            let mensajeFinalAlCliente = clienteActual.devolverNombreYApellido() + "(Doc. N° " + clienteActual.dni + "), muchas gracias por su compra. Su pedido será despachado en las próximas semanas a la dirección '" + clienteActual.direccion + "'. En breve le llegará el link de seguimiento al teléfono de contacto '" + clienteActual.telContacto + "'."
            labelMensajeFinal = document.getElementById("mensajeFinal")
            labelResumenCarrito.innerHTML = mensajeResumenPedido
            labelValoresCarrito.innerHTML = mensajeValoresCarrito
            labelSubTotalCarrito.innerText = "Subtotal: $" + mensajeSubTotal
            labelCuotasCarrito.innerText = "Cantidad de cuotas elegidas: " + cantidadCuotasElegidas
            labelRecargoCuotasCarrito.innerText = "Recargo por las cuotas elegidas: " + recargoCuotasElegidas
            labelValorTotalCarrito.innerText = "Total a abonar: $" + mensajeTotalAAbonar
            labelValorTotalPorCuota.innerText = "Total a abonar por cuota: $" + mensajeTotalAAbonarPorCuota
            labelMensajeFinal.innerText = mensajeFinalAlCliente
        } else {
            alert("carrito vacío, no se puede avanzar.")
        }
    }
}

//función que pinta, en la "vidriera de pedidos", un nuevo pedido registrado por el usuario a través del form de pedidos.
function pintarNuevoPedido(pedidoAPintar) {
    let nuevaCard = document.createElement("div")
    nuevaCard.id = `card-pedido${pedidoAPintar.id}`
    nuevaCard.innerHTML = `
    <div class="card" style="width: 15rem;">
        <div class="card-body">
            <h5 class="card-title">${pedidoAPintar.equipo}</h5>
            <p class="card-text">Tipo de producto: <strong>${pedidoAPintar.tipoProducto}</strong></p>
            <p class="card-text">Unidades solicitadas: <strong>${pedidoAPintar.unidades}</strong></p>
            <a href="#" id="eliminarPedido${pedidoAPintar.id}" class="btn btn-danger">Sacar del carrito</a>
        </div>
    </div>`
    pizarraPedidos.append(nuevaCard)
    let botonEliminarPedidoNuevo = document.getElementById(`eliminarPedido${pedidoAPintar.id}`)
    botonEliminarPedidoNuevo.addEventListener("click", () => eliminarPedido(pedidoAPintar.id))
    console.log(arrayPedidos)
}

//función que elimina un pedido del carrito, tanto de la "vidriera de pedidos" en donde se pinta el pedido, como del array de pedidos (para borrarlo definitivamente del algoritmo)
function eliminarPedido(idAEliminar) {
    let cardABorrar = document.getElementById(`card-pedido${idAEliminar}`)
    cardABorrar.remove()
    let contador = 0
    let indexAEliminar = 0
    for (const pedido of arrayPedidos) {
        if (pedido.id == idAEliminar) {
            indexAEliminar = contador
        }
        contador = contador + 1
    }
    arrayPedidos.splice(indexAEliminar, 1)
    console.log(arrayPedidos)
}

//función que se activa cuando el usario clickea en el botón "reiniciar ecommerce"
function resetearEcommerce() {
    //limpio la vidriera de pedidos (cards que aparecen en pantalla)
    pizarraPedidos.innerHTML = ""
        //limpio el array de pedidos para que quede completamente vacio
    while (arrayPedidos.length > 0) {
        arrayPedidos.pop()
    }
    console.log(arrayPedidos)
        //limpio los campos del HTML para que quede todo como al principio
    labelResumenCarrito.innerHTML = ""
    labelValoresCarrito.innerHTML = ""
    labelSubTotalCarrito.innerText = "Subtotal:"
    labelCuotasCarrito.innerText = "Cantidad de cuotas elegidas:"
    labelRecargoCuotasCarrito.innerText = "Recargo por las cuotas elegidas:"
    labelValorTotalCarrito.innerText = "Total a abonar:"
    labelValorTotalPorCuota.innerText = "Total a abonar por cuota:"
    labelMensajeFinal.innerText = ""
}

function main() {
    inicializarDOM()
}

//función principal
main()
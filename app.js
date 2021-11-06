let autos = require('./autos');

let concesionaria = {
    autos: autos,
    buscarAuto: function(patente){
        let listaFiltrada = autos.filter(autos => patente == autos.patente);
        if (listaFiltrada.length == 1) {
            return listaFiltrada[0];
        } else {
            return null;
        }
    },
    venderAuto: function(patente){
        let auto = this.buscarAuto(patente);
        return auto.vendido = true;
    },
    autosParaLaVenta: function(){
        let listaAutosNoVendidos = autos.filter(autos => autos.vendido == false);
        return listaAutosNoVendidos;
    },
    autosNuevos: function() {
        let autosParaVender = this.autosParaLaVenta();
        let listaAutos0Km = autosParaVender.filter(autos => autos.km == 0 || autos.km <= 100);
        return listaAutos0Km;
    },
    listaDeVentas: function() {
        let listaAutosVendidos = autos.filter(autos => autos.vendido == true);
        return listaAutosVendidos.map(autos => autos.precio);
    },
    totalDeVentas: function() {
        let totalDeVentas = this.listaDeVentas();
        if (totalDeVentas.length !== 0 && totalDeVentas.auto) {
        return totalDeVentas.reduce((acumulador,numero) => acumulador + numero);
        } else {
            return 0;
        }
    },
    puedeComprar: function(auto,persona) {
        let cuotaAuto = auto.precio / auto.cuotas;
            if (auto.precio <= persona.capacidadDePagoTotal && cuotaAuto <= persona.capacidadDePagoEnCuotas) {
                return true;
            } else {
                return false;
            }
    },
    autosQuePuedeComprar: function (persona){
        let listaAutosParaLaVenta = this.autosParaLaVenta();
        let listaAutosQuePuedeComprar = listaAutosParaLaVenta.filter(function(auto) { 
            return concesionaria.puedeComprar(auto,persona) == true; 
        });
        return listaAutosQuePuedeComprar;       
    }
}      
console.log(concesionaria.puedeComprar(
    {
    nombre:'Juan',
    capacidadDePagoEnCuotas: 7200,
    capacidadDePagoTotal: 100000000,
    }
    ));


/*Un auto con precio: 150000 y cuotas: 12 no puede ser comprado por una persona 
con capacidadDePagoEnCuotas:100 y capacidadDePagoTotal 100000000*/


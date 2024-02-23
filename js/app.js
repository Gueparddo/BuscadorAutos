//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const pMin = document.querySelector('#minimo');
const pMax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color')
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 14;

//Generar un object con la busqueda
const datosBusqueda={
    marca: '',
    year: '',
    pMin: '',
    pMax: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);//Muestra los autos a cargar

    //LLena las opciones de años
    llenarSelect();
})

//Event listener para select de busqueda
marca.addEventListener('change',(e)=>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change',(e)=>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
})

pMin.addEventListener('change',(e)=>{
    datosBusqueda.pMin = e.target.value;

    filtrarAuto();
})

pMax.addEventListener('change', (e) =>{
    datosBusqueda.pMax = e.target.value;

    filtrarAuto();
})

puertas.addEventListener('change', (e) =>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
})

transmision.addEventListener('change', (e) =>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
})

color.addEventListener('change', (e) =>{
    datosBusqueda.color = e.target.value;

    filtrarAuto();
})


//Funciones
function mostrarAutos (autos){

    LimpiarHTML();//Elimina el HTML previo

    autos.forEach(auto =>{
        const{marca, modelo, year, precio, puertas, color, transmision}= auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} - ${modelo} - -${year} - ${precio} - ${puertas} - ${color} - ${transmision}
        `;

        //Insertar resultado en el HTML
        resultado.appendChild(autoHTML);
    })
}

//Limpiar HTML
function LimpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera años de select
function llenarSelect (){
    for(let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);//Agrega las opciones del año al select
    }
}


//Funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMin).filter(filtrarMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
  
    if(resultado.length){
        mostrarAutos(resultado)
    }else{
        noResultado();
    }

}

function noResultado(){

    LimpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado, intenta con otros términos de busqueda'
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){//Funciones de alto nivel: Funciones que toman otra función como parametro
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
};

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === year;
    }
    return auto;
}

function filtrarMin(auto){
    const{pMin} = datosBusqueda;
    if(pMin){
        return auto.precio >= pMin
    }
    return auto;
}

function filtrarMax(auto){
    const{pMax} = datosBusqueda;
    if(pMax){
        return auto.precio <= pMax
    }
    return auto;
}

function filtrarPuertas(auto){
    const{puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const{transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const{color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}


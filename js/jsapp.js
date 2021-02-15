const BtnAgregar = document.querySelector('#lista-cursos');
console.log(BtnAgregar);
const TablaCarrito = document.querySelector('#lista-carrito tbody');
const BtnEliminarTodosCursos = document.querySelector('#vaciar-carrito');
const Carrito = document.querySelector('#carrito');

let cursos = [];


BtnAgregar.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        console.log('He llegado');
        CapturarInformacion(e.target.parentElement.parentElement);
    }
});

BtnEliminarTodosCursos.addEventListener('click',(e)=>{
    e.preventDefault();
    cursos = [];
    MostrarCursos();
});


function EliminarCursoCarrito(id){
    const curso = cursos.find(curso=>curso.id===id);
    curso.cantidad > 1 ? curso.cantidad-- : cursos.splice(cursos.indexOf(curso),1);
    MostrarCursos();
    }

Carrito.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const id_curso = e.target.getAttribute('data-id');
        EliminarCursoCarrito(id_curso);
    }
})

function CapturarInformacion(card){

    const id_curso = card.querySelector('a').getAttribute('data-id')
    if((cursos.some(curso=>curso.id === id_curso))){
        console.log("Ya esta");
        cursos.forEach((curso)=>{
            if(curso.id === id_curso){
                curso.cantidad++;
                MostrarCursos();
            }
        })
    }else{
        const curso = {
            img: card.querySelector('img').src,
            nombre: card.querySelector('h4').textContent,
            precio: card.querySelector('.precio span').textContent,
            cantidad: 1,
            id: card.querySelector('a').getAttribute('data-id')
        }
        cursos.push(curso);
        MostrarCursos();  
    }
    
}

function MostrarCursos() {
    //Limpiar Cursos
    TablaCarrito.innerHTML='';
    cursos.forEach((curso)=>{
        const row = document.createElement('tr');
        row.innerHTML=`
            <td><img src="${curso.img}" width=100></td>
            <td>${curso.nombre}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
    TablaCarrito.appendChild(row);
    })
}


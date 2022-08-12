const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []



Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}

const btnMostrarAlert = document.getElementById("btn-mostrar-alert");
      btnMostrarAlert.onclick = mostrarAlert;

      function mostrarAlert (){
      Swal.fire({
        icon: 'success',
        title: 'Productor agregado al carrito!',
        
      })
    }

    const btnMostrarAlert2 = document.getElementById("btn-mostrar-alert-2");
      btnMostrarAlert2.onclick = mostrarAlert;

      function mostrarAlert (){
      Swal.fire({
        icon: 'success',
        title: 'Productor agregado al carrito!',
        
      })
    }

    const btnMostrarAlert3 = document.getElementById("btn-mostrar-alert-3");
      btnMostrarAlert3.onclick = mostrarAlert;

      function mostrarAlert (){
      Swal.fire({
        icon: 'success',
        title: 'Productor agregado al carrito!',
        
      })
    }

function addItemCarrito(newItem){

 

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}


/*FORMULARIO */

// Valida formulario y realiza petición API para envío de correo

// constante para document y asi solo usar d
const d = document;

// Realiza una validación de formulario
function contactForm() {
  const $form = d.querySelector(".contact-form");
  $inputs = d.querySelectorAll(".contact-form [required]");

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });
  // Valida la entrada del input al sacar el mouse de esta
  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;
      // agrega un cartel de error según lo que pongamos en tittle de los inputs
      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }

      if (!pattern) {
        return $input.value !== ""
          ? d.getElementById($input.name).classList.remove("is-active")
          : d.getElementById($input.name).classList.add("is-active");
      }
    }
  });

  // Valida el botón enviar y previene que la pagina se refresque
  d.addEventListener("submit", (e) => {
    e.preventDefault();
    const $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    // API envía correo electrónico a traves de una petición AJAX
    
    //Aqui el usuario debe cambiar el parámetro por su correo y realizar la activación de la API
    fetch("https://formsubmit.co/ajax/yiriluwa@maildim.com", {
      method: "POST",
      body: new FormData(e.target)
    })
      .then((respuesta) =>
        respuesta.ok ? respuesta.json() : Promise.reject(res)
      )
      // Si la respuesta es correcta toma 3 segundos en realizar el envío
      .then((json) => {
        console.log(json);
        // agrega un loader debajo del botón enviar
        $loader.classList.add("none");
        // remueve el loader una vez realizada la petición
        $response.classList.remove("none");
        // agrega un mensaje de la API
        $response.innerHTML = `<p>${json.message}</p>`;
        // Si es ok, envia una alerta con datos enviados
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: "success",
          title: "Los datos han sido enviados"
        });
        // Si es enviado el formulario este se limpia
        $form.reset();
      })
      // Si la respuesta de la API es errónea arroja un error con sweetalert
      .catch((error) => {
        console.log(error);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: "error",
          title: "Hemos tenido un problema, intenta de nuevo"
        });
        $loader.classList.add("none");
        let message =
          error.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.innerHTML = `<p>Error ${error.status}:${message}</p>`;
      })
      .finally(() =>
        setTimeout(() => {
          $response.classList.add("none");
          $response.innerHTML = "";
        }, 3000)
      );
  });
}

// Se agrega un evento si el contenido es cargado se realiza el llamado.
d.addEventListener("DOMContentLoaded", contactForm);

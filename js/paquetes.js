const { createApp } = Vue
  createApp({
    data() {
      return {
        paquetes:[],
        url:'http://localhost:5000/paquetes', 
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        imagen:"",
        cupos:0,
        precio:0,

        /* propiedades para validación del formulario */
        nombreValido: false,
        imagenValida: false,
        cuposValido: false,
        precioValido: false,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.paquetes = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(paquete) {
            const url = this.url+'/' + paquete;
            var options = {
                method: 'DELETE',
            }
            
            var respuesta = confirm("Está seguro de que desea eliminar los datos de este registro?");
        
            if (respuesta == true){
                fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })   
            }
        },
        // grabar(){
        //     let paquete = {
        //         nombre:this.nombre,
        //         precio: this.precio,
        //         cupos: this.cupos,
        //         imagen:this.imagen
        //     }
        //     var options = {
        //         body:JSON.stringify(paquete),
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         redirect: 'follow'
        //     }
        //     fetch(this.url, options)
        //         .then(function () {
        //             alert("Registro grabado")
        //             window.location.href = "./paquetes.html";  
        //         })
        //         .catch(err => {
        //             console.error(err);
        //             alert("Error al Grabarr")
        //         })      
        // }
        grabar() {
            // Validación del formulario
            if (this.nombre && this.imagen && this.cupos && this.precio) {
              // Formulario válido, realizar la lógica de guardado
              let paquete = {
                nombre: this.nombre,
                precio: this.precio,
                cupos: this.cupos,
                imagen: this.imagen
              };
              var options = {
                body: JSON.stringify(paquete),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
              };
              fetch(this.url, options)
                .then(function () {
                  alert("Registro grabado");
                  window.location.href = "./paquetes.html";
                })
                .catch(err => {
                  console.error(err);
                  alert("Error al Grabar");
                });
                
            } else {
              // Formulario no válido, mostrar mensaje de error o realizar acciones adicionales
              alert("Por favor, complete todos los campos correctamente.");
            }
          },

          cancelar(){
            alert("No se ha agregado añadido un nuevo paquete")
            window.location.href = "./paquetes.html";
          }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
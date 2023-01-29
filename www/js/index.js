$(document).ready(inicio);
        // Creo el array
        lista_tareas=[];
        
        function inicio(){ 
        	// Creo los eventos
        	$("button").click(validar);
        	$("#tarea").keypress(teclado);
        	leer_guardado();
        }
        function leer_guardado(){
        	// Leo el localstorage (datos locales)
        	leido=localStorage.lista;                    	
        	if (leido!=undefined && leido.length>0 && leido!=null){
        		// Si hay datos guardados
        		lista_tareas=leido.split("**");
        		rellenar_lista();
        	}
        }
        function rellenar_lista(){
        	$("#lista").empty();
        	for (k=0; k<lista_tareas.length;k++){
        		$("#lista").append("<div class='linea'>"+lista_tareas[k]+"<img onclick='borrar(this)'src='img/eliminar.gif'></div>");
        	}

        }
        function guardar_datos(){
        	// Guardo datos locales, pero antes los convierto a texto
        	conversion=lista_tareas.join("**");
        	localStorage.lista=conversion;
        }
        function teclado(e){
        	// Detecto la pulsación del enter (código ASCII: 13)
        	if (e.keyCode==13){
        		validar();
        	}                    	
        }
        function validar(){
        	cosa=$("#tarea").val();
        	if (lista_tareas.indexOf(cosa.toLowerCase())<0 && cosa.length>0){
        		lista_tareas.push(cosa);
        		$("#lista").append("<div class='linea'>"+cosa+"<img onclick='borrar(this)'src='img/eliminar.gif'></div>");
        		guardar_datos();
        	}
        	$("#producto").val("").focus();
        }
        function borrar(e){
        	// Borro el dato del array (con splice) y del html (con remove)
        	buscar=$(e).parent().index();
        	lista_tareas.splice(buscar,1);
        	$(e).parent().remove();
        	guardar_datos();
        }

var Determinante = function(){};

/**
* Metodo para obtener las sumas de las filas de la matriz en cuestion
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
* TODO: terminar
*/
Determinante.obtenerSumaFilas = function(det){
	var sumas = [];
	for(var i=0;i<det.length;i++){
		sumas[i] = 0;
		for(var a=0;a<det[i].length;a++){
			sumas[i]+= det[i][a];
		}
	}
	//it will return an array
	return sumas;
};

/**
* Metodo para obtener los productos de las columnas de la matriz en cuestion
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
* TODO: terminar
*/
Determinante.obtenerSumaColumna = function(det){
	var sumas = [];
	var length = det.length;
	for(var i=0;i<length;i++){
		for(var a=0;a<det[i].length;a++){
			sumas[a] = typeof sumas[a] == "undefined" ? 0 : sumas[a];
			sumas[a]+= det[i][a];
		}
	}
	return sumas;	
};

/**
* Metodo para obtener las sumas de las filas de la matriz en cuestion
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
* TODO: terminar
*/
Determinante.obtenerProductoFilas = function(det){
	var producto = [];
	for(var i=0;i<det.length;i++){
		producto[i] = 1;
		for(var a=0;a<det[i].length;a++){
			producto[i]*= det[i][a];
		}
	}
	//retornara un arreglo
	return producto;
};

/**
* Metodo para obtener los productos de las columnas de la matriz en cuestion
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
* TODO: terminar
*/
Determinante.obtenerProductoColumna = function(det){
	var producto = [];
	var length = det.length;
	for(var i=0;i<length;i++){
		for(var a=0;a<det[i].length;a++){
			producto[a] = typeof producto[a] == "undefined" ? 1 : producto[a];
			producto[a] = parseInt(producto[a])*parseInt(det[i][a]);
		}
	}
	//retornara un arreglo
	return producto;	
};

/**
* Metodo para sumar dos determinantes
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.sumaDeterminante = function(det1,det2){
	return Determinante.obtenerDeterminante(det1) + Determinante.obtenerDeterminante(det2);
};

/**
* Metodo para restar dos determinantes
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.restaDeterminante = function(det1,det2){
	return Determinante.obtenerDeterminante(det1) - Determinante.obtenerDeterminante(det2);
};

/**
* Metodo para sumar los vectores
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.sumaVectores = function(vector){
	vector = typeof vector == "object" ? vector : [];
	suma = 0;
	for(var i=0;i<vector.length;i++){
		suma+= parseInt(vector[i]);
	}
	return suma;
}

/**
* Metodo para multiplicar los vectores
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.productoVectores = function(vector){
	vector = typeof vector == "object" ? vector : [];
	producto = 1;
	for(var i=0;i<vector.length;i++){
		producto = producto * parseInt(vector[i]);
	}
	return producto;
}


/**
* Metodo para multiplicar dos determinantes
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.productoDeterminante = function(det1,det2){
	return Determinante.obtenerDeterminante(det1) * Determinante.obtenerDeterminante(det2);
};

/**
* Metodo para dividir dos determinantes
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.divisionDeterminante = function(det1,det2){
	return Determinante.obtenerDeterminante(det1) / Determinante.obtenerDeterminante(det2);
};

/**
* Metodo para sacar la raiz cuadrada a cada elemento de una determinante
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.detRaizCuadrada = function(det){
	var raizCuadradaDet = [];
	for(var i=0;i<det.length;i++){
		raizCuadradaDet[i] = [];
		for(var a=0;a<det[i].length;a++){
			raizCuadradaDet[i][a] = Math.sqrt(det[i][a]);
		}
	}
	return raizCuadradaDet;
};

/**
* Metodo para sacar el logaritmo natural a cada elemento de una determinante
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.detLogaritmoNatural = function(det){
	var lnDet = [];
	for(var i=0;i<det.length;i++){
		lnDet[i] = [];
		for(var a=0;a<det[i].length;a++){
			lnDet[i][a] = Math.log(det[i][a]);
		}
	}
	return lnDet;
};

/**
* Metodo para obtener determinante de una matriz de orden 2 o mayor. Retornará 'null' si la matriz para calcular la determinante  no es igual en filas y columnas.
* @since 1.0
* @author Fernando Perez <0330.fernando@gmail.com>
*/
Determinante.obtenerDeterminante = function(det){
	//validacion
	det = typeof det == "object" ? det : [];
	if (det.length ==0) return null;
	detLength = det.length
	for(var k in det){
		if(detLength != det[k].length) return null;
	}
	//end: validacion

	var orden = det.length;
	var ordenKey = orden-1;
	var operandos = orden*orden;
	var loop = operandos*2;
	
	var ckey1,ckey2,contador,contOperandos,determinante,sumandos;
	ckey1 = ckey2 = contador = contOperandos = determinante = sumandos = 0
	
	var multiplicador=1;
	var secuencia = true;
	while(contador <= loop){
		multiplicador= multiplicador*det[ckey1][ckey2];
		ckey1++;
		if(contador <= operandos){
			ckey2++;
			if (ckey2 >= orden) ckey2 = 0;
			if (ckey1 >= orden) {
				sumandos+= multiplicador;
				multiplicador = 1;
				if (orden > 2) {
					ckey2++;
					ckey1 = 0;
				}else{
					//ejecutar para el caso de las determninantes de orden 2
					contOperandos = contador = operandos;
				}
			}
		}else{
			ckey2--;
			if (ckey2 < 0) ckey2 = ordenKey;
			if (ckey1 >= orden) {
				sumandos+= multiplicador;
				multiplicador = 1;
				if (orden > 2) {
					ckey2--;
					ckey1 = 0;
				}else {
					contOperandos = operandos;
					contador = loop;
				}
			}
		}
		if (contOperandos == operandos){
			//inicializar para empezar la resta de los operandos
			if (contador >= loop) determinante = determinante- sumandos;
			else determinante = sumandos - determinante;
			multiplicador = 1;
			sumandos = ckey1 = contOperandos = 0;
			ckey2 = ordenKey;
		}
		contador++;
		contOperandos++;
	}
	return determinante;
};

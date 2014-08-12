$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).ready(function(){
	$(".nextStep").click(function(){
		var step = $(this).attr("id");
		step = step.split("-")[1];
		
		var order = $("#frmOrden").find("#orden").val();
		if (!order.match(/^[0-9]+$/)) {
			alert("valor de orden es invalido");
			return false;
		}
		order = parseInt(order);
		if (order < 2 || order > 9){
			alert("Solo se permite orden entre 2 y 9");
			return false;
		}
		
		$(".steps").hide();
		
		if (step == "2"){
			var html1 = "<h4>Determinante 1</h4><table id=\"tblDet-1\" class=\"tblDet\">";
			var html2 =  "<h4>Determinante 2</h4><table id=\"tblDet-2\" class=\"tblDet\">";
			//
			for(var i=0;i<order;i++){
				html1 += "<tr>"; 
				html2+= "<tr>";
				for(var a=0;a<order;a++){
					html1+= "<td><input type=\"number\" name=\"det1-" + i + "-" + a + "\" id=\"det1-" + i + "-" + a + "\" placeholder=\"" + (i+1) + " " + (a+1) + "\" /></td>";
					html2+= "<td><input type=\"number\" name=\"det2-" + i + "-" + a + "\" id=\"det2-" + i + "-" + a + "\" placeholder=\"" + (i+1) + " " + (a+1) + "\" /></td>";
				}
				html1+= "</tr>";
				html2+= "</tr>";
			}
			html1+= "</table>";
			html2+= "</table>";
			
			html = html1 + html2;
			$("#step-" + step).find("#inputDet").html(html);
		}
		
		$("#step-" + step).show();
	});

	$("#frmOrden").unbind("submit").submit(function(){
		var formData = $(this).serializeObject();
		var orden = typeof formData.orden == "string" && formData.orden != null &&  formData.orden.match(/^[0-9]+$/) ? parseInt(formData.orden) : null;
		if (orden == null) $("#result").html("El valor del orden es inválido");
		var det1 = [];
		var det2 = [];
		var key,key2;
		for(var i=0;i<orden;i++){
			det1[i] = [];
			det2[i] = [];
			for(var a=0;a<orden;a++){
				key  = "det1-" + i + "-" + a;
				key2 = "det2-" + i + "-" + a;
				det1[i][a] = typeof formData[key]  == "string" && formData[key].match(/^[0-9]+$/) ? parseInt(formData[key]) : 0;
				det2[i][a] = typeof formData[key2] == "string" && formData[key2].match(/^[0-9]+$/) ? parseInt(formData[key2]) : 0;
			}
		}
		
		var output = "";
		
		var vector1,vector2,resultado;
		
		if (orden%2 == 0){
			//e) Hallar la suma de todas las filas de cada determinante
			vector1 = Determinante.obtenerSumaFilas(det1);
			vector2 = Determinante.obtenerSumaFilas(det2);
			output+= "<strong>Suma de las filas de cada determinante</strong><br/>";
			output+= "Vector Determinante 1: " + JSON.stringify(vector1) + "<br/>";
			output+= "Vector Determinante 2: " + JSON.stringify(vector2) + "<br/><br/>";
			
			//f) Hallar el producto de los elementos de cada columna de los determinantes
			vector1 = Determinante.obtenerProductoColumna(det1);
			vector2 = Determinante.obtenerProductoColumna(det2);
			output+= "<strong>Producto de las columnas de cada determinante</strong><br/>";
			output+= "Vector Determinante 1: " + JSON.stringify(vector1) + "<br/>";
			output+= "Vector Determinante 2: " + JSON.stringify(vector2) + "<br/><br/>";
		}else if (orden%3 == 0){
			//d) Hallar la suma de las determinantes
			resultado = Determinante.sumaDeterminante(det1,det2);
			output+= "<strong>Suma de las determinantes<strong><br/>";
			output+= resultado + "<br/><br/>";
			
			//d) Hallar la sustraccion de las determinantes
			resultado = Determinante.restaDeterminante(det1,det2);
			output+= "<strong>Resta de las determinantes</strong><br/>";
			output+= resultado + "<br/><br/>";
		}
		
		if (orden == 2 || orden == 3){
			//a) Se hallará el producto de las determinantes
			resultado = Determinante.productoDeterminante(det1,det2);
			output+= "<strong>Producto de las determinantes</strong><br/>";
			output+= resultado + "<br/><br/>";
			
			//a) Se hallará la division de las determinantes
			resultado = Determinante.divisionDeterminante(det1,det2);
			resultado = isNaN(resultado) ? "Indeterminado" : resultado;
			output+= "<strong>Divisi&oacute;n de las determinantes</strong><br/>";
			output+= resultado + "<br/><br/>";
		}
	
		if (orden >=4 && orden <= 7){
			//a) Se hallara el determinante equivalente a extraer la raiz cubica de cada elemento, siempre que la suma de las filas sea que el producto de las columnas
			if (Determinante.sumaVectores(Determinante.obtenerSumaFilas(det1)) > Determinante.sumaVectores(Determinante.obtenerProductoColumna(det1))){
				resultado = Determinante.detRaizCuadrada(det1);
				output+= "<strong>Raiz Cuadrada Determinante 1:</strong><br/>";
				output+= resultado + "<br/><br/>";
			}
			
			if (Determinante.sumaVectores(Determinante.obtenerSumaFilas(det2)) > Determinante.sumaVectores(Determinante.obtenerProductoColumna(det2))){
				resultado = Determinante.detRaizCuadrada(det2);
				output+= "<strong>Raiz Cuadrada Determinante 2:</strong><br/>";
				output+= resultado + "<br/><br/>";
			}
			
			//b) Se hallara el determinante equivalente a extraer el logaritmo natural de cada elemento, siempre que el producto de las filas sea menor que la suma de las columnas
			if (Determinante.productoVectores(Determinante.obtenerProductoFilas(det1)) > Determinante.productoVectores(Determinante.obtenerProductoColumna(det1))){
				resultado = Determinante.detLogaritmoNatural(det1);
				output+= "<strong>Logaritmo Natural Determinante 1:</strong><br/>";
				output+= resultado + "<br/><br/>";
			}
			if (Determinante.productoVectores(Determinante.obtenerProductoFilas(det2)) > Determinante.productoVectores(Determinante.obtenerProductoColumna(det2))){
				resultado = Determinante.detLogaritmoNatural(det1);
				output+= "<strong>Logaritmo Natural Determinante 2:</strong><br/>";
				output+= resultado + "<br/><br/>";
			}
		}
		
		$("#output").html(output);
	});

	$(".back").click(function(){
		$("#output").html("");
		var step = $(this).attr("id");
		step = step.split("-")[1];
		$(".steps").hide();
		$("#step-"  + step).show();
	});

	$("#step-1").show();
});

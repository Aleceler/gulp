$(document).ready(function(){
    function loadJSON(arquivo,callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', arquivo, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
    
    produto = [];
    
    function pegaProduto() {
            loadJSON('./teste.json',function (response) {
                var jsonData = JSON.parse(response);
                produto.push(jsonData);
            });
        }
        pegaProduto()

        setTimeout(() => {
            //textos dinamicos da pagina
            loadJSON('./index.json',function (response) {
                var data = JSON.parse(response);
                // console.log(data[produto[0].produto].titulo_pagina)
                $('#titulo').html(data[produto[0].produto].titulo_pagina);
                // console.log(produto[0].produto)
            });
        }, 100);
})


 


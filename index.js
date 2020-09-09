const express = require("express")
const MercadoPago = require("mercadopago");
const { ftruncate } = require("fs");
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-2420873145417982-090913-cd49a39f07f40445a3350c1240b25c00-320694647"
});

app.get("/", (req, res) => {
    res.send("Ola Mundo");
})

app.get("/pagar", async (req, res) => {

    var id = " " + Date.now();
    var emailPagador = "vinizika231199@gmail.com"

    const dados = {
        items: [
            item = {
                id: id,
                title: "2x video games; 3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],

        payer: {
            email: emailPagador
        },
        //é o campo que vamos consultar quando o mercado pago mandar que  o pagamento foi concluido
        external_reference: id

    }

    try {
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        //Banco.salvarPagamento() nesse momento salvar os dados do pagador id e email
        return res.redirect(pagamento.body.init_point);
    } catch (error) {
        return res.send(error.message)
    }

})

app.listen(3000, (req, res) => {
    console.log("Servidor rodando")
})
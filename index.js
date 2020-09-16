const express = require("express")
const MercadoPago = require("mercadopago");
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

    var preference = {}


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
        external_reference: id,

        back_urls: {
            "success": "https://apimercadopago.herokuapp.com",
            "failure": "https://apimercadopago.herokuapp.com/falha",
            "pending": "https://apimercadopago.herokuapp.com/pendente"
        },
        auto_return: "approved",


    }

    try {
        var pagamento = await MercadoPago.preferences.create(dados);
        //console.log(pagamento);
        //Banco.salvarPagamento() nesse momento salvar os dados do pagador id e email
        return res.redirect(pagamento.body.init_point);
    } catch (error) {
        return res.send(error.message)
    }

})

app.post("/not", (req, res) => {
    var id = req.query.id;

    setTimeout(() => {

        var filtro = {
            "order.id": id
        }

        MercadoPago.payment.search({
            qs: filtro
        }).then((data) => {
            var pagamento = data.body.results[0];
            if (pagamento != undefined) {
                console.log(pagamento)
                // console.log(pagamento.status)
                //console.log(pagamento.external_reference)
            } else {
                console.log("Pagamento não existe")
            }
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })

    }, 20000);

    res.send("OK");
})

const PORT = process.env.PORT || 8081

app.listen(PORT, (req, res) => {
    console.log("Servidor rodando")
})
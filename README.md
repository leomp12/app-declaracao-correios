# app-declaracao-correios

Aplicação web simples para impressão de Declaração de Conteúdo no padrão Correios via parâmetros de URL

## Referência

Os pedidos deverão ser especificados em JSON pelo parâmetro de URL `pedido`, com informações do _remetente_, _destinatário_ e _itens_ seguindo o modelo:

```json
{
  "remNome": "Fulano de Tal",
  "remEndereco": "Av. Um, 123, Jardim Dois",
  "remLinha2": "Apto. 4, próximo ao Super Cinco",
  "remCidade": "Sete Lagoas",
  "remUf": "MG",
  "remCep": "357000-000",
  "remDoc": "12334567890",
  "desNome": "Ciclano de Tal",
  "desEndereco": "Av. Mil, 1223, Jardim Dois Mil",
  "desLinha2": "",
  "desCidade": "Belo Horizonte",
  "desUf": "MG",
  "desCep": "300000-000",
  "desDoc": "02334567890",
  "itens": [
    {
      "conteudo": "Produto 1",
      "quant": 1,
      "valor": 10.5
    },
    {
      "conteudo": "Produto 2",
      "quant": 2,
      "valor": 20.75
    },
    {
      "conteudo": "Produto 3",
      "quant": 3,
      "valor": 100
    }
  ],
  "peso": 8.12
}
```

### Exemplos

```js
window.location = 'https://declaracao-correios.netlify.app/?pedido=' + encodeURIComponent(JSON.stringify(pedido))}
```

https://declaracao-correios.netlify.app/?pedido=%7B%22remNome%22%3A%22Fulano%20de%20Tal%22%2C%22remEndereco%22%3A%22Av.%20Um%2C%20123%2C%20Jardim%20Dois%22%2C%22remLinha2%22%3A%22Apto.%204%2C%20pr%C3%B3ximo%20ao%20Super%20Cinco%22%2C%22remCidade%22%3A%22Sete%20Lagoas%22%2C%22remUf%22%3A%22MG%22%2C%22remCep%22%3A%22357000-000%22%2C%22remDoc%22%3A%2212334567890%22%2C%22desNome%22%3A%22Ciclano%20de%20Tal%22%2C%22desEndereco%22%3A%22Av.%20Mil%2C%201223%2C%20Jardim%20Dois%20Mil%22%2C%22desLinha2%22%3A%22%22%2C%22desCidade%22%3A%22Belo%20Horizonte%22%2C%22desUf%22%3A%22MG%22%2C%22desCep%22%3A%22300000-000%22%2C%22desDoc%22%3A%2202334567890%22%2C%22itens%22%3A%5B%7B%22conteudo%22%3A%22Produto%201%22%2C%22quant%22%3A1%2C%22valor%22%3A10.5%7D%2C%7B%22conteudo%22%3A%22Produto%202%22%2C%22quant%22%3A2%2C%22valor%22%3A20.75%7D%2C%7B%22conteudo%22%3A%22Produto%203%22%2C%22quant%22%3A3%2C%22valor%22%3A100%7D%5D%2C%22peso%22%3A8.12%7D

#### Múltiplos pedidos

https://declaracao-correios.netlify.app/?pedido={...}&pedido={...}&pedido={...}

import { isValidCPF, formatCPF, formatCNPJ, formatCEP } from '@brazilian-utils/brazilian-utils'

const urlParams = new URLSearchParams(window.location.search)
let orders

if (urlParams) {
  orders = urlParams.getAll('pedido').concat(urlParams.getAll('pedido[]'))
  const minItemRows = parseInt(urlParams.get('page'), 10)

  if (orders.length) {
    const formatNumber = price => price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    const formatDoc = doc => isValidCPF(doc) ? formatCPF(doc) : formatCNPJ(doc)

    const $main = document.getElementsByTagName('main')[0]

    orders.forEach((orderJson, i) => {
      let order
      try {
        order = JSON.parse(orderJson)
      } catch (err) {
        console.error(err)
        window.alert(`O ${(i + 1)}° pedido é inválido`)
        return
      }

      if (!Array.isArray(order.itens)) {
        order.itens = []
      }
      if (!order.itens.length || minItemRows) {
        for (let i = 1; i <= (minItemRows || 20); i++) {
          if (order.itens.length < i) {
            order.itens.push({})
          } else {
            break
          }
        }
      }

      let quantity = 0
      let subtotal = 0
      let peso = 0
      order.itens.forEach(item => {
        if (item && item.quant) {
          quantity += item.quant
          if (item.valor) {
            subtotal += (item.valor * item.quant)
          }
          if (item.peso) {
            peso += (item.peso * item.quant)
          }
        }
      })

      const getCelText = (prop, obj = order) => obj[prop] || '&nbsp;'

      $main.insertAdjacentHTML('beforeend', `
        <div class="declaracao">
          <div class="row">
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <div class="bloco" style="font-size: 30px; line-height: 87px">
                    DECLARAÇÃO DE CONTEÚDO
                  </div>
                </div>
              </div>
              <div class="row linha">
                <div class="col-12">
                  <div class="bloco">
                    <div class="cinza texto">
                      CAMPOS EXCLUSIVOS DOS CORREIOS
                    </div>
                    <div class="tabela">
                      <div class="row">
                        <div class="col-6">
                          <div class="celula texto" style="height: 47px">
                            UNIDADE DE POSTAGEM
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="celula texto" style="height: 47px">
                            NÚMERO DE REGISTRO
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="bloco" style="height: 100%; position: relative">
                <div class="texto" style="position: absolute; bottom: 0; width: 100%; margin: 0 auto">
                  CARIMBO DA UNIDADE
                </div>
              </div>
            </div>
          </div>

          <div class="row linha">
            <div class="col-6">
              <div class="bloco tabela">
                R E M E T E N T E
                <div class="celula">
                  NOME:
                  <span class="texto">
                    ${getCelText('remNome')}
                  </span>
                </div>
                <div class="celula">
                  ENDEREÇO:
                  <span class="texto">
                    ${getCelText('remEndereco')}
                  </span>
                </div>
                <div class="celula texto">
                  ${getCelText('remLinha2')}
                </div>
                <div class="row">
                  <div class="col-9">
                    <div class="celula">
                      CIDADE:
                      <span class="texto">
                        ${getCelText('remCidade')}
                      </span>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="celula">
                      UF:
                      <span class="texto">
                        ${getCelText('remUf')}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div class="celula">
                      CEP:
                      <span class="texto">
                        ${((order.remCep && formatCEP(order.remCep)) || '&nbsp;')}
                      </span>
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="celula">
                      CPF/CNPJ:
                      <span class="texto">
                        ${((order.remDoc && formatDoc(order.remDoc)) || '&nbsp;')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-6">
              <div class="bloco tabela">
                D E S T I N A T Á R I O
                <div class="celula">
                  NOME:
                  <span class="texto">
                    ${getCelText('desNome')}
                  </span>
                </div>
                <div class="celula">
                  ENDEREÇO:
                  <span class="texto">
                    ${getCelText('desEndereco')}
                  </span>
                </div>
                <div class="celula texto">
                  ${getCelText('desLinha2')}
                </div>
                <div class="row">
                  <div class="col-9">
                    <div class="celula">
                      CIDADE:
                      <span class="texto">
                        ${getCelText('desCidade')}
                      </span>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="celula">
                      UF:
                      <span class="texto">
                        ${getCelText('desUf')}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <div class="celula">
                      CEP:
                      <span class="texto">
                        ${((order.desCep && formatCEP(order.desCep)) || '&nbsp;')}
                      </span>
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="celula">
                      CPF/CNPJ:
                      <span class="texto">
                        ${((order.desDoc && formatDoc(order.desDoc)) || '&nbsp;')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row linha">
            <div class="col-12">
              <div class="bloco tabela">
                I D E N T I F I C A Ç Ã O &nbsp;&nbsp;D O S &nbsp;&nbsp;B E N S
                <div class="row texto-centro">
                  <div class="col-1">
                    <div class="celula">
                      ITEM
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="celula">
                      CONTEÚDO
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="celula">
                      QUANT.
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="celula">
                      VALOR
                    </div>
                  </div>
                </div>

                ${(order.itens
                  ? order.itens.reduce((rowsStr, item, i) => !item ? rowsStr : rowsStr + `
                    <div class="row">
                      <div class="col-1">
                        <div class="celula texto">
                          ${(i + 1)}
                        </div>
                      </div>
                      <div class="col-7">
                        <div class="celula texto">
                          ${getCelText('conteudo', item)}
                        </div>
                      </div>
                      <div class="col-2">
                        <div class="celula texto">
                          ${getCelText('quant', item)}
                        </div>
                      </div>
                      <div class="col-2">
                        <div class="celula texto">
                          R$
                          ${(typeof item.valor === 'number' ? formatNumber(item.valor) : '')}
                        </div>
                      </div>
                    </div>`, '')
                  : '')}

                <div class="row texto-direita">
                  <div class="col-8">
                    <div class="celula cinza">
                      TOTAIS
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="celula">
                      ${(quantity || '&nbsp;')}
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="celula">
                      ${(subtotal ? `R$ ${formatNumber(subtotal)}` : '&nbsp;')}
                    </div>
                  </div>
                </div>
                <div class="row texto-direita">
                  <div class="col-8">
                    <div class="celula cinza">
                      PESO TOTAL (kg)
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="celula">
                      ${(peso ? peso.toLocaleString('pt-br') : '&nbsp;')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row linha">
            <div class="col-md-12">
              <div class="bloco">
                D E C L A R A Ç Ã O
                <div class="celula celula-unica">
                  <div class="texto" style="padding: 18px 6px; font-size: 15px">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Declaro que não me enquadro no conceito de contribuinte previsto no
                    art. 4º da Lei Complementar nº 87/1996, uma vez que não realizo,
                    com habitualidade ou em volume que caracterize intuito comercial,
                    operações de circulação de mercadoria, ainda que se iniciem no exterior,
                    ou estou dispensado da emissão da nota fiscal por força da legislação tributária vigente,
                    responsabilizando-me, nos termos da lei e a quem de direito, por informações inverídicas.
                  </div>
                </div>
                <div style="padding: 30px 10px 5px 10px">
                  <div class="row">
                    <div class="col-3 ass">
                      <span>,</span>
                    </div>
                    <div class="col-1 ass">
                      <span>de</span>
                    </div>
                    <div class="col-2 ass">
                      <span>de</span>
                    </div>
                    <div class="col-2 ass">
                      <span> </span>
                    </div>
                    <div class="col-4 ass">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8"></div>
                    <div class="col-4 texto">Assinatura do Declarante/Remetente</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row linha">
            <div class="col-md-12">
              <div class="bloco" style="text-align: left; padding: 10px">
                OBSERVAÇÃO:
                <div class="texto" style="font-size: 15px">
                  Constitui crime contra a ordem tributária suprimir ou reduzir tributo,
                  ou contribuição social e qualquer acessório (Lei 8.137/90 Art. 1º, V).
                </div>
              </div>
            </div>
          </div>
        </div>`)
    })
  }
}

if (!orders || !orders.length) {
  window.alert('Nenhum pedido enviado via parâmetro de URL (`?pedido`)')
}

Templater.register("Testimony", {

  afterRender: function() {
    this.slider = tns({
      container: '#slider',
      items: 1,
      slideBy: 'page',
      autoplay: true
    });
  },

  left: function() {
    this.slider.goTo('prev');
  },

  right: function() {
    this.slider.goTo('next');
  },

  events: {
    'click .left': function() {
      this.left();
    },
    'click .right': function() {
      this.right();
    },
  },

  template: 
  '<div>'+
    '<div class="container">'+
      '<div class="grid-flex">'+
        '<div class="grid-flex-column grid-flex-column-left">'+
          '<h1 class="mukta">Mais de 1000 pizzarias confiam na iGo</h1>'+
          '<span>O sistema iGo Pizzas pode ajudar você a aumentar a produtividade da sua pizzaria, com agilidade e eficiência seu foco será a qualidade dos produtos e não a burocracia.</span>'+
        '</div>'+
        '<div class="grid-flex-column">'+
          '<div class="testimony-wrap">'+

            '<div class="slider-wrap">'+

              '<div class="wrap">'+

                '<div id="slider">'+
                  '<div>'+
                    '<div class="testimony-text">“Percebi que o sistema era muito melhor do que eu imaginava, os recursos operacionais em conjunto com os analíticos me trouxeram um crescimento mês a mês contínuo.”</div>'+
                    '<div class="testimony-block">'+
                      '<div>Leandro Bezerra</div>'+
                      '<div><strong>Chicos Pizza</strong></div>'+
                      '<div><i>Nova Iguaçu/RJ</i></div>'+
                    '</div>'+
                  '</div>'+

                  '<div>'+
                    '<div class="testimony-text">"Eu sou muito grata, de verdade. O atendimento de vocês é top, o suporte é maravilhoso. Os outros sistemas me davam total atenção até o momento da compra, depois era só jogo de empurra, liga pra um, fala com outro, uma loucura. Sem contar que o sistema em si também é maravilhoso, tem tudo que eu preciso. Recomendo MIL VEZES!"</div>'+
                    '<div class="testimony-block">'+
                      '<div><strong>Pizzaria Du Cheff</strong></div>'+
                      '<div><i>Nova Iguaçu/RJ</i></div>'+
                    '</div>'+
                  '</div>'+

                  '<div>'+
                    '<div class="testimony-text">"Empresa séria eu indico mesmo! O pós-venda é excelente, não me da dor de cabeça e realmente me traz soluções. Estão de parabéns mesmo, pela empresa e pela honestidade na hora de negociar, você são 10 mesmo."</div>'+
                    '<div class="testimony-block">'+
                      '<div><strong>Pizzaria Forno à Lenha</strong></div>'+
                      '<div><i>Carazinho</i></div>'+
                    '</div>'+
                  '</div>'+

                  '<div>'+
                    '<div class="testimony-text">"Super recomento! Qualquer dúvida que eu tenho sou bem atendida a qualquer horário, a equipe é sem palavras. E o sistema melhor impossivel, top mesmo o investimento vale a pena!"</div>'+
                    '<div class="testimony-block">'+
                      '<div><strong>Pizzaria Lê Brito</strong></div>'+
                      '<div><i>São José</i></div>'+
                    '</div>'+
                  '</div>'+

                  '<div>'+
                    '<div class="testimony-text">"Antes de conhecer o iGoPizzas eu tinha conhecido muitos outros sistemas, todos eles eram muito limitados e eu teria que usar muitos sistemas paralelos. O iGoPizzas foi o único que eu olhei e vi que era o que eu queria. Mesmo assim fica aquele medo de fechar negócio, aquele receio e por isso eu recomendo para ajudar vocês e dar mais confiança para outros clientes que vale a pena o investimento."</div>'+
                    '<div class="testimony-block">'+
                      '<div><strong>Pizzaria Mais Que Pizza</strong></div>'+
                      '<div><i>Diadema</i></div>'+
                    '</div>'+
                  '</div>'+

                '</div>'+

              '</div>'+
                
              '<div class="slider-actions">'+
                '<span class="btn-slider left">'+
                  '<img src="./images/arrow.png" />'+
                '</span>'+
                '<span class="btn-slider right">'+
                  '<img src="./images/arrow.png" />'+
                '</span>'+
              '</div>'+

            '</div>'+

          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'

});
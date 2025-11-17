document.addEventListener('DOMContentLoaded', function(){
    // --- 1. Seletores de Elementos ---
    const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');
    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContraste = document.getElementById('alterna-contraste');
    const corpoDocumento = document.body; // Mais legível que document.body

    // --- 2. Controle de Estado e Constantes ---
    const TAMANHO_MINIMO = 0.8; // Fonte mínima em rem
    const TAMANHO_MAXIMO = 1.5; // Fonte máxima em rem
    const PASSO = 0.1; // Incremento/decremento
    // Obtém o tamanho da fonte inicial do corpo (ou assume 1rem se não estiver definido)
    let tamanhoAtualFonte = parseFloat(getComputedStyle(corpoDocumento).fontSize) / 16 || 1; 

    // --- 3. Funcionalidade de Toggle do Menu de Acessibilidade ---
    botaoDeAcessibilidade.addEventListener('click', function (){
        // Alterna classes CSS para animação e visibilidade
        botaoDeAcessibilidade.classList.toggle('rotacao-botao');
        opcoesDeAcessibilidade.classList.toggle('apresenta-lista');
        
        // Atualiza o estado ARIA-EXPANDED (booleano)
        const isExpanded = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';
        botaoDeAcessibilidade.setAttribute('aria-expanded', !isExpanded);
        
        // Melhora a acessibilidade: se expandido, garante que as opções estejam focáveis (opcional, dependendo do CSS)
        // opcoesDeAcessibilidade.setAttribute('aria-hidden', isExpanded);
    });

    // --- 4. Funcionalidade de Aumento de Fonte ---
    aumentaFonteBotao.addEventListener('click', function(){
        // Verifica se o limite máximo foi atingido
        if (tamanhoAtualFonte < TAMANHO_MAXIMO) {
            tamanhoAtualFonte += PASSO;
            // Garante que não ultrapasse o máximo
            tamanhoAtualFonte = Math.min(tamanhoAtualFonte, TAMANHO_MAXIMO); 
            // Aplica o novo tamanho
            corpoDocumento.style.fontSize = `${tamanhoAtualFonte}rem`;
        }
        // Opcional: Desabilita o botão se atingir o máximo
        aumentaFonteBotao.disabled = tamanhoAtualFonte >= TAMANHO_MAXIMO;
        diminuiFonteBotao.disabled = false; // Garante que o outro esteja habilitado
    });

    // --- 5. Funcionalidade de Diminuição de Fonte ---
    diminuiFonteBotao.addEventListener('click', function(){
        // Verifica se o limite mínimo foi atingido
        if (tamanhoAtualFonte > TAMANHO_MINIMO) {
            tamanhoAtualFonte -= PASSO;
            // Garante que não ultrapasse o mínimo
            tamanhoAtualFonte = Math.max(tamanhoAtualFonte, TAMANHO_MINIMO); 
            // Aplica o novo tamanho
            corpoDocumento.style.fontSize = `${tamanhoAtualFonte}rem`;
        }
        // Opcional: Desabilita o botão se atingir o mínimo
        diminuiFonteBotao.disabled = tamanhoAtualFonte <= TAMANHO_MINIMO;
        aumentaFonteBotao.disabled = false; // Garante que o outro esteja habilitado
    });

    // --- 6. Funcionalidade de Contraste ---
    alternaContraste.addEventListener('click', function(){
        corpoDocumento.classList.toggle('alto-contraste');
    });
});

// --- 7. Inicialização do ScrollReveal (Fora do DOMContentLoaded, como estava, está correto) ---
// Nota: O ScrollReveal geralmente não precisa estar dentro do DOMContentLoaded,
// pois o script é geralmente carregado no final do <body> ou é assíncrono.
// Manter como estava é OK.
ScrollReveal().reveal('#inicio', { delay: 500 });
ScrollReveal().reveal('#tropicalia', { delay: 500 });
ScrollReveal().reveal('#galeria', { delay: 500 });
ScrollReveal().reveal('#contato', { delay: 500 });

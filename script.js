// script.js
document.addEventListener("DOMContentLoaded", function() {

    // 1. Controle de Acessibilidade (Tamanho da Fonte)
    let currentFontSize = 16;
    const btnFontIncrease = document.getElementById("btn-font-increase");
    const btnFontDecrease = document.getElementById("btn-font-decrease");

    btnFontIncrease.addEventListener("click", function() {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = currentFontSize + "px";
        }
    });

    btnFontDecrease.addEventListener("click", function() {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.documentElement.style.fontSize = currentFontSize + "px";
        }
    });

    // 2. Controle de Contraste
    const btnContrast = document.getElementById("btn-contrast");
    btnContrast.addEventListener("click", function() {
        document.body.classList.toggle("high-contrast");
    });

    // 3. Renderização Dinâmica do Carrossel (Dados de Mercado)
    const dadosMercado = [
        {
            cultura: "Soja",
            descricao: "A média anual de preços da soja manteve-se resiliente devido à forte demanda internacional para exportação e processamento de farelo. O acompanhamento histórico revela picos consistentes no segundo semestre devido à entressafra americana.",
            detalhe: "Indicador chave para planejamento de receita bruta."
        },
        {
            cultura: "Feijão",
            descricao: "Com comportamento majoritariamente doméstico, as médias anuais do feijão apresentam alta volatilidade ligada diretamente a fatores climáticos e ciclos rápidos de cultivo (três safras anuais), exigindo exatidão no timing de mercado.",
            detalhe: "Foco em proteção de preços contra oscilações de oferta local."
        },
        {
            cultura: "Trigo",
            descricao: "Altamente indexado ao mercado global e câmbio, a análise das médias do trigo demonstra forte correlação com conflitos geopolíticos e quebras de safra no hemisfério norte, sendo vital para moinhos e produtores de inverno.",
            detalhe: "Essencial para estratégias de hedge cambial."
        }
    ];

    const carouselTrack = document.getElementById("carousel-track");
    dadosMercado.forEach(item => {
        const slide = document.createElement("div");
        slide.className = "carousel-item";
        slide.innerHTML = `
            <h3>Médias Históricas: ${item.cultura}</h3>
            <p>${item.descricao}</p>
            <br>
            <small><strong>Dica Estratégica:</strong> ${item.detalhe}</small>
        `;
        carouselTrack.appendChild(slide);
    });

    // Lógica de Navegação do Carrossel
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-item");
    const btnNext = document.getElementById("carousel-next");
    const btnPrev = document.getElementById("carousel-prev");

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    btnNext.addEventListener("click", function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    btnPrev.addEventListener("click", function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // 4. Renderização Dinâmica do Acordeão (FAQ)
    const faqDados = [
        {
            pergunta: "Quais anos estão inclusos na média histórica do relatório?",
            resposta: "O relatório cobre as variações e médias anuais consolidadas dos últimos 10 anos, trazendo um comparativo estruturado até as tendências observadas no ciclo atual de 2026."
        },
        {
            pergunta: "De onde vêm as fontes das cotações apresentadas?",
            resposta: "Os dados são consolidados utilizando como base os principais indicadores de preços agrícolas do mercado físico brasileiro e bolsas de mercadorias internacionais, tratados estatisticamente."
        },
        {
            pergunta: "Como o relatório ajuda pequenos e médios produtores?",
            resposta: "Ao compreender as médias históricas e sazonais do preço da soja, feijão e trigo, o produtor descobre em quais meses as commodities costumam atingir seus picos de valorização, permitindo programar a venda de forma inteligente."
        }
    ];

    const faqAccordion = document.getElementById("faq-accordion");
    faqDados.forEach((item, index) => {
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";

        accordionItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-answer-${index}">
                ${item.pergunta}
                <span class="accordion-icon">+</span>
            </button>
            <div id="faq-answer-${index}" class="accordion-content">
                <p style="padding-bottom: 20px;">${item.resposta}</p>
            </div>
        `;
        faqAccordion.appendChild(accordionItem);
    });

    // Lógica do Acordeão
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", function() {
            const content = this.nextElementSibling;
            const isOpen = this.getAttribute("aria-expanded") === "true";

            // Fecha todos antes de abrir o atual
            document.querySelectorAll(".accordion-content").forEach(c => c.style.maxHeight = null);
            document.querySelectorAll(".accordion-header").forEach(h => {
                h.setAttribute("aria-expanded", "false");
                h.querySelector(".accordion-icon").textContent = "+";
            });

            if (!isOpen) {
                this.setAttribute("aria-expanded", "true");
                this.querySelector(".accordion-icon").textContent = "-";
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});
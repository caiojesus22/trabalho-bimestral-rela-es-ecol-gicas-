 const organisms = [
            {name: "Abelha",
                image:"imagens/bee.png",
                relations: ["flor"]
            },
            {name: "Flor", 
                image:"imagens/flor.png",
                relations: ["Abelha"]},
            {name: "Leão", 
                image:"imagens/leao.png",
                relations: ["Zebra"]},
                
            {name: "Zebra",
                image:"imagens/zebra.png",
                relations: ["Grama", "Leão"]},
            {name: "Grama", 
                image:"imagens/grama.png",
                relations: ["Zebra"]},
                          
        ];

        let score = 0;
        let selected = [];

        function startGame() {
            score = 0;
            selected = [];
            document.getElementById('score').textContent = "Pontos: 0";
            document.getElementById('feedback').textContent = "";
            createCards();
        }

        function createCards() {
    const container = document.getElementById('cards');
    container.innerHTML = '';
    
    const shuffled = [...organisms].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    shuffled.forEach(org => {
        const card = document.createElement('div');
        
        // Cria elemento de imagem
        const img = document.createElement('img');
        img.src = org.image || `https://via.placeholder.com/100?text=${org.emoji}`;
        img.width = 100;
        img.alt = org.name;
        
        // Adiciona imagem e nome ao card
        card.appendChild(img);
        card.appendChild(document.createTextNode(org.name));
        
        card.onclick = () => selectCard(card, org);
        container.appendChild(card);
    });
}

        function selectCard(card, organism) {
            if (selected.length === 2) return;
            
            card.style.backgroundColor = "#8cc5a8ff";
            selected.push(organism);
            
            if (selected.length === 2) {
                checkRelation();
                setTimeout(() => {
                    selected.forEach(c => {
                        const cards = document.querySelectorAll('#cards div');
                        cards.forEach(el => el.style.backgroundColor = "");
                    });
                    selected = [];
                }, 1000);
            }
        }

        function checkRelation() {
            const [org1, org2] = selected;
            const isValid = org1.relations.includes(org2.name) || org2.relations.includes(org1.name);
            
            if (isValid) {
                score += 10;
                document.getElementById('feedback').textContent = 
                    `Correto! ${org1.name} e ${org2.name} têm uma relação ecológica!`;
            } else {
                score = Math.max(0, score - 5);
                document.getElementById('feedback').textContent = 
                    `Errado! ${org1.name} e ${org2.name} não têm relação direta.`;
            }
            
            document.getElementById('score').textContent = `Pontos: ${score}`;
            createCards();
        }

        startGame();
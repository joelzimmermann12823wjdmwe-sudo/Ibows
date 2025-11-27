document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Lade-Text entfernen

    // Funktion zum Abrufen der News von der PHP-API
    async function fetchNews() {
        try {
            const response = await fetch('./api/news.php');
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok: ' + response.statusText);
            }
            const newsData = await response.json();
            
            if (newsData.length === 0) {
                newsContainer.innerHTML = '<p>Keine Nachrichten vorhanden.</p>';
                return;
            }

            // News-Artikel rendern
            newsData.forEach(item => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2>${item.titel}</h2>
                    <p class="meta">Veröffentlicht am: ${new Date(item.datum).toLocaleDateString()}</p>
                    <p>${item.inhalt}</p>
                `;
                newsContainer.appendChild(article);
            });

        } catch (error) {
            console.error("Fehler beim Abrufen der News:", error);
            newsContainer.innerHTML = `<p style="color: red;">Fehler beim Laden der News: ${error.message}</p>`;
        }
    }

    fetchNews();
});

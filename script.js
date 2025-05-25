const apiKey = '94ed446cf5b7412aa967057d8781040e'; // Replace this with your actual NewsAPI key
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = `<p>No news articles available right now.</p>`;
    } else {
      displayNews(data.articles);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = '<p>Failed to load news. Check your API key or connection.</p>';
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'news-card';

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" class="news-image" />
      <div class="news-content">
        <div class="news-title">${article.title}</div>
        <div class="news-description">${article.description || 'No description available.'}</div>
        <a href="${article.url}" target="_blank" class="read-more">Read more</a>
      </div>
    `;

    newsContainer.appendChild(card);
  });
}

// Call on load
fetchNews();

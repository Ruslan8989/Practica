const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'tample')));


app.use(cors());


app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products ');
        res.json(response.data);
    } catch (e) {
        res.status(500).send('Ошибка загрузки');
    }
});

app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Получен запрос за товар с ID:', id);
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        console.log('Данные товара:', response.data);
        res.json(response.data);
    } catch (e) {
        console.error('Ошибка при получении товара:', e.message);
        res.status(404).send('Товар не найден');
    }
});

app.get('/api/products/search', async (req, res) => {
    const q = req.query.q;
    if (!q) return res.status(400).send('Нет запроса');
    try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${q}`);
        res.json(response.data);
    } catch (e) {
        res.status(500).send('Ошибка поиска');
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'tample', 'index.html'));
});

app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'tample', 'product.html'));
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'tample', '404.png'));
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
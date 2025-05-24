import express from 'express';
import cors from 'cors';
import propertyRoutes from './routes/propertyRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Habilita CORS para permitir requisições do frontend
app.use(cors());

// ✅ Permite que o Express entenda JSON
app.use(express.json());

// ✅ Rotas de propriedades (já com prefixo /propriedades no arquivo de rotas)
app.use('/propriedades', propertyRoutes);

// ✅ Rota padrão opcional
app.get('/', (req, res) => {
  res.send('API de Propriedades Rurais funcionando 🚜');
});

// ✅ Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

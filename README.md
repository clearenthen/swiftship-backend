# SwiftShip Backend

Ce projet est un backend Node.js/Express pour un site de transport avec suivi de colis, connecté à MongoDB.

## 🚀 Démarrage rapide

1. Copier `.env.example` en `.env` et ajoutez votre URI MongoDB
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur :
   ```bash
   npm run dev
   ```

## 📡 Déploiement Render

1. Poussez ce code sur GitHub
2. Connectez votre repo sur [Render](https://render.com)
3. Ajoutez les variables d'environnement :
   - `MONGO_URI`
   - `PORT` (optionnel)

Votre API sera disponible sur :

```
https://votre-nom.onrender.com/api/shipments
```
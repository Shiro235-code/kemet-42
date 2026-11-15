# KEMET-42 — NASA Space Apps Challenge 2026

Junior Astronaut Mission Trainer  
Jeu éducatif 3D : gérer un avant-poste lunaire ou martien avec de vrais trade-offs et des données NASA (dont DONKI).

## Améliorations pédagogiques (7–12 ans)

- **Langue de Nova** : choix FR / EN dès l’écran d’intro, mémorisé pendant la mission. Nova lit les alertes, les questions, les choix, les bonnes réponses et les explications.
- **Phénomènes dès le Sol 1** : les événements peuvent arriver dès le premier jour (`eventStartDay: 1`).
- **Différences Mars / Lune** : pas de tempête de poussière sur la Lune (quasi pas d’atmosphère). Les autres événements tiennent compte de la destination.
- **Sources NASA** : chaque info scientifique importante renvoie vers un domaine officiel (nasa.gov, science.nasa.gov, jpl.nasa.gov, mars.nasa.gov, nssdc…). Les règles de jeu (chrono, points) sont clairement marquées « règle de jeu ».
- **Explications claires** : chaque phénomène suit cause → ce qui se passe → danger → ce qu’il faut faire → conséquences. Nova lit l’explication complète.
- **Questions adaptées** : phrases courtes, une idée par question, mots simples, explications pédagogiques. Les valeurs scientifiques restent celles des fiches NASA.

```
KEMET-42-complete/
├── frontend/     React + Three.js (Vite)
├── backend/      Express API (auth, mission, scores, DONKI)
└── README.md
```

## Prérequis

- Node.js 18+
- (optionnel) clé gratuite [api.nasa.gov](https://api.nasa.gov) pour DONKI

## Lancer

### 1. Backend

```bash
cd backend
npm install
export NASA_API_KEY=ta_cle   # optionnel
npm start
# → http://localhost:3000
```

### 2. Frontend (autre terminal)

```bash
cd frontend
npm install
VITE_API_URL=http://localhost:3000 npm run dev
# → URL affichée (souvent http://localhost:5173)
```

Sans `VITE_API_URL`, le front tourne en **mode démo** (comptes dans le navigateur).

## Tester vite

- Backend : `curl http://localhost:3000/health` et `curl http://localhost:3000/api/donki`
- Front : « Jouer sans compte » → destination Lune/Mars → quelques Sols
- Auth : créer un compte, relancer une mission

## Routes backend utiles

| Méthode | Route | Rôle |
|---------|--------|------|
| POST | `/auth/register` | Créer un compte |
| POST | `/auth/login` | Connexion |
| GET  | `/api/mission/briefing` | Cargaison + destinations |
| POST | `/api/mission/launch` | Décollage |
| GET  | `/api/mission/status` | 4 jauges |
| POST | `/api/mission/next-day` | Sol suivant (+ alertes DONKI) |
| GET  | `/api/donki` | Snapshot météo spatiale NASA |
| POST | `/scores` | Enregistrer un score (Bearer) |
| GET  | `/scores` | Classement |

## Git (ne pas pousser sur main)

```bash
git init
git checkout -b feature/space-apps-2026
git add .
git commit -m "KEMET-42 Space Apps 2026 — front + backend + DONKI"
git remote add origin https://github.com/USER/REPO.git
git push -u origin feature/space-apps-2026
```

Puis ouvrir une Pull Request vers `main` quand tu es prêt.

## Corrections récentes
- `.gitignore` : commentaires en fin de ligne retirés (Git les lisait comme partie du motif).
- Backend : une mission par joueur (jeton) ou par invité (`X-Guest-Id`), plus de mission globale partagée.
- Étiquettes honnêtes : les taux du cahier des charges (0,8 kg O₂, 2,5 L, 1,8 kg…) sont des règles de jeu, pas des données NASA vérifiées. Pas de données RadLab utilisées.
- Carte réelle Trek (Mars MOLA, Lune LRO WAC) et coordonnées USGS sur l'écran du choix de terrain ; lien CSA (production d'aliments) dans la serre.
- Alerte : libellés français (urgence, type d'accident), blocs recentrés pour ne plus chevaucher Nova et le panneau équipage.

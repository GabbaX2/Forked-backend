# Forked - Documentazione API

## Panoramica
Forked è un'API per la gestione di ricette che permette agli utenti di:
- Registrarsi e autenticarsi
- Creare, leggere, aggiornare ricette
- Generare liste della spesa
- Aggiungere commenti alle ricette
- Gestire il profilo utente

## Tecnologie Utilizzate
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Database
- **Mongoose** - Modellazione oggetti MongoDB
- **bcryptjs** - Hashing delle password
- **jsonwebtoken** - Token di autenticazione
- **cors** - Condivisione risorse tra origini diverse
- **dotenv** - Variabili d'ambiente

## Endpoint API

### Autenticazione
| Metodo | Endpoint              | Descrizione                     | Body Richiesta                              |
|--------|-----------------------|---------------------------------|-------------------------------------------|
| POST   | `/forked/auth/register` | Registra un nuovo utente       | `{ email, password, name }`               |
| POST   | `/forked/auth/login`    | Login utente esistente         | `{ email, password }`                     |

### Ricette
| Metodo | Endpoint              | Descrizione                     | Body Richiesta                              | Autenticazione |
|--------|-----------------------|---------------------------------|-------------------------------------------|---------------|
| GET    | `/forked/recipes`     | Ottieni tutte le ricette       | -                                         | No            |
| POST   | `/forked/recipes`     | Crea una nuova ricetta         | `{ name, ingredients, instructions, imageUrl }` | Sì           |
| PUT    | `/forked/recipes/:id` | Aggiorna una ricetta           | `{ name, ingredients, instructions, imageUrl }` | Sì (proprietario) |
| GET    | `/forked/myrecipes`   | Ricette dell'utente loggato    | -                                         | Sì           |

### Lista della Spesa
| Metodo | Endpoint              | Descrizione                     | Body/Parametri Query                |
|--------|-----------------------|---------------------------------|-------------------------------------------|
| POST   | `/forked/lista-spesa` | Genera lista spesa (POST)      | `{ ricette: [id1, id2], persone: number }` |
| GET    | `/forked/lista-spesa` | Genera lista spesa (GET)       | `?ricette=id1,id2&persone=number`         |

### Commenti
| Metodo | Endpoint                          | Descrizione                     | Autenticazione |
|--------|-----------------------------------|---------------------------------|---------------|
| POST   | `/forked/ricette/:nome/commenti`  | Aggiungi commento a ricetta     | Sì           |
| GET    | `/forked/ricette/:nome/commenti`  | Ottieni commenti per ricetta    | No            |
| DELETE | `/forked/ricette/:nome/commenti/:id` | Elimina commento             | Sì (proprietario) |

### Profilo Utente
| Metodo | Endpoint              | Descrizione                     | Autenticazione |
|--------|-----------------------|---------------------------------|---------------|
| GET    | `/forked/users/profile` | Ottieni profilo utente        | Sì           |
| PUT    | `/forked/users/profile` | Aggiorna profilo utente       | Sì           |

## Esempi Richiesta/Risposta

### Registrazione
**Richiesta:**
```json
POST /forked/auth/register
{
  "email": "utente@example.com",
  "password": "passwordsicura",
  "name": "Mario Rossi"
}
```

**Risposta:**
```json
{
  "token": "jwt.token.here",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Mario Rossi",
    "email": "utente@example.com"
  }
}
```

### Creazione Ricetta
**Richiesta:**
```json
POST /forked/recipes
Authorization: Bearer jwt.token.here
{
  "name": "Pasta Carbonara",
  "ingredients": [
    "200g spaghetti",
    "100g pancetta",
    "2 uova",
    "50g pecorino"
  ],
  "instructions": [
    "Cuoci la pasta",
    "Soffriggi la pancetta",
    "Mischia uova e formaggio",
    "Unisci tutto"
  ]
}
```

**Risposta:**
```json
{
  "message": "Ricetta creata con successo",
  "recipeId": "507f1f77bcf86cd799439012",
  "recipe": {
    "name": "Pasta Carbonara",
    "ingredients": [
      {
        "nome": "spaghetti",
        "quantita": 200,
        "unita": "g"
      },
      {
        "nome": "pancetta",
        "quantita": 100,
        "unita": "g"
      }
    ],
    "creatore": {
      "name": "Mario Rossi",
      "id": "507f1f77bcf86cd799439011"
    }
  }
}
```

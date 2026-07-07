# Guia Firebase — Zynka RPG v2.0

Esta versão funciona de duas formas:

1. **Modo local**: carrega aventuras da pasta `/aventuras`.
2. **Modo Firebase**: carrega aventuras da coleção `aventuras` no Cloud Firestore.

Por padrão o Firebase vem desligado. Assim o jogo já funciona sem configurar nada.

---

## 1. Criar projeto no Firebase

1. Acesse `console.firebase.google.com`.
2. Toque em **Adicionar projeto**.
3. Dê um nome, por exemplo: `zynka-rpg`.
4. Pode desativar Google Analytics no começo, para simplificar.
5. Conclua a criação.

---

## 2. Criar o app Web

1. Dentro do projeto Firebase, toque no ícone **Web** `</>`.
2. Nome do app: `Zynka RPG Web`.
3. Não precisa ativar Firebase Hosting, pois você usará Netlify.
4. Copie o objeto `firebaseConfig`.
5. Abra o arquivo:

```txt
/js/firebase-config.js
```

6. Cole seus dados no lugar dos valores de exemplo.
7. Troque:

```js
export const FIREBASE_ENABLED = false;
```

por:

```js
export const FIREBASE_ENABLED = true;
```

---

## 3. Criar banco Cloud Firestore

1. No menu lateral do Firebase, vá em **Firestore Database**.
2. Toque em **Criar banco de dados**.
3. Para testar rápido, escolha **modo de teste**.
4. Escolha uma região.
5. Finalize.

A documentação oficial do Firebase recomenda criar o Cloud Firestore pelo console e depois acessar com o SDK Web usando `initializeApp` e `getFirestore`.

---

## 4. Regras de teste

Para testar, você pode deixar assim temporariamente:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /aventuras/{document} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

Atenção: isso é apenas para desenvolvimento. Qualquer pessoa poderia escrever no banco.

Quando o projeto estiver público, use uma regra mais segura:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /aventuras/{document} {
      allow read: if resource.data.published == true;
      allow write: if false;
    }
  }
}
```

Com essa regra segura, você cria e edita aventuras manualmente no console do Firebase.

---

## 5. Estrutura da coleção

Crie uma coleção chamada:

```txt
aventuras
```

Dentro dela, crie documentos. O ID pode ser, por exemplo:

```txt
floresta-sombria
```

Campos principais:

| Campo | Tipo | Exemplo |
|---|---|---|
| title | string | A Floresta Sombria |
| icon | string | 🌲 |
| genre | string | Fantasia |
| desc | string | Uma floresta amaldiçoada cheia de segredos. |
| start | string | inicio |
| published | boolean | true |
| order | number | 1 |
| chapters | map | mapa com os capítulos |

---

## 6. Exemplo de documento de aventura

No Firebase, o campo `chapters` deve ser do tipo **map**. Dentro dele, cada capítulo também é um map.

Exemplo resumido:

```json
{
  "title": "A Floresta Sombria",
  "icon": "🌲",
  "genre": "Fantasia",
  "desc": "Uma floresta amaldiçoada cheia de segredos.",
  "start": "inicio",
  "published": true,
  "order": 1,
  "chapters": {
    "inicio": {
      "title": "Entrada da Floresta",
      "text": "Você encontra uma trilha coberta por névoa.",
      "choices": [
        { "text": "Seguir pela trilha", "to": "lobo" },
        { "text": "Procurar ervas", "to": "ervas" }
      ]
    },
    "ervas": {
      "title": "Ervas Medicinais",
      "text": "Você encontra ervas brilhantes e recupera energia.",
      "effect": { "hp": 5, "item": "Ervas Medicinais" },
      "choices": [
        { "text": "Continuar pela trilha", "to": "lobo" }
      ]
    },
    "lobo": {
      "title": "Lobo Sombrio",
      "text": "Um lobo enorme surge entre as árvores.",
      "enemy": {
        "name": "Lobo Sombrio",
        "hp": 11,
        "atk": 3,
        "rewardGold": 6,
        "rewardItem": "Pele Sombria"
      },
      "winTo": "final",
      "loseTo": "derrota"
    },
    "final": {
      "title": "Final: A Névoa se Abre",
      "text": "Você vence o guardião e encontra um antigo santuário.",
      "end": true
    },
    "derrota": {
      "title": "Fim da Jornada",
      "text": "A floresta permanece invicta.",
      "end": true
    }
  }
}
```

---

## 7. Como adicionar aventura sem Firebase

1. Crie um novo arquivo dentro da pasta `/aventuras`, por exemplo:

```txt
aventuras/floresta-sombria.js
```

2. Use o mesmo formato das aventuras existentes.
3. Abra `aventuras/index.js`.
4. Importe e adicione a nova aventura na lista:

```js
import florestaSombria from './floresta-sombria.js';

export const localAdventures = [
  reinoPerdido,
  cidadeDosMortos,
  missaoMarte,
  florestaSombria
];
```

---

## 8. Publicar no Netlify

1. Suba todos os arquivos para um repositório no GitHub.
2. No Netlify, crie um novo site a partir do GitHub.
3. Build command: deixe vazio.
4. Publish directory: deixe como raiz do projeto.
5. Faça deploy.

---

## 9. Observação importante

Como o projeto usa `type="module"`, pode ser melhor testar pelo Netlify ou por um servidor local. Abrir o `index.html` diretamente como arquivo às vezes pode falhar em alguns navegadores.

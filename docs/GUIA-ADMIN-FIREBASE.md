# Guia rápido: publicar aventuras sem criar campos manualmente

## 1. Criar o banco

No Firebase Console:

1. Entre no projeto `zynkagames`.
2. Vá em **Firestore Database**.
3. Clique em **Criar banco de dados**.
4. Escolha **Modo de teste** para testar rapidamente.
5. Escolha uma região e confirme.

## 2. Criar coleção

Você só precisa criar a coleção uma vez:

- Nome da coleção: `aventuras`

Depois disso, o painel `admin.html` cria os documentos e campos automaticamente.

## 3. Regras temporárias para teste

Durante testes, use regras abertas por pouco tempo:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Atenção: isso é apenas para teste. Qualquer pessoa poderia escrever no banco.

## 4. Publicar aventura

1. Abra `admin.html` no site publicado.
2. Clique em **Carregar exemplo**.
3. Edite o JSON se quiser.
4. Clique em **Validar aventura**.
5. Clique em **Publicar no Firebase**.
6. Abra `index.html` e teste.

## 5. Campos importantes do JSON

- `id`: identificador do documento. Use letras minúsculas, números e hífen.
- `title`: título da aventura.
- `icon`: emoji da aventura.
- `genre`: gênero.
- `desc`: descrição curta.
- `start`: ID do capítulo inicial.
- `published`: `true` para aparecer no jogo.
- `order`: ordem de exibição.
- `chapters`: todos os capítulos da aventura.

## 6. Proteger o admin depois

Antes de divulgar o site, o ideal é criar login de administrador com Firebase Authentication e regras de segurança.
A versão 2.1 ainda não tem proteção de admin.

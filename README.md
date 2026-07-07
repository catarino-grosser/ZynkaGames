# Zynka RPG v2.1

Plataforma de RPG narrativo em HTML, CSS e JavaScript.

## O que mudou na v2.1

- `admin.html`: painel para publicar aventuras no Firebase colando JSON.
- Validação automática do JSON antes de publicar.
- Lista aventuras salvas no Firestore.
- Exclui aventuras pelo painel.
- `firebase-config.js` já está preenchido com o projeto `zynkagames`.

## Como usar no celular

1. Extraia o zip no SPCK Editor.
2. Suba para o GitHub.
3. Publique no Netlify.
4. Abra:
   - `index.html` para jogar.
   - `admin.html` para publicar aventuras.

## Firebase

Crie no Firestore uma coleção chamada `aventuras`.
Você não precisa criar os campos manualmente: abra `admin.html`, cole ou edite o JSON e clique em **Publicar no Firebase**.

## Atenção

O painel admin desta versão é simples e não tem login. Para uso público, proteja o `admin.html` antes de divulgar o site.

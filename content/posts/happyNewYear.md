---
title: "Happy New Year"
date: 2021-12-29T19:05:37+01:00
draft: false
thumbnailImage: ../img/hny.png
---

# Mise en place
## Arborescence du projet
![](arbo.png)   

C'est le dossier **build** qui constituera la branche gh-pages

Le dossier **src/assets** contients toutes les sources externes utilisées dans l'application (ici les images et les .json), pour les importer dans les fichiers tsx : import * as dataC from '../src/assets/[chemin/nomDuFichier]';


## Lancer le projet
git init 
(vérifier que le dossier **build** n'est pas dans .gitignore)
npm start 

## Déploiement sur Github

Sur github : settings => pages
![](ghpages.png)

Dans le fichier package.json

    "homepage": "https://[nomUtilisateur].github.io/[nomApplication]",
    "name": [nomApplication],

Dans scripts

    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",

npm run build
npm deploy

# Organisation du projet
Le but de ce projet est d'afficher toutes les langues parlées dans un pays ainsi que leur traductions de "bonne année" puis d'envoyer ce message par mail.   

Dans le dossier **assets** se trouve trois fichiers JSON permettant de:
-   lister les pays et l'abbréviation de chaque langue parlée (**countries.json**).
-   établir les correspondances entre abréviation et nom complet du langage(**languages.json**).
-   établir les correspondances entre une langue et la traduction dans cette langue du message souhaité(**Wishes.json**).
## Qui fait quoi
### index.tsx
```typescript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import reportWebVitals from './reportWebVitals';
    ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    ,
    document.getElementById('root')
    );
    reportWebVitals();
```

### App.tsx
Application principale

### App.css
Page de style de l'application

## Lire du JSON
Par exemple, la table **countries** se présente sous la forme
```json
{"countries":{
  "AD": {
    "name": "Andorra",
    "native": "Andorra",
    "phone": "376",
    "continent": "EU",
    "capital": "Andorra la Vella",
    "currency": "EUR",
    "languages": [
      "ca"
    ]
  },
  "AE": {
    "name": "United Arab Emirates",
    "native": "دولة الإمارات العربية المتحدة",
    "phone": "971",
    "continent": "AS",
    "capital": "Abu Dhabi",
    "currency": "AED",
    "languages": [
      "ar"
    ]
  },
  .
  .
  .}}
```
Il faut tout d'abord récupérer les clés ("AD" , "AE")
````typescript
var keysC : string[]= Object.keys(dataC.countries);
````
Puis dans chaque objet récupérer le champs voulu, ici **name**.
````typescript
function countries():  {value:string}[] {
  for (let i = 0 ; i < keysC.length ; i++){
    //@ts-ignore
    countriesName.push({"value":dataC.countries[keysC[i]].name});
  } 
  return countriesName.sort(compare);
}
````
## Répérer les erreurs
```typescript
export function metrics() : void{
  for (let i = 0 ; i < keysC.length ; i++){
      //@ts-ignore
      var allL = dataC.countries[keysC[i]].languages;
      for (let j = 0 ; j < allL.length ; j++){
        //@ts-ignore
        languagesC.push((dataL.languages[allL[j]].name ).toLowerCase())
      }
    }
  for (let i = 0 ; i <dataW.list.length ; i++){
    languagesW.push((dataW.list[i].Language).toLowerCase());
  }
  for (let i = 0 ; i < languagesC.length ; i++){
    if (!languagesW.includes(languagesC[i])){
        missingLanguages.push(languagesC[i]);
    }
  }
  console.log(missingLanguages.sort());  
}
```

[Demo](https://ljuglaret.github.io/hnyapp/)   
[Code Complet](https://github.com/ljuglaret/hnyapp/tree/main/src)

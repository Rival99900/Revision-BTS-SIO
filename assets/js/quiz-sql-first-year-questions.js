window.SQL_FIRST_YEAR_QUESTIONS = [
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quel mot-clé est utilisé pour <strong>sélectionner</strong> des données ?",
    "opts": [
      "CREATE",
      "SELECT",
      "ALTER",
      "DROP"
    ],
    "answer": 1,
    "exp": "Une requête de sélection commence par <strong>SELECT</strong>."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle clause indique la table sur laquelle travaille une requête SELECT ?",
    "answers": [
      "from"
    ],
    "exp": "La clause <strong>FROM</strong> précise la ou les tables utilisées."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle clause permet de filtrer les lignes selon une condition ?",
    "opts": [
      "WHERE",
      "ORDER BY",
      "CREATE",
      "DISTINCT"
    ],
    "answer": 0,
    "exp": "La clause <strong>WHERE</strong> porte le prédicat de sélection."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quel mot-clé supprime les doublons dans le résultat d’une projection ?",
    "answers": [
      "distinct"
    ],
    "exp": "<strong>DISTINCT</strong> élimine les lignes en double dans le résultat."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quel opérateur SQL signifie « différent de » ?",
    "opts": [
      "!= uniquement",
      "<>",
      "==",
      "~="
    ],
    "answer": 1,
    "exp": "<strong>&lt;&gt;</strong> est l’opérateur SQL utilisé ici pour exprimer « différent de »."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Pour classer un résultat du plus grand au plus petit, quelle option faut-il utiliser ?",
    "opts": [
      "ORDER BY ... DESC",
      "GROUP BY ... DESC",
      "WHERE ... DESC",
      "SELECT DESC"
    ],
    "answer": 0,
    "exp": "Le classement se fait avec <strong>ORDER BY</strong> et <strong>DESC</strong> pour l’ordre décroissant."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quel opérateur teste l’appartenance à une liste de valeurs ?",
    "answers": [
      "in"
    ],
    "exp": "<strong>IN</strong> teste l’appartenance à une liste de valeurs."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle condition sélectionne une couleur qui n’est ni bleue, ni blanche, ni rouge ?",
    "opts": [
      "Couleur NOT IN ('bleu','blanc','rouge')",
      "Couleur IS NULL",
      "Couleur BETWEEN 'bleu' AND 'rouge'",
      "Couleur LIKE 'rouge'"
    ],
    "answer": 0,
    "exp": "La correction de la série 2 utilise <strong>NOT IN</strong> pour la non-appartenance à une liste."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Les bornes utilisées avec BETWEEN sont-elles incluses dans l’intervalle ?",
    "opts": [
      "Oui",
      "Non",
      "Uniquement la borne basse",
      "Uniquement la borne haute"
    ],
    "answer": 0,
    "exp": "Les bornes de <strong>BETWEEN</strong> sont incluses."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle écriture permet de tester qu’un champ ne contient aucune valeur ?",
    "answers": [
      "is null"
    ],
    "exp": "<strong>IS NULL</strong> teste une valeur inconnue ou absente."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quel filtre recherche un nom qui commence par la lettre b ?",
    "opts": [
      "LIKE 'b%'",
      "LIKE '%b'",
      "LIKE '_b%'",
      "IN ('b')"
    ],
    "answer": 0,
    "exp": "Avec <code>LIKE 'b%'</code>, % représente une chaîne quelconque après la lettre b."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quel caractère joker LIKE représente exactement un caractère quelconque ?",
    "answers": [
      "_"
    ],
    "exp": "<strong>%</strong> représente une chaîne quelconque et <strong>_</strong> un seul caractère."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "À quoi sert une jointure SQL ?",
    "opts": [
      "À chiffrer une table",
      "À répondre à une question portant sur plusieurs tables",
      "À supprimer une base",
      "À créer un index"
    ],
    "answer": 1,
    "exp": "Une jointure permet de répondre à des questions portant sur plusieurs tables liées."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Que risque-t-on si deux tables sont placées dans FROM sans critère de jointure ?",
    "opts": [
      "Une clé primaire automatique",
      "Un produit cartésien",
      "Une suppression de lignes",
      "Un GROUP BY automatique"
    ],
    "answer": 1,
    "exp": "Sans critère de jointure, le SGBD produit toutes les combinaisons de lignes : c’est le produit cartésien."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Dans la base Localot, quel champ relie EMBARCATION à TYPEMBARCATION ?",
    "answers": [
      "codetype",
      "code type"
    ],
    "exp": "La correction relie les deux tables avec <code>EMBARCATION.Codetype = TYPEMBARCATION.Codetype</code>."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle fonction compte des lignes ou des valeurs ?",
    "opts": [
      "SUM",
      "COUNT",
      "AVG",
      "MAX"
    ],
    "answer": 1,
    "exp": "<strong>COUNT()</strong> compte le nombre de lignes ou de valeurs."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle fonction d’agrégation calcule une somme ?",
    "answers": [
      "sum",
      "sum()"
    ],
    "exp": "<strong>SUM()</strong> renvoie le cumul des valeurs d’une colonne."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle fonction calcule une moyenne ?",
    "opts": [
      "COUNT",
      "AVG",
      "MIN",
      "SUM"
    ],
    "answer": 1,
    "exp": "<strong>AVG()</strong> calcule la moyenne des valeurs."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelles fonctions renvoient respectivement la plus petite et la plus grande valeur ?",
    "opts": [
      "MIN et MAX",
      "SUM et AVG",
      "COUNT et SUM",
      "LOW et HIGH"
    ],
    "answer": 0,
    "exp": "<strong>MIN()</strong> renvoie le minimum et <strong>MAX()</strong> le maximum."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle clause regroupe les lignes avant un calcul d’agrégation ?",
    "answers": [
      "group by"
    ],
    "exp": "La clause <strong>GROUP BY</strong> réalise le regroupement."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle clause filtre les groupes après une agrégation ?",
    "opts": [
      "WHERE uniquement",
      "HAVING",
      "DISTINCT",
      "ALTER"
    ],
    "answer": 1,
    "exp": "Le résumé SQL du Drive utilise <strong>HAVING</strong> pour filtrer après GROUP BY."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle instruction LMD ajoute de nouveaux enregistrements ?",
    "opts": [
      "INSERT",
      "UPDATE",
      "DELETE",
      "DROP"
    ],
    "answer": 0,
    "exp": "<strong>INSERT</strong> ajoute de nouveaux enregistrements."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle instruction modifie des enregistrements existants ?",
    "answers": [
      "update"
    ],
    "exp": "<strong>UPDATE</strong> sert à modifier des enregistrements existants."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle instruction supprime des enregistrements ?",
    "opts": [
      "DELETE",
      "DROP DATABASE",
      "SELECT",
      "CREATE"
    ],
    "answer": 0,
    "exp": "<strong>DELETE</strong> supprime des enregistrements d’une table."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelles sont les trois grandes familles de commandes LDD étudiées ?",
    "opts": [
      "SELECT, WHERE, FROM",
      "CREATE, ALTER, DROP",
      "INSERT, COUNT, SUM",
      "SHOW, USE, DESC"
    ],
    "answer": 1,
    "exp": "Les trois grandes commandes LDD sont <strong>CREATE</strong>, <strong>ALTER</strong> et <strong>DROP</strong>."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle commande crée une nouvelle table ?",
    "answers": [
      "create table"
    ],
    "exp": "La création d’une table commence par <strong>CREATE TABLE NomTable (...)</strong>."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle contrainte impose qu’un champ soit renseigné ?",
    "opts": [
      "UNIQUE",
      "NOT NULL",
      "DEFAULT",
      "CHECK"
    ],
    "answer": 1,
    "exp": "<strong>NOT NULL</strong> impose une valeur."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle contrainte impose des valeurs différentes ?",
    "opts": [
      "UNIQUE",
      "DEFAULT",
      "AUTO_INCREMENT",
      "FOREIGN KEY"
    ],
    "answer": 0,
    "exp": "<strong>UNIQUE</strong> impose l’unicité des valeurs concernées."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle contrainte définit une valeur utilisée si rien n’est précisé ?",
    "answers": [
      "default"
    ],
    "exp": "<strong>DEFAULT</strong> définit une valeur par défaut."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle contrainte permet d’imposer une condition comme Age >= 18 ?",
    "opts": [
      "CHECK",
      "PRIMARY KEY",
      "DISTINCT",
      "ORDER BY"
    ],
    "answer": 0,
    "exp": "<code>CHECK (Age &gt;= 18)</code> est un exemple de contrainte de vérification."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quel mot-clé permet l’auto-incrément d’un champ numérique ?",
    "answers": [
      "auto_increment",
      "auto increment"
    ],
    "exp": "<strong>AUTO_INCREMENT</strong> permet l’auto-incrément d’un champ numérique."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle contrainte identifie une ligne de manière unique ?",
    "opts": [
      "PRIMARY KEY",
      "FOREIGN KEY",
      "DEFAULT",
      "HAVING"
    ],
    "answer": 0,
    "exp": "La <strong>PRIMARY KEY</strong> est la clé primaire de la table."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle syntaxe exprime une clé étrangère ?",
    "opts": [
      "FOREIGN KEY (...) REFERENCES table (...)",
      "LINK KEY (...) TO table",
      "PRIMARY REFERENCES table",
      "JOIN KEY table"
    ],
    "answer": 0,
    "exp": "<strong>FOREIGN KEY (...) REFERENCES ...</strong> définit une clé étrangère et sa référence."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle commande crée une vue ?",
    "answers": [
      "create view"
    ],
    "exp": "<strong>CREATE VIEW nom_vue AS SELECT ...</strong> permet de créer une vue."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle commande supprime les données d’une table tout en conservant sa structure ?",
    "opts": [
      "DROP TABLE",
      "TRUNCATE TABLE",
      "DELETE DATABASE",
      "ALTER TABLE"
    ],
    "answer": 1,
    "exp": "<strong>TRUNCATE TABLE</strong> supprime les données tout en conservant la structure de la table."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle commande LDD sert à modifier la structure d’une table ?",
    "answers": [
      "alter table"
    ],
    "exp": "<strong>ALTER TABLE</strong> permet d’ajouter, supprimer, renommer ou modifier des éléments de structure."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle commande MySQL affiche les bases disponibles ?",
    "opts": [
      "SHOW DATABASES;",
      "SHOW TABLES;",
      "DESC database;",
      "LIST DATABASES;"
    ],
    "answer": 0,
    "exp": "<strong>SHOW DATABASES;</strong> affiche les bases de données disponibles."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle commande MySQL crée une base appelée ECOLE ?",
    "answers": [
      "create database ecole",
      "create database ecole;"
    ],
    "exp": "<strong>CREATE DATABASE Ecole;</strong> crée la base de données Ecole."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle commande sélectionne la base ECOLE dans MySQL ?",
    "opts": [
      "USE Ecole;",
      "OPEN Ecole;",
      "SELECT DATABASE Ecole;",
      "FROM Ecole;"
    ],
    "answer": 0,
    "exp": "<strong>USE Ecole;</strong> sélectionne la base Ecole."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quelle commande affiche les tables de la base courante ?",
    "answers": [
      "show tables",
      "show tables;"
    ],
    "exp": "<strong>SHOW TABLES;</strong> affiche les tables de la base sélectionnée."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "mcq",
    "q": "Quelle commande affiche la structure d’une table ?",
    "opts": [
      "DESC nomtable;",
      "SHOW DATABASES;",
      "SOURCE nomtable;",
      "USE nomtable;"
    ],
    "answer": 0,
    "exp": "<strong>DESC nomtable;</strong> affiche la structure d’une table."
  },
  {
    "year": 1,
    "module": "sql",
    "cat": "🗃️ SQL — 1re année",
    "type": "text",
    "q": "Quel mot-clé MySQL exécute un script .sql ?",
    "answers": [
      "source"
    ],
    "exp": "<strong>SOURCE nomscript.sql;</strong> exécute un script SQL."
  }
];

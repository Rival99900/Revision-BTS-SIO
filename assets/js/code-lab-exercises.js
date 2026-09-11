/* Code Lab — banque d’exercices Python / PHP / Java */

/* =====================================================
   BTS SIO — Code Lab v5
   Python : Pyodide (navigateur)
   PHP / Java : Judge0 CE (sandbox distant)
   Éditeur : coloration syntaxique locale sans dépendance
   ===================================================== */

const CODE_LAB_EXERCISES = {
  "python": [
    {
      "id": "py-sandbox",
      "title": "Sandbox libre",
      "difficulty": "Libre",
      "sandbox": true,
      "description": "Éditeur vide pour expérimenter librement en Python. Écrivez votre propre programme et utilisez STDIN si nécessaire.",
      "stdin": "",
      "expected": "",
      "hint": "",
      "starter": ""
    },
    {
      "id": "py-message",
      "title": "Afficher une variable",
      "difficulty": "Très facile",
      "description": "Une variable message est déjà créée. Affichez exactement son contenu.",
      "stdin": "",
      "expected": "Bonjour BTS SIO",
      "hint": "Utilisez print() en lui passant la variable message.",
      "hintMarker": "# À compléter",
      "hintCode": "print(message)",
      "starter": "message = \"Bonjour BTS SIO\"\n\n# À compléter\n",
      "tests": [
        {
          "stdin": "",
          "expected": "Bonjour BTS SIO"
        }
      ]
    },
    {
      "id": "py-profile",
      "title": "Profil utilisateur",
      "difficulty": "Très facile",
      "description": "Lisez un prénom puis un âge et affichez une phrase au format « Prénom a X ans. ».",
      "stdin": "Alex\n19",
      "expected": "Alex a 19 ans.",
      "hint": "Récupérez les deux valeurs avec input(), puis utilisez une f-string.",
      "starter": "prenom = input()\nage = int(input())\n\n# À compléter\n",
      "tests": [
        {
          "stdin": "Alex\n19",
          "expected": "Alex a 19 ans."
        },
        {
          "stdin": "Lina\n20",
          "expected": "Lina a 20 ans."
        }
      ]
    },
    {
      "id": "py-pair",
      "title": "Pair ou impair",
      "difficulty": "Facile",
      "description": "Lisez un entier et affichez « N est pair » ou « N est impair ».",
      "stdin": "42",
      "expected": "42 est pair",
      "hint": "Le reste de la division par 2 se calcule avec %.",
      "hintMarker": "# À compléter",
      "hintCode": "if n % 2 == 0:\n    print(f\"{n} est pair\")\nelse:\n    # affichez le cas impair",
      "starter": "n = int(input())\n\n# À compléter\n",
      "tests": [
        {
          "stdin": "42",
          "expected": "42 est pair"
        },
        {
          "stdin": "7",
          "expected": "7 est impair"
        }
      ]
    },
    {
      "id": "py-table",
      "title": "Table de multiplication",
      "difficulty": "Facile",
      "description": "Lisez un entier et affichez ses 5 premières multiplications, une par ligne.",
      "stdin": "4",
      "expected": "4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20",
      "hint": "Utilisez range(1, 6) et une f-string.",
      "hintMarker": "# À compléter",
      "hintCode": "for i in range(1, 6):\n    print(f\"{n} x {i} = {n * i}\")",
      "starter": "n = int(input())\n\n# À compléter\n",
      "tests": [
        {
          "stdin": "4",
          "expected": "4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20"
        },
        {
          "stdin": "2",
          "expected": "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10"
        }
      ]
    },
    {
      "id": "py-stats",
      "title": "Statistiques d’une liste",
      "difficulty": "Débutant",
      "description": "Lisez des entiers séparés par des espaces, puis affichez la somme et le maximum.",
      "stdin": "4 7 2 7 9",
      "expected": "Somme: 29\nMaximum: 9",
      "hint": "Transformez input().split() avec int(), puis utilisez sum() et max().",
      "hintMarker": "# À compléter",
      "hintCode": "nombres = [int(valeur) for valeur in input().split()]\nprint(f\"Somme: {sum(nombres)}\")\n# affichez ensuite le maximum",
      "starter": "# À compléter\n",
      "tests": [
        {
          "stdin": "4 7 2 7 9",
          "expected": "Somme: 29\nMaximum: 9"
        },
        {
          "stdin": "-2 5 3",
          "expected": "Somme: 6\nMaximum: 5"
        }
      ]
    },
    {
      "id": "py-occurrences",
      "title": "Compter un mot",
      "difficulty": "Débutant",
      "description": "La première ligne contient le mot recherché et la seconde une phrase. Comptez ses occurrences.",
      "stdin": "python\npython php java python sql python",
      "expected": "python: 3",
      "hint": "Lisez le mot, puis la phrase avec split(). Utilisez un compteur ou count().",
      "hintMarker": "# À compléter",
      "hintCode": "mot_recherche = input().strip()\nmots = input().split()\ncompteur = mots.count(mot_recherche)\n# affichez le résultat",
      "starter": "# À compléter\n",
      "tests": [
        {
          "stdin": "python\npython php java python sql python",
          "expected": "python: 3"
        },
        {
          "stdin": "java\njava php java python",
          "expected": "java: 2"
        }
      ]
    },
    {
      "id": "py-average",
      "title": "Fonction moyenne",
      "difficulty": "Intermédiaire",
      "description": "Créez une fonction moyenne(nombres), lisez une liste de nombres et affichez la moyenne avec 2 décimales.",
      "stdin": "12 15 9 14",
      "expected": "Moyenne: 12.50",
      "hint": "La moyenne vaut sum(nombres) / len(nombres). Formatez avec :.2f.",
      "hintMarker": "# À compléter",
      "hintCode": "def moyenne(nombres):\n    return sum(nombres) / len(nombres)",
      "starter": "def moyenne(nombres):\n    # À compléter\n    return 0\n\nnombres = [float(x) for x in input().split()]\nprint(f\"Moyenne: {moyenne(nombres):.2f}\")\n",
      "tests": [
        {
          "stdin": "12 15 9 14",
          "expected": "Moyenne: 12.50"
        },
        {
          "stdin": "10 20 30",
          "expected": "Moyenne: 20.00"
        }
      ]
    },
    {
      "id": "py-palindrome",
      "title": "Détecter un palindrome",
      "difficulty": "Intermédiaire",
      "description": "Lisez un mot et indiquez s’il est identique lorsqu’on le lit à l’envers.",
      "stdin": "radar",
      "expected": "radar: palindrome",
      "hint": "En Python, mot[::-1] produit la chaîne inversée.",
      "hintMarker": "# À compléter",
      "hintCode": "if mot == mot[::-1]:\n    print(f\"{mot}: palindrome\")\nelse:\n    # affichez « non palindrome »",
      "starter": "mot = input().strip().lower()\n\n# À compléter\n",
      "tests": [
        {
          "stdin": "radar",
          "expected": "radar: palindrome"
        },
        {
          "stdin": "python",
          "expected": "python: non palindrome"
        }
      ]
    },
    {
      "id": "py-object",
      "title": "Classe Etudiant",
      "difficulty": "Avancé",
      "description": "Complétez la classe Etudiant. Lisez nom, option et moyenne puis affichez les trois informations.",
      "stdin": "Alex\nSLAM\n15.5",
      "expected": "Alex - SLAM - 15.5",
      "hint": "Le constructeur __init__ initialise les attributs avec self.",
      "hintMarker": "# À compléter",
      "hintCode": "self.nom = nom\n        self.option = option\n        self.moyenne = moyenne",
      "starter": "class Etudiant:\n    def __init__(self, nom, option, moyenne):\n        # À compléter\n        pass\n\nnom = input().strip()\noption = input().strip()\nmoyenne = float(input())\ne = Etudiant(nom, option, moyenne)\nprint(f\"{e.nom} - {e.option} - {e.moyenne:g}\")\n",
      "tests": [
        {
          "stdin": "Alex\nSLAM\n15.5",
          "expected": "Alex - SLAM - 15.5"
        },
        {
          "stdin": "Lina\nSISR\n14",
          "expected": "Lina - SISR - 14"
        }
      ]
    },
    {
      "id": "py-frequency",
      "title": "Fréquence des mots",
      "difficulty": "Avancé +",
      "description": "Lisez une phrase, comptez chaque mot puis affichez « mot: nombre » par ordre alphabétique.",
      "stdin": "python java python php java python",
      "expected": "java: 2\nphp: 1\npython: 3",
      "hint": "Utilisez un dictionnaire, get(mot, 0), puis parcourez sorted(compteurs).",
      "hintMarker": "# À compléter",
      "hintCode": "compteurs = {}\nfor mot in input().split():\n    compteurs[mot] = compteurs.get(mot, 0) + 1\n\nfor mot in sorted(compteurs):\n    print(f\"{mot}: {compteurs[mot]}\")",
      "starter": "# À compléter\n",
      "tests": [
        {
          "stdin": "python java python php java python",
          "expected": "java: 2\nphp: 1\npython: 3"
        },
        {
          "stdin": "sql php sql java",
          "expected": "java: 1\nphp: 1\nsql: 2"
        }
      ]
    }
  ],
  "php": [
    {
      "id": "php-sandbox",
      "title": "Sandbox libre",
      "difficulty": "Libre",
      "sandbox": true,
      "description": "Éditeur vide pour expérimenter librement en PHP. Si vous oubliez <?php, le moteur l’ajoute automatiquement à l’exécution.",
      "stdin": "",
      "expected": "",
      "hint": "",
      "starter": ""
    },
    {
      "id": "php-vars",
      "title": "Variables et echo",
      "difficulty": "Très facile",
      "description": "Deux variables sont fournies. Affichez exactement « Alex - BTS SIO ».",
      "stdin": "",
      "expected": "Alex - BTS SIO",
      "hint": "Utilisez echo et l’opérateur de concaténation « . ».",
      "hintMarker": "// À compléter",
      "hintCode": "echo $prenom . \" - \" . $formation;",
      "starter": "<?php\n$prenom = \"Alex\";\n$formation = \"BTS SIO\";\n\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "",
          "expected": "Alex - BTS SIO"
        }
      ]
    },
    {
      "id": "php-profile",
      "title": "Profil utilisateur",
      "difficulty": "Très facile",
      "description": "Lisez un prénom puis un âge sur STDIN et affichez « Prénom a X ans. ».",
      "stdin": "Alex\n19",
      "expected": "Alex a 19 ans.",
      "hint": "Utilisez trim(fgets(STDIN)) pour lire chaque ligne.",
      "hintMarker": "// À compléter",
      "hintCode": "$prenom = trim(fgets(STDIN));\n$age = (int) trim(fgets(STDIN));\necho $prenom . \" a \" . $age . \" ans.\";",
      "starter": "<?php\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "Alex\n19",
          "expected": "Alex a 19 ans."
        },
        {
          "stdin": "Lina\n20",
          "expected": "Lina a 20 ans."
        }
      ]
    },
    {
      "id": "php-admission",
      "title": "Condition d’admission",
      "difficulty": "Facile",
      "description": "Lisez une note. Affichez « Admis » si elle est ≥ 10, sinon « Ajourné ».",
      "stdin": "14",
      "expected": "Admis",
      "hint": "Convertissez la saisie en float puis utilisez if/else.",
      "hintMarker": "// À compléter",
      "hintCode": "$note = (float) trim(fgets(STDIN));\nif ($note >= 10) {\n    echo \"Admis\";\n} else {\n    echo \"Ajourné\";\n}",
      "starter": "<?php\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "14",
          "expected": "Admis"
        },
        {
          "stdin": "8.5",
          "expected": "Ajourné"
        }
      ]
    },
    {
      "id": "php-pair",
      "title": "Pair ou impair",
      "difficulty": "Facile",
      "description": "Lisez un entier et affichez « N est pair » ou « N est impair ».",
      "stdin": "42",
      "expected": "42 est pair",
      "hint": "Utilisez l’opérateur modulo % et un if/else.",
      "hintMarker": "// À compléter",
      "hintCode": "$n = (int) trim(fgets(STDIN));\nif ($n % 2 === 0) {\n    echo $n . \" est pair\";\n} else {\n    echo $n . \" est impair\";\n}",
      "starter": "<?php\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "42",
          "expected": "42 est pair"
        },
        {
          "stdin": "7",
          "expected": "7 est impair"
        }
      ]
    },
    {
      "id": "php-table",
      "title": "Table de multiplication",
      "difficulty": "Débutant",
      "description": "Lisez un entier et affichez ses 5 premières multiplications, une par ligne.",
      "stdin": "4",
      "expected": "4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20",
      "hint": "Utilisez une boucle for de 1 à 5 et PHP_EOL.",
      "hintMarker": "// À compléter",
      "hintCode": "$n = (int) trim(fgets(STDIN));\nfor ($i = 1; $i <= 5; $i++) {\n    echo $n . \" x \" . $i . \" = \" . ($n * $i) . PHP_EOL;\n}",
      "starter": "<?php\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "4",
          "expected": "4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20"
        },
        {
          "stdin": "2",
          "expected": "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10"
        }
      ]
    },
    {
      "id": "php-stats",
      "title": "Statistiques d’un tableau",
      "difficulty": "Débutant",
      "description": "Lisez des entiers séparés par des espaces, puis affichez la somme et le maximum.",
      "stdin": "4 7 2 7 9",
      "expected": "Somme: 29\nMaximum: 9",
      "hint": "Utilisez explode(), array_map(\"intval\", ...), array_sum() et max().",
      "hintMarker": "// À compléter",
      "hintCode": "$nombres = array_map(\"intval\", preg_split(\"/\\s+/\", trim(fgets(STDIN))));\necho \"Somme: \" . array_sum($nombres) . PHP_EOL;\necho \"Maximum: \" . max($nombres);",
      "starter": "<?php\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "4 7 2 7 9",
          "expected": "Somme: 29\nMaximum: 9"
        },
        {
          "stdin": "-2 5 3",
          "expected": "Somme: 6\nMaximum: 5"
        }
      ]
    },
    {
      "id": "php-occurrences",
      "title": "Compter un mot",
      "difficulty": "Intermédiaire",
      "description": "La première ligne contient le mot recherché et la seconde une phrase. Affichez son nombre d’occurrences.",
      "stdin": "php\nphp java php python php",
      "expected": "php: 3",
      "hint": "Lisez les deux lignes, utilisez preg_split() puis comptez avec une boucle.",
      "hintMarker": "// À compléter",
      "hintCode": "$motRecherche = trim(fgets(STDIN));\n$mots = preg_split(\"/\\s+/\", trim(fgets(STDIN)));\n$compteur = 0;\nforeach ($mots as $mot) {\n    if ($mot === $motRecherche) {\n        $compteur++;\n    }\n}\necho $motRecherche . \": \" . $compteur;",
      "starter": "<?php\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "php\nphp java php python php",
          "expected": "php: 3"
        },
        {
          "stdin": "java\njava php java python",
          "expected": "java: 2"
        }
      ]
    },
    {
      "id": "php-average",
      "title": "Fonction moyenne",
      "difficulty": "Intermédiaire",
      "description": "Créez une fonction moyenne(array $nombres) et affichez le résultat avec 2 décimales.",
      "stdin": "12 15 9 14",
      "expected": "Moyenne: 12.50",
      "hint": "La moyenne vaut array_sum($nombres) / count($nombres). Utilisez number_format().",
      "hintMarker": "// À compléter",
      "hintCode": "function moyenne(array $nombres): float {\n    return array_sum($nombres) / count($nombres);\n}",
      "starter": "<?php\nfunction moyenne(array $nombres): float {\n    // À compléter\n    return 0;\n}\n\n$nombres = array_map(\"floatval\", preg_split(\"/\\s+/\", trim(fgets(STDIN))));\necho \"Moyenne: \" . number_format(moyenne($nombres), 2, \".\", \"\");\n?>\n",
      "tests": [
        {
          "stdin": "12 15 9 14",
          "expected": "Moyenne: 12.50"
        },
        {
          "stdin": "10 20 30",
          "expected": "Moyenne: 20.00"
        }
      ]
    },
    {
      "id": "php-assoc",
      "title": "Meilleure note associative",
      "difficulty": "Avancé",
      "description": "Parcourez le tableau associatif et affichez l’étudiant ayant la meilleure note.",
      "stdin": "",
      "expected": "Bob: 17",
      "hint": "Gardez deux variables : meilleurNom et meilleureNote, puis comparez dans foreach.",
      "hintMarker": "// À compléter",
      "hintCode": "$meilleurNom = \"\";\n$meilleureNote = -1;\nforeach ($notes as $nom => $note) {\n    if ($note > $meilleureNote) {\n        $meilleureNote = $note;\n        $meilleurNom = $nom;\n    }\n}\necho $meilleurNom . \": \" . $meilleureNote;",
      "starter": "<?php\n$notes = [\"Alice\" => 15, \"Bob\" => 17, \"Chloe\" => 14];\n\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "",
          "expected": "Bob: 17"
        }
      ]
    },
    {
      "id": "php-object",
      "title": "Classe Produit",
      "difficulty": "Avancé +",
      "description": "Complétez la classe Produit et sa méthode prixTTC(). Affichez le nom et le prix TTC à 2 décimales.",
      "stdin": "",
      "expected": "Clavier: 59.88 EUR",
      "hint": "Le constructeur initialise les propriétés avec $this->. Le prix TTC vaut prixHT × (1 + tauxTVA).",
      "hintMarker": "// À compléter constructeur",
      "hintCode": "$this->nom = $nom;\n        $this->prixHT = $prixHT;\n        $this->tauxTVA = $tauxTVA;",
      "starter": "<?php\nclass Produit {\n    public string $nom;\n    public float $prixHT;\n    public float $tauxTVA;\n\n    public function __construct(string $nom, float $prixHT, float $tauxTVA) {\n        // À compléter constructeur\n    }\n\n    public function prixTTC(): float {\n        // À compléter méthode\n        return 0;\n    }\n}\n\n$produit = new Produit(\"Clavier\", 49.90, 0.20);\necho $produit->nom . \": \" . number_format($produit->prixTTC(), 2, \".\", \"\") . \" EUR\";\n?>\n",
      "tests": [
        {
          "stdin": "",
          "expected": "Clavier: 59.88 EUR"
        }
      ]
    }
  ],
  "java": [
    {
      "id": "java-sandbox",
      "title": "Sandbox libre",
      "difficulty": "Libre",
      "sandbox": true,
      "description": "Éditeur vide pour expérimenter librement en Java. Le moteur attend une classe Main ; les snippets simples peuvent être automatiquement enveloppés.",
      "stdin": "",
      "expected": "",
      "hint": "",
      "starter": ""
    },
    {
      "id": "java-variable",
      "title": "Afficher une variable",
      "difficulty": "Très facile",
      "description": "Une variable message est fournie. Affichez exactement son contenu.",
      "stdin": "",
      "expected": "Bonjour BTS SIO",
      "hint": "Utilisez System.out.println(message).",
      "hintMarker": "// À compléter",
      "hintCode": "System.out.println(message);",
      "starter": "public class Main {\n    public static void main(String[] args) {\n        String message = \"Bonjour BTS SIO\";\n        // À compléter\n    }\n}\n",
      "tests": [
        {
          "stdin": "",
          "expected": "Bonjour BTS SIO"
        }
      ]
    },
    {
      "id": "java-greeting",
      "title": "Lecture avec Scanner",
      "difficulty": "Très facile",
      "description": "Lisez un prénom depuis STDIN et affichez « Bonjour Prénom ».",
      "stdin": "Alex",
      "expected": "Bonjour Alex",
      "hint": "Créez un Scanner sur System.in et utilisez nextLine().",
      "hintMarker": "// À compléter",
      "hintCode": "Scanner scanner = new Scanner(System.in);\n        String prenom = scanner.nextLine();\n        System.out.println(\"Bonjour \" + prenom);",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // À compléter\n    }\n}\n",
      "tests": [
        {
          "stdin": "Alex",
          "expected": "Bonjour Alex"
        },
        {
          "stdin": "Lina",
          "expected": "Bonjour Lina"
        }
      ]
    },
    {
      "id": "java-pair",
      "title": "Pair ou impair",
      "difficulty": "Facile",
      "description": "Lisez un entier et affichez « N est pair » ou « N est impair ».",
      "stdin": "42",
      "expected": "42 est pair",
      "hint": "Utilisez n % 2 == 0 dans un if/else.",
      "hintMarker": "// À compléter",
      "hintCode": "Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        if (n % 2 == 0) {\n            System.out.println(n + \" est pair\");\n        } else {\n            System.out.println(n + \" est impair\");\n        }",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // À compléter\n    }\n}\n",
      "tests": [
        {
          "stdin": "42",
          "expected": "42 est pair"
        },
        {
          "stdin": "7",
          "expected": "7 est impair"
        }
      ]
    },
    {
      "id": "java-loop",
      "title": "Suite de 1 à N",
      "difficulty": "Facile",
      "description": "Lisez N et affichez les nombres de 1 à N sur une ligne, séparés par un espace sans espace final.",
      "stdin": "5",
      "expected": "1 2 3 4 5",
      "hint": "Dans la boucle, affichez un espace seulement si i < n.",
      "hintMarker": "// À compléter",
      "hintCode": "Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        for (int i = 1; i <= n; i++) {\n            System.out.print(i);\n            if (i < n) System.out.print(\" \");\n        }",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // À compléter\n    }\n}\n",
      "tests": [
        {
          "stdin": "5",
          "expected": "1 2 3 4 5"
        },
        {
          "stdin": "3",
          "expected": "1 2 3"
        }
      ]
    },
    {
      "id": "java-square",
      "title": "Méthode carre",
      "difficulty": "Débutant",
      "description": "Complétez carre(int n), lisez un entier et affichez son carré.",
      "stdin": "6",
      "expected": "36",
      "hint": "Retournez n * n.",
      "hintMarker": "// À compléter méthode",
      "hintCode": "return n * n;",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static int carre(int n) {\n        // À compléter méthode\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        System.out.println(carre(n));\n    }\n}\n",
      "tests": [
        {
          "stdin": "6",
          "expected": "36"
        },
        {
          "stdin": "-4",
          "expected": "16"
        }
      ]
    },
    {
      "id": "java-stats",
      "title": "Statistiques d’un tableau",
      "difficulty": "Débutant",
      "description": "Lisez N puis N entiers. Affichez leur somme et leur maximum.",
      "stdin": "5\n4 7 2 7 9",
      "expected": "Somme: 29\nMaximum: 9",
      "hint": "Initialisez max avec la première valeur lue, puis mettez à jour somme et max dans la boucle.",
      "hintMarker": "// À compléter",
      "hintCode": "int n = scanner.nextInt();\n        int somme = 0;\n        int maximum = Integer.MIN_VALUE;\n        for (int i = 0; i < n; i++) {\n            int valeur = scanner.nextInt();\n            somme += valeur;\n            maximum = Math.max(maximum, valeur);\n        }",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // À compléter\n        System.out.println(\"Somme: \" + somme);\n        System.out.println(\"Maximum: \" + maximum);\n    }\n}\n",
      "tests": [
        {
          "stdin": "5\n4 7 2 7 9",
          "expected": "Somme: 29\nMaximum: 9"
        },
        {
          "stdin": "3\n-2 5 3",
          "expected": "Somme: 6\nMaximum: 5"
        }
      ]
    },
    {
      "id": "java-occurrences",
      "title": "Compter un mot",
      "difficulty": "Intermédiaire",
      "description": "Lisez le mot recherché puis une phrase. Comptez ses occurrences.",
      "stdin": "java\njava php java python",
      "expected": "java: 2",
      "hint": "Lisez deux lignes et parcourez phrase.split(\"\\\\s+\").",
      "hintMarker": "// À compléter",
      "hintCode": "String motRecherche = scanner.nextLine().trim();\n        String[] mots = scanner.nextLine().trim().split(\"\\\\s+\");\n        int compteur = 0;\n        for (String mot : mots) {\n            if (mot.equals(motRecherche)) compteur++;\n        }",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // À compléter\n        System.out.println(motRecherche + \": \" + compteur);\n    }\n}\n",
      "tests": [
        {
          "stdin": "java\njava php java python",
          "expected": "java: 2"
        },
        {
          "stdin": "python\npython java python sql python",
          "expected": "python: 3"
        }
      ]
    },
    {
      "id": "java-average",
      "title": "Méthode moyenne",
      "difficulty": "Intermédiaire",
      "description": "Lisez N puis N nombres décimaux. Utilisez une méthode moyenne(double[]) et affichez 2 décimales.",
      "stdin": "4\n12 15 9 14",
      "expected": "Moyenne: 12.50",
      "hint": "Additionnez les valeurs dans la méthode puis divisez par tableau.length. Utilisez printf(\"%.2f\").",
      "hintMarker": "// À compléter méthode",
      "hintCode": "double somme = 0;\n        for (double valeur : nombres) somme += valeur;\n        return somme / nombres.length;",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static double moyenne(double[] nombres) {\n        // À compléter méthode\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        double[] nombres = new double[n];\n        for (int i = 0; i < n; i++) nombres[i] = scanner.nextDouble();\n        System.out.printf(java.util.Locale.US, \"Moyenne: %.2f%n\", moyenne(nombres));\n    }\n}\n",
      "tests": [
        {
          "stdin": "4\n12 15 9 14",
          "expected": "Moyenne: 12.50"
        },
        {
          "stdin": "3\n10 20 30",
          "expected": "Moyenne: 20.00"
        }
      ]
    },
    {
      "id": "java-object",
      "title": "Objet Etudiant",
      "difficulty": "Avancé",
      "description": "Complétez le constructeur Etudiant et affichez nom, option et moyenne.",
      "stdin": "Alex\nSLAM\n15.5",
      "expected": "Alex - SLAM - 15.5",
      "hint": "Dans le constructeur, affectez chaque paramètre à this.attribut.",
      "hintMarker": "// À compléter constructeur",
      "hintCode": "this.nom = nom;\n        this.option = option;\n        this.moyenne = moyenne;",
      "starter": "import java.util.Scanner;\n\nclass Etudiant {\n    String nom;\n    String option;\n    double moyenne;\n\n    Etudiant(String nom, String option, double moyenne) {\n        // À compléter constructeur\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String nom = scanner.nextLine();\n        String option = scanner.nextLine();\n        double moyenne = Double.parseDouble(scanner.nextLine());\n        Etudiant e = new Etudiant(nom, option, moyenne);\n        System.out.println(e.nom + \" - \" + e.option + \" - \" + e.moyenne);\n    }\n}\n",
      "tests": [
        {
          "stdin": "Alex\nSLAM\n15.5",
          "expected": "Alex - SLAM - 15.5"
        },
        {
          "stdin": "Lina\nSISR\n14",
          "expected": "Lina - SISR - 14.0"
        }
      ]
    },
    {
      "id": "java-frequency",
      "title": "Fréquence des mots avec Map",
      "difficulty": "Avancé +",
      "description": "Lisez une phrase, comptez chaque mot et affichez les résultats par ordre alphabétique.",
      "stdin": "python java python php java python",
      "expected": "java: 2\nphp: 1\npython: 3",
      "hint": "Un TreeMap conserve les clés triées. Utilisez getOrDefault(mot, 0) + 1.",
      "hintMarker": "// À compléter",
      "hintCode": "Map<String, Integer> compteurs = new TreeMap<>();\n        for (String mot : scanner.nextLine().trim().split(\"\\\\s+\")) {\n            compteurs.put(mot, compteurs.getOrDefault(mot, 0) + 1);\n        }\n        for (Map.Entry<String, Integer> entree : compteurs.entrySet()) {\n            System.out.println(entree.getKey() + \": \" + entree.getValue());\n        }",
      "starter": "import java.util.Map;\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // À compléter\n    }\n}\n",
      "tests": [
        {
          "stdin": "python java python php java python",
          "expected": "java: 2\nphp: 1\npython: 3"
        },
        {
          "stdin": "sql php sql java",
          "expected": "java: 1\nphp: 1\nsql: 2"
        }
      ]
    }
  ]
};

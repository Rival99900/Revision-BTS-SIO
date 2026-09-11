/* Code Lab — banque d’exercices Python / PHP / Java */

/* =====================================================
   BTS SIO — Code Lab
   Exercices communs aux 3 langages : choisissez .py, .php ou .java
   au moment de créer le fichier de l’exercice.
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
      "starter": "",
      "concept": "sandbox"
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
      ],
      "concept": "message"
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
      ],
      "concept": "profile"
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
      ],
      "concept": "pair"
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
      ],
      "concept": "table"
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
      ],
      "concept": "stats"
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
      ],
      "concept": "occurrences"
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
      ],
      "concept": "average"
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
      ],
      "concept": "palindrome"
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
      ],
      "concept": "object"
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
      ],
      "concept": "frequency"
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
      "starter": "",
      "concept": "sandbox"
    },
    {
      "id": "php-vars",
      "title": "Afficher une variable",
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
      ],
      "concept": "message"
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
      ],
      "concept": "profile"
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
      ],
      "concept": "pair"
    },
    {
      "id": "php-table",
      "title": "Table de multiplication",
      "difficulty": "Facile",
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
      ],
      "concept": "table"
    },
    {
      "id": "php-stats",
      "title": "Statistiques d’une liste",
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
      ],
      "concept": "stats"
    },
    {
      "id": "php-occurrences",
      "title": "Compter un mot",
      "difficulty": "Débutant",
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
      ],
      "concept": "occurrences"
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
      ],
      "concept": "average"
    },
    {
      "id": "php-palindrome",
      "title": "Détecter un palindrome",
      "difficulty": "Intermédiaire",
      "description": "Lisez un mot et indiquez s’il est identique lorsqu’on le lit à l’envers.",
      "stdin": "radar",
      "expected": "radar: palindrome",
      "hint": "Comparez le mot avec strrev($mot).",
      "hintMarker": "// À compléter",
      "hintCode": "if ($mot === strrev($mot)) {\n    echo $mot . \": palindrome\";\n} else {\n    // affichez « non palindrome »\n}",
      "starter": "<?php\n$mot = strtolower(trim(fgets(STDIN)));\n\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "radar",
          "expected": "radar: palindrome"
        },
        {
          "stdin": "python",
          "expected": "python: non palindrome"
        }
      ],
      "concept": "palindrome"
    },
    {
      "id": "php-object-etudiant",
      "title": "Classe Etudiant",
      "difficulty": "Avancé",
      "description": "Complétez la classe Etudiant. Lisez nom, option et moyenne puis affichez les trois informations.",
      "stdin": "Alex\nSLAM\n15.5",
      "expected": "Alex - SLAM - 15.5",
      "hint": "Le constructeur initialise les propriétés avec $this->.",
      "hintMarker": "// À compléter constructeur",
      "hintCode": "$this->nom = $nom;\n        $this->option = $option;\n        $this->moyenne = $moyenne;",
      "starter": "<?php\nclass Etudiant {\n    public string $nom;\n    public string $option;\n    public float $moyenne;\n\n    public function __construct(string $nom, string $option, float $moyenne) {\n        // À compléter constructeur\n    }\n}\n\n$nom = trim(fgets(STDIN));\n$option = trim(fgets(STDIN));\n$moyenne = (float) trim(fgets(STDIN));\n$e = new Etudiant($nom, $option, $moyenne);\necho $e->nom . \" - \" . $e->option . \" - \" . rtrim(rtrim(number_format($e->moyenne, 2, \".\", \"\"), \"0\"), \".\");\n?>\n",
      "tests": [
        {
          "stdin": "Alex\nSLAM\n15.5",
          "expected": "Alex - SLAM - 15.5"
        },
        {
          "stdin": "Lina\nSISR\n14",
          "expected": "Lina - SISR - 14"
        }
      ],
      "concept": "object"
    },
    {
      "id": "php-frequency",
      "title": "Fréquence des mots",
      "difficulty": "Avancé +",
      "description": "Lisez une phrase, comptez chaque mot puis affichez « mot: nombre » par ordre alphabétique.",
      "stdin": "python java python php java python",
      "expected": "java: 2\nphp: 1\npython: 3",
      "hint": "Utilisez array_count_values(), ksort() puis foreach.",
      "hintMarker": "// À compléter",
      "hintCode": "$mots = preg_split(\"/\\s+/\", trim(fgets(STDIN)));\n$frequences = array_count_values($mots);\nksort($frequences);\nforeach ($frequences as $mot => $nombre) {\n    echo $mot . \": \" . $nombre . PHP_EOL;\n}",
      "starter": "<?php\n// À compléter\n?>\n",
      "tests": [
        {
          "stdin": "python java python php java python",
          "expected": "java: 2\nphp: 1\npython: 3"
        },
        {
          "stdin": "sql php sql java",
          "expected": "java: 1\nphp: 1\nsql: 2"
        }
      ],
      "concept": "frequency"
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
      "starter": "",
      "concept": "sandbox"
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
      ],
      "concept": "message"
    },
    {
      "id": "java-profile",
      "title": "Profil utilisateur",
      "difficulty": "Très facile",
      "description": "Lisez un prénom puis un âge et affichez « Prénom a X ans. ».",
      "stdin": "Alex\n19",
      "expected": "Alex a 19 ans.",
      "hint": "Utilisez Scanner.nextLine() pour le prénom puis parseInt() pour l’âge.",
      "hintMarker": "// À compléter",
      "hintCode": "String prenom = scanner.nextLine();\n        int age = Integer.parseInt(scanner.nextLine());\n        System.out.println(prenom + \" a \" + age + \" ans.\");",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // À compléter\n    }\n}\n",
      "tests": [
        {
          "stdin": "Alex\n19",
          "expected": "Alex a 19 ans."
        },
        {
          "stdin": "Lina\n20",
          "expected": "Lina a 20 ans."
        }
      ],
      "concept": "profile"
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
      ],
      "concept": "pair"
    },
    {
      "id": "java-table",
      "title": "Table de multiplication",
      "difficulty": "Facile",
      "description": "Lisez un entier et affichez ses 5 premières multiplications, une par ligne.",
      "stdin": "4",
      "expected": "4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20",
      "hint": "Utilisez une boucle for de 1 à 5.",
      "hintMarker": "// À compléter",
      "hintCode": "for (int i = 1; i <= 5; i++) {\n            System.out.println(n + \" x \" + i + \" = \" + (n * i));\n        }",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        // À compléter\n    }\n}\n",
      "tests": [
        {
          "stdin": "4",
          "expected": "4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20"
        },
        {
          "stdin": "2",
          "expected": "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10"
        }
      ],
      "concept": "table"
    },
    {
      "id": "java-stats",
      "title": "Statistiques d’une liste",
      "difficulty": "Débutant",
      "description": "Lisez des entiers séparés par des espaces, puis affichez la somme et le maximum.",
      "stdin": "4 7 2 7 9",
      "expected": "Somme: 29\nMaximum: 9",
      "hint": "Lisez la ligne avec nextLine(), découpez-la, puis calculez somme et maximum.",
      "hintMarker": "// À compléter",
      "hintCode": "String[] morceaux = scanner.nextLine().trim().split(\"\\\\s+\");\n        int somme = 0;\n        int maximum = Integer.MIN_VALUE;\n        for (String morceau : morceaux) {\n            int valeur = Integer.parseInt(morceau);\n            somme += valeur;\n            maximum = Math.max(maximum, valeur);\n        }",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        // À compléter\n        System.out.println(\"Somme: \" + somme);\n        System.out.println(\"Maximum: \" + maximum);\n    }\n}\n",
      "tests": [
        {
          "stdin": "4 7 2 7 9",
          "expected": "Somme: 29\nMaximum: 9"
        },
        {
          "stdin": "-2 5 3",
          "expected": "Somme: 6\nMaximum: 5"
        }
      ],
      "concept": "stats"
    },
    {
      "id": "java-occurrences",
      "title": "Compter un mot",
      "difficulty": "Débutant",
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
      ],
      "concept": "occurrences"
    },
    {
      "id": "java-average",
      "title": "Fonction moyenne",
      "difficulty": "Intermédiaire",
      "description": "Lisez des nombres séparés par des espaces. Utilisez une méthode moyenne(double[]) et affichez 2 décimales.",
      "stdin": "12 15 9 14",
      "expected": "Moyenne: 12.50",
      "hint": "Découpez la ligne en nombres puis calculez la somme dans moyenne().",
      "hintMarker": "// À compléter méthode",
      "hintCode": "double somme = 0;\n        for (double valeur : nombres) somme += valeur;\n        return somme / nombres.length;",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static double moyenne(double[] nombres) {\n        // À compléter méthode\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String[] morceaux = scanner.nextLine().trim().split(\"\\\\s+\");\n        double[] nombres = new double[morceaux.length];\n        for (int i = 0; i < morceaux.length; i++) nombres[i] = Double.parseDouble(morceaux[i]);\n        System.out.printf(java.util.Locale.US, \"Moyenne: %.2f%n\", moyenne(nombres));\n    }\n}\n",
      "tests": [
        {
          "stdin": "12 15 9 14",
          "expected": "Moyenne: 12.50"
        },
        {
          "stdin": "10 20 30",
          "expected": "Moyenne: 20.00"
        }
      ],
      "concept": "average"
    },
    {
      "id": "java-palindrome",
      "title": "Détecter un palindrome",
      "difficulty": "Intermédiaire",
      "description": "Lisez un mot et indiquez s’il est identique lorsqu’on le lit à l’envers.",
      "stdin": "radar",
      "expected": "radar: palindrome",
      "hint": "StringBuilder permet d’inverser une chaîne avec reverse().",
      "hintMarker": "// À compléter",
      "hintCode": "String inverse = new StringBuilder(mot).reverse().toString();\n        if (mot.equals(inverse)) {\n            System.out.println(mot + \": palindrome\");\n        } else {\n            System.out.println(mot + \": non palindrome\");\n        }",
      "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String mot = scanner.nextLine().trim().toLowerCase();\n        // À compléter\n    }\n}\n",
      "tests": [
        {
          "stdin": "radar",
          "expected": "radar: palindrome"
        },
        {
          "stdin": "java",
          "expected": "java: non palindrome"
        }
      ],
      "concept": "palindrome"
    },
    {
      "id": "java-object",
      "title": "Classe Etudiant",
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
      ],
      "concept": "object"
    },
    {
      "id": "java-frequency",
      "title": "Fréquence des mots",
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
      ],
      "concept": "frequency"
    }
  ]
};

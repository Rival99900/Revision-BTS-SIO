window.MATHS_SECOND_YEAR_QUESTIONS = [
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — calcul matriciel',
    type: 'mcq',
    q: 'Une matrice de dimension 3 × 2 possède :',
    opts: ['3 lignes et 2 colonnes', '2 lignes et 3 colonnes', '3 lignes et 3 colonnes', '2 lignes et 2 colonnes'],
    answer: 0,
    exp: 'Dans une dimension n × p, n indique le nombre de lignes et p le nombre de colonnes.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — calcul matriciel',
    type: 'mcq',
    q: 'Le coefficient a₃₂ se trouve :',
    opts: ['Ligne 2, colonne 3', 'Ligne 3, colonne 2', 'Ligne 3, colonne 3', 'Ligne 2, colonne 2'],
    answer: 1,
    exp: 'Le premier indice désigne la ligne et le second la colonne.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — calcul matriciel',
    type: 'mcq',
    q: 'Si p = 1 dans une matrice de dimension n × p, il s’agit d’une :',
    opts: ['Matrice ligne', 'Matrice colonne', 'Matrice carrée', 'Matrice nulle'],
    answer: 1,
    exp: 'Une seule colonne correspond à une matrice colonne.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — calcul matriciel',
    type: 'mcq',
    q: 'Deux matrices peuvent être additionnées si :',
    opts: ['Elles sont carrées', 'Elles ont le même nombre de lignes seulement', 'Elles ont exactement la même dimension', 'Leur produit existe'],
    answer: 2,
    exp: 'L’addition se fait coefficient par coefficient : les deux matrices doivent donc avoir la même dimension.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — calcul matriciel',
    type: 'mcq',
    q: 'Pour A ∈ Mₙₘ et B ∈ Mₘₚ, la dimension de A × B est :',
    opts: ['m × m', 'n × p', 'p × n', 'n × m'],
    answer: 1,
    exp: 'Les dimensions intérieures m correspondent ; le produit conserve les dimensions extérieures n × p.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — calcul matriciel',
    type: 'mcq',
    q: 'Quelle affirmation est correcte pour la multiplication matricielle ?',
    opts: ['Elle est toujours commutative', 'A × B = B × A dans tous les cas', 'Elle n’est généralement pas commutative', 'Elle exige toujours deux matrices carrées'],
    answer: 2,
    exp: 'Même lorsque les deux produits existent, A × B et B × A ne sont généralement pas égaux.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exemples vérifiés',
    type: 'mcq',
    q: 'Pour B = (bᵢⱼ) ∈ M₃₂ avec bᵢⱼ = (i − j)², quelle est la première ligne de B ?',
    opts: ['0 ; 0', '0 ; 1', '1 ; 0', '1 ; 1'],
    answer: 1,
    exp: 'b₁₁ = (1−1)² = 0 et b₁₂ = (1−2)² = 1.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exemples vérifiés',
    type: 'mcq',
    q: 'Pour la même matrice B, quelle est sa deuxième ligne ?',
    opts: ['1 ; 0', '1 ; 1', '0 ; 1', '4 ; 1'],
    answer: 0,
    exp: 'b₂₁ = (2−1)² = 1 et b₂₂ = (2−2)² = 0.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — addition',
    type: 'mcq',
    q: 'Avec A = ((1, 1/2), (2, 1), (3, 3/2)) et B = ((0, 1), (1, 0), (4, 1)), quel est le coefficient de la première ligne, deuxième colonne de A + B ?',
    opts: ['1/2', '1', '3/2', '2'],
    answer: 2,
    exp: '1/2 + 1 = 3/2.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — multiplication par un réel',
    type: 'mcq',
    q: 'Pour B = ((0,1),(1,0),(4,1)), quelle est la deuxième ligne de −3B ?',
    opts: ['−3 ; −3', '−3 ; 0', '0 ; −3', '3 ; 0'],
    answer: 1,
    exp: 'La deuxième ligne (1,0) est multipliée par −3 : on obtient (−3,0).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — produit matriciel',
    type: 'mcq',
    q: 'A est de dimension 3 × 2 et C de dimension 2 × 2. Quel produit existe ?',
    opts: ['A × C uniquement', 'C × A uniquement', 'Les deux', 'Aucun'],
    answer: 0,
    exp: 'A × C existe car 2 = 2. C × A demanderait 2 colonnes pour C et 3 lignes pour A : 2 ≠ 3.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — produit matriciel',
    type: 'mcq',
    q: 'Dans l’exemple A × C, quelle est la troisième ligne du produit ?',
    opts: ['6 ; 21/2', '6 ; 7', '3 ; 21/2', '7 ; 21/2'],
    answer: 0,
    exp: 'La troisième ligne vérifiée du produit est (6, 21/2).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 5',
    type: 'mcq',
    q: 'Si A ∈ M₁₃ et B ∈ M₃₂, alors A × B :',
    opts: ['N’existe pas', 'Existe et appartient à M₁₂', 'Existe et appartient à M₃₃', 'Existe et appartient à M₂₁'],
    answer: 1,
    exp: 'Les 3 colonnes de A correspondent aux 3 lignes de B ; le résultat est de dimension 1 × 2.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 6',
    type: 'mcq',
    q: 'Dans l’exercice 6, le produit A × B vaut :',
    opts: ['((−1,−1),(1,1))', '((1,1),(−1,−1))', '((2,−1),(1,−1))', 'Il n’existe pas'],
    answer: 0,
    exp: 'Le produit vérifié est la matrice 2 × 2 ((−1,−1),(1,1)).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 7',
    type: 'mcq',
    q: 'Pourquoi A × B n’existe-t-il pas lorsque A et B sont toutes deux de dimension 2 × 3 ?',
    opts: ['Parce que 2 ≠ 2', 'Parce que 3 ≠ 2', 'Parce que 3 ≠ 3', 'Parce que les matrices ne sont pas carrées'],
    answer: 1,
    exp: 'Il faudrait que les 3 colonnes de la première matrice correspondent aux 2 lignes de la seconde.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 8',
    type: 'mcq',
    q: 'Dans l’exercice 8, la matrice C est de dimension :',
    opts: ['2 × 3', '3 × 2', '3 × 3', '2 × 2'],
    answer: 1,
    exp: 'C possède 3 lignes et 2 colonnes.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 11',
    type: 'mcq',
    q: 'Pour A = ((a,b),(c,d)), quel terme apparaît en haut à droite de A² ?',
    opts: ['a² + bc', 'b(a + d)', 'c(a + d)', 'bc + d²'],
    answer: 1,
    exp: 'Le coefficient (1,2) de A² est ab + bd = b(a + d).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 11',
    type: 'mcq',
    q: 'Quel choix donne une matrice non nulle vérifiant A² = O₂ ?',
    opts: ['A = ((1,1),(−1,−1))', 'A = ((1,0),(0,1))', 'A = ((1,1),(1,1))', 'A = ((2,0),(0,2))'],
    answer: 0,
    exp: 'Avec a=1, d=−1, b=1 et c=−1, on a a+d=0 et a²+bc=0, donc A²=O₂.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — définitions',
    type: 'text',
    q: 'Comment appelle-t-on une matrice dont le nombre de lignes est égal au nombre de colonnes ?',
    answers: ['matrice carrée', 'matrice carree', 'une matrice carrée', 'une matrice carree'],
    exp: 'Une matrice n × n est appelée matrice carrée d’ordre n.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — opérations',
    type: 'text',
    q: 'Quelle égalité exprime la commutativité de l’addition matricielle ?',
    answers: ['a+b=b+a', 'a + b = b + a'],
    exp: 'L’addition matricielle est commutative : A + B = B + A.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — produit matriciel',
    type: 'text',
    q: 'Complétez : A × B existe si le nombre de ______ de A est égal au nombre de ______ de B.',
    keywords: ['colonnes', 'lignes'],
    exp: 'Il faut comparer les colonnes de la première matrice avec les lignes de la seconde.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 1',
    type: 'text',
    q: 'Dans l’exercice 1, quelle est la valeur de Σ aₖₖ ?',
    answers: ['6', 'six'],
    exp: 'La somme diagonale vaut a₁₁ + a₂₂ = 2 + 4 = 6.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 2',
    type: 'text',
    q: 'Dans l’exercice 2, quelle est la valeur de Σ aₖ₁ × bₖ₂ ?',
    answers: ['20', 'vingt'],
    exp: 'Le calcul vérifié donne 20.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 8',
    type: 'text',
    q: 'Dans l’exercice 8, quelle est la dimension du produit C × A ?',
    answers: ['3x3', '3 x 3', '3×3', 'm33', 'm₃₃'],
    exp: 'C est 3 × 2 et A est 2 × 3 : le produit est donc 3 × 3.'
  }

  ,{
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 9',
    type: 'mcq',
    q: 'Si B ∈ M₆₄ et A ∈ M₄₅, quelle est la dimension de B × A ?',
    opts: ['M₆₅', 'M₄₄', 'M₅₆', 'Le produit n’existe pas'],
    answer: 0,
    exp: 'B possède 4 colonnes et A possède 4 lignes : le produit existe. On conserve les 6 lignes de B et les 5 colonnes de A, donc B × A ∈ M₆₅.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 9',
    type: 'text',
    q: 'Calculez Σᵢ₌₁³ aᵢ₃ si a₁₃ = 1/3, a₂₃ = 2/3 et a₃₃ = 3/3.',
    answers: ['2', 'deux'],
    exp: 'On additionne les trois coefficients de la troisième colonne : 1/3 + 2/3 + 3/3 = 6/3 = 2.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 9',
    type: 'text',
    q: 'Dans le calcul α₁₃ = 1 × a + 0 × 0 + a × 0, quelle est la valeur de α₁₃ ?',
    answers: ['a'],
    exp: 'Les deux produits contenant 0 s’annulent : α₁₃ = a.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exercice 9',
    type: 'text',
    q: 'Résolvez : −2 × 4 + n + 2 × (−2) = −18.',
    answers: ['-6', '−6'],
    exp: '−8 + n − 4 = −18, donc n − 12 = −18 et n = −6.'
  }

  ,{
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — matrice identité',
    type: 'mcq',
    q: 'Dans une matrice identité Iₙ, quels coefficients valent 1 ?',
    opts: ['Tous les coefficients', 'Uniquement ceux de la diagonale principale', 'Uniquement ceux au-dessus de la diagonale', 'Uniquement ceux en première ligne'],
    answer: 1,
    exp: 'Dans Iₙ, aᵢⱼ = 1 lorsque i = j ; tous les autres coefficients valent 0.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — matrice identité',
    type: 'mcq',
    q: 'Quelle matrice est I₃ ?',
    opts: ['((1,0,0),(0,1,0),(0,0,1))', '((1,1,1),(1,1,1),(1,1,1))', '((0,1,0),(1,0,1),(0,1,0))', '((1,0),(0,1))'],
    answer: 0,
    exp: 'I₃ est une matrice 3 × 3 avec des 1 sur la diagonale et des 0 ailleurs.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — matrice identité',
    type: 'mcq',
    q: 'Si A ∈ Mₙₚ, quelles égalités expriment le rôle d’élément neutre de la matrice identité ?',
    opts: ['A × Iₙ = A et Iₚ × A = A', 'A × Iₚ = A et Iₙ × A = A', 'A × Iₚ = Iₙ et Iₙ × A = Iₚ', 'A + Iₚ = A et Iₙ + A = A'],
    answer: 1,
    exp: 'La matrice identité est l’élément neutre de la multiplication : A × Iₚ = A et Iₙ × A = A.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — matrice identité',
    type: 'mcq',
    q: 'Pour A ∈ M₃₂, quels produits avec les matrices identité sont dimensionnellement corrects ?',
    opts: ['A × I₃ et I₂ × A', 'A × I₂ et I₃ × A', 'A × I₄ et I₄ × A', 'A × I₃ uniquement'],
    answer: 1,
    exp: 'A possède 2 colonnes : on multiplie à droite par I₂. A possède 3 lignes : on multiplie à gauche par I₃.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — puissances',
    type: 'mcq',
    q: 'Par convention, si A est une matrice carrée d’ordre n, A⁰ vaut :',
    opts: ['Oₙ', 'A', 'Iₙ', '0'],
    answer: 2,
    exp: 'Pour une matrice carrée A d’ordre n, la convention est A⁰ = Iₙ.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — puissances',
    type: 'mcq',
    q: 'Pour D = ((−1,1),(1,1)), quelle est la valeur de D² ?',
    opts: ['((2,0),(0,2))', '((1,1),(1,1))', '((−2,2),(2,2))', '((0,2),(2,0))'],
    answer: 0,
    exp: 'En calculant D × D, on obtient D² = ((2,0),(0,2)).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — puissances',
    type: 'text',
    q: 'Pour D = ((−1,1),(1,1)), donnez la première ligne de D³.',
    answers: ['-2 2', '−2 2', '(-2,2)', '(−2,2)', '-2;2', '−2;2'],
    exp: 'D³ = D² × D = ((−2,2),(2,2)). Sa première ligne est donc (−2,2).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — puissances',
    type: 'mcq',
    q: 'Pour calculer A², peut-on simplement mettre chaque coefficient de A au carré ?',
    opts: ['Oui, toujours', 'Oui, seulement pour une matrice 2 × 2', 'Non, il faut effectuer le produit matriciel A × A', 'Non, A² est toujours égal à Iₙ'],
    answer: 2,
    exp: 'Une puissance de matrice se calcule par multiplication matricielle. Elle ne correspond pas à une puissance coefficient par coefficient.'
  },
  {
  "q": "Exercice 17 : P est de dimension 3 × 3 et M de dimension 3 × 1. Quelle est la dimension de PM ?",
  "opts": [
    "3 × 1",
    "1 × 3",
    "3 × 3",
    "Le produit est impossible"
  ],
  "answer": 0,
  "exp": "Les 3 colonnes de P correspondent aux 3 lignes de M. Le résultat possède 3 lignes et 1 colonne.",
  "year": 2,
  "module": "maths2",
  "cat": "🧮 Maths 2e — applications type BTS",
  "type": "mcq"
},
  {
  "q": "Exercice 17 : les tarifs sont en centaines d’euros. Que représente 18,5 dans la ligne « haute saison » de PM ?",
  "opts": [
    "18,50 €",
    "185 €",
    "1 850 €",
    "18 500 €"
  ],
  "answer": 2,
  "exp": "Il faut multiplier par 100 : 18,5 × 100 = 1 850 € par personne.",
  "year": 2,
  "module": "maths2",
  "cat": "🧮 Maths 2e — applications type BTS",
  "type": "mcq"
},
  {
  "q": "Si QP = I₃ et PX = Y, comment isoler X ?",
  "opts": [
    "X = YQ",
    "X = QY",
    "X = PY",
    "X = Q + Y"
  ],
  "answer": 1,
  "exp": "On multiplie à gauche par Q : Q(PX) = QY, puis (QP)X = I₃X = X. Donc X = QY.",
  "year": 2,
  "module": "maths2",
  "cat": "🧮 Maths 2e — applications type BTS",
  "type": "mcq"
},
  {
  "q": "Exercice 17 : un circuit coûte 1 850 € en haute saison et 1 200 € en basse saison. Avec 1 500 €, le voyage est possible :",
  "opts": [
    "Dans les deux saisons",
    "Uniquement en haute saison",
    "Uniquement en basse saison",
    "Dans aucune saison"
  ],
  "answer": 2,
  "exp": "1 200 € ≤ 1 500 €, mais 1 850 € > 1 500 €. Le budget permet seulement la basse saison.",
  "year": 2,
  "module": "maths2",
  "cat": "🧮 Maths 2e — applications type BTS",
  "type": "mcq"
},
  {
  "q": "Exercice 18 : C₁ nécessite 1 h et C₂ nécessite 1,5 h. Pour x calculatrices C₁ et y calculatrices C₂, le temps total est :",
  "opts": [
    "t = x + 2,5y",
    "t = 6x + 8y",
    "t = 1,5x + y",
    "t = x + 1,5y"
  ],
  "answer": 3,
  "exp": "Chaque calculatrice C₁ ajoute 1 heure et chaque C₂ ajoute 1,5 heure : t = x + 1,5y.",
  "year": 2,
  "module": "maths2",
  "cat": "🧮 Maths 2e — applications type BTS",
  "type": "mcq"
},
  {
  "q": "Exercice 18 : quel est le coût, en euros, de 200 calculatrices C₁ à 6 € et de 800 calculatrices C₂ à 8 € ? Donnez seulement le nombre.",
  "answers": [
    "7600",
    "7 600"
  ],
  "exp": "6 × 200 + 8 × 800 = 1 200 + 6 400 = 7 600 €.",
  "year": 2,
  "module": "maths2",
  "cat": "🧮 Maths 2e — applications type BTS",
  "type": "text"
},
  {
  "q": "Exercice 18 : combien d’heures faut-il pour 200 calculatrices C₁ (1 h chacune) et 800 calculatrices C₂ (1,5 h chacune) ? Donnez seulement le nombre.",
  "answers": [
    "1400",
    "1 400"
  ],
  "exp": "200 + 1,5 × 800 = 200 + 1 200 = 1 400 heures.",
  "year": 2,
  "module": "maths2",
  "cat": "🧮 Maths 2e — applications type BTS",
  "type": "text"
},
  {
  "q": "Exercice 18 : avec 8 400 € et 1 450 heures, combien de calculatrices C₁ obtient-on grâce à x = 1,5c − 8t ? Donnez seulement le nombre.",
  "answers": [
    "1000",
    "1 000"
  ],
  "exp": "x = 1,5 × 8 400 − 8 × 1 450 = 12 600 − 11 600 = 1 000. L’autre quantité vaut y = −8 400 + 6 × 1 450 = 300 calculatrices C₂.",
  "year": 2,
  "module": "maths2",
  "cat": "🧮 Maths 2e — applications type BTS",
  "type": "text"
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — applications type BTS',
    type: 'mcq',
    q: 'Dans l’exercice 20, M a pour lignes (6 ; 10 ; 18), (2 ; 2 ; 6) et (0,2 ; 2 ; 20), et A = (350 ; 120 ; 70) est la colonne du nombre de clients par offre. Quel est le premier coefficient de M × A ?',
    opts: ['2 100', '1 360', '4 560', '3 300'],
    answer: 2,
    exp: '6 × 350 + 10 × 120 + 18 × 70 = 2 100 + 1 200 + 1 260 = 4 560.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — applications type BTS',
    type: 'mcq',
    q: 'Dans l’exercice 20, pourquoi le produit M × B n’est-il pas défini, sachant que B = (350 ; 120 ; 70) est une matrice ligne ?',
    opts: ['Le nombre de colonnes de M (3) diffère du nombre de lignes de B (1)', 'M a 3 lignes et B a 3 colonnes', 'M n’est pas une matrice carrée', 'B possède trop de coefficients'],
    answer: 0,
    exp: 'Le produit U × V existe si U a autant de colonnes que V a de lignes. Ici 3 ≠ 1, alors que M × A existe car M a 3 colonnes et A a 3 lignes.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — applications type BTS',
    type: 'text',
    q: 'Dans l’exercice 20, P est la matrice inverse arrondie de M et C = (26 540 ; 7 780 ; 14 440). Combien de clients ont choisi l’offre n°2 ? Donnez seulement le nombre.',
    answers: ['800', '800 clients'],
    exp: 'La deuxième ligne de P donne 0,25 × 26 540 − 0,75 × 7 780 = 6 635 − 5 835 = 800 clients.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — applications type BTS',
    type: 'mcq',
    q: 'Dans l’exercice 21, on sait que M × H = 4I₃, où H est la matrice des heures par planche. Quelle est la matrice inverse de H ?',
    opts: ['4M', '(1/4) M', 'M', '−(1/4) M'],
    answer: 1,
    exp: 'M × H = 4I₃ donne (1/4)M × H = I₃ : (1/4)M est donc l’inverse de H.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — applications type BTS',
    type: 'mcq',
    q: 'Dans l’exercice 21, le prix de revient du modèle 1 doit valoir 500 €, où a, b et c sont les nouveaux coûts horaires des postes 1, 2 et 3. Quelle équation traduit cette condition ?',
    opts: ['6a + 6b + 10c = 500', '25a + 20b + 15c = 500', '8a + 6b + 10c = 350', '8a + 10b + 14c = 500'],
    answer: 3,
    exp: 'La ligne du modèle 1 de H est (8 ; 10 ; 14), donc 8a + 10b + 14c = 500.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — applications type BTS',
    type: 'mcq',
    q: 'Dans l’exercice 22, on fabrique 20 pièces de type A, 10 de type B et 30 de type C. Quelle masse totale de silice est utilisée ?',
    opts: ['310 kg', '60 kg', '220 kg', '590 kg'],
    answer: 0,
    exp: 'S = 3 × 20 + 4 × 10 + 7 × 30 = 60 + 40 + 210 = 310 kg.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — applications type BTS',
    type: 'text',
    q: 'Dans l’exercice 22, l’entreprise veut fabriquer 21 pièces au total, en utilisant 94 kg de silice et 67 heures de production. Combien de pièces de type A peut-elle fabriquer ? Donnez seulement le nombre.',
    answers: ['8', 'huit'],
    exp: 'Le calcul X = P × Y donne (8 ; 7 ; 6) : 8 pièces de type A, 7 de type B et 6 de type C.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — matrice identité',
    type: 'mcq',
    q: 'Dans l’exercice 22, M = ((1, 1, 1), (3, 4, 7), (2, 3, 5)) et P = ((1, 2, −3), (1, −3, 4), (−1, 1, −1)). Que vaut le produit P × M ?',
    opts: ['M', '3I₃', 'O₃', 'I₃'],
    answer: 3,
    exp: 'Le calcul donne la matrice identité I₃ : P est donc la matrice inverse de M.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — applications type BTS',
    type: 'mcq',
    q: 'Dans l’exercice 23, le code du client n est 5 + 3n + 4n² (x = 5, y = 3, z = 4). Quel est le code du client numéro 4 ?',
    opts: ['77', '81', '85', '89'],
    answer: 1,
    exp: '5 + 3 × 4 + 4 × 4² = 5 + 12 + 64 = 81.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — puissances',
    type: 'mcq',
    q: 'Dans l’exercice 13, A = ((0, 1, 1), (0, 1, 0), (1, 1, 1)). Quelle est la première ligne de A² ?',
    opts: ['0 ; 1 ; 1', '2 ; 2 ; 2', '1 ; 2 ; 1', '1 ; 1 ; 2'],
    answer: 2,
    exp: 'La première ligne de A² vaut (0 1 1) × A = (1 2 1).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — puissances',
    type: 'mcq',
    q: 'Dans l’exercice 13, avec la même matrice A, quelle relation est vérifiée ?',
    opts: ['A³ = 2A² − I₃', 'A³ = A² + I₃', 'A³ = 2A + I₃', 'A³ = A²'],
    answer: 0,
    exp: 'A³ = ((1, 4, 2), (0, 1, 0), (2, 6, 3)) et 2A² − I₃ = ((1, 4, 2), (0, 1, 0), (2, 6, 3)) : les deux matrices sont égales.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — puissances',
    type: 'text',
    q: 'Dans l’exercice 13, en multipliant A³ = 2A² − I₃ par A⁻¹, exprimez A² + A⁻¹ en fonction de A.',
    answers: ['2a', '2 a', '2 × a'],
    exp: 'On obtient A² = 2A − A⁻¹, donc A² + A⁻¹ = 2A.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — puissances',
    type: 'mcq',
    q: 'Pour D = ((−1, 1), (1, 1)), on a D × D = 2I₂. Quelle est la matrice inverse de D ?',
    opts: ['D⁻¹ = 2D', 'D⁻¹ = −D', 'D⁻¹ = (1/2) D', 'D⁻¹ = D²'],
    answer: 2,
    exp: 'D × ((1/2) D) = (1/2) D² = (1/2) × 2I₂ = I₂, donc D⁻¹ = (1/2) D.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — produit matriciel',
    type: 'mcq',
    q: 'On considère B ∈ M₂₃ et A ∈ M₃₂. Quelle est la dimension de B × A ?',
    opts: ['M₃₃', 'M₂₃', 'Le produit n’existe pas', 'M₂₂'],
    answer: 3,
    exp: 'B a 3 colonnes et A a 3 lignes : le produit existe. Il conserve les 2 lignes de B et les 2 colonnes de A, donc il est de dimension 2 × 2.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — exemples vérifiés',
    type: 'mcq',
    q: 'Dans l’exemple du cours, A = ((1, 1/2), (2, 1), (3, 3/2)) et C = ((1, 2), (2, 3)). Quel est le coefficient de la deuxième ligne et de la deuxième colonne de A × C ?',
    opts: ['4', '7', '6', '21/2'],
    answer: 1,
    exp: 'Ligne 2 de A : (2 ; 1). Colonne 2 de C : (2 ; 3). Donc 2 × 2 + 1 × 3 = 7.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — multiplication par un réel',
    type: 'mcq',
    q: 'Dans l’exercice 4, A = ((0, 1, −1), (1, −1, 0), (1, 0, −1)) et B = ((0, 1, 2), (2, 0, 1), (1, 2, 0)). Quel est le coefficient de la première ligne et de la troisième colonne de 4A − 2B ?',
    opts: ['8', '−8', '2', '−4'],
    answer: 1,
    exp: '4 × (−1) − 2 × 2 = −4 − 4 = −8.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans le graphe du cours (sommets A, B, C et D), quels sont les successeurs du sommet D ?',
    opts: ['A et B', 'C seulement', 'A et C', 'B et C'],
    answer: 2,
    exp: 'Les arcs partant de D sont (D, A) et (D, C) : Γ⁺(D) = {A, C}.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'text',
    q: 'Dans le graphe du cours, combien de chemins de longueur 4 ont pour origine A ? Donnez seulement le nombre.',
    answers: ['3', 'trois'],
    exp: 'La première ligne de M⁴ vaut (0 1 2 0) : 0 + 1 + 2 + 0 = 3 chemins.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans le graphe du cours, quel est le coefficient situé à la deuxième ligne et à la troisième colonne de M² ?',
    opts: ['0', '1', '3', '2'],
    answer: 3,
    exp: 'Ligne B de M × colonne C de M : 0×0 + 0×1 + 1×1 + 1×1 = 2. Il existe deux chemins de longueur 2 de B à C : B → D → C et B → C → C.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans un graphe à 4 sommets, quelle est la longueur d’un chemin hamiltonien ?',
    opts: ['3', '4', '2', '5'],
    answer: 0,
    exp: 'Un chemin hamiltonien passe une fois par chacun des n sommets : sa longueur vaut n − 1 = 3.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'text',
    q: 'Dans le graphe du cours, combien d’arcs faut-il ajouter pour obtenir la fermeture transitive Ĝ ? Donnez seulement le nombre.',
    answers: ['7', 'sept'],
    exp: 'M̂ contient 13 coefficients égaux à 1 et G en contient 6 : 13 − 6 = 7 arcs ajoutés.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans le graphe du cours, pourquoi B est-il accessible depuis D ?',
    opts: ['Il existe l’arc D → B', 'Il existe le chemin D → A → B', 'D est un successeur de B', 'B possède une boucle'],
    answer: 1,
    exp: 'Le chemin D → A → B relie D à B. Il n’existe pas d’arc direct D → B.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans l’exercice 2 (jeu), combien de chemins de longueur 4 existe-t-il ?',
    opts: ['0', '1', '3', '4'],
    answer: 0,
    exp: 'La matrice M⁴ est nulle : aucun chemin ne comporte 4 arcs. Le chemin le plus long est A → C → B → D, de longueur 3.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans l’exercice 2, quel est l’unique chemin hamiltonien du graphe ?',
    opts: ['A → B → D → C', 'A → C → B → D', 'A → D → B → C', 'C → B → D → A'],
    answer: 1,
    exp: 'A → C → B → D passe une fois et une seule par chacun des quatre sommets : A → C, C → B et B → D sont bien des arcs.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans l’exercice 3 (maintenance réseau), combien de circuits de longueur 4 existe-t-il ?',
    opts: ['3', '4', '9', '5'],
    answer: 3,
    exp: 'Ce sont les coefficients de la diagonale de M⁴ : 1 + 1 + 1 + 1 + 1 = 5.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans l’exercice 4 (site internet), quelles pages sont accessibles depuis toutes les autres pages ?',
    opts: ['P2 et P3', 'P1 et P5', 'P4 seulement', 'Aucune page'],
    answer: 0,
    exp: 'Les colonnes 2 et 3 de la matrice de fermeture ne contiennent que des 1 : P2 et P3 sont accessibles depuis toutes les pages.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans l’exercice 4, combien de chemins de longueur 2 comporte le graphe au total ?',
    opts: ['7', '9', '11', '13'],
    answer: 3,
    exp: 'La somme des coefficients de M² vaut 5 + 1 + 1 + 1 + 5 = 13.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans l’exercice 5 (cinq joueurs), le coefficient inconnu α, situé à la ligne B et à la colonne D de M⁴, vaut :',
    opts: ['0', '1', '2', '3'],
    answer: 2,
    exp: 'Ligne B de M² × colonne D de M² : 0×0 + 1×1 + 0×0 + 1×1 + 0×0 = 2.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'text',
    q: 'Dans l’exercice 5, combien d’arcs supplémentaires la fermeture transitive Ĝ possède-t-elle par rapport à G ? Donnez seulement le nombre.',
    answers: ['9', 'neuf'],
    exp: 'M̂ contient 16 coefficients égaux à 1 et G en contient 7 : 16 − 7 = 9 arcs ajoutés.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — graphes orientés',
    type: 'mcq',
    q: 'Dans l’exercice 1 (graphe à cinq sommets A, B, C, D, E), quel est l’unique chemin hamiltonien ?',
    opts: ['A → B → C → E → D', 'A → B → D → C → E', 'A → D → B → C → E', 'D → A → E → B → C'],
    answer: 2,
    exp: 'A → D → B → C → E : les arcs (A, D), (D, B), (B, C) et (C, E) existent, et chaque sommet n’est visité qu’une fois.'
  }
];

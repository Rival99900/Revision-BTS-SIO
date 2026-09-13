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
];

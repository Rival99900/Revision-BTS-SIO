window.MATHS_BOOLE_QUESTIONS = [
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans une algèbre de Boole, quel est l’élément neutre pour l’addition ?',
    opts: ['0', '1', 'a', 'ā'],
    answer: 0,
    exp: '0 est élément neutre pour + : a + 0 = a pour tout a (propriété 3).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Quel est l’élément neutre pour la multiplication • dans une algèbre de Boole ?',
    opts: ['0', 'a + ā', '1', 'a'],
    answer: 2,
    exp: '1 est élément neutre pour • : 1 • a = a pour tout a (propriété 4).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Laquelle de ces égalités correspond à la propriété du tiers exclu ?',
    opts: ['a + ā = 1', 'a • ā = 0', 'a + a = a', 'a • 1 = a'],
    answer: 0,
    exp: 'Le tiers exclu (propriété 7) s’écrit a + ā = 1.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Laquelle de ces égalités correspond à la propriété de non-contradiction ?',
    opts: ['a + ā = 1', 'a + 1 = 1', 'a • ā = 0', 'a • a = a'],
    answer: 2,
    exp: 'La non-contradiction (propriété 8) s’écrit a • ā = 0.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'text',
    q: 'Comment appelle-t-on la propriété a + a = a (et a • a = a) ?',
    answers: ['idempotence', 'l’idempotence', 'l\'idempotence', 'idempotente'],
    exp: 'Il s’agit de l’idempotence : a + a = a et a • a = a.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Pour tout élément a d’une algèbre de Boole, a • 0 vaut :',
    opts: ['a', '1', '0', 'ā'],
    answer: 2,
    exp: 'C’est le théorème de l’élément absorbant : a • 0 = 0.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'text',
    q: 'Quelle est la valeur de a + 1 dans une algèbre de Boole ?',
    answers: ['1'],
    exp: 'Théorème de l’élément absorbant : a + 1 = 1 pour tout a.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans une algèbre de Boole, a + a • b est égal à :',
    opts: ['a • b', 'b', 'a', '1'],
    answer: 2,
    exp: 'C’est le théorème d’absorption : a + a • b = a.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans une algèbre de Boole, a • (a + b) est égal à :',
    opts: ['a + b', '1', 'b', 'a'],
    answer: 3,
    exp: 'C’est la seconde partie du théorème d’absorption : a • (a + b) = a.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans la preuve de a + a • b = a, la première étape écrit a = a • 1. Quelle propriété la justifie ?',
    opts: [
      'Propriété 3 (0 neutre pour +)',
      'Propriété 4 (1 neutre pour •)',
      'Propriété 7 (tiers exclu)',
      'Propriété 8 (non-contradiction)'
    ],
    answer: 1,
    exp: '1 est élément neutre pour la multiplication : a • 1 = a (propriété 4).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'text',
    q: 'Dans la preuve de a • 1 + a • b = a • (1 + b), quelle propriété permet de factoriser par a ?',
    answers: ['distributivite', 'distributivité', 'distributivité de • sur +', 'distributivite de • sur +', 'propriete 5', 'propriété 5', '5'],
    exp: 'C’est la distributivité de • sur + (propriété 5), lue de droite à gauche : a • b + a • c = a • (b + c).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans la preuve de a • (a + b) = a, quelle étape est justifiée par la propriété 5 ?',
    opts: [
      'a • (a + b) = a • a + a • b',
      'a • a = a',
      'a + a • b = a',
      'a + ā = 1'
    ],
    answer: 0,
    exp: 'La distributivité de • sur + donne a • (a + b) = a • a + a • b.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans l’exemple du cours (ensemble des propositions), quels sont les deux connecteurs binaires utilisés ?',
    opts: ['∨ et ∧', '+ et •', '∨ et ¬', '∧ et ¬'],
    answer: 0,
    exp: 'L’exemple utilise les connecteurs binaires ∨ et ∧, et la négation comme connecteur unaire.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans une algèbre de Boole, que signifie ā (le complémentaire de a) ?',
    opts: [
      'L’élément unique tel que a + ā = 1 et a • ā = 0',
      'L’élément tel que a + ā = 0',
      'Le produit a • a',
      'Le résultat de a + 1'
    ],
    answer: 0,
    exp: 'Pour tout a, il existe un unique ā tel que a + ā = 1 (propriété 7) et a • ā = 0 (propriété 8).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'text',
    q: 'Quel est le numéro de la propriété qui énonce a • ā = 0 dans la définition ?',
    answers: ['8', 'propriete 8', 'propriété 8'],
    exp: 'Il s’agit de la propriété 8 (non-contradiction) : a • ā = 0.'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans la preuve de a + a = a, la première étape écrit a = a + 0. Quelle propriété la justifie ?',
    opts: [
      'Propriété 3 (0 neutre pour +)',
      'Propriété 4 (1 neutre pour •)',
      'Propriété 7 (tiers exclu)',
      'Propriété 6 (+ distributif sur •)'
    ],
    answer: 0,
    exp: '0 est élément neutre pour + : a = a + 0 (propriété 3).'
  },
  {
    year: 2,
    module: 'maths2',
    cat: '🧮 Maths 2e — algèbre de Boole',
    type: 'mcq',
    q: 'Dans la preuve de a + a = a, quelle propriété justifie l’étape a + 0 = a + a • ā ?',
    opts: [
      'Propriété 8 (a • ā = 0)',
      'Propriété 1 (commutativité de +)',
      'Propriété 5 (• distributif sur +)',
      'Propriété 4 (1 neutre pour •)'
    ],
    answer: 0,
    exp: 'Comme a • ā = 0 (propriété 8), on peut remplacer 0 par a • ā.'
  }
];

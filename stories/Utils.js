import React from "react";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: '123',
    lastName: '456',
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 10) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
    For more examples, visit {''}
    <br />
    <a href="https://github.com/react-tools/react-table" target="_blank" rel="noopener noreferrer">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;

export const quiz = {
  _id: {
    $oid: '5b0ec4ef510a225ea74ef903'
  },
  type: 'mini-quiz',
  name: 'Energias Renováveis',
  description: 'Energy quizz for children',
  picture: '',
  age: '6-12 years old',
  date: '2018-08-10',
  value: 10,
  questions: [
    {
      id: 1,
      question: 'Em 2016, qual a percentagem de energia distribuída em Portugal que teve origem em fontes renováveis?',
      answers: [
        '13%',
        '4%',
        '24%'
      ],
      correctAnswer: 2,
      hint: ''
    },
    {
      id: 2,
      question: 'Acabe a seguinte frase: em apenas uma hora, a luz do sol que incide na terra produz energia suficiente para alimentar todo o planeta durante:',
      answers: [
        '1 ano',
        '6 meses',
        '20 horas',
        '1 hora'
      ],
      correctAnswer: 0,
      hint: ''
    },
    {
      id: 3,
      question: 'Qual das seguintes fontes de produção de energia não é uma fonte renovável?',
      answers: [
        'Eólica',
        'Gás Natural',
        'Solar',
        'Geotérmica'
      ],
      correctAnswer: 1,
      hint: ''
    }
  ]
};

export const quizzes = [
  {

    _id: {
      $oid: '5b10ffb806a4fe34b70723aa'
    },
    type: 'power-quiz',
    name: 'Mobilidade',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2018-07-31',
    value: 85,
    category: 'mobilidade',
    questions: [
      {
        id: 1,
        question: 'A etiqueta dos pneus tem indicação da eficiência no consumo de combustível.',
        answers: [
          'Verdadeiro',
          'Falso'
        ],
        correctAnswer: 0,
        hint: 'A etiqueta dos pneus tem indicação da eficiência no consumo de combustível, que permite comparar pneus e escolher opções menos consumidoras de combustível.'
      },
      {
        id: 2,
        question: 'A forma como se conduz um carro faz variar o seu consumo.',
        answers: [
          'Verdadeiro',
          'Falso'
        ],
        correctAnswer: 0,
        hint: 'Por exemplo, se estiver sempre a conduzir a velocidades mais altas e depois ter que fazer grandes travagens gasta mais energia do que se fizer uma condução mais cuidada.'
      },
      {
        id: 3,
        question: 'A indústria automóvel tem vindo a reduzir o consumo de gasolina/gasóleo dos automóveis.',
        answers: [
          'Verdadeiro',
          'Falso'
        ],
        correctAnswer: 0,
        hint: 'A indústria automóvel tem vindo a reduzir o consumo de gasolina/gasóleo dos automóveis, de forma a reduzir a poluição associada à utilização destas viaturas. '
      },
      {
        id: 4,
        question: 'A mobilidade elétrica é mais sustentável que a mobilidade a gasolina e gasóleo?',
        answers: [
          'Sim, sempre.',
          'Sim, se a energia for não renovável.',
          'Não. Ambas são sustentáveis.',
          'Sim, se a energia for renovável.'
        ],
        correctAnswer: 0,
        hint: 'Sim, a mobilidade elétrica é sempre mais sustentável que os transportes a gasolina e gasóleo, pois, mesmo usando combustíveis fósseis na produção de eletricidade, os veículos elétricos são mais eficientes que os veículos os restantes.'
      },
      {
        id: 5,
        question: 'A mobilidade sustentável deve ser um objetivo...',
        answers: [
          'de todos, pessoas e empresas.',
          'das empresas de transporte de pessoas.',
          'das empresas de transporte de mercadorias.',
          'das pessoas nas suas deslocações diárias.'
        ],
        correctAnswer: 0,
        hint: 'A mobilidade sustentável deve ser um objetivo de todos, pessoas e empresas.'
      },
      {
        id: 6,
        question: 'A Organização das Nações Unidas (ONU) elegeu a bicicleta como o transporte, ecologicamente, mais sustentável do planeta?',
        answers: [
          'Sim',
          'Não'
        ],
        correctAnswer: 0,
        hint: 'Sim, a ONU considera a bicicleta como o transporte, ecologicamente, mais sustentável do planeta.'
      },
      {
        id: 7,
        question: 'A quantidade de ar que os pneus têm não é importante para o consumo do carro.',
        answers: [
          'Verdadeiro',
          'Falso'
        ],
        correctAnswer: 1,
        hint: 'A quantidade de ar que os pneus têm é importante para o consumo do carro, tanto que se deve ver com alguma frequência se os pneus têm a quantidade de ar correta (que varia de carro para carro).'
      }

    ]
  }
  ,
  {
    _id: {
      $oid: '5b10ffb806a4fe34b70723aa'
    },
    type: 'default',
    name: 'Energia',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2018-09-01',
    value: 100,
    category: 'energia',
    questions: [
      {
        id: 1,
        question: 'Usar ventoinhas em vez de ar condicionado pode reduzir drasticamente a sua conta de eletricidade.',
        answers: [
          'Verdadeiro',
          'Falso'
        ],
        correctAnswer: 0,
        hint: 'Ventoinhas podem usar apenas 10% da energia usada pelo ar condicionado. Apesar das ventoinhas não reduzirem a temperatura ambiente do espaço, ajudam o seu corpo a arrefecer ao aumentar o fluxo de ar no espaço.'
      },
      {
        id: 2,
        question: 'Frigoríficos e congeladores funcionam de modo mais eficiente quando estão vazios.',
        answers: [
          'Verdadeiro',
          'Falso'
        ],
        correctAnswer: 1,
        hint: 'Frigoríficos e congeladores funcionam de modo mais eficiente quando estão cheios. Contudo, encher demasiado também não é eficiente, por isso, garanta que mantém um pequeno espaço entre os itens para o ar poder circular. '
      },
      {
        id: 3,
        question: 'Qual é a temperatura ideal para o seu ar condicionado no verão?',
        answers: [
          '18°C – 20°C',
          '21°C',
          '22°C',
          '23°C – 26°C'
        ],
        correctAnswer: 3,
        hint: 'Muitos especialistas recomendam que fixe a temperatura do seu termostato entre 24°C – 27°C ou, pelo menos, acima de 23°C. É recomendado que fixe à temperatura mais alta a que se sinta confortavelmente fresco.'
      },
      {
        id: 4,
        question: 'Qual é a temperatura ideal para o seu ar condicionado no inverno?',
        answers: [
          '18°C – 21°C',
          '22°C',
          '23°C',
          '23°C – 26°C'
        ],
        correctAnswer: 0,
        hint: 'É recomendável, que assim que a sua família se sentir confortável em casa com a temperatura que tem fixada, experimente baixar um grau a cada duas semanas até ficar dentro da temperatura recomendada.'
      },
      {
        id: 5,
        question: 'Qual das seguintes medidas irá reduzir o seu consumo de eletricidade?',
        answers: [
          'Só ligar as luzes que são necessárias.',
          'Trocar as suas lâmpadas por LED.',
          'Só usar a máquina de lavar louça quando estiver cheia.',
          'Todas as anteriores.'
        ],
        correctAnswer: 3,
        hint: ''
      },
      {
        id: 6,
        question: 'Em média, qual é a percentagem que o uso de água quente representa no seu consumo de energia?',
        answers: [
          '5%',
          '10%',
          '25%',
          '60%'
        ],
        correctAnswer: 2,
        hint: 'A água quente representa cerca de 25% do consumo médio de energia da sua casa, sendo maioritariamente usada para banhos. Duches mais curtos e redução do número de banhos podem ajudar a reduzir a sua conta de eletricidade. '
      },
      {
        id: 7,
        question: 'O Miguel nunca desliga a sua televisão, deixando-a apenas em standby quando não está a usá-la. Isto afeta a sua conta de eletricidade?',
        answers: [
          'Sim',
          'Não'
        ],
        correctAnswer: 0,
        hint: 'A energia gasta nos equipamentos em standby, representa cerca de 10% do uso de eletricidade. Pode poupar energia ao ter um gesto tão simples como desligar a sua televisão no botão on/off da mesma em vez de deixar em standby.'
      },
      {
        id: 8,
        question: 'A Patrícia está a pensar em instalar painéis solares no seu telhado para reduzir a sua fatura de energia. O que deve ter em consideração?',
        answers: [
          'Se o telhado recebe suficiente luz solar.',
          'A área de painéis solares que precisa.',
          'O custo do sistema vs poupanças.',
          'Todas as anteriores.'
        ],
        correctAnswer: 3,
        hint: 'Instalar painéis solares pode ser uma excelente medida de redução de fatura de energia. Contudo, a instalação de um sistema solar é um investimento significativo e deve ser investigado'
      },
      {
        id: 9,
        question: 'Usar latas de alumínio recicladas para fazer novas latas usa quão menos energia do que fazer novas latas do zero?',
        answers: [
          '12 %',
          '25 %',
          '79 %',
          '95 %'
        ],
        correctAnswer: 3,
        hint: 'Reciclar latas de alumínio para fazer novas latas usa cerca de menos 95% de energia do que fazer novas latas através da bauxite (material usado para a construção das latas).'
      },
      {
        id: 10,
        question: 'A maneira como usa o seu ar condicionado pode ter um impacto significativo na sua fatura de eletricidade. Quanta energia gasta a mais por cada grau adicional na temperatura?',
        answers: [
          'Menos de 4 %',
          '4 a 7 %',
          '7 a 10 %',
          '12 a 15 %'
        ],
        correctAnswer: 2,
        hint: 'Regule os termóstatos da climatização para temperaturas em que se sinta confortável, habitualmente entre os 18 ºC e os 21 ºC no Inverno, e os 23 ºC a 26 ºC no Verão.'
      }
    ]
  },
  {
    _id: {
      $oid: '5b0ec4ef510a225ea74ef903'
    },
    type: 'mini-quiz',
    name: 'Energias Renováveis',
    description: 'Energy quizz for children',
    picture: '',
    age: '6-12 years old',
    date: '2018-10-20',
    category: 'energia',

    value: 15,
    questions: [
      {
        id: 1,
        question: 'Em 2016, qual a percentagem de energia distribuída em Portugal que teve origem em fontes renováveis?',
        answers: [
          '13%',
          '4%',
          '24%'
        ],
        correctAnswer: 2,
        hint: ''
      },
      {
        id: 2,
        question: 'Acabe a seguinte frase: em apenas uma hora, a luz do sol que incide na terra produz energia suficiente para alimentar todo o planeta durante:',
        answers: [
          '1 ano',
          '6 meses',
          '20 horas',
          '1 hora'
        ],
        correctAnswer: 0,
        hint: ''
      },
      {
        id: 3,
        question: 'Qual das seguintes fontes de produção de energia não é uma fonte renovável?',
        answers: [
          'Eólica',
          'Gás Natural',
          'Solar',
          'Geotérmica'
        ],
        correctAnswer: 1,
        hint: ''
      }
    ]
  },
  {
    _id: {
      $oid: '5b0ec5265573197c0e5f250c'
    },
    type: 'mini-quiz',
    name: 'Aquecimento Global',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2018-05-01',
    category: 'energia',
    value: 15,
    questions: [
      {
        id: 1,
        question: 'O Acordo de Paris, aprovado por 195 países em 2015, acorda em:',
        answers: [
          'Aumentar a produção de renováveis em 30% face a 1990',
          'Manter o aumento da temperatura média mundial abaixo dos 2ºC em relação aos níveis pré-industriais',
          'Transitar para uma mobilidade 100% elétrica até 2030'
        ],
        correctAnswer: 1,
        hint: ''
      },
      {
        id: 2,
        question: 'Qual destas atividades contribuiu mais para as alterações climáticas? (jovens, adultos)',
        answers: [
          'Andar de carro',
          'Desflorestação',
          'Uso de combustíveis fósseis para a produção de energia'
        ],
        correctAnswer: 2,
        hint: ''
      },
      {
        id: 3,
        question: 'Qual é o gás cuja emissão é a principal responsável pelo Aquecimento Global (aumento da temperatura média dos oceanos e da atmosfera da Terra)?',
        answers: [
          'Metano (CH4)',
          'Ozono (O3)',
          'Dióxido de Carbono (CO2)'
        ],
        correctAnswer: 2,
        hint: ''
      }
    ]
  },
  /*
  {
    _id: {
      $oid: '5b10ff7806a4fe34b70723a8'
    },
    type: 'mini-quizz',
    name: 'Eficiência Energética',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2019-02-01',
    value: 10,
    questions: [
      {
        id: 1,
        question: 'O que é a eficiência energética? (jovens e adultos)',
        answers: [
          'Consumir menos energia ao utilizar menos equipamentos',
          'Utilizar a energia que necessitamos de um modo responsável, otimizando ao máximo o consumo',
          'Reduzir a fatura energética'
        ],
        correctAnswer: 1,
        hint: ''
      },
      {
        id: 2,
        question: 'Qual destes comportamentos é considerado eficiência energética?',
        answers: [
          'Reduzir o número de lâmpadas em casa',
          'Usar menos a televisão e o computador',
          'Substituir as borrachas do frigorifico'
        ],
        correctAnswer: 2,
        hint: ''
      },
      {
        id: 3,
        question: 'Tendo em conta a etiqueta energética de um equipamento, qual a classe em que o mesmo consome menos energia?',
        answers: [
          'C',
          'B',
          'A+'
        ],
        correctAnswer: 2,
        hint: ''
      }
    ]
  },
  {
    _id: {
      $oid: '5b10ff9f06a4fe34b70723a9'
    },
    type: 'mini-quizz',
    name: 'Poupar em casa',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2018-12-01',
    value: 10,
    questions: [
      {
        id: 1,
        question: 'O que usa menos energia?',
        answers: [
          'TV Plasma',
          'TV LCD',
          'TV LED'
        ],
        correctAnswer: 2,
        hint: ''
      },
      {
        id: 2,
        question: 'O que usa menos energia? Um frigorifico/congelador lado a lado ou um frigorifico/congelador um em cima do outro?',
        answers: [
          'Lado a lado',
          'Um em cima do outro'
        ],
        correctAnswer: 1,
        hint: ''
      },
      {
        id: 3,
        question: 'Cada grau adicional no seu ar condicionado, aumenta em quanto o seu consumo de energia?',
        answers: [
          '7% a 10%',
          'Menos de 1%',
          '3% a 5%'
        ],
        correctAnswer: 0,
        hint: ''
      },
      {
        id: 4,
        question: 'A análise global da distribuição dos consumos energéticos do setor doméstico, permite verificar que consumimos cerca de 50% da energia das nossas casas em:',
        answers: [
          'Aquecimento e arrefecimento',
          'Confeção de alimentos e aquecimento de águas',
          'Iluminação e eletrodomésticos'
        ],
        correctAnswer: 0,
        hint: ''
      }
    ]
  },
  {
    _id: {
      $oid: '5b10ffb806a4fe34b70723aa'
    },
    type: 'mini-quizz',
    name: 'Bicicletas Partilhadas',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2018-09-01',
    value: 10,
    questions: [
      {
        id: 1,
        question: 'Como aceder ao sistema de bicicletas partilhadas Gira.Bicicletas de Lisboa?',
        answers: [
          'Através do passe Lisboa VIVA',
          'Atráves da App GIRA',
          'Aravés de um bilhete'
        ],
        correctAnswer: 1,
        hint: ''
      },
      {
        id: 2,
        question: 'Que tipo de bicicletas estão à disposição no sistema de bicicletas partilhadas Gira.Bicicletas de Lisboa?',
        answers: [
          'Apenas bicicletas convencionais',
          'Bicicletas dobráveis',
          'Bicicletas elétricas e convencionais'
        ],
        correctAnswer: 2,
        hint: ''
      },
      {
        id: 3,
        question: 'Quantos passes diferentes existem no sistema de bicicletas partilhadas Gira.Bicicletas de Lisboa?',
        answers: [
          '2 passes - um anual e outro mensal',
          '3 passes - um diário, um mensal e outro anual',
          'Não existem passes no Gira.Bicicletas de Lisboa'
        ],
        correctAnswer: 1,
        hint: ''
      },
      {
        id: 4,
        question: 'Quanto tempo pode usar a bicicleta antes de a devolver a uma estação, sem ter de pagar um valor adicional por tempo excedido, no caso de ter um passe anual ou mensal?',
        answers: [
          '45 minutos',
          '15 minutos',
          '30 minutos'
        ],
        correctAnswer: 0,
        hint: ''
      }
    ]
  },
  {
    _id: {
      $oid: '5b10ffcf06a4fe34b70723ab'
    },
    type: 'mini-quizz',
    name: 'Mobilidade partilhada',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2018-12-01',
    value: 10,
    questions: [
      {
        id: 1,
        question: 'O que é Mobilidade Partilhada?',
        answers: [
          'É um serviço que oferece acesso por um curto período de tempo a um veículo (ex: bicicleta, automóvel, scooter) quando outros meios de transporte não estão disponíveis ou não são convenientes.',
          'É um sistema de boleias em que o dono do veículo permite que desconhecidos possam viajar com ele num determinado percurso.',
          'É um conceito inovador mas que não é utilizado em Portugal.'
        ],
        correctAnswer: 0,
        hint: ''
      },
      {
        id: 2,
        question: 'Quais os sistemas de mobilidade partilhada que conhece em Lisboa?',
        answers: [
          'Gira.Bicicletas de Lisboa, eCooltra, DriveNow e City Drive',
          'Bugas, Citydrive e Loop',
          'Yugo, Mobicascais e DriveNow'
        ],
        correctAnswer: 0,
        hint: ''
      },
      {
        id: 3,
        question: 'Para aceder a um sistema de mobilidade partilhada preciso ter veículo próprio?',
        answers: [
          'Sim, senão não podes dar boleias.',
          'Não, a ideia é mesmo essa: ter o benefício de utilização sem ter de possuir um veículo.',
          'Não, mas tenho de pedir um emprestado.'
        ],
        correctAnswer: 1,
        hint: ''
      },
      {
        id: 4,
        question: 'Quais as vantagens de usar um sistema de veículos partilhados?',
        answers: [
          'Redução dos custos de ter um veículo próprio, maior oferta de veículos, melhor para o ambiente',
          'Poder usar lugares de estacionamento reservados, poupar em combustível e levar amigos',
          'Não há vantagens em usar um sistema destes'
        ],
        correctAnswer: 0,
        hint: ''
      }
    ]
  },
  {
    _id: {
      $oid: '5b10ffef06a4fe34b70723ac'
    },
    type: 'mini-quizz',
    name: 'Mobilidade suave',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2019-03-01',
    value: 10,
    questions: [
      {
        id: 1,
        question: 'Se quiseres ir da baixa de Lisboa para o Castelo de São Jorge, qual é o meio mais prático e mais rápido?',
        answers: [
          'De elevador (R. dos Fanqueiros / R. da Madalena)',
          'De carro',
          'De elétrico'
        ],
        correctAnswer: 0,
        hint: ''
      },
      {
        id: 2,
        question: 'Qual a distância de segurança que um veículo a motor deve manter de um ciclista?',
        answers: [
          '15 metros',
          '1,5 Metros',
          '50 centímetros'
        ],
        correctAnswer: 1,
        hint: ''
      },
      {
        id: 3,
        question: 'O que é a acessibilidade pedonal?',
        answers: [
          'É a acessibilidade experimentada por quem se desloca em cadeira de rodas e canadianas.',
          'É a acessibilidade experimentada por quem se desloca de bicicleta, patins ou skate.',
          'É a acessibilidade experimentada por quem se desloca a pé ou em cadeira de rodas na via pública.'
        ],
        correctAnswer: 2,
        hint: ''
      },
      {
        id: 4,
        question: 'Quem pode circular nas ciclovias?',
        answers: [
          'Ciclistas',
          'Motociclos',
          'Peões'
        ],
        correctAnswer: 0,
        hint: ''
      }
    ]
  },
  {
    _id: {
      $oid: '5b11000506a4fe34b70723ad'
    },
    type: 'mini-quizz',
    name: 'Transportes públicos',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2019-03-01',
    value: 10,
    questions: [
      {
        id: 1,
        question: 'Para que transportes públicos precisas de passe ou bilhete?',
        answers: [
          'Metro, elétrico e autocarro',
          'Bicicleta, carro e moto',
          'Avião, trotinete e patins'
        ],
        correctAnswer: 0,
        hint: ''
      },
      {
        id: 2,
        question: 'Se quiser ir à feira do livro, qual a melhor opção?',
        answers: [
          'Ir de carro e estacionar na Rotunda do Marquês de Pombal',
          'Ir de transportes públicos',
          'Ir à noite, quando não há trânsito'
        ],
        correctAnswer: 1,
        hint: ''
      },
      {
        id: 3,
        question: 'É possível adquirir um passe que me permite estacionar num parque e andar de transportes públicos sem me preocupar com pagamentos no momento. Como se chama este sistema?',
        answers: [
          'Park and Ride',
          'Cartão Viva viagem',
          'GIRA'
        ],
        correctAnswer: 0,
        hint: ''
      },
      {
        id: 4,
        question: 'Quais as vantagens de usar transportes públicos?',
        answers: [
          'Os transportes públicos são mais eficientes mas perco mais tempo',
          'São mais económicos, eficientes, permite melhorar o congestionamento e são melhores para o ambiente',
          'Não há vantagens em usar os transportes públicos'
        ],
        correctAnswer: 1,
        hint: ''
      }
    ]
  },
  {
    _id: {
      $oid: '5b11001d06a4fe34b70723ae'
    },
    type: 'mini-quizz',
    name: 'Veículos elétricos',
    description: '',
    picture: '',
    age: '6-12 years old',
    date: '2019-04-01',
    value: 10,
    questions: [
      {
        id: 1,
        question: 'Em que consiste a Rede de Mobilidade Elétrica?',
        answers: [
          'É uma rede existente nas principais cidades onde circulam elétricos.',
          'É uma parceria com vários fornecedores para fornecimento de eletricidade mais barata.',
          'É uma rede de abastecimento dos veículos elétricos existente nas principais cidades.'
        ],
        correctAnswer: 2,
        hint: ''
      },
      {
        id: 2,
        question: 'Os veículos elétricos podem estacionar sem pagar?',
        answers: [
          'Sim, desde que tenham afixado o dístico verde e/ou se encontrem a carregar.',
          'Não, estes têm locais próprios de estacionamento sujeito a pagamento.',
          'Não, têm de efetuar sempre o pagamento.'
        ],
        correctAnswer: 0,
        hint: ''
      },
      {
        id: 3,
        question: 'Tenho um veículo Híbrido, posso ter dístico verde?',
        answers: [
          'Claro que sim',
          'Depende do modelo do veículo',
          'Não, destina-se a veículos 100% elétricos  '
        ],
        correctAnswer: 2,
        hint: ''
      },
      {
        id: 4,
        question: 'Quais as vantagens de usar um veículo elétrico?',
        answers: [
          'Não há vantagens em usar um veículo elétrico',
          'A energia é mais barata mas polui mais o ambiente',
          'A energia elétrica é mais económica que os combustíveis fósseis e é menos poluente'
        ],
        correctAnswer: 2,
        hint: ''
      }
      
    ]
  }
*/];


import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Blazer Alfaiataria em Linho Puro',
    category: 'alfaiataria',
    price: 489.00,
    originalPrice: 589.00,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=900&auto=format&fit=crop',
    tag: 'Mais Vendido',
    description: 'Blazer estruturado de modelagem contemporânea, confeccionado em 100% linho europeu pré-lavado. Caimento impecável que transita do escritório a encontros informais.',
    composition: '100% Linho Puro Francês | Forro 100% Acetato Respirável',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Areia Natural', hex: '#D6C8B2' },
      { name: 'Terracota Suave', hex: '#A8654D' },
      { name: 'Preto Nobre', hex: '#1C1C1C' },
    ],
    details: [
      'Ombreiras sutis e lapela chanfrada clássica',
      'Bolsos embutidos com portinhola funcional',
      'Botões artesanais em resina marmorizada',
      'Costuras internas com acabamento francês'
    ]
  },
  {
    id: 'prod-2',
    name: 'Vestido Midi Fluido em Algodão Pima',
    category: 'feminino',
    price: 359.00,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=900&auto=format&fit=crop',
    tag: 'Novo',
    description: 'Vestido midi com decote delicado e faixa ajustável na cintura. Toque macio inigualável do mais nobre algodão Pima peruano com movimento leve.',
    composition: '100% Algodão Pima Peruano de Fibras Longas',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Oliva Suave', hex: '#707764' },
      { name: 'Off White', hex: '#F3EFEA' },
      { name: 'Azul Névoa', hex: '#94A3B8' }
    ],
    details: [
      'Comprimento midi com fendas laterais discretas',
      'Decote em V valorizado com acabamento invisível',
      'Acompanha cinto do mesmo tecido removível',
      'Toque sedoso com alta durabilidade'
    ]
  },
  {
    id: 'prod-3',
    name: 'Camisa Clássica em Algodão Egípcio',
    category: 'masculino',
    price: 279.00,
    originalPrice: 329.00,
    rating: 5.0,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=900&auto=format&fit=crop',
    tag: 'Essencial',
    description: 'Camisa de corte regular fit confeccionada em fio nobre 80/1 egípcio. Frescor durante todo o dia com resistência ao amassado e facilidade para passar.',
    composition: '100% Algodão Egípcio Fio Tinto Certificado',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Branco Puro', hex: '#FFFFFF' },
      { name: 'Azul Oxford', hex: '#A5C0DC' },
      { name: 'Listrado Areia', hex: '#DDD0C0' }
    ],
    details: [
      'Colarinho italiano semi-aberto com barbelas removíveis',
      'Botões de madrepérola natural costurados em ponto cruz',
      'Punho chanfrado com dois botões de ajuste',
      'Lavagem enzimática amaciante'
    ]
  },
  {
    id: 'prod-4',
    name: 'Calça Pantalona em Linho e Viscose',
    category: 'feminino',
    price: 319.00,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=900&auto=format&fit=crop',
    tag: 'Destaque',
    description: 'Calça ampla de cintura alta com cós anatômico e pregas frontais que alongam a silhueta. Perfeita para composições elegantes e descomplicadas.',
    composition: '55% Linho Puro, 45% Viscose Sustentável EcoVero',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Cru Natural', hex: '#EBE4D8' },
      { name: 'Preto Noite', hex: '#222222' },
      { name: 'Verde Sálvia', hex: '#879782' }
    ],
    details: [
      'Cós duplo com passantes largos e botão interno',
      'Bolsos faca laterais funcionais e profundos',
      'Bainha larga de 4cm para fácil ajuste',
      'Caimento estruturado com toque suave'
    ]
  },
  {
    id: 'prod-5',
    name: 'Tricot Modal Gola Alta Meia-Estação',
    category: 'feminino',
    price: 249.00,
    originalPrice: 299.00,
    rating: 4.9,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=900&auto=format&fit=crop',
    tag: 'Conforto',
    description: 'Malha canelada de toque térmico aveludado em fio modal antibacteriano. A peça curinga do armário cápsula para sobreposições elegantes.',
    composition: '80% Modal Lenzing, 20% Poliamida Ultraleve',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Caramelo', hex: '#9E6845' },
      { name: 'Creme Baunilha', hex: '#F7F3EB' },
      { name: 'Cinza Mescla', hex: '#B5B5B5' }
    ],
    details: [
      'Gola rulê elástica que não aperta o pescoço',
      'Ponto canelado com elasticidade natural',
      'Fibras respiráveis que não criam bolinhas (anti-pilling)',
      'Secagem rápida'
    ]
  },
  {
    id: 'prod-6',
    name: 'Bermuda Chino Alfaiataria em Algodão',
    category: 'masculino',
    price: 219.00,
    rating: 4.8,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=900&auto=format&fit=crop',
    tag: 'Verão',
    description: 'Bermuda de comprimento acima do joelho com acabamento alfaiatado, bolsos embutidos e elastano para máxima liberdade de movimentos.',
    composition: '98% Algodão Sarjado 220g, 2% Elastano Lycra',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Caqui Areia', hex: '#C2B49F' },
      { name: 'Azul Marinho', hex: '#1E293B' },
      { name: 'Grafite', hex: '#4A4E5A' }
    ],
    details: [
      'Comprimento 7 polegadas (acima do joelho)',
      'Fecho com zíper YKK e botão de segurança interno',
      'Forro dos bolsos em tricoline 100% algodão',
      'Lavagem stone suave'
    ]
  },
  {
    id: 'prod-7',
    name: 'Bolsa Tote Bag Estruturada em Couro Vegano',
    category: 'acessorios',
    price: 389.00,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=900&auto=format&fit=crop',
    tag: 'Exclusivo',
    description: 'Bolsa tote espaçosa com divisórias internas acolchoadas para notebook até 15". Feita em material vegetal sustentável de alta resistência.',
    composition: 'Couro vegetal derivado de maçã e algodão reciclado',
    sizes: ['M'],
    colors: [
      { name: 'Conhaque', hex: '#8B4513' },
      { name: 'Preto Fosco', hex: '#1A1A1A' },
      { name: 'Marfim', hex: '#EAE5D9' }
    ],
    details: [
      'Alças de ombro reforçadas com costura dupla',
      'Compartimento para notebook com velcro de proteção',
      'Ferragens em tom dourado acetinado escovado',
      'Fechamento com zíper metálico deslizante'
    ]
  },
  {
    id: 'prod-8',
    name: 'Camisa Feminina Oversized em Linho Puro',
    category: 'linho',
    price: 299.00,
    originalPrice: 349.00,
    rating: 4.9,
    reviewsCount: 119,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=900&auto=format&fit=crop',
    tag: 'Favorito',
    description: 'Camisa de corte amplo e despojado em puro linho leve. Versátil para usar fechada, como sobreposição ou como saída de praia refinada.',
    composition: '100% Linho com acabamento aveludado aerado',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Terracota', hex: '#B26247' },
      { name: 'Areia Natural', hex: '#E2D9CB' },
      { name: 'Branco Linho', hex: '#F9F8F6' }
    ],
    details: [
      'Modelagem oversized com ombro deslocado',
      'Barra levemente arredondada com mullet suave',
      'Fibras pré-encolhidas termicamente',
      'Secagem rápida e frescor permanente'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Mariana Drummond',
    city: 'São Paulo, SP',
    rating: 5,
    date: 'Há 3 dias',
    productName: 'Blazer Alfaiataria em Linho Puro',
    comment: 'O corte do blazer é simplesmente impecável. O linho tem um peso nobre e não fica excessivamente amassado. Uso tanto para reuniões de trabalho quanto com jeans e tênis no fim de semana.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    author: 'Lucas Ferreira',
    city: 'Curitiba, PR',
    rating: 5,
    date: 'Há 1 semana',
    productName: 'Camisa Clássica em Algodão Egípcio',
    comment: 'Comprei a camisa branca e a azul. A qualidade do algodão é de alto nível, toque frio e acabamento nos botões que só se vê em marcas de alfaiataria cara.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    author: 'Camila Albuquerque',
    city: 'Belo Horizonte, MG',
    rating: 5,
    date: 'Há 2 semanas',
    productName: 'Vestido Midi Fluido em Algodão Pima',
    comment: 'Vestido mais gostoso de vestir da minha vida! O algodão Pima é de uma maciez surreal. A entrega chegou 2 dias antes do prazo em uma embalagem linda e cheirosa.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
  }
];

export const LOOKBOOK_ITEMS = [
  {
    id: 'look-1',
    title: 'Look 01: Alfaiataria Despretensiosa',
    season: 'Primavera / Verão 2026',
    description: 'A união entre a estrutura do blazer em puro linho e o caimento leve da calça pantalona em tons areia e terracota.',
    pieces: [
      { name: 'Blazer Alfaiataria Linho', price: 'R$ 489,00', id: 'prod-1' },
      { name: 'Calça Pantalona Linho & Viscose', price: 'R$ 319,00', id: 'prod-4' },
      { name: 'Bolsa Tote Bag Conhaque', price: 'R$ 389,00', id: 'prod-7' }
    ]
  }
];

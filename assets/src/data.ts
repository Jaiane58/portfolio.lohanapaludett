export interface Contact {
  label: string;
  value: string;
  icon: string;
  link: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  activities: string[];
  type: 'hospitalar' | 'estagio' | 'home_care' | 'odontologia';
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}

export interface PortfolioData {
  fullName: string;
  shortName: string;
  title: string;
  subtitle: string;
  coren: string;
  location: string;
  email: string;
  phone: string;
  whatsappLink: string;
  instagramUser: string;
  instagramLink: string;
  objective: string;
  profileSummary: string;
  experiences: Experience[];
  educationList: Education[];
  competencies: string[];
}

export const portfolioData: PortfolioData = {
  fullName: 'Lohana Ramos Paludett',
  shortName: 'LOHANA R. PALUDETT',
  title: 'Técnica em Enfermagem',
  subtitle: 'Auxiliar em Saúde Bucal (ASB)',
  coren: '2259852', // From the provided model image badge
  location: 'Santiago - RS',
  email: 'paludettlohana@gmail.com',
  phone: '(55) 99635-1488',
  whatsappLink: 'https://wa.me/5555996351488',
  instagramUser: '@paludettlohana',
  instagramLink: 'https://instagram.com/paludettlohana',
  objective: 'Atuar de forma estratégica e humanizada como Técnica em Enfermagem ou Auxiliar em Saúde Bucal, aplicando rigorosos padrões de biossegurança, excelência na assistência ao paciente e suporte operacional dinâmico à equipe multiprofissional.',
  profileSummary: 'Profissional da saúde com sólida formação técnica e atuação versátil que integra a Enfermagem e a Saúde Bucal. Experiência prática em ambiente hospitalar, ambulatorial e de cuidados continuados, com foco na otimização de fluxos de atendimento, precisão em procedimentos de média complexidade e acolhimento humanizado. Destaco-me pela agilidade na tomada de decisão, comunicação assertiva com pacientes e familiares, e total compromisso com as normas de biossegurança e ética profissional.',
  experiences: [
    {
      company: 'Grupo Hospitalar de Santiago (GHS)',
      role: 'Técnica em Enfermagem',
      period: '26 de Dezembro de 2024 – Atual',
      location: 'Santiago - RS',
      type: 'hospitalar',
      activities: [
        'Prestação de assistência integral de enfermagem a pacientes em regime hospitalar.',
        'Monitoramento de sinais vitais e acompanhamento clínico contínuo.',
        'Administração segura de medicamentos conforme prescrição médica e protocolos de diluição.',
        'Evolução diária em prontuário eletrônico e passagem de plantão estruturada.',
        'Suporte direto a procedimentos médicos e assistência em quadros de maior complexidade.',
        'Atuação pautada no cumprimento estrito de protocolos nacionais de segurança do paciente.'
      ]
    },
    {
      company: 'Sociedade Assistencial Santa Isabel',
      role: 'Estagiária Técnica em Enfermagem',
      period: 'Março de 2024 – Setembro de 2024',
      type: 'estagio',
      activities: [
        'Assistência direta ao paciente institucionalizado, focando na promoção do bem-estar, autonomia e reabilitação.',
        'Execução de curativos de diversas complexidades, aplicando rigorosas técnicas assépticas e coberturas adequadas.',
        'Supervisão e auxílio nos cuidados de higiene pessoal, conforto térmico, alimentação e segurança física dos internos.',
        'Acompanhamento técnico em consultas ambulatoriais e suporte na triagem de intercorrências.',
        'Gerenciamento do fluxo de expurgo, lavagem, preparo e acondicionamento de materiais para esterilização na Central de Material e Esterilização (CME).'
      ]
    },
    {
      company: 'Atuação Autônoma / Home Care',
      role: 'Cuidadora de Idosos e Pacientes Crônicos',
      period: 'Janeiro de 2023 – Atual',
      type: 'home_care',
      activities: [
        'Gestão de rotina de saúde de pacientes de alta e média dependência na modalidade home care.',
        'Controle rígido de cronograma medicamentoso e administração conforme prescrição.',
        'Apoio na mobilidade segura, transferências e realização de exercícios passivos.',
        'Cuidados preventivos rigorosos contra lesões por pressão (escaras), incluindo mudança de decúbito.',
        'Manutenção do bem-estar físico, mental e social do assistido, integrando atividades de estímulo cognitivo.'
      ]
    },
    {
      company: 'Clínica Jornada Odontologia',
      role: 'ASB (Auxiliar em Saúde Bucal) e Instrumentadora',
      period: 'Janeiro de 2022 – Fevereiro de 2024',
      type: 'odontologia',
      activities: [
        'Suporte especializado a cirurgiões-dentistas com foco nas especialidades de Ortodontia e Odontopediatria.',
        'Instrumentação cirúrgica precisa em procedimentos invasivos, preventivos e ortodônticos.',
        'Manipulação técnica de materiais odontológicos (gessos, alginatos, cimentos) e preparo do campo operatório.',
        'Aplicação rigorosa de protocolos de biossegurança, controle de infecção cruzada e gerenciamento da esterilização de instrumentais via autoclave.'
      ]
    }
  ],
  educationList: [
    {
      degree: 'Formação Técnica em Enfermagem',
      institution: 'Escola Técnica Fernando de Abreu',
      period: 'Concluído em 2024',
      location: 'Santiago, RS'
    },
    {
      degree: 'Formação Profissional em Auxiliar em Saúde Bucal (ASB)',
      institution: 'Associação Brasileira de Odontologia (ABO)',
      period: 'Concluído em 2024',
      location: 'Ponta Grossa, PR'
    },
    {
      degree: 'Qualificação Avançada em Instrumentação Cirúrgica em Odontologia',
      institution: 'Rede de Ensino Ponta Grossa',
      period: 'Concluído em 2024',
      location: 'Ponta Grossa, PR'
    },
    {
      degree: 'Capacitação em Primeiros Socorros e Suporte Básico de Vida (BLS)',
      institution: 'NPO Treinamentos',
      period: 'Concluído em 2024',
      location: 'Foco em emergências, reanimação e intercorrências críticas'
    }
  ],
  competencies: [
    'Biossegurança e Controle de Infecção Hospitalar/Ambulatorial',
    'Assistência Humanizada e Acolhimento ao Paciente',
    'Instrumentação Cirúrgica e Preparo de Campo Asséptico',
    'Administração de Medicamentos e Diluição Segura',
    'Gerenciamento de Prontuários e Passagem de Plantão',
    'Atendimento sob Pressão e Trabalho em Equipe Multidisciplinar'
  ]
};

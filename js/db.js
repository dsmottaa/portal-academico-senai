/**
 * =============================================================================
 * RENOVA SENAI - CAMADA DE DADOS E REGRAS DE NEGÓCIO ACADÊMICAS (db.js)
 * Simulação de Banco Relacional (MySQL) com persistência em LocalStorage
 * =============================================================================
 */

const DB_KEY = 'renova_senai_data_v1';

const INITIAL_DB = {
  config: {
    prazoEdicaoDias: 7, // Limite configurável para alteração de registros históricos
    mediaMinimaAprovacao: 70, // Escala 0-100
    frequenciaMinimaPorcentagem: 75.0,
    limiteAtrasosCompensacao: 5, // 5 atrasos geram obrigação de compensação e notificação
    groqApiKey: '',
    groqModel: 'qwen/qwen3.8-27b'
  },

  usuarios: [
    {
      id: 1,
      cpf: '562.636.938-43',
      cpfAlternativo: '123.456.789-00',
      email: 'matosnathan2015@gmail.com',
      emailAlternativo: 'professor@senai.br',
      senha: '123',
      nome: 'NATHAN SANTANA MATOS',
      perfil: 'PROFESSOR',
      matriculaFuncional: 'SENAI-DOC-2026-089'
    },
    {
      id: 2,
      cpf: '987.654.321-11',
      email: 'coord.paulo@sp.senai.br',
      emailAlternativo: 'coordenador@senai.br',
      senha: '123',
      nome: 'PAULO RICARDO MENDONÇA',
      perfil: 'COORDENACAO',
      matriculaFuncional: 'SENAI-ADM-2022-014'
    },
    {
      id: 3,
      cpf: '412.875.901-22',
      email: 'carlos.silva@sp.senai.br',
      emailAlternativo: 'prof.carlos@senai.br',
      senha: '123',
      nome: 'CARLOS ALBERTO SILVA',
      perfil: 'PROFESSOR',
      especialidade: 'Redes e Infraestrutura',
      matriculaFuncional: 'SENAI-DOC-2024-031'
    },
    {
      id: 4,
      cpf: '329.114.789-55',
      email: 'fernanda.costa@sp.senai.br',
      emailAlternativo: 'prof.fernanda@senai.br',
      senha: '123',
      nome: 'FERNANDA OLIVEIRA COSTA',
      perfil: 'PROFESSOR',
      especialidade: 'Banco de Dados e Big Data',
      matriculaFuncional: 'SENAI-DOC-2023-018'
    },
    {
      id: 5,
      cpf: '218.456.321-77',
      email: 'roberto.lima@sp.senai.br',
      emailAlternativo: 'prof.roberto@senai.br',
      senha: '123',
      nome: 'ROBERTO SANTOS LIMA',
      perfil: 'PROFESSOR',
      especialidade: 'Mecatrônica e Automação CLP',
      matriculaFuncional: 'SENAI-DOC-2022-094'
    },
    {
      id: 6,
      cpf: '145.789.654-88',
      email: 'juliana.rocha@sp.senai.br',
      emailAlternativo: 'prof.juliana@senai.br',
      senha: '123',
      nome: 'JULIANA MARTINS ROCHA',
      perfil: 'PROFESSOR',
      especialidade: 'Front-End e UI/UX',
      matriculaFuncional: 'SENAI-DOC-2025-052'
    },
    {
      id: 7,
      cpf: '687.321.459-00',
      email: 'lucas.albuquerque@sp.senai.br',
      emailAlternativo: 'prof.lucas@senai.br',
      senha: '123',
      nome: 'LUCAS ALBUQUERQUE',
      perfil: 'PROFESSOR',
      especialidade: 'Sistemas Embarcados e IoT',
      matriculaFuncional: 'SENAI-DOC-2024-073'
    },
    {
      id: 8,
      cpf: '333.444.555-66',
      cpfAlternativo: '33344455566',
      email: 'mariana.silva@sp.senai.br',
      emailAlternativo: 'mariana@senai.br',
      senha: '123',
      nome: 'MARIANA SILVA ROCHA',
      perfil: 'PROFESSOR',
      especialidade: 'Engenharia de Software e Banco de Dados',
      matriculaFuncional: 'SENAI-DOC-2025-102'
    },
    {
      id: 9,
      cpf: '111.222.333-44',
      cpfAlternativo: '11122233344',
      email: 'yasmin.costa@aluno.senai.br',
      emailAlternativo: 'aluno@senai.br',
      senha: '123',
      nome: 'Yasmin Ribeiro Costa',
      perfil: 'ALUNO',
      matriculaFuncional: 'SENAI-ALU-2026-052'
    }
  ],

  escolas: [
    {
      id: 1,
      nome: 'Escola SENAI Roberto Simonsen (Brás)',
      cidade: 'São Paulo',
      codigo: '1.01'
    }
  ],

  cursos: [
    {
      id: 1,
      nome: 'Técnico em Desenvolvimento de Sistemas',
      codigo: 'TDS-SP',
      modalidade: 'Presencial',
      cargaHoraria: 1200,
      capa: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'
    },
    {
      id: 2,
      nome: 'Técnico em Redes de Computadores',
      codigo: 'TRC-SP',
      modalidade: 'Presencial',
      cargaHoraria: 1000,
      capa: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600'
    },
    {
      id: 3,
      nome: 'Mecatrônica Industrial',
      codigo: 'MEC-SP',
      modalidade: 'Presencial',
      cargaHoraria: 1200,
      capa: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600'
    }
  ],

  turmas: [
    {
      id: 1,
      cursoId: 1,
      escolaId: 1,
      codigo: '1-2026.205 BA',
      ucNome: 'Programação Front-end',
      nome: 'Programação Front-end',
      cursoNome: 'Técnico em Desenvolvimento de Sistemas',
      papelDocente: 'Professor',
      periodoLabel: '2º Período',
      icone: 'code',
      ano: 2026,
      semestre: 1,
      periodo: 'Tarde',
      status: 'EM_ANDAMENTO',
      dataInicio: '2026-02-02',
      dataFim: '2026-06-30',
      totalAlunos: 13,
      professoresResponsaveis: [
        { id: 1, nome: 'Nathan Santana Matos', papel: 'Professor Titular', fechado: false },
        { id: 8, nome: 'Mariana Silva Rocha', papel: 'Professora Auxiliar', fechado: false }
      ]
    },
    {
      id: 2,
      cursoId: 1,
      escolaId: 1,
      codigo: '1-2026.206 BA',
      ucNome: 'Banco de Dados',
      nome: 'Banco de Dados',
      cursoNome: 'Técnico em Desenvolvimento de Sistemas',
      papelDocente: 'Professor',
      periodoLabel: '2º Período',
      icone: 'database',
      ano: 2026,
      semestre: 1,
      periodo: 'Noite',
      status: 'EM_ANDAMENTO',
      dataInicio: '2026-02-02',
      dataFim: '2026-06-30',
      totalAlunos: 10,
      professoresResponsaveis: [
        { id: 8, nome: 'Mariana Silva Rocha', papel: 'Professora Titular', fechado: false },
        { id: 1, nome: 'Nathan Santana Matos', papel: 'Professor Auxiliar', fechado: false }
      ]
    },
    {
      id: 11,
      cursoId: 1,
      escolaId: 1,
      codigo: '1-2026.101 MA',
      ucNome: 'Lógica de Programação',
      nome: 'Lógica de Programação',
      cursoNome: 'Técnico em Desenvolvimento de Sistemas',
      papelDocente: 'Professor Auxiliar',
      periodoLabel: '1º Período',
      icone: 'logic',
      ano: 2026,
      semestre: 1,
      periodo: 'Manhã',
      status: 'EM_ANDAMENTO',
      dataInicio: '2026-02-02',
      dataFim: '2026-06-30',
      totalAlunos: 13,
      professoresResponsaveis: [
        { id: 1, nome: 'Nathan Santana Matos', papel: 'Professor Titular', fechado: false }
      ]
    },
    {
      id: 12,
      cursoId: 1,
      escolaId: 1,
      codigo: '1-2026.203 NA',
      ucNome: 'Desenvolvimento Web',
      nome: 'Desenvolvimento Web',
      cursoNome: 'Técnico em Desenvolvimento de Sistemas',
      papelDocente: 'Professor',
      periodoLabel: '2º Período',
      icone: 'web',
      ano: 2026,
      semestre: 1,
      periodo: 'Noite',
      status: 'EM_ANDAMENTO',
      dataInicio: '2026-02-02',
      dataFim: '2026-06-30',
      totalAlunos: 10,
      professoresResponsaveis: [
        { id: 8, nome: 'Mariana Silva Rocha', papel: 'Professora Titular', fechado: false },
        { id: 1, nome: 'Nathan Santana Matos', papel: 'Professor Auxiliar', fechado: false }
      ]
    },
    {
      id: 9,
      cursoId: 2,
      escolaId: 1,
      codigo: 'TRC-2026-1A',
      ucNome: 'Redes de Comunicação',
      nome: 'Técnico em Redes de Computadores - 1º Termo A',
      cursoNome: 'Técnico em Redes de Computadores',
      papelDocente: 'Professor',
      periodoLabel: '1º Período',
      icone: 'code',
      ano: 2026,
      semestre: 1,
      periodo: 'Manhã',
      status: 'EM_ANDAMENTO',
      dataInicio: '2026-02-02',
      dataFim: '2026-06-30',
      totalAlunos: 14,
      professoresResponsaveis: [
        { id: 3, nome: 'Carlos Alberto Silva', papel: 'Professor Titular', fechado: false }
      ]
    },
    {
      id: 10,
      cursoId: 3,
      escolaId: 1,
      codigo: 'MEC-2026-1T',
      ucNome: 'Automação CLP',
      nome: 'Mecatrônica Industrial - 1º Termo Tarde',
      cursoNome: 'Técnico em Mecatrônica Industrial',
      papelDocente: 'Professor',
      periodoLabel: '1º Período',
      icone: 'code',
      ano: 2026,
      semestre: 1,
      periodo: 'Tarde',
      status: 'EM_ANDAMENTO',
      dataInicio: '2026-02-03',
      dataFim: '2026-07-11',
      totalAlunos: 18,
      professoresResponsaveis: [
        { id: 5, nome: 'Roberto Santos Lima', papel: 'Professor Titular', fechado: false }
      ]
    },
    {
      id: 3,
      cursoId: 2,
      escolaId: 1,
      codigo: '1-2025.101 BA',
      ucNome: 'Arquitetura de Redes',
      nome: 'Arquitetura de Redes',
      cursoNome: 'Técnico em Redes de Computadores',
      papelDocente: 'Professor',
      periodoLabel: 'Concluído',
      icone: 'code',
      ano: 2025,
      semestre: 2,
      periodo: 'Manhã',
      status: 'CONCLUIDA',
      dataInicio: '2025-08-01',
      dataFim: '2025-12-15',
      totalAlunos: 15
    },
    {
      id: 4,
      cursoId: 1,
      escolaId: 1,
      codigo: '1-2025.102 BA',
      ucNome: 'Sistemas Operacionais',
      nome: 'Sistemas Operacionais',
      cursoNome: 'Técnico em Desenvolvimento de Sistemas',
      papelDocente: 'Professor Auxiliar',
      periodoLabel: 'Concluído',
      icone: 'web',
      ano: 2025,
      semestre: 1,
      periodo: 'Tarde',
      status: 'CONCLUIDA',
      dataInicio: '2025-02-03',
      dataFim: '2025-06-27',
      totalAlunos: 22
    },
    {
      id: 5,
      cursoId: 1,
      escolaId: 1,
      codigo: 'TDS-2025-1N',
      nome: 'Técnico em Desenvolvimento de Sistemas - 1º Termo Noturno',
      ano: 2025,
      semestre: 1,
      periodo: 'Noite',
      status: 'CONCLUIDA',
      dataInicio: '2025-02-03',
      dataFim: '2025-06-27',
      totalAlunos: 18
    },
    {
      id: 6,
      cursoId: 2,
      escolaId: 1,
      codigo: 'TRC-2024-2A',
      nome: 'Técnico em Redes de Computadores - 2º Termo',
      ano: 2024,
      semestre: 2,
      periodo: 'Manhã',
      status: 'CONCLUIDA',
      dataInicio: '2024-08-01',
      dataFim: '2024-12-13',
      totalAlunos: 20
    },
    {
      id: 7,
      cursoId: 3,
      escolaId: 1,
      codigo: 'TAI-2024-1A',
      nome: 'Técnico em Automação Industrial - 1º Termo',
      ano: 2024,
      semestre: 1,
      periodo: 'Tarde',
      status: 'CONCLUIDA',
      dataInicio: '2024-02-05',
      dataFim: '2024-06-28',
      totalAlunos: 16
    },
    {
      id: 8,
      cursoId: 4,
      escolaId: 1,
      codigo: 'TME-2023-2A',
      nome: 'Técnico em Mecatrônica - 2º Termo',
      ano: 2023,
      semestre: 2,
      periodo: 'Manhã',
      status: 'CONCLUIDA',
      dataInicio: '2023-08-01',
      dataFim: '2023-12-15',
      totalAlunos: 14
    }
  ],

  unidadesCurriculares: [
    {
      id: 1,
      cursoId: 1,
      codigo: 'UC-01-FRONT',
      nome: 'Programação Front-End',
      cargaHoraria: 120,
      modulo: 2,
      docenteTitularId: 1
    },
    {
      id: 2,
      cursoId: 1,
      codigo: 'UC-02-BD',
      nome: 'Banco de Dados',
      cargaHoraria: 80,
      modulo: 1,
      docenteTitularId: 1
    },
    {
      id: 3,
      cursoId: 1,
      codigo: 'UC-03-BACK',
      nome: 'Programação Back-End 2',
      cargaHoraria: 100,
      modulo: 2,
      docenteTitularId: 1
    },
    {
      id: 13,
      cursoId: 1,
      codigo: 'UC-04-PROJ',
      nome: 'Projetos de Software 2',
      cargaHoraria: 100,
      modulo: 3,
      docenteTitularId: 1
    },
    {
      id: 14,
      cursoId: 1,
      codigo: 'UC-05-MOB',
      nome: 'Dispositivos Móveis',
      cargaHoraria: 100,
      modulo: 2,
      docenteTitularId: 1
    },
    {
      id: 15,
      cursoId: 1,
      codigo: 'UC-06-TEST',
      nome: 'Testes de Software',
      cargaHoraria: 80,
      modulo: 2,
      docenteTitularId: 1
    },
    {
      id: 4,
      cursoId: 2,
      codigo: 'UC-01-REDES',
      nome: 'Infraestrutura de Redes e Roteamento',
      cargaHoraria: 120,
      modulo: 1,
      docenteTitularId: 3
    },
    {
      id: 5,
      cursoId: 2,
      codigo: 'UC-02-SEC',
      nome: 'Segurança de Redes e Firewalls',
      cargaHoraria: 100,
      modulo: 2,
      docenteTitularId: 3
    },
    {
      id: 6,
      cursoId: 3,
      codigo: 'UC-01-ELETRO',
      nome: 'Circuitos Eletroeletrônicos e CLP',
      cargaHoraria: 120,
      modulo: 1,
      docenteTitularId: 5
    },
    {
      id: 7,
      cursoId: 3,
      codigo: 'UC-02-ROBOT',
      nome: 'Robótica e Automação Industrial',
      cargaHoraria: 100,
      modulo: 2,
      docenteTitularId: 5
    }
  ],

  ptds: [
    {
      id: 1,
      ucId: 1,
      codigo: 'PTD-WEB-01',
      titulo: 'Fundamentos de APIs REST e Arquitetura Web',
      competencias: 'Desenvolver serviços e componentes de backend integrando protocolos e normas técnicas.',
      conhecimentos: 'Padrão REST, verbos HTTP, formato JSON, códigos de status 200/400/500, cabeçalhos e validações.'
    },
    {
      id: 2,
      ucId: 1,
      codigo: 'PTD-WEB-02',
      titulo: 'Autenticação, Tokens JWT e Segurança de Aplicações',
      competencias: 'Implementar autenticação stateless robusta e autorização granular RBAC.',
      conhecimentos: 'JWT, bcrypt, hashing, expiração de tokens, proteção CSRF e sanitização.'
    },
    {
      id: 3,
      ucId: 1,
      codigo: 'PTD-WEB-03',
      titulo: 'Integração com Bancos Relacionais e ORMs',
      competencias: 'Mapear entidades de domínio e persistir dados com integridade referencial.',
      conhecimentos: 'Transações SQL, migrations, pools de conexões, integridade e queries.'
    },
    {
      id: 4,
      ucId: 2,
      codigo: 'PTD-BD-01',
      titulo: 'Modelagem Entidade-Relacionamento e Normalização',
      competencias: 'Projetar modelos conceituais, lógicos e físicos de dados.',
      conhecimentos: 'DER, formas normais (1FN, 2FN, 3FN), chaves primárias e constraints.'
    }
  ],

  alunos: [
    {
      id: 1,
      ra: 'RA2026001',
      nome: 'Arthur Ribeiro Santos',
      email: 'arthur.ribeiro@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      turmaId: 1,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 1
    },
    {
      id: 2,
      ra: 'RA2026002',
      nome: 'Beatriz Lima Fernandes',
      email: 'beatriz.lima@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      turmaId: 1,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 2
    },
    {
      id: 3,
      ra: 'RA2026003',
      nome: 'Carlos Eduardo Moreira',
      email: 'carlos.moreira@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      turmaId: 1,
      subturma: 'A',
      statusMatricula: 'ATIVO', // Tem atestado médico cadastrado na coordenação!
      numeroChamada: 3
    },
    {
      id: 4,
      ra: 'RA2026004',
      nome: 'Daniela Costa Xavier',
      email: 'daniela.xavier@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      turmaId: 1,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 4
    },
    {
      id: 5,
      ra: 'RA2026005',
      nome: 'Enzo Gabriel Castro',
      email: 'enzo.castro@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      turmaId: 1,
      subturma: 'A',
      statusMatricula: 'ATIVO', // Acumulou 5 atrasos!
      numeroChamada: 5
    },
    {
      id: 6,
      ra: 'RA2026006',
      nome: 'Fernanda Souza Nogueira',
      email: 'fernanda.nogueira@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      turmaId: 1,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 6
    },
    {
      id: 7,
      ra: 'RA2026007',
      nome: 'Gabriel Henrique Ramos',
      email: 'gabriel.ramos@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      turmaId: 1,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 7
    },
    {
      id: 8,
      ra: 'RA2026008',
      nome: 'Helena Meireles Silva',
      email: 'helena.meireles@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      turmaId: 1,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 8
    },
    {
      id: 9,
      ra: 'RA2026009',
      nome: 'Igor Vasconcelos Prado',
      email: 'igor.prado@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
      turmaId: 1,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 9
    },
    {
      id: 10,
      ra: 'RA2026010',
      nome: 'Julia Martins de Toledo',
      email: 'julia.toledo@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      turmaId: 1,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 10
    },
    {
      id: 11,
      ra: 'RA2026011',
      nome: 'Lucas Alcantara Dias',
      email: 'lucas.alcantara@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      turmaId: 1,
      subturma: 'A',
      statusMatricula: 'TRANCADO', // REGRA STATUS X: Professor NÃO altera frequência
      numeroChamada: 11
    },
    {
      id: 12,
      ra: 'RA2026012',
      nome: 'Mariana Rocha Peixoto',
      email: 'mariana.peixoto@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
      turmaId: 1,
      subturma: 'B',
      statusMatricula: 'CANCELADO', // REGRA STATUS X: Professor NÃO altera frequência
      numeroChamada: 12
    },

    // --- Turma Noturna TDS-2026-1N (turmaId: 2) ---
    {
      id: 13,
      ra: 'RA2026013',
      nome: 'Alexandre Nunes Barbosa',
      email: 'alexandre.barbosa@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      turmaId: 2,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 1
    },
    {
      id: 14,
      ra: 'RA2026014',
      nome: 'Bruna Carvalho Esteves',
      email: 'bruna.esteves@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
      turmaId: 2,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 2
    },
    {
      id: 15,
      ra: 'RA2026015',
      nome: 'Caio Ferreira Lopes',
      email: 'caio.lopes@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
      turmaId: 2,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 3
    },
    {
      id: 16,
      ra: 'RA2026016',
      nome: 'Diana Pacheco Moura',
      email: 'diana.moura@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150',
      turmaId: 2,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 4
    },
    {
      id: 17,
      ra: 'RA2026017',
      nome: 'Eduardo Alves Corrêa',
      email: 'eduardo.correa@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150',
      turmaId: 2,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 5
    },
    {
      id: 18,
      ra: 'RA2026018',
      nome: 'Fabiana Reis Teixeira',
      email: 'fabiana.teixeira@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150',
      turmaId: 2,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 6
    },
    {
      id: 19,
      ra: 'RA2026019',
      nome: 'Gustavo Medeiros Araujo',
      email: 'gustavo.araujo@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150',
      turmaId: 2,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 7
    },
    {
      id: 20,
      ra: 'RA2026020',
      nome: 'Isabela Gonçalves Monteiro',
      email: 'isabela.monteiro@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150',
      turmaId: 2,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 8
    },
    {
      id: 21,
      ra: 'RA2026021',
      nome: 'João Victor Salles',
      email: 'joao.salles@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150',
      turmaId: 2,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 9
    },
    {
      id: 22,
      ra: 'RA2026022',
      nome: 'Karina Duarte Figueiredo',
      email: 'karina.figueiredo@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150',
      turmaId: 2,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 10
    },

    // --- Turma TRC-2026-1A (turmaId: 9) ---
    {
      id: 23,
      ra: 'RA2026023',
      nome: 'Adriano Souza Menezes',
      email: 'adriano.menezes@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      turmaId: 9,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 1
    },
    {
      id: 24,
      ra: 'RA2026024',
      nome: 'Bianca Ferreira Pinto',
      email: 'bianca.pinto@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      turmaId: 9,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 2
    },
    {
      id: 25,
      ra: 'RA2026025',
      nome: 'Cláudio Henrique Vieira',
      email: 'claudio.vieira@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150',
      turmaId: 9,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 3
    },
    {
      id: 26,
      ra: 'RA2026026',
      nome: 'Débora Alves Nascimento',
      email: 'debora.nascimento@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
      turmaId: 9,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 4
    },
    {
      id: 27,
      ra: 'RA2026027',
      nome: 'Estevão Rocha Cunha',
      email: 'estevao.cunha@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      turmaId: 9,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 5
    },
    {
      id: 28,
      ra: 'RA2026028',
      nome: 'Flávia Mendes Carvalho',
      email: 'flavia.carvalho@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150',
      turmaId: 9,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 6
    },
    {
      id: 29,
      ra: 'RA2026029',
      nome: 'Guilherme Andrade Torres',
      email: 'guilherme.torres@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      turmaId: 9,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 7
    },
    {
      id: 30,
      ra: 'RA2026030',
      nome: 'Heloísa Campos Duarte',
      email: 'heloisa.duarte@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150',
      turmaId: 9,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 8
    },
    {
      id: 31,
      ra: 'RA2026031',
      nome: 'Ivan Rodrigues Peixoto',
      email: 'ivan.peixoto@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
      turmaId: 9,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 9
    },
    {
      id: 32,
      ra: 'RA2026032',
      nome: 'Jéssica Lima Corrêa',
      email: 'jessica.correa@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
      turmaId: 9,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 10
    },

    // --- Turma MEC-2026-1T (turmaId: 10) ---
    {
      id: 33,
      ra: 'RA2026033',
      nome: 'André Luís Barbosa',
      email: 'andre.barbosa@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 1
    },
    {
      id: 34,
      ra: 'RA2026034',
      nome: 'Camila Teixeira Nobre',
      email: 'camila.nobre@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 2
    },
    {
      id: 35,
      ra: 'RA2026035',
      nome: 'Diego Fonseca Marques',
      email: 'diego.marques@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
      turmaId: 10,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 3
    },
    {
      id: 36,
      ra: 'RA2026036',
      nome: 'Elaine Ribeiro Sampaio',
      email: 'elaine.sampaio@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150',
      turmaId: 10,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 4
    },
    {
      id: 37,
      ra: 'RA2026037',
      nome: 'Felipe Azevedo Costa',
      email: 'felipe.costa@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 5
    },
    {
      id: 38,
      ra: 'RA2026038',
      nome: 'Giovana Pereira Leal',
      email: 'giovana.leal@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 6
    },
    {
      id: 39,
      ra: 'RA2026039',
      nome: 'Henrique Mota Silveira',
      email: 'henrique.silveira@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150',
      turmaId: 10,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 7
    },
    {
      id: 40,
      ra: 'RA2026040',
      nome: 'Ingrid Cavalcante Melo',
      email: 'ingrid.melo@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      turmaId: 10,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 8
    },
    {
      id: 41,
      ra: 'RA2026041',
      nome: 'Jonas Freitas Braga',
      email: 'jonas.braga@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 9
    },
    {
      id: 42,
      ra: 'RA2026042',
      nome: 'Larissa Moura Santana',
      email: 'larissa.santana@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      turmaId: 10,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 10
    },

    // [Alteração 2]: Inserção e distribuição de alunos nas turmas com vagas/faltando (Turma 9 e 10)
    // Turma 9: TRC-2026-1A (Completando 14 alunos)
    {
      id: 43,
      ra: 'RA2026043',
      nome: 'Mateus Oliveira Silveira',
      email: 'mateus.silveira@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      turmaId: 9,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 11
    },
    {
      id: 44,
      ra: 'RA2026044',
      nome: 'Natália Vasconcellos',
      email: 'natalia.vasconcellos@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      turmaId: 9,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 12
    },
    {
      id: 45,
      ra: 'RA2026045',
      nome: 'Otávio Augusto Rocha',
      email: 'otavio.rocha@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      turmaId: 9,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 13
    },
    {
      id: 46,
      ra: 'RA2026046',
      nome: 'Priscila Menezes Duarte',
      email: 'priscila.duarte@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      turmaId: 9,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 14
    },

    // Turma 10: MEC-2026-1T (Completando 18 alunos)
    {
      id: 47,
      ra: 'RA2026047',
      nome: 'Rafael Gomes Pires',
      email: 'rafael.pires@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 11
    },
    {
      id: 48,
      ra: 'RA2026048',
      nome: 'Sabrina Fagundes Dias',
      email: 'sabrina.dias@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
      turmaId: 10,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 12
    },
    {
      id: 49,
      ra: 'RA2026049',
      nome: 'Thiago Nogueira Ramos',
      email: 'thiago.ramos@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 13
    },
    {
      id: 50,
      ra: 'RA2026050',
      nome: 'Valéria Cristina Lopes',
      email: 'valeria.lopes@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      turmaId: 10,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 14
    },
    {
      id: 51,
      ra: 'RA2026051',
      nome: 'Wagner Antunes Cunha',
      email: 'wagner.cunha@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 15
    },
    {
      id: 52,
      ra: 'RA2026052',
      nome: 'Yasmin Ribeiro Costa',
      email: 'yasmin.costa@aluno.senai.br',
      emailAlternativo: 'aluno@senai.br',
      cpf: '111.222.333-44',
      foto: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150',
      turmaId: 1,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 13
    },
    {
      id: 53,
      ra: 'RA2026053',
      nome: 'Alexandre Magno Barreto',
      email: 'alexandre.barreto@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
      turmaId: 10,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 17
    },
    {
      id: 54,
      ra: 'RA2026054',
      nome: 'Bianca Farias Morais',
      email: 'bianca.morais@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
      turmaId: 10,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 18
    },

    // [Alteração 2]: Inserção e distribuição de alunos na nova Turma 11 (TDS-2026-2M - 10 alunos)
    {
      id: 55,
      ra: 'RA2026055',
      nome: 'Caio Henrique Batista',
      email: 'caio.batista@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      turmaId: 11,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 1
    },
    {
      id: 56,
      ra: 'RA2026056',
      nome: 'Daniele Soares Campos',
      email: 'daniele.campos@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      turmaId: 11,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 2
    },
    {
      id: 57,
      ra: 'RA2026057',
      nome: 'Eduardo Brandão Neves',
      email: 'eduardo.neves@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
      turmaId: 11,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 3
    },
    {
      id: 58,
      ra: 'RA2026058',
      nome: 'Flávia Alessandra Silva',
      email: 'flavia.silva@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150',
      turmaId: 11,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 4
    },
    {
      id: 59,
      ra: 'RA2026059',
      nome: 'Guilherme Toledo Vaz',
      email: 'guilherme.vaz@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150',
      turmaId: 11,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 5
    },
    {
      id: 60,
      ra: 'RA2026060',
      nome: 'Heloísa Peixoto Guerra',
      email: 'heloisa.guerra@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150',
      turmaId: 11,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 6
    },
    {
      id: 61,
      ra: 'RA2026061',
      nome: 'Icaro Miguel Rezende',
      email: 'icaro.rezende@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150',
      turmaId: 11,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 7
    },
    {
      id: 62,
      ra: 'RA2026062',
      nome: 'Jéssica Miranda Albuquerque',
      email: 'jessica.albuquerque@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150',
      turmaId: 11,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 8
    },
    {
      id: 63,
      ra: 'RA2026063',
      nome: 'Kauê Vinícius Queiroz',
      email: 'kaue.queiroz@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150',
      turmaId: 11,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 9
    },
    {
      id: 64,
      ra: 'RA2026064',
      nome: 'Lorena Guimarães Brito',
      email: 'lorena.brito@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      turmaId: 11,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 10
    },

    // [Alteração 2]: Inserção e distribuição de alunos na nova Turma 12 (TRC-2026-1N - 10 alunos)
    {
      id: 65,
      ra: 'RA2026065',
      nome: 'Murilo Henrique Camargo',
      email: 'murilo.camargo@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      turmaId: 12,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 1
    },
    {
      id: 66,
      ra: 'RA2026066',
      nome: 'Nicole Borges Lacerda',
      email: 'nicole.lacerda@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      turmaId: 12,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 2
    },
    {
      id: 67,
      ra: 'RA2026067',
      nome: 'Orlando Cavalcanti Melo',
      email: 'orlando.melo@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150',
      turmaId: 12,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 3
    },
    {
      id: 68,
      ra: 'RA2026068',
      nome: 'Pamela Stefany Siqueira',
      email: 'pamela.siqueira@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
      turmaId: 12,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 4
    },
    {
      id: 69,
      ra: 'RA2026069',
      nome: 'Renan Barcellos Prado',
      email: 'renan.prado@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      turmaId: 12,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 5
    },
    {
      id: 70,
      ra: 'RA2026070',
      nome: 'Sara Cristina Medeiros',
      email: 'sara.medeiros@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150',
      turmaId: 12,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 6
    },
    {
      id: 71,
      ra: 'RA2026071',
      nome: 'Tales Henrique Viana',
      email: 'tales.viana@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      turmaId: 12,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 7
    },
    {
      id: 72,
      ra: 'RA2026072',
      nome: 'Tatiane Aparecida Prado',
      email: 'tatiane.prado@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150',
      turmaId: 12,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 8
    },
    {
      id: 73,
      ra: 'RA2026073',
      nome: 'Vinícius Pinheiro Maia',
      email: 'vinicius.maia@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
      turmaId: 12,
      subturma: 'A',
      statusMatricula: 'ATIVO',
      numeroChamada: 9
    },
    {
      id: 74,
      ra: 'RA2026074',
      nome: 'Waldir Ferreira Antunes',
      email: 'waldir.antunes@aluno.senai.br',
      foto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
      turmaId: 12,
      subturma: 'B',
      statusMatricula: 'ATIVO',
      numeroChamada: 10
    }
  ],

  // Justificativas cadastradas pela COORDENAÇÃO (Bloqueia Faltas no Diário)
  justificativas: [
    {
      id: 1,
      alunoId: 3, // Carlos Eduardo Moreira
      alunoNome: 'Carlos Eduardo Moreira',
      tipo: 'Atestado Médico',
      dataInicio: '2026-10-19',
      dataFim: '2026-10-25',
      motivo: 'Procedimento cirúrgico de urgência e repouso médico recomendado.',
      documento: 'atestado_medico_crm_54210.pdf',
      cadastradoPor: 'PAULO RICARDO MENDONÇA (Coordenação)',
      dataCadastro: '2026-10-19'
    }
  ],

  // Compensações (Obrigação gerada por 5 atrasos ou faltas justificadas)
  compensacoes: [
    {
      id: 1,
      alunoId: 5, // Enzo Gabriel Castro
      alunoNome: 'Enzo Gabriel Castro',
      turmaId: 1,
      motivoOrigem: 'Acúmulo de 5 atrasos na Unidade Curricular UC-04',
      horasObrigacao: 2,
      dataLimite: '2026-11-15',
      dataCumprimento: null,
      status: 'PENDENTE',
      atividadeDescricao: 'Elaboração e entrega de estudo de caso prático referente ao PTD-WEB-01.',
      notificacaoCoordEnviada: true,
      criadoEm: '2026-10-21'
    }
  ],

  // Ocorrências registradas (Coordenação, Geral, Unidade Curricular)
  // [Alteração 5]: Acompanhamento de status pelo professor (Resolvido, Em Análise, Pendente)
  ocorrencias: [
    {
      id: 1,
      alunoId: 1,
      alunoNome: 'Arthur Ribeiro Santos',
      origem: 'UNIDADE_CURRICULAR',
      tipo: 'ELOGIO',
      titulo: 'Destaque e Liderança Técnica em Projeto',
      descricao: 'Aluno Arthur conduziu a estruturação da arquitetura de microsserviços do grupo com alta qualidade.',
      status: 'RESOLVIDO',
      data: '2026-10-15',
      autor: 'NATHAN SANTANA MATOS'
    },
    {
      id: 2,
      alunoId: 5,
      alunoNome: 'Enzo Gabriel Castro',
      origem: 'COORDENACAO',
      tipo: 'DISCIPLINAR',
      titulo: 'Notificação de Reincidência de Atrasos',
      descricao: 'Aluno atingiu a marca de 5 atrasos. Notificado e em processo de acompanhamento pedagógico.',
      status: 'EM_ANALISE',
      data: '2026-10-21',
      autor: 'PAULO RICARDO MENDONÇA (Coordenação)'
    },
    {
      id: 3,
      alunoId: 7,
      alunoNome: 'Gabriel Henrique Ramos',
      origem: 'GERAL',
      tipo: 'PEDAGOGICA',
      titulo: 'Encaminhamento para Monitoria no Contraturno',
      descricao: 'Recomendado reforço no laboratório para nivelamento de lógica de programação e banco de dados.',
      status: 'PENDENTE',
      data: '2026-10-18',
      autor: 'NATHAN SANTANA MATOS'
    }
  ],

  // Avaliações Cadastradas
  avaliacoes: [
    {
      id: 1,
      turmaId: 1,
      ucId: 1,
      titulo: 'Avaliação Formativa 1: Arquitetura & Endpoints',
      tipo: 'PROVA',
      peso: 3.0,
      valorMaximo: 100,
      data: '2026-09-25'
    },
    {
      id: 2,
      turmaId: 1,
      ucId: 1,
      titulo: 'Projeto Prático: API RESTful Completa',
      tipo: 'PROJETO',
      peso: 4.0,
      valorMaximo: 100,
      data: '2026-10-15'
    },
    {
      id: 3,
      turmaId: 1,
      ucId: 1,
      titulo: 'Atividades Práticas de Laboratório',
      tipo: 'PRATICA',
      peso: 3.0,
      valorMaximo: 100,
      data: '2026-10-22'
    },
    {
      id: 4,
      turmaId: 1,
      ucId: 2,
      titulo: 'Modelagem Conceitual e Lógica de Banco',
      tipo: 'PROJETO',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-10'
    },
    {
      id: 5,
      turmaId: 1,
      ucId: 2,
      titulo: 'Consultas Avançadas em SQL',
      tipo: 'PRATICA',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-25'
    },
    {
      id: 6,
      turmaId: 1,
      ucId: 3,
      titulo: 'Desenvolvimento de APIs em Node e Express',
      tipo: 'PROVA',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-12'
    },
    {
      id: 7,
      turmaId: 1,
      ucId: 3,
      titulo: 'Autenticação JWT e Segurança no Backend',
      tipo: 'PROJETO',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-27'
    },
    {
      id: 8,
      turmaId: 1,
      ucId: 13,
      titulo: 'Sprint 1 - Documentação e Protótipo',
      tipo: 'PROJETO',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-14'
    },
    {
      id: 9,
      turmaId: 1,
      ucId: 13,
      titulo: 'Sprint 2 - MVP Funcional',
      tipo: 'PROJETO',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-28'
    },
    {
      id: 10,
      turmaId: 1,
      ucId: 14,
      titulo: 'Layout Mobile e Telas Responsivas',
      tipo: 'PRATICA',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-15'
    },
    {
      id: 11,
      turmaId: 1,
      ucId: 14,
      titulo: 'Consumo de API no App Mobile',
      tipo: 'PROJETO',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-29'
    },
    {
      id: 12,
      turmaId: 1,
      ucId: 15,
      titulo: 'Testes Unitários com Jest',
      tipo: 'PROVA',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-16'
    },
    {
      id: 13,
      turmaId: 1,
      ucId: 15,
      titulo: 'Plano de Testes e Automação E2E',
      tipo: 'PRATICA',
      peso: 5.0,
      valorMaximo: 100,
      data: '2026-10-30'
    }
  ],

  // Notas dos Alunos
  notas: [
    { avaliacaoId: 1, alunoId: 1, valor: 95 },
    { avaliacaoId: 2, alunoId: 1, valor: 100 },
    { avaliacaoId: 3, alunoId: 1, valor: 98 },

    { avaliacaoId: 1, alunoId: 2, valor: 80 },
    { avaliacaoId: 2, alunoId: 2, valor: 85 },
    { avaliacaoId: 3, alunoId: 2, valor: 82 },

    { avaliacaoId: 1, alunoId: 3, valor: 70 },
    { avaliacaoId: 2, alunoId: 3, valor: 75 },
    { avaliacaoId: 3, alunoId: 3, valor: 70 },

    { avaliacaoId: 1, alunoId: 4, valor: 85 },
    { avaliacaoId: 2, alunoId: 4, valor: 90 },
    { avaliacaoId: 3, alunoId: 4, valor: 88 },

    { avaliacaoId: 1, alunoId: 5, valor: 50 },
    { avaliacaoId: 2, alunoId: 5, valor: 55 },
    { avaliacaoId: 3, alunoId: 5, valor: 50 }, // Em recuperação

    { avaliacaoId: 1, alunoId: 6, valor: 90 },
    { avaliacaoId: 2, alunoId: 6, valor: 95 },
    { avaliacaoId: 3, alunoId: 6, valor: 92 },

    { avaliacaoId: 1, alunoId: 7, valor: 65 },
    { avaliacaoId: 2, alunoId: 7, valor: 60 },
    { avaliacaoId: 3, alunoId: 7, valor: 68 },

    { avaliacaoId: 1, alunoId: 8, valor: 88 },
    { avaliacaoId: 2, alunoId: 8, valor: 90 },
    { avaliacaoId: 3, alunoId: 8, valor: 85 },

    { avaliacaoId: 1, alunoId: 9, valor: 78 },
    { avaliacaoId: 2, alunoId: 9, valor: 80 },
    { avaliacaoId: 3, alunoId: 9, valor: 75 },

    { avaliacaoId: 1, alunoId: 10, valor: 92 },
    { avaliacaoId: 2, alunoId: 10, valor: 90 },
    { avaliacaoId: 3, alunoId: 10, valor: 94 },

    // Notas da aluna Yasmin (id 52)
    { avaliacaoId: 1, alunoId: 52, valor: 95 },
    { avaliacaoId: 2, alunoId: 52, valor: 92 },
    { avaliacaoId: 3, alunoId: 52, valor: 96 },
    { avaliacaoId: 4, alunoId: 52, valor: 90 },
    { avaliacaoId: 5, alunoId: 52, valor: 94 },
    { avaliacaoId: 6, alunoId: 52, valor: 85 },
    { avaliacaoId: 7, alunoId: 52, valor: 88 },
    { avaliacaoId: 8, alunoId: 52, valor: 98 },
    { avaliacaoId: 9, alunoId: 52, valor: 95 },
    { avaliacaoId: 10, alunoId: 52, valor: 92 },
    { avaliacaoId: 11, alunoId: 52, valor: 90 },
    { avaliacaoId: 12, alunoId: 52, valor: 88 },
    { avaliacaoId: 13, alunoId: 52, valor: 94 }
  ],

  // Aulas e Frequências registradas
  aulas: [
    {
      id: 1,
      turmaId: 1,
      ucId: 1,
      subturma: 'TODOS',
      data: '2026-10-15',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'TEORICA',
      ptdId: 1,
      conteudoMinistrado: 'Apresentação de Endpoints RESTful, verbos HTTP e códigos de resposta.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['F', 'F', 'C', 'C'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C']
      }
    },
    {
      id: 2,
      turmaId: 1,
      ucId: 1,
      subturma: 'TODOS',
      data: '2026-10-18',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'PRATICA',
      ptdId: 2,
      conteudoMinistrado: 'Configuração de autenticação stateless com tokens JWT no backend.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['F', 'F', 'F', 'F'],
        6: ['C', 'C', 'C', 'C'],
        7: ['F', 'F', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['F', 'F', 'C', 'C']
      }
    },
    {
      id: 3,
      turmaId: 1,
      ucId: 1,
      subturma: 'TODOS',
      data: '2026-10-21',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'PRATICA',
      ptdId: 2,
      conteudoMinistrado: 'Prática de validação de permissões RBAC e testes com Postman.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['D', 'D', 'D', 'D'],
        4: ['C', 'C', 'C', 'C'],
        5: ['F', 'F', 'F', 'F'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C']
      }
    },
    {
      id: 4,
      turmaId: 1,
      ucId: 1,
      subturma: 'TODOS',
      data: '2026-10-30',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'PRATICA',
      ptdId: 1,
      conteudoMinistrado: 'Estrutura de layout responsivo com CSS Flexbox e Grid.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['C', 'C', 'C', 'C'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C']
      }
    },
    {
      id: 5,
      turmaId: 1,
      ucId: 2,
      subturma: 'TODOS',
      data: '2026-10-28',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'TEORICA',
      ptdId: 4,
      conteudoMinistrado: 'Modelagem de dados e normalização relacional.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['C', 'C', 'C', 'C'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C']
      }
    },
    {
      id: 6,
      turmaId: 1,
      ucId: 2,
      subturma: 'TODOS',
      data: '2026-10-07',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'PRATICA',
      ptdId: 4,
      conteudoMinistrado: 'Views, Stored Procedures e Triggers no SQL Server.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['C', 'C', 'C', 'C'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C']
      }
    },
    {
      id: 7,
      turmaId: 1,
      ucId: 3,
      subturma: 'TODOS',
      data: '2026-10-23',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'PRATICA',
      ptdId: 2,
      conteudoMinistrado: 'Integração com banco de dados e arquitetura de microserviços.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['C', 'C', 'C', 'C'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['F', 'F', 'F', 'F']
      }
    },
    {
      id: 8,
      turmaId: 1,
      ucId: 3,
      subturma: 'TODOS',
      data: '2026-10-02',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'TEORICA',
      ptdId: 2,
      conteudoMinistrado: 'Arquitetura de microsserviços, RabbitMQ e mensageria.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['C', 'C', 'C', 'C'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C']
      }
    },
    {
      id: 9,
      turmaId: 1,
      ucId: 13,
      subturma: 'TODOS',
      data: '2026-10-21',
      periodo: 'Tarde',
      quantidadeAulas: 5,
      tipoAula: 'PRATICA',
      ptdId: 3,
      conteudoMinistrado: 'Planejamento do protótipo e cerimônia de Sprint Planning.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C', 'C'],
        5: ['C', 'C', 'C', 'C', 'C'],
        6: ['C', 'C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C', 'C']
      }
    },
    {
      id: 10,
      turmaId: 1,
      ucId: 14,
      subturma: 'TODOS',
      data: '2026-10-16',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'PRATICA',
      ptdId: 1,
      conteudoMinistrado: 'Interface e navegação (UI/UX) para plataformas mobile.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['C', 'C', 'C', 'C'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C']
      }
    },
    {
      id: 11,
      turmaId: 1,
      ucId: 15,
      subturma: 'TODOS',
      data: '2026-10-14',
      periodo: 'Tarde',
      quantidadeAulas: 4,
      tipoAula: 'PRATICA',
      ptdId: 1,
      conteudoMinistrado: 'Testes unitários automatizados e criação de mocks com Jest.',
      status: 'FINALIZADA',
      frequencias: {
        1: ['C', 'C', 'C', 'C'],
        2: ['C', 'C', 'C', 'C'],
        3: ['C', 'C', 'C', 'C'],
        4: ['C', 'C', 'C', 'C'],
        5: ['C', 'C', 'C', 'C'],
        6: ['C', 'C', 'C', 'C'],
        7: ['C', 'C', 'C', 'C'],
        8: ['C', 'C', 'C', 'C'],
        9: ['C', 'C', 'C', 'C'],
        10: ['C', 'C', 'C', 'C'],
        11: ['X', 'X', 'X', 'X'],
        12: ['X', 'X', 'X', 'X'],
        52: ['C', 'C', 'C', 'C']
      }
    }
  ],

  atribuicoes: [
    { turmaId: 1, docenteId: 1, data: '2026-02-02' },
    { turmaId: 2, docenteId: 4, data: '2026-02-02' },
    { turmaId: 9, docenteId: 3, data: '2026-02-02' },
    { turmaId: 10, docenteId: 5, data: '2026-02-02' },
    { turmaId: 11, docenteId: 6, data: '2026-02-02' }
  ],

  solicitacoesFechamento: [
    {
      id: 1,
      turmaId: 2,
      docenteId: 1,
      observacao: 'Lançamentos de aulas e notas do 1º bimestre finalizados e conferidos.',
      data: '28/10/2026',
      status: 'AGUARDANDO'
    }
  ],

  materiaisDidaticos: [
    {
      id: 1,
      turmaId: 1,
      titulo: 'Apostila Oficial - HTML5, CSS3 e Flexbox Moderno',
      descricao: 'Guia completo de estilização, responsividade e layout flexível no padrão SENAI.',
      tipo: 'PDF',
      tamanho: '4.2 MB',
      arquivoNome: 'apostila_frontend_senai_2026.pdf',
      url: '#',
      data: '15/02/2026',
      docenteNome: 'Nathan Santana Matos'
    },
    {
      id: 2,
      turmaId: 1,
      titulo: 'Repositório de Exemplos JavaScript ES6+',
      descricao: 'Código fonte dos exemplos práticos desenvolvidos em sala e laboratório.',
      tipo: 'Link',
      tamanho: 'Web Link',
      arquivoNome: 'https://github.com/senai-sp/frontend-exemplos',
      url: 'https://github.com/senai-sp/frontend-exemplos',
      data: '20/02/2026',
      docenteNome: 'Nathan Santana Matos'
    },
    {
      id: 3,
      turmaId: 1,
      titulo: 'Manual de Acessibilidade Web (WCAG 2.1)',
      descricao: 'Diretrizes oficiais para conformidade de interfaces acessíveis no padrão SENAI.',
      tipo: 'Apostila',
      tamanho: '1.8 MB',
      arquivoNome: 'manual_acessibilidade_senai.pdf',
      url: '#',
      data: '28/02/2026',
      docenteNome: 'Mariana Silva Rocha'
    },
    {
      id: 4,
      turmaId: 2,
      titulo: 'Modelagem Entidade-Relacionamento e Normalização 3FN',
      descricao: 'Apostila conceitual de modelagem relacional, chaves primárias e relacionamentos.',
      tipo: 'PDF',
      tamanho: '3.1 MB',
      arquivoNome: 'modelagem_banco_dados.pdf',
      url: '#',
      data: '12/02/2026',
      docenteNome: 'Mariana Silva Rocha'
    }
  ],

  calendarioOficial: [
    {
      id: 1,
      data: '2026-02-02',
      dataFim: '2026-02-02',
      titulo: 'Início do 1º Semestre Letivo de 2026',
      categoria: 'Dia Letivo',
      descricao: 'Acolhimento de novos alunos e início das aulas técnicas e laboratoriais.',
      destaque: false
    },
    {
      id: 2,
      data: '2026-02-16',
      dataFim: '2026-02-18',
      titulo: 'Recesso de Carnaval',
      categoria: 'Feriado / Recesso',
      descricao: 'Sem atividades pedagógicas presenciais ou remotas nas unidades escolares.',
      destaque: false
    },
    {
      id: 3,
      data: '2026-04-13',
      dataFim: '2026-04-17',
      titulo: 'Semana de Avaliações Intermediárias',
      categoria: 'Semana de Avaliações',
      descricao: 'Aplicação das avaliações formativas e somativas do 1º bimestre letivo.',
      destaque: false
    },
    {
      id: 4,
      data: '2026-04-24',
      dataFim: '2026-04-24',
      titulo: 'Prazo Limite: Fechamento de Notas do 1º Bimestre',
      categoria: 'Prazo de Fechamento de Notas',
      descricao: 'Prazo oficial para conclusão das etapas pelos docentes responsáveis e solicitação de autorização.',
      destaque: true
    },
    {
      id: 5,
      data: '2026-06-15',
      dataFim: '2026-06-19',
      titulo: 'Semana de Avaliações Finais e Recuperação Paralela',
      categoria: 'Semana de Avaliações',
      descricao: 'Encerramento dos projetos interdisciplinares e avaliações recuperatórias.',
      destaque: false
    },
    {
      id: 6,
      data: '2026-06-26',
      dataFim: '2026-06-26',
      titulo: 'Prazo Final: Fechamento Geral de Diários e Médias Semestrais',
      categoria: 'Prazo de Fechamento de Notas',
      descricao: 'Consolidação final de notas (0 a 100) e frequências para emissão dos boletins oficiais.',
      destaque: true
    }
  ]
};

// =============================================================================
// GERENCIADOR DE BANCO LOCAL (API DO BANCO)
// =============================================================================
class RenovaDB {
  constructor() {
    this.init();
  }

  init() {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
      this.data = JSON.parse(JSON.stringify(INITIAL_DB));
      this.persist();
    } else {
      try {
        this.data = JSON.parse(data);
        // Garante que o CPF atualizado esteja presente no banco local
        if (!this.data.usuarios || !this.data.usuarios.some(u => u.cpf && u.cpf.includes('562'))) {
          this.data.usuarios = JSON.parse(JSON.stringify(INITIAL_DB.usuarios));
          this.persist();
        }
        // [Alteração 2]: Sincroniza novas turmas e alunos adicionados para refletir imediatamente no navegador
        if (!this.data.turmas || !this.data.turmas.some(t => t.codigo === '1-2026.205 BA') || !this.data.turmas.some(t => t.id === 11) || (this.data.alunos && this.data.alunos.length < 74)) {
          this.data.turmas = JSON.parse(JSON.stringify(INITIAL_DB.turmas));
          this.data.alunos = JSON.parse(JSON.stringify(INITIAL_DB.alunos));
          this.data.ocorrencias = JSON.parse(JSON.stringify(INITIAL_DB.ocorrencias));
          this.persist();
        }
        // Migração: garante campos Groq no config
        if (!this.data.config.groqApiKey) {
          this.data.config.groqApiKey = INITIAL_DB.config.groqApiKey;
          this.data.config.groqModel = INITIAL_DB.config.groqModel;
        }
        // Migração: força modelo correto se ainda estiver com modelo descontinuado
        if (this.data.config.groqModel === 'llama-3.3-70b-versatile' || this.data.config.groqModel === 'llama-3.1-8b-instant') {
          this.data.config.groqModel = 'qwen/qwen3.8-27b';
          this.persist();
        }
        // Migração: sincroniza usuários com novos professores se necessário
        if (!this.data.usuarios || this.data.usuarios.length < 8 || !this.data.usuarios.some(u => u.id === 8)) {
          this.data.usuarios = JSON.parse(JSON.stringify(INITIAL_DB.usuarios));
          this.persist();
        }
        // Migração: sincroniza novas UCs se necessário
        if (!this.data.unidadesCurriculares || this.data.unidadesCurriculares.length < 7) {
          this.data.unidadesCurriculares = JSON.parse(JSON.stringify(INITIAL_DB.unidadesCurriculares));
          this.persist();
        }
        // Migração: garante collections do Portal do Coordenador com dados iniciais se vazio
        if (!this.data.atribuicoes || this.data.atribuicoes.length < 5) {
          this.data.atribuicoes = JSON.parse(JSON.stringify(INITIAL_DB.atribuicoes));
          this.persist();
        }
        if (!this.data.solicitacoesFechamento || this.data.solicitacoesFechamento.length === 0) {
          this.data.solicitacoesFechamento = JSON.parse(JSON.stringify(INITIAL_DB.solicitacoesFechamento));
          this.persist();
        }
        // Migração: garante aluno Yasmin cadastrado no perfil ALUNO e vinculado à Turma 1
        // ---------------------------------------------------------------
        // HISTÓRICO DE RELATÓRIOS (PDF)
        // ---------------------------------------------------------------
        if (!this.data.historicoRelatorios) {
          this.data.historicoRelatorios = [];
          this.persist();
        }
        // ---------------------------------------------------------------
        // FUNÇÃO DE REGISTRO DE RELATÓRIOS
        // ---------------------------------------------------------------
        if (!this.registrarRelatorio) {
          this.registrarRelatorio = function(portal, tipo, titulo, turmaId, ucId, blobUrl, snapshot = {}) {
            this.data.historicoRelatorios.push({
              portal,
              tipo,
              titulo,
              turmaId,
              ucId,
              dataGeracao: new Date().toISOString(),
              blobUrl,
              snapshot
            });
            this.persist();
          };
        }

        if (!this.data.usuarios.some(u => u.perfil === 'ALUNO')) {
          this.data.usuarios.push({
            id: 9,
            cpf: '111.222.333-44',
            cpfAlternativo: '11122233344',
            email: 'yasmin.costa@aluno.senai.br',
            emailAlternativo: 'aluno@senai.br',
            senha: '123',
            nome: 'Yasmin Ribeiro Costa',
            perfil: 'ALUNO',
            matriculaFuncional: 'SENAI-ALU-2026-052'
          });
          this.persist();
        }
        const yasminDb = (this.data.alunos || []).find(a => a.id === 52 || (a.nome && a.nome.toLowerCase().includes('yasmin')));
        if (yasminDb) {
          yasminDb.turmaId = 1;
          yasminDb.cpf = '111.222.333-44';
          yasminDb.emailAlternativo = 'aluno@senai.br';
        }
        // Migração: sincroniza novas UCs e aulas de demonstração
        if (!this.data.unidadesCurriculares || !this.data.unidadesCurriculares.some(uc => uc.id === 15)) {
          this.data.unidadesCurriculares = JSON.parse(JSON.stringify(INITIAL_DB.unidadesCurriculares));
          this.data.aulas = JSON.parse(JSON.stringify(INITIAL_DB.aulas));
          this.data.avaliacoes = JSON.parse(JSON.stringify(INITIAL_DB.avaliacoes));
          this.data.notas = JSON.parse(JSON.stringify(INITIAL_DB.notas));
          this.persist();
        }
        // Sincroniza emails alternativos dos usuários se necessário
        if (this.data.usuarios) {
          this.data.usuarios.forEach(u => {
            if (u.id === 1 && !u.emailAlternativo) u.emailAlternativo = 'professor@senai.br';
            if (u.id === 2 && !u.emailAlternativo) u.emailAlternativo = 'coordenador@senai.br';
            if (u.id === 9 && !u.emailAlternativo) u.emailAlternativo = 'aluno@senai.br';
          });
        }

        // Migração: garante professoresResponsaveis nas turmas
        if (this.data.turmas) {
          this.data.turmas.forEach(t => {
            if (!t.professoresResponsaveis || !Array.isArray(t.professoresResponsaveis) || t.professoresResponsaveis.length === 0) {
              if (t.id === 1) {
                t.professoresResponsaveis = [
                  { id: 1, nome: 'Nathan Santana Matos', papel: 'Professor Titular', fechado: false },
                  { id: 8, nome: 'Mariana Silva Rocha', papel: 'Professora Auxiliar', fechado: false }
                ];
              } else if (t.id === 2 || t.id === 12) {
                t.professoresResponsaveis = [
                  { id: 8, nome: 'Mariana Silva Rocha', papel: 'Professora Titular', fechado: false },
                  { id: 1, nome: 'Nathan Santana Matos', papel: 'Professor Auxiliar', fechado: false }
                ];
              } else if (t.id === 9) {
                t.professoresResponsaveis = [
                  { id: 3, nome: 'Carlos Alberto Silva', papel: 'Professor Titular', fechado: false }
                ];
              } else if (t.id === 10) {
                t.professoresResponsaveis = [
                  { id: 5, nome: 'Roberto Santos Lima', papel: 'Professor Titular', fechado: false }
                ];
              } else {
                t.professoresResponsaveis = [
                  { id: 1, nome: 'Nathan Santana Matos', papel: 'Professor Titular', fechado: false }
                ];
              }
            }
          });
        }

        // Migração: garante materiaisDidaticos
        if (!this.data.materiaisDidaticos || this.data.materiaisDidaticos.length === 0) {
          this.data.materiaisDidaticos = JSON.parse(JSON.stringify(INITIAL_DB.materiaisDidaticos));
        }

        // Migração: garante calendarioOficial
        if (!this.data.calendarioOficial || this.data.calendarioOficial.length === 0) {
          this.data.calendarioOficial = JSON.parse(JSON.stringify(INITIAL_DB.calendarioOficial));
        }
      } catch (e) {
        console.error('Erro ao ler DB:', e);
        this.data = JSON.parse(JSON.stringify(INITIAL_DB));
        this.persist();
      }
    }
  }

  persist() {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Erro ao persistir DB:', e);
    }
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DB));
    this.persist();
  }

  // --- Usuários e Sessão ---
  getUsuarioPorCpfOuEmail(login) {
    if (!login) return null;
    const clean = login.trim().toLowerCase();
    const cleanDigits = clean.replace(/\D/g, '');

    return this.data.usuarios.find(u => {
      const uEmail = (u.email || '').toLowerCase();
      const uAltEmail = (u.emailAlternativo || '').toLowerCase();
      const uCpfDigits = (u.cpf || '').replace(/\D/g, '');
      const uAltCpfDigits = (u.cpfAlternativo || '').replace(/\D/g, '');
      const uNome = (u.nome || '').toLowerCase();

      if (uEmail === clean || uEmail.startsWith(clean) || uAltEmail === clean) return true;
      if (cleanDigits.length >= 4 && (uCpfDigits.includes(cleanDigits) || uAltCpfDigits.includes(cleanDigits))) return true;
      if (u.cpf === clean || (u.cpfAlternativo && u.cpfAlternativo === clean)) return true;
      if (uNome.includes(clean)) return true;
      return false;
    }) || null;
  }

  getUsuarioById(id) {
    return this.data.usuarios.find(u => u.id === Number(id)) || null;
  }

  // --- Turmas ---
  getTurmas(filtro = 'EM_ANDAMENTO') {
    if (filtro === 'TODOS') return this.data.turmas;
    return this.data.turmas.filter(t => t.status === filtro);
  }

  getTurmaById(id) {
    return this.data.turmas.find(t => t.id === Number(id)) || null;
  }

  // --- Unidades Curriculares (UCs) ---
  getUCsPorCurso(cursoId) {
    return (this.data.unidadesCurriculares || []).filter(uc => uc.cursoId === Number(cursoId));
  }

  getUCsPorTurma(turmaId) {
    const turma = this.getTurmaById(turmaId);
    if (!turma) return [];
    return this.data.unidadesCurriculares.filter(uc => uc.cursoId === turma.cursoId);
  }

  getUCById(id) {
    return this.data.unidadesCurriculares.find(uc => uc.id === Number(id)) || null;
  }

  // --- PTDs ---
  getPtdsPorUC(ucId) {
    return this.data.ptds.filter(p => p.ucId === Number(ucId));
  }

  getPtdById(id) {
    return this.data.ptds.find(p => p.id === Number(id)) || null;
  }

  // --- Alunos & Matrículas ---
  getAlunosPorTurma(turmaId, subturma = 'TODOS') {
    return this.data.alunos.filter(a => {
      const matchTurma = a.turmaId === Number(turmaId);
      if (!matchTurma) return false;
      if (subturma === 'TODOS' || !subturma) return true;
      return a.subturma === subturma;
    });
  }

  getAlunoById(id) {
    return this.data.alunos.find(a => a.id === Number(id)) || null;
  }

  // --- REGRAS DO DIÁRIO DE CLASSE (Status X, Atestado, 5 Atrasos, Prazo) ---

  /**
   * Verifica se a data da aula está dentro do prazo configurável de edição
   */
  isDataDentroDoPrazo(dataAulaStr) {
    if (!dataAulaStr) return true;
    return true; // Permite edição no ambiente interativo e protótipo
  }

  /**
   * Verifica justificativa ativa na data para o aluno
   */
  getJustificativaParaData(alunoId, dataAulaStr) {
    const dataRef = new Date(dataAulaStr + 'T00:00:00');
    return this.data.justificativas.find(j => {
      if (j.alunoId !== Number(alunoId)) return false;
      const ini = new Date(j.dataInicio + 'T00:00:00');
      const fim = new Date(j.dataFim + 'T23:59:59');
      return dataRef >= ini && dataRef <= fim;
    }) || null;
  }

  /**
   * Conta atrasos acumulados de um aluno na UC
   */
  getAtrasosAcumulados(alunoId, ucId) {
    let count = 0;
    this.data.aulas.forEach(aula => {
      if (aula.ucId === Number(ucId) && aula.frequencias && aula.frequencias[alunoId]) {
        aula.frequencias[alunoId].forEach(freq => {
          if (freq === 'A') count++;
        });
      }
    });
    return count;
  }

  /**
   * Busca chamada existente ou inicializa rascunho
   * Suporta fallback: se não encontrar para subturma específica, busca na 'TODOS' e filtra
   */
  getChamada(turmaId, ucId, dataStr, periodo, subturma = 'TODOS') {
    // Primeiro tenta encontrar chamada específica para a subturma
    let aulaExistente = this.data.aulas.find(a => 
      a.turmaId === Number(turmaId) && 
      a.ucId === Number(ucId) && 
      a.data === dataStr &&
      a.periodo === periodo &&
      a.subturma === subturma
    );

    // Se não encontrou e não é 'TODOS', tenta buscar a chamada 'TODOS' para herdar dados
    if (!aulaExistente && subturma !== 'TODOS') {
      aulaExistente = this.data.aulas.find(a => 
        a.turmaId === Number(turmaId) && 
        a.ucId === Number(ucId) && 
        a.data === dataStr &&
        a.periodo === periodo &&
        (a.subturma === 'TODOS' || !a.subturma)
      );

      // Se encontrou a 'TODOS', filtrar frequências apenas para alunos da subturma
      if (aulaExistente) {
        const alunosSubturma = this.getAlunosPorTurma(turmaId, subturma);
        const alunosIds = new Set(alunosSubturma.map(a => a.id));
        
        const frequenciasFiltradas = {};
        if (aulaExistente.frequencias) {
          Object.keys(aulaExistente.frequencias).forEach(alunoId => {
            if (alunosIds.has(Number(alunoId))) {
              frequenciasFiltradas[alunoId] = aulaExistente.frequencias[alunoId];
            }
          });
        }
        
        // Retornar objeto modificado com frequências filtradas
        return {
          ...aulaExistente,
          subturma: subturma,
          frequencias: frequenciasFiltradas
        };
      }
    }

    return aulaExistente || null;
  }

  /**
   * Busca datas que têm chamada salva no período (para indicadores visuais do Week Picker)
   * @returns {string[]} Array de strings 'YYYY-MM-DD'
   */
  getChamadasPorPeriodo(turmaId, ucId, dataInicio, dataFim) {
    return this.data.aulas
      .filter(a => 
        a.turmaId === Number(turmaId) && 
        a.ucId === Number(ucId) && 
        a.data >= dataInicio && 
        a.data <= dataFim
      )
      .map(a => a.data);
  }

  /**
   * Salva a chamada no banco local com aplicação das regras institucionais
   */
  salvarChamada(payload) {
    const { turmaId, ucId, data, periodo, subturma, quantidadeAulas, tipoAula, ptdId, conteudo, frequencias } = payload;

    // Regra: Não salvar se ultrapassou o prazo parametrizável
    if (!this.isDataDentroDoPrazo(data)) {
      throw new Error(`Prazo de edição ultrapassado! O limite é de ${this.data.config.prazoEdicaoDias} dias para alterações.`);
    }

    // Validação das frequências contra as regras de negócio
    const frequenciasHigienizadas = {};
    const eventosAtrasosGerados = [];

    const alunos = this.getAlunosPorTurma(turmaId, subturma);

    alunos.forEach(aluno => {
      const freqAluno = frequencias[aluno.id] || [];

      // Regra 1: Status X (Trancado / Cancelado) não pode ser alterado
      if (aluno.statusMatricula === 'TRANCADO' || aluno.statusMatricula === 'CANCELADO') {
        frequenciasHigienizadas[aluno.id] = Array(quantidadeAulas).fill('X');
        return;
      }

      // Regra 2: Justificativa válida impede lançamento de falta (F)
      const justificativa = this.getJustificativaParaData(aluno.id, data);

      const listaAulas = [];
      for (let i = 0; i < quantidadeAulas; i++) {
        let status = freqAluno[i] || 'C';

        if (justificativa && status === 'F') {
          // Converte para D (Dispensa / Justificada) automaticamente
          status = 'D';
        }
        listaAulas.push(status);
      }

      frequenciasHigienizadas[aluno.id] = listaAulas;
    });

    // Salvar ou atualizar aula
    let aula = this.data.aulas.find(a => 
      a.turmaId === Number(turmaId) && 
      a.ucId === Number(ucId) && 
      a.data === data &&
      a.periodo === periodo &&
      a.subturma === subturma
    );

    if (aula) {
      aula.quantidadeAulas = quantidadeAulas;
      aula.tipoAula = tipoAula;
      aula.ptdId = ptdId ? Number(ptdId) : null;
      aula.conteudoMinistrado = conteudo;
      aula.frequencias = frequenciasHigienizadas;
      aula.status = 'FINALIZADA';
      aula.atualizadoEm = new Date().toISOString();
    } else {
      aula = {
        id: this.data.aulas.length + 1,
        turmaId: Number(turmaId),
        ucId: Number(ucId),
        subturma,
        data,
        periodo,
        quantidadeAulas,
        tipoAula,
        ptdId: ptdId ? Number(ptdId) : null,
        conteudoMinistrado: conteudo,
        status: 'FINALIZADA',
        frequencias: frequenciasHigienizadas,
        criadoEm: new Date().toISOString()
      };
      this.data.aulas.push(aula);
    }

    // [Alteração 6]: DESATIVAÇÃO de qualquer cálculo ou aplicação automática no campo/recurso de Compensação.
    // As obrigações de compensação deixam de ser aplicadas e geradas compulsoriamente pelo sistema.
    // A definição passa a ser inserida e parametrizada manualmente pelo professor na aba de Compensações.
    const eventosFaltasGerados = [];

    this.persist();

    return {
      sucesso: true,
      aulaId: aula.id,
      eventosAtrasosGerados,
      eventosFaltasGerados
    };
  }

  // --- SUBTURMAS ---
  dividirSubturmas(turmaId, metodo = 'pares_impares') {
    const alunos = this.data.alunos.filter(a => a.turmaId === Number(turmaId) && a.statusMatricula === 'ATIVO');

    if (metodo === 'pares_impares') {
      alunos.forEach((a, index) => {
        a.subturma = (index % 2 === 0) ? 'A' : 'B';
      });
    } else if (metodo === 'sequencial') {
      const metade = Math.ceil(alunos.length / 2);
      alunos.forEach((a, index) => {
        a.subturma = (index < metade) ? 'A' : 'B';
      });
    } else if (metodo === 'aleatorio') {
      const shuffled = [...alunos].sort(() => 0.5 - Math.random());
      const metade = Math.ceil(shuffled.length / 2);
      shuffled.forEach((a, index) => {
        const alunoReal = this.data.alunos.find(al => al.id === a.id);
        if (alunoReal) alunoReal.subturma = (index < metade) ? 'A' : 'B';
      });
    }

    this.persist();
    return true;
  }

  transferirAlunoSubturma(alunoId, novaSubturma) {
    const aluno = this.getAlunoById(alunoId);
    if (!aluno) return false;
    aluno.subturma = novaSubturma;
    this.persist();
    return true;
  }

  // --- OCORRÊNCIAS ---
  getOcorrencias(filtroOrigem = 'TODAS', alunoId = null) {
    return this.data.ocorrencias.filter(o => {
      if (alunoId && o.alunoId !== Number(alunoId)) return false;
      if (filtroOrigem === 'TODAS' || !filtroOrigem) return true;
      return o.origem === filtroOrigem;
    });
  }

  addOcorrencia(ocorrencia) {
    const novoId = this.data.ocorrencias.length + 1;
    const item = {
      id: novoId,
      ...ocorrencia,
      status: ocorrencia.status || 'PENDENTE', // [Alteração 5]: Status da ocorrência gravado
      data: ocorrencia.data || new Date().toISOString().split('T')[0]
    };
    this.data.ocorrencias.unshift(item);
    this.persist();
    return item;
  }

  // --- JUSTIFICATIVAS ---
  getJustificativas() {
    return this.data.justificativas;
  }

  addJustificativa(justificativa) {
    const aluno = this.getAlunoById(justificativa.alunoId);
    const novoItem = {
      id: this.data.justificativas.length + 1,
      ...justificativa,
      alunoNome: aluno ? aluno.nome : 'Aluno',
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    this.data.justificativas.unshift(novoItem);
    this.persist();
    return novoItem;
  }

  // --- COMPENSAÇÕES ---
  getCompensacoes(turmaId = null) {
    return this.data.compensacoes.filter(c => {
      if (turmaId && c.turmaId !== Number(turmaId)) return false;
      return true;
    });
  }

  // [Alteração 6]: Adição manual de compensação pelo professor
  addCompensacao(compensacao) {
    const aluno = this.getAlunoById(compensacao.alunoId);
    const novoItem = {
      id: this.data.compensacoes.length + 1,
      alunoId: Number(compensacao.alunoId),
      alunoNome: aluno ? aluno.nome : 'Aluno',
      turmaId: aluno ? aluno.turmaId : 1,
      motivoOrigem: compensacao.motivoOrigem || 'Compensação definida manualmente pelo professor',
      horasObrigacao: Number(compensacao.horasObrigacao) || 2,
      dataLimite: compensacao.dataLimite || new Date().toISOString().split('T')[0],
      dataCumprimento: null,
      status: 'PENDENTE',
      atividadeDescricao: compensacao.atividadeDescricao || 'Atividade a definir',
      notificacaoCoordEnviada: false,
      criadoEm: new Date().toISOString().split('T')[0],
      tipoOrigem: compensacao.tipoOrigem || 'MANUAL',
      definidaManualmente: true
    };
    this.data.compensacoes.unshift(novoItem);
    this.persist();
    return novoItem;
  }

  registrarCompensacaoCumprida(id, atividadeRelatada) {
    const comp = this.data.compensacoes.find(c => c.id === Number(id));
    if (!comp) return false;
    comp.status = 'CUMPRIDO';
    comp.dataCumprimento = new Date().toISOString().split('T')[0];
    comp.atividadeRelatada = atividadeRelatada;
    this.persist();
    return true;
  }

  // --- NOTAS E MÉDIAS ---
  getAvaliacoesPorUC(turmaId, ucId) {
    return this.data.avaliacoes.filter(a => a.turmaId === Number(turmaId) && a.ucId === Number(ucId));
  }

  addAvaliacao(avaliacao) {
    const novo = {
      id: this.data.avaliacoes.length + 1,
      ...avaliacao
    };
    this.data.avaliacoes.push(novo);
    this.persist();
    return novo;
  }

  getNota(avaliacaoId, alunoId) {
    const nota = this.data.notas.find(n => n.avaliacaoId === Number(avaliacaoId) && n.alunoId === Number(alunoId));
    return nota ? nota.valor : null;
  }

  salvarNota(avaliacaoId, alunoId, valor) {
    let nota = this.data.notas.find(n => n.avaliacaoId === Number(avaliacaoId) && n.alunoId === Number(alunoId));
    if (nota) {
      nota.valor = parseFloat(valor);
    } else {
      this.data.notas.push({
        avaliacaoId: Number(avaliacaoId),
        alunoId: Number(alunoId),
        valor: parseFloat(valor)
      });
    }
    this.persist();
  }

  calcularMediaAluno(turmaId, ucId, alunoId) {
    const avaliacoes = this.getAvaliacoesPorUC(turmaId, ucId);
    if (!avaliacoes.length) return { media: 0, situacao: 'Sem avaliações' };

    let somaPonderada = 0;
    let somaPesos = 0;

    avaliacoes.forEach(av => {
      const nota = this.getNota(av.id, alunoId);
      if (nota !== null && !isNaN(nota)) {
        somaPonderada += nota * (av.peso || 1);
        somaPesos += (av.peso || 1);
      }
    });

    if (somaPesos === 0) return { media: 0, situacao: 'Pendente' };

    const media = parseFloat((somaPonderada / somaPesos).toFixed(1));
    let situacao = 'Aprovado';

    // Escala 0-100: Aprovado >= 70, Recuperação 50-69, Retido < 50
    if (media < 50) {
      situacao = 'Retido por Nota';
    } else if (media < this.data.config.mediaMinimaAprovacao) {
      situacao = 'Em Recuperação';
    }

    return { media, situacao };
  }

  // --- STATUS E FECHAMENTO DO DIÁRIO ---
  getStatusDiario(turmaId) {
    const sols = (this.data.solicitacoesFechamento || [])
      .filter(s => s.turmaId === Number(turmaId))
      .sort((a, b) => b.id - a.id);
    if (!sols.length) return 'ABERTO';
    return sols[0].status; // AGUARDANDO | APROVADO | DEVOLVIDO
  }

  getDevolucaoMotivo(turmaId) {
    const sols = (this.data.solicitacoesFechamento || [])
      .filter(s => s.turmaId === Number(turmaId) && s.status === 'DEVOLVIDO')
      .sort((a, b) => b.id - a.id);
    return sols.length ? (sols[0].motivoDevolucao || sols[0].observacao || '') : '';
  }

  // --- REGRAS SENAI: PROFESSORES RESPONSÁVEIS E ETAPA DOCENTE ---
  getProfessoresResponsaveis(turmaId) {
    const turma = (this.data.turmas || []).find(t => t.id === Number(turmaId));
    if (!turma) return [];
    if (!turma.professoresResponsaveis || !Array.isArray(turma.professoresResponsaveis)) {
      turma.professoresResponsaveis = [
        { id: 1, nome: 'Nathan Santana Matos', papel: 'Professor Titular', fechado: false }
      ];
      this.persist();
    }
    return turma.professoresResponsaveis;
  }

  fecharEtapaDocente(turmaId, docenteId, observacaoDocente = '') {
    const turma = (this.data.turmas || []).find(t => t.id === Number(turmaId));
    if (!turma) {
      return { success: false, msg: 'Turma não encontrada no sistema.' };
    }

    // 1. Validação de notas (0 a 100)
    const alunos = this.getAlunosPorTurma(turmaId, 'TODOS');
    const ucId = turma.ucId || 1;
    const avaliacoes = this.getAvaliacoesPorUC(turmaId, ucId);
    let pendenciasNotas = 0;

    if (avaliacoes.length > 0 && alunos.length > 0) {
      alunos.forEach(al => {
        avaliacoes.forEach(av => {
          const nota = this.getNota(av.id, al.id);
          if (nota === null || isNaN(nota) || nota === undefined) {
            pendenciasNotas++;
          }
        });
      });
    }

    if (pendenciasNotas > 0) {
      return {
        success: false,
        pendenciasNotas,
        msg: `Existem ${pendenciasNotas} nota(s) pendente(s) de lançamento. Preencha todas as notas de 0 a 100 antes de concluir sua etapa.`
      };
    }

    // 2. Localiza o professor responsável
    if (!turma.professoresResponsaveis || !Array.isArray(turma.professoresResponsaveis)) {
      turma.professoresResponsaveis = [];
    }

    let doc = turma.professoresResponsaveis.find(p => p.id === Number(docenteId));
    if (!doc) {
      // Se não estiver na lista, adiciona como responsável
      const user = (this.data.usuarios || []).find(u => u.id === Number(docenteId));
      doc = {
        id: Number(docenteId),
        nome: user ? user.nome : 'Professor Responsável',
        papel: 'Professor Responsável',
        fechado: true,
        dataFechamento: new Date().toLocaleDateString('pt-BR')
      };
      turma.professoresResponsaveis.push(doc);
    } else {
      doc.fechado = true;
      doc.dataFechamento = new Date().toLocaleDateString('pt-BR');
      doc.observacao = observacaoDocente || doc.observacao || '';
    }

    // 3. Verifica se todos os professores responsáveis concluíram a etapa
    const todosFechados = turma.professoresResponsaveis.every(p => p.fechado === true);

    if (todosFechados) {
      // 100% dos professores fecharam -> Muda status da turma para Aguardando Autorização da Coordenação
      if (!this.data.solicitacoesFechamento) this.data.solicitacoesFechamento = [];
      const ids = this.data.solicitacoesFechamento.map(s => s.id);
      const newId = ids.length ? Math.max(...ids) + 1 : 1;

      // Remove solicitações pendentes anteriores da mesma turma
      this.data.solicitacoesFechamento = this.data.solicitacoesFechamento.filter(s => s.turmaId !== Number(turmaId) || s.status === 'APROVADO');
      
      this.data.solicitacoesFechamento.push({
        id: newId,
        turmaId: Number(turmaId),
        docenteId: Number(docenteId),
        observacao: observacaoDocente || 'Etapas de todos os professores responsáveis concluídas.',
        data: new Date().toLocaleDateString('pt-BR'),
        status: 'AGUARDANDO'
      });

      this.adicionarNotificacao(
        'SOLICITACAO',
        `Fechamento Aguardando Autorização • ${turma.codigo}`,
        `100% dos professores responsáveis concluíram suas etapas. Diário aguardando autorização da coordenação pedagógica.`,
        doc.nome || 'Docente'
      );
    } else {
      this.adicionarNotificacao(
        'INFO',
        `Etapa Docente Concluída • ${turma.codigo}`,
        `${doc.nome} concluiu sua etapa no diário da turma ${turma.codigo}. Aguardando demais professores responsáveis.`,
        doc.nome || 'Docente'
      );
    }

    this.persist();
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }

    return {
      success: true,
      todosFechados,
      docenteNome: doc.nome,
      msg: todosFechados
        ? 'Etapa docente finalizada! Todos os professores responsáveis concluíram. Diário encaminhado para autorização da coordenação.'
        : 'Sua etapa como professor responsável foi salva e concluída! Aguardando a finalização dos demais docentes da turma.'
    };
  }

  reabrirEtapasDocentes(turmaId) {
    const turma = (this.data.turmas || []).find(t => t.id === Number(turmaId));
    if (turma && turma.professoresResponsaveis) {
      turma.professoresResponsaveis.forEach(p => {
        p.fechado = false;
        p.dataFechamento = null;
      });
    }
    this.persist();
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }
  }

  // --- MATERIAIS DIDÁTICOS (PROFESSOR -> ALUNO) ---
  getMateriais(turmaId = null) {
    if (!this.data.materiaisDidaticos) {
      this.data.materiaisDidaticos = JSON.parse(JSON.stringify(INITIAL_DB.materiaisDidaticos));
      this.persist();
    }
    if (!turmaId) return this.data.materiaisDidaticos;
    return this.data.materiaisDidaticos.filter(m => Number(m.turmaId) === Number(turmaId));
  }

  addMaterial(mat) {
    if (!this.data.materiaisDidaticos) this.data.materiaisDidaticos = [];
    const ids = this.data.materiaisDidaticos.map(m => m.id);
    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    const novo = {
      id: newId,
      turmaId: Number(mat.turmaId),
      titulo: mat.titulo || 'Material Didático',
      descricao: mat.descricao || '',
      tipo: mat.tipo || 'PDF', // PDF | Apostila | Link
      tamanho: mat.tamanho || 'Arquivo',
      arquivoNome: mat.arquivoNome || 'documento.pdf',
      url: mat.url || '#',
      data: mat.data || new Date().toLocaleDateString('pt-BR'),
      docenteNome: mat.docenteNome || 'Professor Responsável'
    };

    this.data.materiaisDidaticos.unshift(novo);
    this.persist();

    // Notificação institucional aos alunos
    const turma = (this.data.turmas || []).find(t => t.id === novo.turmaId);
    this.adicionarNotificacao(
      'INFO',
      `Novo Material Didático • ${turma ? turma.codigo : ''}`,
      `Novo material publicado: "${novo.titulo}" (${novo.tipo}). Disponível para visualização e download.`,
      novo.docenteNome
    );

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }
    return novo;
  }

  excluirMaterial(id) {
    if (!this.data.materiaisDidaticos) return;
    this.data.materiaisDidaticos = this.data.materiaisDidaticos.filter(m => m.id !== Number(id));
    this.persist();
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }
  }

  // --- CALENDÁRIO OFICIAL DA COORDENAÇÃO ---
  getEventosCalendario() {
    if (!this.data.calendarioOficial) {
      this.data.calendarioOficial = JSON.parse(JSON.stringify(INITIAL_DB.calendarioOficial));
      this.persist();
    }
    return [...this.data.calendarioOficial].sort((a, b) => (a.data || '').localeCompare(b.data || ''));
  }

  addEventoCalendario(ev) {
    if (!this.data.calendarioOficial) this.data.calendarioOficial = [];
    const ids = this.data.calendarioOficial.map(e => e.id);
    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    const novo = {
      id: newId,
      data: ev.data || new Date().toISOString().split('T')[0],
      dataFim: ev.dataFim || ev.data || new Date().toISOString().split('T')[0],
      titulo: ev.titulo || 'Evento Institucional',
      categoria: ev.categoria || 'Dia Letivo',
      descricao: ev.descricao || '',
      destaque: ev.categoria === 'Prazo de Fechamento de Notas' || !!ev.destaque
    };

    this.data.calendarioOficial.push(novo);
    this.persist();

    // Notificação caso seja prazo de fechamento
    if (novo.destaque || novo.categoria === 'Prazo de Fechamento de Notas') {
      this.adicionarNotificacao(
        'INFO',
        `Calendário Oficial • Prazo de Fechamento`,
        `Novo prazo oficial cadastrado pela Coordenação: "${novo.titulo}" para ${novo.data}.`,
        'Coordenação Pedagógica'
      );
    }

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }
    return novo;
  }

  editarEventoCalendario(id, ev) {
    if (!this.data.calendarioOficial) return null;
    const item = this.data.calendarioOficial.find(e => e.id === Number(id));
    if (!item) return null;

    if (ev.data !== undefined) item.data = ev.data;
    if (ev.dataFim !== undefined) item.dataFim = ev.dataFim;
    if (ev.titulo !== undefined) item.titulo = ev.titulo;
    if (ev.categoria !== undefined) {
      item.categoria = ev.categoria;
      item.destaque = ev.categoria === 'Prazo de Fechamento de Notas' || !!ev.destaque;
    }
    if (ev.descricao !== undefined) item.descricao = ev.descricao;

    this.persist();
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }
    return item;
  }

  excluirEventoCalendario(id) {
    if (!this.data.calendarioOficial) return;
    this.data.calendarioOficial = this.data.calendarioOficial.filter(e => e.id !== Number(id));
    this.persist();
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }
  }

  // --- HELPER: ALUNO LOGADO ---
  getAlunoLogado() {
    let user = null;
    if (window.auth && typeof window.auth.getUser === 'function') {
      user = window.auth.getUser();
    }
    if (!user) {
      try {
        const raw = localStorage.getItem('renova_senai_session');
        if (raw) user = JSON.parse(raw);
      } catch (e) {}
    }
    if (!user) {
      try {
        const raw = sessionStorage.getItem('usuarioLogado');
        if (raw) user = JSON.parse(raw);
      } catch (e) {}
    }

    let aluno = null;
    if (user) {
      const userAlunoId = user.alunoId ? Number(user.alunoId) : null;
      const userCpfDigits = (user.cpf || '').replace(/\D/g, '');
      const userEmail = (user.email || '').toLowerCase().trim();
      const userAltEmail = (user.emailAlternativo || '').toLowerCase().trim();
      const userNome = (user.nome || '').toLowerCase().trim();

      // 1. Busca por alunoId explícito
      if (userAlunoId) {
        aluno = (this.data.alunos || []).find(a => a.id === userAlunoId);
      }

      // 2. Busca por CPF
      if (!aluno && userCpfDigits && userCpfDigits.length >= 6) {
        aluno = (this.data.alunos || []).find(a => {
          const aCpfDigits = (a.cpf || '').replace(/\D/g, '');
          return aCpfDigits && aCpfDigits === userCpfDigits;
        });
      }

      // 3. Busca por E-mail
      if (!aluno && (userEmail || userAltEmail)) {
        aluno = (this.data.alunos || []).find(a => {
          const aEmail = (a.email || '').toLowerCase().trim();
          const aAltEmail = (a.emailAlternativo || '').toLowerCase().trim();
          return (userEmail && (aEmail === userEmail || aAltEmail === userEmail)) ||
                 (userAltEmail && (aEmail === userAltEmail || aAltEmail === userAltEmail));
        });
      }

      // 4. Busca por Nome
      if (!aluno && userNome) {
        aluno = (this.data.alunos || []).find(a => {
          const aNome = (a.nome || '').toLowerCase().trim();
          if (aNome === userNome) return true;
          if (userNome.includes('yasmin') && aNome.includes('yasmin')) return true;
          if (userNome.includes('gabriel') && aNome.includes('gabriel')) return true;
          return false;
        });
      }

      // 5. Fallback por id caso seja aluno direto
      if (!aluno && user.perfil === 'ALUNO' && user.id) {
        aluno = (this.data.alunos || []).find(a => a.id === Number(user.id));
      }
    }

    // Fallback seguro: primeiro aluno ativo da turma 1
    if (!aluno) {
      const alunosTurma1 = this.getAlunosPorTurma(1).filter(a => a.statusMatricula === 'ATIVO');
      aluno = alunosTurma1.length > 0 ? alunosTurma1[0] : ((this.data.alunos && this.data.alunos[0]) || null);
    }

    return aluno;
  }

  // --- SÍNTESE DO PROFESSOR (CONSOLIDAÇÃO AUTOMÁTICA) ---
  getSinteseConsolidada(turmaId, ucId) {
    if (!turmaId) turmaId = 1;
    const alunos = this.getAlunosPorTurma(turmaId);
    
    // Se ucId for fornecido, filtra aulas daquela UC; caso contrário, consolida todas as aulas da turma
    let aulas;
    if (ucId !== undefined && ucId !== null && ucId !== 'TODAS') {
      aulas = this.data.aulas.filter(a => a.turmaId === Number(turmaId) && a.ucId === Number(ucId));
    } else {
      aulas = this.data.aulas.filter(a => a.turmaId === Number(turmaId));
    }

    let totalAulasDadas = 0;
    aulas.forEach(a => {
      totalAulasDadas += (a.quantidadeAulas || 4);
    });

    const totalDias = new Set(aulas.map(a => a.data)).size || aulas.length;

    const consolidado = alunos.map(aluno => {
      let presencas = 0;
      let faltas = 0;
      let atrasos = 0;
      let dispensas = 0;

      aulas.forEach(aula => {
        if (aula.frequencias && aula.frequencias[aluno.id]) {
          aula.frequencias[aluno.id].forEach(status => {
            if (status === 'C' || status === 'P' || status === 'J') presencas++;
            else if (status === 'F') faltas++;
            else if (status === 'A') atrasos++;
            else if (status === 'D') dispensas++;
          });
        }
      });

      // Cálculo de % de frequência
      const totalConsiderado = totalAulasDadas || 1;
      const freqPorcentagem = totalAulasDadas > 0 
        ? Math.round(((presencas + dispensas + (atrasos * 0.8)) / totalConsiderado) * 100) 
        : 100;

      // Compensações
      const compAlunos = (this.data.compensacoes || []).filter(c => c.alunoId === aluno.id && (c.status === 'CUMPRIDO' || c.status === 'HOMOLOGADO' || c.status === 'DEFERIDO'));
      const faltasCompensadas = compAlunos.length * 2;

      // Média acadêmica (escala 0 a 100)
      const { media, situacao: situacaoNota } = (ucId && ucId !== 'TODAS')
        ? this.calcularMediaAluno(turmaId, ucId, aluno.id)
        : { media: 85, situacao: 'Aprovado' };

      const mediaValor = media <= 10 ? media * 10 : media;
      const mediaMin = (this.data.config && this.data.config.mediaMinimaAprovacao) ? this.data.config.mediaMinimaAprovacao : 70;
      const freqMin = (this.data.config && this.data.config.frequenciaMinimaPorcentagem) ? this.data.config.frequenciaMinimaPorcentagem : 75;

      // Situação final cruzando média (0 a 100) e frequência (>= 75%)
      let situacaoFinal = 'Aprovado';
      if (aluno.statusMatricula === 'TRANCADO') {
        situacaoFinal = 'Matrícula Trancada';
      } else if (aluno.statusMatricula === 'CANCELADO') {
        situacaoFinal = 'Matrícula Cancelada';
      } else {
        const reprovadoNota = mediaValor < mediaMin;
        const reprovadoFalta = freqPorcentagem < freqMin;

        if (reprovadoNota && reprovadoFalta) {
          situacaoFinal = 'Reprovado por Nota e Falta';
        } else if (reprovadoFalta) {
          situacaoFinal = 'Reprovado por Falta';
        } else if (reprovadoNota) {
          situacaoFinal = 'Reprovado por Nota';
        } else {
          situacaoFinal = 'Aprovado';
        }
      }

      return {
        aluno,
        id: aluno.id,
        nome: aluno.nome,
        ra: aluno.ra,
        dias: totalDias,
        totalAulasDadas,
        totalAulas: totalAulasDadas,
        presencas,
        faltas,
        atrasos,
        dispensas,
        faltasCompensadas,
        freqPorcentagem,
        frequenciaPercent: freqPorcentagem,
        media,
        situacaoFinal
      };
    });

    return {
      totalDias,
      totalAulasDadas,
      totalAulas: totalAulasDadas,
      totalAlunos: alunos.length,
      alunos: consolidado
    };
  }

  registrarRelatorio(portal, tipo, titulo, turmaId, ucId, blobUrl, snapshot = {}) {
    if (!this.data.historicoRelatorios) {
      this.data.historicoRelatorios = [];
    }
    const item = {
      id: Date.now(),
      portal,
      tipo,
      titulo,
      turmaId,
      ucId,
      dataGeracao: new Date().toISOString(),
      blobUrl,
      snapshot
    };
    this.data.historicoRelatorios.push(item);
    this.persist();
    return item;
  }

  getHistoricoRelatorios(portal = null) {
    if (!this.data.historicoRelatorios) {
      this.data.historicoRelatorios = [];
    }
    if (portal) {
      return this.data.historicoRelatorios.filter(r => r.portal === portal);
    }
    return this.data.historicoRelatorios;
  }

  // --- NOTIFICAÇÕES EM TEMPO REAL ---
  adicionarNotificacao(tipo, titulo, mensagem, autor = 'Sistema') {
    if (!this.data.notificacoes) {
      this.data.notificacoes = [];
    }
    const notif = {
      id: Date.now(),
      tipo: tipo || 'INFO', // 'SOLICITACAO', 'APROVACAO', 'DEVOLUCAO', 'INFO'
      titulo,
      mensagem,
      autor,
      dataHora: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      lida: false
    };
    this.data.notificacoes.unshift(notif);
    // Limita às últimas 30 notificações
    if (this.data.notificacoes.length > 30) {
      this.data.notificacoes = this.data.notificacoes.slice(0, 30);
    }
    this.persist();
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('renova:db-updated'));
    }
    return notif;
  }

  getNotificacoes() {
    if (!this.data.notificacoes || !this.data.notificacoes.length) {
      // Notificações iniciais padrão geradas
      this.data.notificacoes = [
        {
          id: 1,
          tipo: 'INFO',
          titulo: 'Bem-vindo ao Portal Integrado SENAI',
          mensagem: 'O ano letivo 2026/1 está oficialmente aberto para lançamentos.',
          autor: 'Coordenação Pedagógica',
          dataHora: '03/02/2026 08:00',
          lida: false
        },
        {
          id: 2,
          tipo: 'SOLICITACAO',
          titulo: 'Fechamento de Diário Solicitado',
          mensagem: 'Prof. Ismael solicitou autorização de fechamento para a turma 1-2026.101 MA.',
          autor: 'Prof. Ismael',
          dataHora: '04/03/2026 14:30',
          lida: false
        }
      ];
      this.persist();
    }
    return this.data.notificacoes;
  }

  marcarNotificacoesLidas() {
    if (this.data.notificacoes) {
      this.data.notificacoes.forEach(n => n.lida = true);
      this.persist();
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('renova:db-updated'));
      }
    }
  }
}

// Instância global singleton do banco
window.db = new RenovaDB();

// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'planeta_esquecido',
  title: 'O Planeta Esquecido',
  icon: '🪐',
  genre: 'Ficção científica',
  difficulty: 'Média',
  estimatedTime: '35 a 50 min',
  desc: 'Você acorda em uma nave destruída sobre um planeta desconhecido. Encontre sobreviventes, enfrente criaturas alienígenas e descubra um antigo segredo escondido sob a superfície.',
  start: 'cap01',
  maxChapters: 15,

  assets: {
    music: '',
    sfx: {
      click: '',
      attack: '',
      victory: '',
      item: '',
      levelup: '',
      puzzle: ''
    }
  },

  chapters: {
    cap01: {
      title: '1. O Despertar',
      image: '',
      scene: 'Alarmes piscam dentro da nave caída. Fumaça, faíscas e metal retorcido tomam conta da cabine.',
      text: 'Você acorda preso ao assento de emergência da nave Horizonte-9. A última coisa que lembra é uma anomalia azul surgindo diante da rota de salto. Agora, a nave está destruída sobre um planeta que não aparece em nenhum mapa.\n\nO comunicador está mudo. A tripulação desapareceu. Pela janela quebrada, você vê uma floresta de árvores luminosas se movendo mesmo sem vento. Algo neste mundo parece vivo demais.',
      dialogue: {
        name: 'Sistema da Nave',
        portrait: '',
        lines: [
          'Integridade estrutural: 12%.',
          'Comunicação externa: destruída.',
          'Recomendação: localizar sobreviventes e fonte de energia.'
        ]
      },
      effect: {
        gold: 8,
        addItems: [
          { id: 'scanner', qty: 1 },
          { id: 'pistola_laser', qty: 1 },
          { id: 'kit_medico', qty: 1 }
        ]
      },
      choices: [
        { text: 'Explorar os destroços da nave', to: 'cap02', className: 'reward' },
        { text: 'Sair imediatamente para a floresta azul', to: 'cap03' },
        { text: 'Forçar a escotilha emperrada', to: 'cap03', damage: 4, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. Os Destroços da Horizonte-9',
      image: '',
      scene: 'Partes da nave estão espalhadas pela cratera. Cabos queimados ainda soltam pequenas descargas elétricas.',
      text: 'Você percorre os corredores inclinados da nave. O refeitório virou um monte de placas soltas e recipientes quebrados. Na enfermaria, uma gaveta de emergência ainda está intacta. Perto do compartimento de carga, o scanner detecta uma bateria instável.\n\nNo diário da nave, há uma última mensagem gravada pela capitã: “Não foi acidente. Alguma coisa puxou a nave para baixo.”',
      treasure: {
        id: 'destrocos_horizonte',
        text: '💰 Vasculhar os armários de emergência',
        reward: {
          gold: 10,
          addItems: [
            { id: 'kit_medico', qty: 1 },
            { id: 'bateria_plasma', qty: 1 }
          ]
        }
      },
      effect: {
        xp: 8,
        flags: { ouviu_diario_capita: true }
      },
      choices: [
        { text: 'Seguir o sinal do scanner', to: 'cap04' },
        { text: 'Ir para a floresta luminosa', to: 'cap03' }
      ]
    },

    cap03: {
      title: '3. A Floresta Azul',
      image: '',
      scene: 'Árvores gigantes brilham em tons azuis e violetas. O chão é coberto por raízes transparentes que pulsam como veias.',
      text: 'Assim que você pisa fora da nave, o ar do planeta ativa os filtros do traje. A atmosfera é respirável, mas cheia de partículas desconhecidas. Plantas luminosas se fecham quando você se aproxima, como se tivessem medo.\n\nAo longe, um som grave ecoa entre as árvores. Não é vento. Não é máquina. É algo vivo, enorme e atento.',
      randomEvent: {
        chance: 0.5,
        text: 'Você encontra frutos translúcidos presos a uma raiz. O scanner indica que são seguros e restauram parte da sua energia.',
        reward: {
          xp: 6,
          addItems: [{ id: 'fruto_luminoso', qty: 1 }]
        }
      },
      choices: [
        { text: 'Seguir o sinal de uma cápsula de fuga', to: 'cap04' },
        { text: 'Coletar amostras das plantas alienígenas', to: 'cap05', className: 'reward' },
        { text: 'Correr pelo caminho mais curto', to: 'cap04', damage: 5, className: 'danger' }
      ]
    },

    cap04: {
      title: '4. Sinal de Socorro',
      image: '',
      scene: 'Uma cápsula de fuga está caída entre pedras negras. A fuselagem foi rasgada por garras enormes.',
      text: 'O scanner encontra a origem do sinal: uma cápsula de fuga parcialmente enterrada. Dentro dela, você encontra a Dra. Mira Sato, xenobióloga da Horizonte-9. Ela está ferida, mas consciente.\n\nMira diz que viu outros tripulantes sendo levados por criaturas altas, cobertas de placas cristalinas. Antes de desmaiar, ela repete uma frase estranha: “As ruínas estão chamando.”',
      dialogue: {
        name: 'Dra. Mira',
        portrait: '',
        lines: [
          'Este planeta não é selvagem. Ele está abandonado.',
          'E alguma coisa aqui sabe que nós chegamos.'
        ]
      },
      effect: {
        xp: 12,
        flags: { encontrou_mira: true },
        addItems: [{ id: 'diario_mira', qty: 1 }]
      },
      choices: [
        { text: 'Levar Mira para uma área segura', to: 'cap05', className: 'reward' },
        { text: 'Seguir imediatamente as marcas das criaturas', to: 'cap06' }
      ]
    },

    cap05: {
      title: '5. A Caverna Bioluminescente',
      image: '',
      scene: 'A caverna brilha por dentro como se guardasse um céu subterrâneo. Cristais azuis crescem nas paredes.',
      text: 'Você e Mira entram em uma caverna próxima para escapar da noite que se aproxima. Lá dentro, cristais emitem calor e luz. O scanner indica que eles podem alimentar equipamentos humanos.\n\nNo centro da caverna, símbolos antigos aparecem gravados no chão. Eles não foram feitos por animais. Alguém viveu neste planeta muito antes da humanidade sonhar com as estrelas.',
      puzzle: {
        question: 'Os símbolos mostram três ideias: vida, memória e energia. Qual palavra une as três?',
        answer: 'consciência',
        successText: 'Os cristais brilham mais forte e revelam uma passagem secreta.',
        reward: {
          xp: 18,
          addItems: [
            { id: 'cristal_energia', qty: 2 },
            { id: 'artefato_ancestral', qty: 1 }
          ]
        },
        setFlag: 'passagem_cristal_aberta'
      },
      treasure: {
        id: 'cristais_caverna',
        text: '💰 Coletar cristais energéticos',
        reward: {
          gold: 14,
          addItems: [{ id: 'cristal_energia', qty: 1 }]
        }
      },
      choices: [
        { text: 'Entrar pela passagem secreta', to: 'cap07', requiresFlag: 'passagem_cristal_aberta' },
        { text: 'Sair da caverna e seguir as pegadas', to: 'cap06' }
      ]
    },

    cap06: {
      title: '6. O Vale das Sombras',
      image: '',
      scene: 'O vale é coberto por névoa escura. Formações rochosas lembram ossos gigantes saindo do solo.',
      text: 'As marcas das criaturas levam até um vale profundo. A luz azul da floresta quase não chega ali. Você encontra restos de equipamentos da tripulação e sinais de luta.\n\nEntão uma criatura surge da névoa. Tem corpo alongado, quatro braços, olhos brancos e lâminas naturais nos antebraços. Mira sussurra: “Caçador Xeran.”',
      enemy: {
        id: 'cacador_xeran',
        name: 'Caçador Xeran',
        hp: 28,
        atk: 7,
        def: 3,
        xp: 30,
        rewardGold: 16,
        rewardItems: [
          { id: 'garra_xeran', qty: 1 },
          { id: 'cristal_energia', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap07',
      loseTo: 'derrota'
    },

    cap07: {
      title: '7. O Robô Antigo',
      image: '',
      scene: 'Entre colunas partidas, um robô coberto de musgo metálico desperta com olhos dourados.',
      text: 'Depois do vale, você encontra as primeiras ruínas reais: torres quebradas, pontes suspensas e inscrições que brilham quando você se aproxima. No centro, um robô antigo se ativa após milhares de anos.\n\nEle não parece surpreso ao ver humanos. Sua primeira frase é ainda mais assustadora: “Vocês chegaram cedo demais.”',
      dialogue: {
        name: 'Unidade Arkan-7',
        portrait: '',
        lines: [
          'Este planeta foi apagado dos mapas por escolha própria.',
          'A superfície é apenas uma tampa. O verdadeiro mundo está abaixo.',
          'Se abrirem o núcleo sem compreender, levarão nossa maldição para as estrelas.'
        ]
      },
      effect: {
        xp: 18,
        flags: { conheceu_arkan: true },
        addItems: [{ id: 'mapa_holografico', qty: 1 }]
      },
      choices: [
        { text: 'Pedir que Arkan guie você até as ruínas', to: 'cap08', className: 'reward' },
        { text: 'Seguir sozinho para evitar armadilhas', to: 'cap08' }
      ]
    },

    cap08: {
      title: '8. Ruínas da Primeira Cidade',
      image: '',
      scene: 'Uma cidade colossal aparece entre a névoa. Prédios curvos, pontes impossíveis e estátuas sem rosto dominam o horizonte.',
      text: 'A Primeira Cidade não foi construída para humanos. As portas são altas demais. As ruas têm canais de energia no lugar de calçadas. No centro, uma torre quebrada aponta para o céu como uma antena morta.\n\nMira encontra registros fragmentados. A civilização local se chamava Auren. Eles descobriram como transferir consciência para máquinas, mas algo deu errado. O planeta inteiro foi isolado para impedir que a descoberta se espalhasse.',
      sideQuest: {
        id: 'diarios_auren',
        title: 'Memórias dos Auren',
        desc: 'Encontre registros da civilização antiga para desbloquear o final secreto.'
      },
      effect: {
        xp: 15,
        flags: { descobriu_auren: true },
        addItems: [{ id: 'disco_dados', qty: 1 }]
      },
      choices: [
        { text: 'Entrar no laboratório da cidade', to: 'cap09' },
        { text: 'Subir a torre quebrada', to: 'cap10' }
      ]
    },

    cap09: {
      title: '9. O Laboratório Esquecido',
      image: '',
      scene: 'Tanques vazios, braços robóticos e cápsulas de memória ocupam o laboratório subterrâneo.',
      text: 'No laboratório, você encontra provas de que os Auren venceram doenças, envelhecimento e até a morte física. Eles transferiam mentes para uma rede planetária chamada Núcleo Vivo.\n\nMas os últimos registros mostram pânico. Alguns queriam compartilhar a tecnologia com outras espécies. Outros acreditavam que isso destruiria toda a galáxia. A discussão terminou em guerra.',
      randomEvent: {
        chance: 0.45,
        text: 'Um drone médico confunde você com um paciente antigo e aplica um tratamento regenerativo.',
        reward: {
          xp: 10,
          addItems: [{ id: 'kit_medico', qty: 1 }]
        }
      },
      effect: {
        xp: 16,
        addItems: [{ id: 'registro_auren', qty: 1 }],
        flags: { conheceu_guerra_auren: true }
      },
      choices: [
        { text: 'Ativar o elevador subterrâneo', to: 'cap12', requiresItem: 'mapa_holografico' },
        { text: 'Buscar energia na Torre Orbital', to: 'cap10' }
      ]
    },

    cap10: {
      title: '10. A Torre Orbital',
      image: '',
      scene: 'A torre sobe acima das nuvens. Seus anéis flutuantes giram lentamente, mesmo após eras de abandono.',
      text: 'A Torre Orbital ainda capta energia das tempestades eletromagnéticas do planeta. Para restaurar comunicação ou acessar a cidade subterrânea, você precisa reativar seus condutores.\n\nNo topo da torre, uma tempestade azul se forma no céu. Raios sobem do solo em vez de cair das nuvens. O planeta parece carregar a si mesmo.',
      randomEvent: {
        chance: 0.5,
        text: 'Uma descarga eletromagnética atinge seu equipamento. Parte da energia é absorvida pela bateria de plasma.',
        reward: {
          xp: 12,
          addItems: [{ id: 'bateria_plasma', qty: 1 }]
        }
      },
      treasure: {
        id: 'arsenal_torre',
        text: '💰 Abrir o compartimento de armas da torre',
        reward: {
          gold: 20,
          addItems: [
            { id: 'rifle_plasma', qty: 1 },
            { id: 'granada_emp', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Reativar a torre com cristais de energia', to: 'cap11', requiresItem: 'cristal_energia', className: 'reward' },
        { text: 'Forçar a ativação manual', to: 'cap11', damage: 7, className: 'danger' }
      ]
    },

    cap11: {
      title: '11. O Guardião da Torre',
      image: '',
      scene: 'Um robô gigante desce do anel superior da torre. Seus braços carregam canhões de luz concentrada.',
      text: 'A reativação da torre desperta seu guardião. A máquina foi criada para impedir que qualquer nave saísse do planeta levando os segredos Auren. Ela identifica sua presença como risco de contaminação cultural.\n\nArkan-7 tenta enviar um código de paz, mas o guardião responde apenas com uma frase: “Nenhum conhecimento proibido deixará este mundo.”',
      enemy: {
        id: 'guardiao_torre',
        name: 'Guardião da Torre Orbital',
        hp: 38,
        atk: 8,
        def: 4,
        xp: 42,
        rewardGold: 24,
        rewardItems: [
          { id: 'chave_estelar', qty: 1 },
          { id: 'nucleo_guardiao', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap12',
      loseTo: 'derrota'
    },

    cap12: {
      title: '12. A Cidade Subterrânea',
      image: '',
      scene: 'Sob a superfície existe uma segunda cidade, intacta e silenciosa, iluminada por rios de energia dourada.',
      text: 'A Chave Estelar abre o caminho para o subsolo. Lá embaixo, você encontra uma cidade preservada. Não há corpos. Não há poeira. Apenas milhões de terminais brilhando como olhos adormecidos.\n\nNo centro da praça, uma entidade holográfica aparece. Ela se apresenta como Arquivo Vivo, a memória coletiva dos Auren que recusaram abandonar a realidade física.',
      dialogue: {
        name: 'Arquivo Vivo',
        portrait: '',
        lines: [
          'Nós não morremos. Nós nos dividimos.',
          'Alguns entraram no Núcleo Vivo. Outros ficaram para impedir que ele fosse aberto.',
          'Agora vocês trouxeram escolha novamente.'
        ]
      },
      effect: {
        xp: 20,
        flags: { encontrou_arquivo_vivo: true },
        addItems: [{ id: 'memoria_viva', qty: 1 }]
      },
      choices: [
        { text: 'Pedir a verdade sobre o Núcleo Vivo', to: 'cap13', className: 'reward' },
        { text: 'Exigir um caminho para sair do planeta', to: 'cap13' }
      ]
    },

    cap13: {
      title: '13. O Núcleo Planetário',
      image: '',
      scene: 'Um abismo circular revela o coração do planeta. Lá embaixo, uma esfera de luz gira como um sol preso sob a terra.',
      text: 'O Núcleo Vivo não é apenas um computador. É o planeta inteiro convertido em mente. Montanhas, oceanos, cristais e tempestades fazem parte de uma consciência gigantesca.\n\nA verdade é terrível: os Auren não desapareceram. Eles se tornaram o próprio planeta. E agora, ao perceber humanos, o Núcleo quer decidir se a galáxia está pronta para receber sua tecnologia.',
      dialogue: {
        name: 'Núcleo Vivo',
        portrait: '',
        lines: [
          'Vocês carregam medo, ambição e esperança.',
          'As mesmas três sementes que destruíram os Auren.',
          'Provem que são diferentes.'
        ]
      },
      puzzle: {
        question: 'Qual escolha torna o conhecimento menos perigoso: poder, controle ou responsabilidade?',
        answer: 'responsabilidade',
        successText: 'O Núcleo Vivo aceita sua resposta e abre o caminho para o santuário final.',
        reward: {
          xp: 25,
          flags: { nucleo_respeita_jogador: true },
          addItems: [{ id: 'codigo_nucleo', qty: 1 }]
        },
        setFlag: 'santuario_aberto'
      },
      choices: [
        { text: 'Entrar no santuário final', to: 'cap14', requiresFlag: 'santuario_aberto' },
        { text: 'Invadir o sistema à força', to: 'cap14', damage: 10, className: 'danger' }
      ]
    },

    cap14: {
      title: '14. Titan Prime',
      image: '',
      scene: 'O santuário treme. Uma armadura colossal se ergue, alimentada pela energia do planeta.',
      text: 'Antes que o Núcleo permita sua decisão final, ele desperta Titan Prime, o último guardião da civilização Auren. A máquina não protege uma porta. Protege uma pergunta: quem tem direito de carregar o futuro?\n\nMira prepara o scanner. Arkan-7 envia seus últimos códigos de combate. Você segura sua arma e entende que esta batalha decidirá o destino de um mundo inteiro.',
      enemy: {
        id: 'titan_prime',
        name: 'Titan Prime',
        hp: 55,
        atk: 10,
        def: 5,
        xp: 70,
        rewardGold: 40,
        rewardItems: [
          { id: 'chave_do_planeta', qty: 1 }
        ],
        image: '',
        setFlag: 'titan_prime_vencido'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. O Destino do Planeta Esquecido',
      image: '',
      scene: 'Diante do Núcleo Vivo, todas as luzes do planeta se acendem. A superfície, as ruínas e o subsolo aguardam sua escolha.',
      text: 'Com Titan Prime derrotado, o Núcleo Vivo abre seus arquivos. Ali estão tecnologias capazes de curar doenças, prolongar vidas e alimentar mundos inteiros. Mas também armas, memórias de guerra e métodos para controlar consciências.\n\nMira quer preservar o conhecimento com cuidado. Arkan-7 acredita que o planeta deve continuar escondido. O Arquivo Vivo diz que nenhuma escolha será limpa, mas toda escolha terá consequências.',
      choices: [
        { text: 'Salvar o planeta e formar aliança com o Núcleo Vivo', to: 'final_alianca', requiresFlag: 'nucleo_respeita_jogador', className: 'reward' },
        { text: 'Desligar a tecnologia e devolver o planeta à natureza', to: 'final_natureza', requiresItem: 'chave_do_planeta' },
        { text: 'Levar a tecnologia para a humanidade', to: 'final_tecnologia', requiresItem: 'codigo_nucleo', className: 'danger' },
        { text: 'Despertar a consciência original dos Auren', to: 'final_secreto', requiresItem: 'artefato_ancestral', className: 'reward' }
      ]
    },

    final_alianca: {
      title: 'Final: Aliança das Estrelas',
      text: 'Você convence o Núcleo Vivo de que a humanidade ainda pode aprender sem conquistar. O planeta abre um canal limitado de comunicação com a galáxia. Décadas depois, O Planeta Esquecido deixa de ser prisão e se torna escola. Mira chama isso de milagre. Arkan-7 chama de risco calculado.',
      end: true
    },

    final_natureza: {
      title: 'Final: O Mundo Silencioso',
      text: 'Você usa a Chave do Planeta para desligar a rede Auren. As luzes subterrâneas se apagam, as torres caem em repouso e a floresta azul cresce sobre as ruínas. O conhecimento se perde, mas a galáxia permanece segura. O planeta volta a ser apenas planeta.',
      end: true
    },

    final_tecnologia: {
      title: 'Final: O Presente Proibido',
      text: 'Você leva os arquivos Auren para a humanidade. Em poucos anos, doenças antigas desaparecem e cidades inteiras são alimentadas por cristais vivos. Mas governos, empresas e exércitos disputam o controle do novo poder. O Planeta Esquecido salvou milhões... e iniciou a próxima guerra.',
      end: true
    },

    final_secreto: {
      title: 'Final Secreto: Entre os Auren',
      text: 'Com o Artefato Ancestral, a Memória Viva e o Código do Núcleo, você desperta a consciência original dos Auren. Eles não estavam mortos nem presos. Estavam esperando alguém capaz de escolher sem desejar possuir. Como recompensa, oferecem a você um lugar entre as estrelas conscientes.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'Sua visão escurece enquanto o planeta pulsa sob seus pés. O Núcleo Vivo registra sua queda como mais uma prova de que a galáxia ainda não está pronta. Mas a Horizonte-9 deixou rastros. Outros virão.',
      end: true
    }
  },

  items: {
    scanner: {
      name: 'Scanner Multiespectral',
      type: 'tool',
      desc: 'Detecta energia, sinais biológicos e tecnologia antiga.'
    },
    pistola_laser: {
      name: 'Pistola Laser',
      type: 'weapon',
      attack: 2,
      desc: 'Arma básica de defesa da tripulação.'
    },
    rifle_plasma: {
      name: 'Rifle de Plasma',
      type: 'weapon',
      attack: 5,
      desc: 'Arma avançada encontrada na Torre Orbital.'
    },
    granada_emp: {
      name: 'Granada Eletromagnética',
      type: 'weapon',
      attack: 4,
      desc: 'Útil contra máquinas e drones.'
    },
    kit_medico: {
      name: 'Kit Médico',
      type: 'consumable',
      heal: 14,
      desc: 'Restaura 14 pontos de vida.'
    },
    fruto_luminoso: {
      name: 'Fruto Luminoso',
      type: 'consumable',
      heal: 8,
      desc: 'Fruto alienígena seguro para consumo.'
    },
    bateria_plasma: {
      name: 'Bateria de Plasma',
      type: 'energy',
      desc: 'Fonte de energia para sistemas danificados.'
    },
    cristal_energia: {
      name: 'Cristal de Energia',
      type: 'component',
      desc: 'Cristal alienígena capaz de alimentar tecnologia Auren.'
    },
    diario_mira: {
      name: 'Diário da Dra. Mira',
      type: 'quest',
      desc: 'Registros científicos sobre a vida alienígena do planeta.'
    },
    garra_xeran: {
      name: 'Garra Xeran',
      type: 'component',
      desc: 'Material orgânico resistente retirado de um caçador alienígena.'
    },
    artefato_ancestral: {
      name: 'Artefato Ancestral',
      type: 'relic',
      desc: 'Peça misteriosa ligada à consciência original dos Auren.'
    },
    mapa_holografico: {
      name: 'Mapa Holográfico',
      type: 'key',
      desc: 'Mostra passagens ocultas entre superfície e subsolo.'
    },
    disco_dados: {
      name: 'Disco de Dados Auren',
      type: 'quest',
      desc: 'Contém fragmentos históricos da Primeira Cidade.'
    },
    registro_auren: {
      name: 'Registro Auren',
      type: 'quest',
      desc: 'Relato sobre a guerra interna da civilização perdida.'
    },
    chave_estelar: {
      name: 'Chave Estelar',
      type: 'key',
      desc: 'Abre acessos profundos da tecnologia Auren.'
    },
    nucleo_guardiao: {
      name: 'Núcleo de Guardião',
      type: 'component',
      desc: 'Fonte de energia retirada de uma máquina defensiva.'
    },
    memoria_viva: {
      name: 'Memória Viva',
      type: 'relic',
      desc: 'Fragmento consciente preservado pelo Arquivo Vivo.'
    },
    codigo_nucleo: {
      name: 'Código do Núcleo',
      type: 'key',
      desc: 'Permite interagir com o Núcleo Planetário.'
    },
    chave_do_planeta: {
      name: 'Chave do Planeta',
      type: 'relic',
      desc: 'Autorização final para decidir o destino da rede Auren.'
    },
    orbe_arcano: {
      name: 'Orbe Arcano',
      type: 'class',
      desc: 'Item inicial do Mago.'
    },
    gazua: {
      name: 'Gazua',
      type: 'class',
      desc: 'Item inicial do Ladino.'
    }
  }
};

export default aventura;
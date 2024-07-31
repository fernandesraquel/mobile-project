// src/data/dataBase.js
const dataBase = [
  {
    userImage: 'https://randomuser.me/api/portraits/women/79.jpg',
    userName: 'Alma Carpenter',
    message: {
      sender: 'Alma Carpenter',
      text: 'Oi',
      seenByYou: true,
      seenByUser: true,
    },
    isTyping: true,
    time: 'Agora',
    notifications: [],
    userType: 'student',
    institution: 'UFRN',
    shifts: {
      manhã: {
        ida: ['05:40 AM', '11:40 AM'],
        volta: []
      },
      tarde: {
        ida: ['05:40 PM'],
        volta: ['12:30 PM']
      },
      noite: {
        ida: [],
        volta: ['07:30 PM', '10:00 PM']
      }
    },
    reservas: {
      ida: null,
      volta: null
    }
  },
  {
    userImage: 'https://randomuser.me/api/portraits/women/81.jpg',
    userName: 'Sophie Price',
    message: {
      sender: 'Você',
      text: 'Vai a aula hoje?',
      seenByYou: true,
      seenByUser: false,
    },
    time: '03:32 PM',
    notifications: [],
    userType: 'student',
    institution: 'UFRN',
    shifts: {
      manhã: {
        ida: ['05:40 AM', '11:40 AM'],
        volta: []
      },
      tarde: {
        ida: ['05:40 PM'],
        volta: ['12:30 PM']
      },
      noite: {
        ida: [],
        volta: ['07:30 PM', '10:00 PM']
      }
    },
    reservas: {
      ida: null,
      volta: null
    }
  },
  {
    userImage: 'https://randomuser.me/api/portraits/men/33.jpg',
    userName: 'Jessie Collins',
    message: {
      sender: 'Você',
      text: 'Tchau!',
      seenByYou: true,
      seenByUser: true,
    },
    time: '01:40 PM',
    notifications: [],
    userType: 'student',
    institution: 'UFRN',
    shifts: {
      manhã: {
        ida: ['05:40 AM', '11:40 AM'],
        volta: []
      },
      tarde: {
        ida: ['05:40 PM'],
        volta: ['12:30 PM']
      },
      noite: {
        ida: [],
        volta: ['07:30 PM', '10:00 PM']
      }
    },
    reservas: {
      ida: null,
      volta: null
    }
  },
  {
    userImage: 'https://randomuser.me/api/portraits/men/85.jpg',
    userName: 'Clinton Meyer',
    message: {
      sender: 'Clinton Meyer',
      text: 'Que horas o ônibus sai?',
      seenByYou: false,
      seenByUser: false,
    },
    time: '10:37 AM',
    notifications: [],
    userType: 'student',
    institution: 'UFRN',
    shifts: {
      manhã: {
        ida: ['05:40 AM', '11:40 AM'],
        volta: []
      },
      tarde: {
        ida: ['05:40 PM'],
        volta: ['12:30 PM']
      },
      noite: {
        ida: [],
        volta: ['07:30 PM', '10:00 PM']
      }
    },
    reservas: {
      ida: null,
      volta: null
    }
  },
  {
    userImage: 'https://randomuser.me/api/portraits/men/60.jpg',
    userName: 'Brayden Willis',
    message: {
      sender: 'Brayden Willis',
      text: 'Só vou até quarta.',
      seenByYou: true,
      seenByUser: true,
    },
    time: 'Ontem',
    notifications: [],
    userType: 'student',
    institution: 'UFRN',
    shifts: {
      manhã: {
        ida: ['05:40 AM', '11:40 AM'],
        volta: []
      },
      tarde: {
        ida: ['05:40 PM'],
        volta: ['12:30 PM']
      },
      noite: {
        ida: [],
        volta: ['07:30 PM', '10:00 PM']
      }
    },
    reservas: {
      ida: null,
      volta: null
    }
  },
  {
    userImage: 'https://randomuser.me/api/portraits/men/47.jpg',
    userName: 'Dennis Brown',
    message: {
      sender: 'Dennis Brown',
      text: 'Sure, talk to you later.',
      seenByYou: true,
      seenByUser: true,
    },
    time: '3 dias',
    notifications: [],
    userType: 'student',
    institution: 'UFRN',
    shifts: {
      manhã: {
        ida: ['05:40 AM', '11:40 AM'],
        volta: []
      },
      tarde: {
        ida: ['05:40 PM'],
        volta: ['12:30 PM']
      },
      noite: {
        ida: [],
        volta: ['07:30 PM', '10:00 PM']
      }
    },
    reservas: {
      ida: null,
      volta: null
    }
  },
  {
    userImage: 'https://randomuser.me/api/portraits/women/21.jpg',
    userName: 'Dolores Bell',
    message: {
      sender: 'Você',
      text: 'Obrigada!',
      seenByYou: true,
      seenByUser: true,
    },
    time: '4 dias',
    notifications: [],
    userType: 'student',
    institution: 'UFRN',
    shifts: {
      manhã: {
        ida: ['05:40 AM', '11:40 AM'],
        volta: []
      },
      tarde: {
        ida: ['05:40 PM'],
        volta: ['12:30 PM']
      },
      noite: {
        ida: [],
        volta: ['07:30 PM', '10:00 PM']
      }
    },
    reservas: {
      ida: null,
      volta: null
    }
  },
  {
    userImage: 'https://randomuser.me/api/portraits/men/79.jpg',
    userName: 'Tiago Souza',
    message: {
      sender: 'Você',
      text: 'Oi!',
      seenByYou: true,
      seenByUser: true,
    },
    time: '1 dia',
    notifications: [
      { id: 1, text: 'Ônibus atrasado em 10 minutos', timestamp: 'Agora' },
      { id: 2, text: 'Novo horário de saída: 7:30 AM', timestamp: 'Ontem' },
      { id: 3, text: 'Mudança de rota amanhã', timestamp: '2 dias' },
      { id: 4, text: 'Verifique seu itinerário', timestamp: '3 dias' },
    ],
    userType: 'student',
    institution: 'UFRN',
    shifts: {
      manhã: {
        ida: ['05:40 AM', '11:40 AM'],
        volta: []
      },
      tarde: {
        ida: ['05:40 PM'],
        volta: ['12:30 PM']
      },
      noite: {
        ida: [],
        volta: ['07:30 PM', '10:00 PM']
      }
    },
    reservas: {
      ida: null,
      volta: null
    }
  },
];

export default dataBase;

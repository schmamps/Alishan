import * as porter from '../src/porter/';
import * as jzn from './util/jzn';


// of 23K+ samples, test only the most heavily stemmed
const USE_SHORT = true

const SHORT: [string, string][] = [
	['impossibilities', 'imposs'  ], ['fortifications',  'fortif'  ],
	['bashfulness',     'bash'    ], ['communication',   'commun'  ],
	['covetousness',    'covet'   ], ['deliciousness',   'delici'  ],
	['excellencies',    'excel'   ], ['excommunication', 'excommun'],
	['fearfulness',     'fear'    ], ['forgetfulness',   'forget'  ],
	['fortification',   'fortif'  ], ['fruitfulness',    'fruit'   ],
	['impossibility',   'imposs'  ], ['justification',   'justif'  ],
	['mollification',   'mollif'  ], ['principalities',  'princip' ],
	['prognostication', 'prognost'], ['qualification',   'qualif'  ],
	['thankfulness',    'thank'   ], ['unthankfulness',  'unthank' ],
	['voluptuousness',  'voluptu' ], ['wilfulness',      'wil'     ],
	['witnessing',      'wit'     ], ['abatements',      'abat'    ],
	['abodements',      'abod'    ], ['abominations',    'abomin'  ],
	['acclamations',    'acclam'  ], ['accommodations',  'accommod'],
	['accoutrements',   'accoutr' ], ['accusations',     'accus'   ],
	['achievements',    'achiev'  ], ['adorations',      'ador'    ],
	['advancements',    'advanc'  ], ['affectations',    'affect'  ],
	['affirmatives',    'affirm'  ], ['allegations',     'alleg'   ],
	['applications',    'applic'  ], ['atonements',      'aton'    ],
	['businesses',      'busi'    ], ['cogitations',     'cogit'   ],
	['commendations',   'commend' ], ['confirmations',   'confirm' ],
	['congregations',   'congreg' ], ['conjurations',    'conjur'  ],
	['consecrations',   'consecr' ], ['considerations',  'consider'],
	['considerings',    'consid'  ], ['constellation',   'constel' ],
	['conversations',   'convers' ], ['copulatives',     'copul'   ],
]


const testStemTuple = (stemTuple: string[]) => {
	const [input, expected] = stemTuple

	test(`stem('${input}') === '${expected}'`, () => {
		expect(porter.stem(input)).toEqual(expected)
	})
}

const listStems = (): [string, string][] => {
	if (USE_SHORT) { return SHORT }

	const list =  jzn.
		locate('stems').
		map(jzn.load)

	return Object.
		assign({stems: []}, list).
		stems
}

listStems().forEach(testStemTuple)

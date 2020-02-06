import * as porter from '../src/porter/';
import * as jzn from './util/jzn';


const USE_SHORT = true
const SHORT = [
	['impossibilities', 'imposs'], ['fortifications', 'fortif'],
	['bashfulness', 'bash'], ['communication', 'commun'],
	['covetousness', 'covet'], ['deliciousness', 'delici'],
	['excellencies', 'excel'], ['excommunication', 'excommun'],
	['fearfulness', 'fear'], ['forgetfulness', 'forget'],
	['fortification', 'fortif'], ['fruitfulness', 'fruit'],
	['impossibility', 'imposs'], ['justification', 'justif'],
	['mollification', 'mollif'], ['principalities', 'princip'],
	['prognostication', 'prognost'], ['qualification', 'qualif'],
	['thankfulness', 'thank'], ['unthankfulness', 'unthank'],
	['voluptuousness', 'voluptu'], ['wilfulness', 'wil'],
	['witnessing', 'wit'], ['abatements', 'abat'],
	['abodements', 'abod'], ['abominations', 'abomin'],
	['acclamations', 'acclam'], ['accommodations', 'accommod'],
	['accoutrements', 'accoutr'], ['accusations', 'accus'],
	['achievements', 'achiev'], ['adorations', 'ador'],
	['advancements', 'advanc'], ['affectations', 'affect'],
	['affirmatives', 'affirm'], ['allegations', 'alleg'],
	['applications', 'applic'], ['atonements', 'aton'],
	['businesses', 'busi'], ['cogitations', 'cogit'],
	['commendations', 'commend'], ['confirmations', 'confirm'],
	['congregations', 'congreg'], ['conjurations', 'conjur'],
	['consecrations', 'consecr'], ['considerations', 'consider'],
	['considerings', 'consid'], ['constellation', 'constel'],
	['conversations', 'convers'], ['copulatives', 'copul']
]


const testStemTuple = (stemTuple: [string, string]) => {
	const [input, expected] = stemTuple

	test(`stem('${input}') === '${expected}'`, () => {
		expect(porter.stem(input)).toEqual(expected)
	})
}

const listStems = (): [string, string][] => {
	const path = jzn.locate('stems').shift()

	// @ts-ignore
	return (USE_SHORT) ? SHORT : jzn.load(path).stems
}

listStems().forEach(testStemTuple)

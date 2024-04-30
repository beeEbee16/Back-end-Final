const StateFunFacts = require('../model/States');

const statesData = {
    states: require('../model/statesData.json')
}

const randomFunFact = async (req, res) => {

    const facts = await StateFunFacts.find({ stateCode: req.params.code.toUpperCase() }, 'funfacts').exec();

    const factsArray = facts.map(fact => fact.funfacts).flat();

    const len = factsArray.length;

    return res.json({'funfact': factsArray[Math.floor(Math.random() * len)]});
};

/* const getStateFunFacts = async (req, res ) => {
    const found = statesData.states.find((state) => {
        return state.code === req.params.code.toUpperCase();
   });

    const facts = await StateFunFacts.find({ stateCode: req.params.code.toUpperCase() }, 'funfacts').exec();
    const factsArray = facts.map(fact => fact.funfacts);

    found['funfacts'] = factsArray;
    res.json(found);
}; */

const getStateFunFactsItem = async (req, res ) => {

    const facts = await StateFunFacts.find({ stateCode: req.params.code.toUpperCase() }, 'funfacts').exec();
    const factsArray = facts.map(fact => fact.funfacts);
    const factsObj = {}; 
    factsObj['funFacts'] = factsArray[0];

    return factsObj;
};

module.exports = { randomFunFact, getStateFunFactsItem };
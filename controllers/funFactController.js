const States = require('../model/States');
const StateFunFacts = require('../model/States');

const statesData = {
    states: require('../model/statesData.json')
}

const validStateCode = (stateCode) => {
    const found = statesData.states.find((state) => {
        return state.code === stateCode.toUpperCase();
   });

   return found !== undefined
};

const getStateNameFromCode = (stateCode) => {
    let stateName;

    const found = statesData.states.find((state) => {

        if(state.code === stateCode.toUpperCase()) {
            stateName = state.state;
            return
        };
   });

   return stateName;
};

const randomFunFact = async (req, res) => {
    if (!validStateCode(req.params.code)) {
        return res.json({ 'message': 'Invalid state abbreviation parameter'});
    }

    const facts = await StateFunFacts.find({ stateCode: req.params.code.toUpperCase() }, 'funfacts').exec();
    if (facts.length === 0) {
        return res.json({ 'message': `No Fun Facts found for ${getStateNameFromCode(req.params.code)}`});
    }

    const factsArray = facts.map(fact => fact.funfacts).flat();

    const len = factsArray.length;

    return res.json({'funfact': factsArray[Math.floor(Math.random() * len)]});
};

const getStateFunFactsItem = async (code) => {

    const facts = await StateFunFacts.find({ stateCode: code}, 'funfacts').exec();
    const factsArray = facts.map(fact => fact.funfacts);
    const factsObj = {}; 
    factsObj['funfacts'] = factsArray[0];

    return factsObj;
};

const postStateFunFact = async (req, res) => {
    if (!req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'Funfact is required'});
    }

    try {
        const result = await States.updateOne({
            stateCode: req.params.code.toUpperCase()},
            {$push: {funfacts: req.body.funfacts}},
            {upsert: true}
        );
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};

const patchStateFunFact = async (req, res) => {
    if (!req?.body?.funfacts || !req?.body?.index) {
        return res.status(400).json({ 'message': 'Funfact and index are required'});
    }

    try {
        const index = parseInt(req.body.index) - 1;

        const result = await States.updateOne({
            stateCode: req.params.code.toUpperCase()},
            {$set: {[`funfacts.${index}`]: req.body.funfacts}}
        );

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};

const deleteStateFunFact = async (req, res) => {
    if (!req?.body?.index) {
        return res.status(400).json({ 'message': 'Index is required'});
    }

    try {
        const index = parseInt(req.body.index) - 1;

        const result = await States.updateOne(
            {stateCode: req.params.code.toUpperCase()},
            {$set: {[`funfacts.${index}`]: null}}
        );

        if (result.modifiedCount) {
            await States.updateOne(
                {stateCode: req.params.code.toUpperCase()},
                {$pull: {funfacts: null}}      
            )
        };

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { randomFunFact, getStateFunFactsItem, postStateFunFact, patchStateFunFact, deleteStateFunFact };
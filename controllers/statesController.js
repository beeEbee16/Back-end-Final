const StateFunFacts = require('../model/States');
const { getStateFunFactsItem } = require('./funFactController');
const funFactController = require('../controllers/funFactController');

const statesData = {
    states: require('../model/statesData.json')
}

const getState = async (req, res) => {
   const found = statesData.states.find((state) => {
        return state.code === req.params.code.toUpperCase();
   });

    if (found !== undefined) {
        const funFacts = await funFactController.getStateFunFactsItem(req, res);
        const mergedData = {...found, ...funFacts};
        res.json(mergedData);
    } else {
        return res.json({ 'message': 'Invalid state abbreviation parameter' });
    }
}

const getStates = (req, res) => {
    //const states = {};

    if (req.query.contig === 'true') {
        const states = statesData.states.filter((state) => {
            return state.code !== 'AK' && state.code !== 'HI'
       });
        res.json(states);
    } else if (req.query.contig === 'false') {
        const states = statesData.states.filter((state) => {
            return state.code === 'AK' || state.code === 'HI'
       });
        res.json(states);
    } else {
        res.json(statesData.states);
        //return
    }

    /* states.forEach((state) => {

    }) */
}

const stateCapital = (req, res) => {
    const found = statesData.states.find((state) => {
        return state.code === req.params.code.toUpperCase();
   });

    if (found !== undefined) {
        res.json({ 'state': `${found.state}`, 'capital': `${found.capital_city}` });
    } else {
        return res.json({ 'message': 'Invalid state abbreviation parameter' })
    }
}

const stateNickname = (req, res) => {
    const found = statesData.states.find((state) => {
        return state.code === req.params.code.toUpperCase();
   });

    if (found !== undefined) {
        res.json({ 'state': `${found.state}`, 'nickname': `${found.nickname}` });
    } else {
        return res.json({ 'message': 'Invalid state abbreviation parameter' })
    }
}

const statePop = (req, res) => {
    const found = statesData.states.find((state) => {
        return state.code === req.params.code.toUpperCase();
   });

    if (found !== undefined) {
        res.json({ 'state': `${found.state}`, 'population': `${found.population.toLocaleString({minimumFractionDigits: 0})}` });
    } else {
        return res.json({ 'message': 'Invalid state abbreviation parameter' })
    }
}

const stateAdmission = (req, res) => {
    const found = statesData.states.find((state) => {
        return state.code === req.params.code.toUpperCase();
   });

    if (found !== undefined) {
        res.json({ 'state': `${found.state}`, 'admitted': `${found.admission_date}` });
    } else {
        return res.json({ 'message': 'Invalid state abbreviation parameter' })
    }
}

module.exports = { 
    getState, 
    statesData, 
    getStates,
    stateCapital,
    stateNickname,
    statePop,
    stateAdmission 
};
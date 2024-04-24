const fs = require('fs').promises;
const path = require('path');

const readStateFile = async () => {
    let data;
    try {
        data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'), 'utf8')
    } catch (err) {
        console.error(err);
    }
    return data;
}

const verifyStates = async (stateCode) => {
    let stateCodeArray = [];
    const statesInfo = JSON.parse(await readStateFile());

    stateCodeArray = statesInfo.map((state) => {
        return state.code;
    });

    return stateCodeArray.find((code) => code === stateCode) === stateCode;
}

module.exports = readStateFile;
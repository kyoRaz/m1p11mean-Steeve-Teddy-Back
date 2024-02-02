const extractColumnFromJson = (jsonData,column)=>{
    const newArray = [];
    for (const item of jsonData) {
        const tokenValue = item[column];
        newArray.push(tokenValue);
    }
    return newArray;
}

module.exports = { extractColumnFromJson }
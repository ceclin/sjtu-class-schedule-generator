const discover = require('./input-discovery');

(async () => {
    const inputFile = await discover(__dirname);
    console.log(inputFile);
    const handler = require(`./${inputFile.type}-handler`);
    const arr = await handler.handle(inputFile.path);
    const extract = require('./ics-extractor');
    await extract(arr);
})().catch(console.error);

const colors = require('colors/safe');

const cleanup = (src) => {
    src.removeListener('finish', onFinish);
    src.removeListener('error', onError);
};

const onStart = (filename) => {
    const startTime = Date.now();
    console.log(colors.grey(`${filename} compiling`));
    return startTime;
}

const onFinish = (filename, outputPath, startTime) => {
    const endTime = Date.now();
    console.log(colors.green(`${colors.grey(filename)} finished: ${outputPath} in ${colors.blue(endTime - startTime + 'ms')}`));
}

const onError = (err, src) =>{
    cleanup(src);
    console.log(colors.red(`ERROR: \n ${err}`));
};

module.exports = {
    onStart: onStart,
    onFinish: onFinish,
    onError: onError,
}

async function runMigrationProject(options) {

    console.log('=================================');
    console.log('   MIGRATION PROJECT EXECUTION   ');
    console.log('=================================');

    console.log(`Environment : ${options.env}`);
    console.log(`Suite       : ${options.suite}`);

    console.log('Migration project runner started...');
}

module.exports = {
    runMigrationProject
};

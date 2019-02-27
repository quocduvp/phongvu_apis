const cluster = require('cluster')
const os = require( "os" );

if ( cluster.isMaster ) {

    console.log("Master process đang bắt đầu chạy.", process.pid );
    for ( var i = 0, coreCount = os.cpus().length ; i < coreCount ; i++ ) {

        var worker = cluster.fork();

    }
    cluster.on(
        "exit",
        function handleExit( worker, code, signal ) {

            console.log( "Worker kết thúc.", worker.process.pid );
            console.log("Tử ẹo:", worker.exitedAfterDisconnect );

            if ( ! worker.exitedAfterDisconnect ) {
                var worker = cluster.fork();
            }

        }
    );

} else {

    require('./dist')

    console.log("Worker bắt đầu.", process.pid );

}
// module.exports = application
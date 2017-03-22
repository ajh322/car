re('gith').create( 9001 );
// Import execFile, to run our bash script
var execFile = require('child_process').execFile;

gith({
    repo: 'fideloper/example'
}).on( 'all', function( payload ) {
    if( payload.branch === 'master' )
    {
var execOptions = {
     maxBuffer: 1024 * 1024 // 1mb
}
            // Exec a shell script
            execFile('/path/to/hook.sh', function(error, stdout, stderr) {
                    // Log success in some manner
                    console.log( 'exec complete' );
            });
    }
});

const Trie = require("./Trie");

var t = new Trie();

var fs = require('fs');

try{
    var data = fs.readFileSync('words.txt', 'utf8');

    var count = 0;
    data.toString().split("\n").forEach( word => {
        if(word.length >= 3){
            t.store(word, "This is a word!");
            count ++;
        }
    } );

} catch(e) {
    console.log('Error:', e.stack);
}

console.log(`${count} words stored in the trie!\n`);

var r = require("readline");

var user = r.createInterface( {
    input: process.stdin,
    output: process.stdout
} );

function prompt(){
    user.question( "Enter a command (!help for help): ", (word) => {
        var args = word.split(" ");
        var exit = false;
        if(args[0] == "!help"){
            console.log("COMMANDS:\n\t!help\t\t\t : Command list\n\t!exit\t\t\t : Quit\n\t!store word => value\t : Store 'word' as 'value'; append '@i' or '@f' to value to store as int or float\n\t!find word\t\t : Get the stored value of 'word' in the trie\n\t!pref prefix\t\t : Get all words stored in the trie beginning with 'prefix'\n\n");
        }else if(args[0] == "!exit"){
            exit = true;
            user.close();
        }else if(args[0] == "!find"){
            args.shift();
            args = args.join(" ");
            
            var wordDepth = t.depth(args);
            if(wordDepth.depth == args.length){
                if(wordDepth.node.value == null){
                    console.log(`Word ${args} is in the trie but not associated with any value.\n`);
                }else{
                    console.log(wordDepth.node.value, '\n');
                }
            }else{
                console.log(`Word ${args} does not exist in the trie.\n`);
            }
        }else if(args[0] == "!store"){
            args.shift();
            if( !args.includes("=>") ){
                console.log("!store command requires '=>' between key and value. Example: '!store hello => world'\n");
            }else{
                var args = [ args.slice( 0, args.indexOf("=>") ), args.slice(args.indexOf("=>") + 1) ];
                var value;
                args = args.map( arg => { return arg.join(" "); } );
                
                if( args[1].includes("@") ){
                    args[1] = args[1].split("@");
                    if(args[1][1].length == 1){
                        if(args[1][1] == "i"){
                            value = parseInt( args[1][0] );
                        }else if(args[1][1] == "f"){
                            value = parseFloat( args[1][0] );
                        }

                        if( isNaN(value) ){
                            value = args[1].join("@");
                        }
                    }else{
                        value = args[1].join("@");
                    }
                }else{
                    value = args[1];
                }

                t.store(args[0], value);
                console.log(`'${args[0]}' stored in trie as '${value}'\n`);
            }

        }else if(args[0] == "!pref"){
            args.shift();
            args = args.join(" ");
            console.log(args);

            var words = t.vocab(args);
            if(words.length == 0) console.log(`Prefix ${args} does not exist in the trie.\n`);

            var count = 1;
            words.forEach( word => {
                console.log(`\t${count}` + "\t\t" + word);
                count ++;
            } );
        }

        if(!exit) prompt();
    } );
}

prompt()
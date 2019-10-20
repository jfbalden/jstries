const TrieNode = require("./TrieNode");

class Trie{
    constructor(){
        this._root = new TrieNode("");
    }
    get root(){
        return this._root;
    }

    depth(word){
        /**
         * Returns an object containing the depth (in characters) and the last node of a word in the trie.
         * @param word Any string.
         */
        if(typeof word != "string") throw "word argument of depth method must be of type 'string'";

        var current = this.root;
        var count = 0;
        for(var c in word){
            var charNode = current.getChild( word[c] );

            if(charNode != -1){
                current = charNode;
                count ++;
            }else{
                return {depth:count, node:current};
            }
        }
        return {depth:word.length, node:current};
    }

    store(word, value){
        var startingPoint = this.depth(word);
        if(startingPoint.depth == word.length){
            startingPoint.node.value = value;
        }else{
            var current = startingPoint.node;
            for(var i = startingPoint.depth; i < word.length; i++){
                current.addChild( word[i], i == word.length-1 ? value : null );
                current = current.getChild( word[i] );
            }
        }
    }

    find(word){
        var wordObj = this.depth(word);
        if (wordObj.depth == word.length){
            return wordObj.node.value;
        }else{
            return null; // depth less than word length, so word not found.
        }
    }

    pathfind( node, path=[] ){
        var paths = []

        path.push(node.name);

        if( node.hasChildren() ){
            if(node.value != null) paths.push(path);

            node.children.forEach(child => {
                paths.push( ...this.pathfind( child, [...path] ) );
            });
        }else{
            paths.push(path);
        }

        return paths;
    }

    vocab(stub){
        var depthTest = this.depth(stub);
        if(depthTest.depth < stub.length) return []; // Not even the whole stub is in the trie, so no words prefixed by it are either. Return empty array.

        return this.pathfind(depthTest.node).map( path => { return stub.slice(0, stub.length-1) + path.join(""); } );
    }
}

module.exports = Trie;


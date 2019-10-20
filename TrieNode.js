class TrieNode{
    constructor(name, v=null){
        this._name = name;
        this._value = v;
        this._children = [];
    }

    get children(){
        return Object.freeze( this._children.slice() );
    }
    get name(){
        return this._name;
    }
    get value(){
        return this._value;
    }
    set value(v){
        this._value = v;
    }

    addChild(child, value=null){
        if(typeof child == "string"){
            child = child.toLowerCase();
            if( !this.hasChild(child) ){
                this._children.push( new TrieNode(child, value) );
            }
        }else{
            throw "child argument of addChild method must be of type 'string'";
        }
    }

    getChild(child){
        child = child.toLowerCase();
        if( !this.hasChild(child) ) return -1;
        return this._children.find( obj => { if(obj.name == child) return obj; } );
    }

    hasChildren(){
        return this._children.length > 0 ? true : false;
    }

    hasChild(child){
        if( !this.hasChildren() ) return false;
        if(typeof child == "string"){
            child = child.toLowerCase();
            return this._children.map( obj => { return obj.name; } ).includes(child);
        }else{
            throw "child argument of hasChild method must be of type 'string'";
        }
    }
}

module.exports = TrieNode;
const sha256=require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash=""){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }
    calculateHash(){
        return sha256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain=[this.createGenesisblock()];
    }
    createGenesisblock(){
        return new Block(0,new Date(),"genesis block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock=this.chain[i-1];
            if(currentBlock.hash!==currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash!==previousBlock.hash){
                return false;
            }
              

        }
        return true;
    }
}

let saiCoin=new BlockChain();
saiCoin.addBlock(new Block(1, new Date(),{'amount':3}));
saiCoin.addBlock(new Block(2, new Date(),{'amount':10}));

saiCoin.chain[1].data={'amount':100};

console.log(JSON.stringify(saiCoin,null,4))

console.log("chain valid--",saiCoin.isChainValid());
const ethers = require('ethers');
const fs = require('fs-extra');

async function main()
{
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545")
    const wallet = new ethers.Wallet("0x9fdf2b0f33589ed28e5ac897277797931b8c565d0edf38f802d003dd79776c84" , provider);

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi" , "utf-8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin" , "utf-8");

    // const contractFactory = new ethers.ContractFactory(abi , binary , wallet);
    // console.log("deploying please wait .....");
    // const contract = await contractFactory.deploy();
    // // console.log("THis is contract\n" , contractFactory);
    // const contractReceipt = await contract.deploymentTransaction().wait(1);
    // console.log("THis is contract Receipt\n" , contractReceipt);
    const nonce = await provider.getTransactionCount();
    const tx = {
        nonce : nonce,
        gasPrice : 20000000000,
        gasLimit : 1000000,
        to: null,
        value: 0,
        data: "0x60806040526040518060400160405280600281526020016040518060400160405280600681526020017f566962686f720000000000000000000000000000000000000000000000000000815250815250600160008201518160000155602082015181600101908051906020019061007792919061008c565b50505034801561008657600080fd5b50610190565b8280546100989061012f565b90600052602060002090601f0160209004810192826100ba5760008555610101565b82601f106100d357805160ff1916838001178555610101565b82800160010185558215610101579182015b828111156101005782518255916020019190600101906100e5565b5b50905061010e9190610112565b5090565b5b8082111561012b576000816000905550600101610113565b5090565b6000600282049050600182168061014757607f821691505b6020821081141561015b5761015a610161565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61087a8061019f6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80636f760f411161005b5780636f760f41146100da57806377ec2b55146100f65780639e7a13ad14610115578063b2ac62ef146101465761007d565b80632e64cec11461008257806343ede4ae146100a05780636057361d146100be575b600080fd5b61008a610176565b6040516100979190610633565b60405180910390f35b6100a861017f565b6040516100b59190610633565b60405180910390f35b6100d860048036038101906100d39190610576565b610185565b005b6100f460048036038101906100ef919061051a565b61018f565b005b6100fe610225565b60405161010c92919061064e565b60405180910390f35b61012f600480360381019061012a9190610576565b6102bf565b60405161013d92919061064e565b60405180910390f35b610160600480360381019061015b91906104d1565b61037b565b60405161016d9190610633565b60405180910390f35b60008054905090565b60005481565b8060008190555050565b6000604051806040016040528083815260200184815250905060038190806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101fa9291906103a9565b5050508160048460405161020e919061061c565b908152602001604051809103902081905550505050565b600180600001549080600101805461023c90610747565b80601f016020809104026020016040519081016040528092919081815260200182805461026890610747565b80156102b55780601f1061028a576101008083540402835291602001916102b5565b820191906000526020600020905b81548152906001019060200180831161029857829003601f168201915b5050505050905082565b600381815481106102cf57600080fd5b90600052602060002090600202016000915090508060000154908060010180546102f890610747565b80601f016020809104026020016040519081016040528092919081815260200182805461032490610747565b80156103715780601f1061034657610100808354040283529160200191610371565b820191906000526020600020905b81548152906001019060200180831161035457829003601f168201915b5050505050905082565b6004818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b8280546103b590610747565b90600052602060002090601f0160209004810192826103d7576000855561041e565b82601f106103f057805160ff191683800117855561041e565b8280016001018555821561041e579182015b8281111561041d578251825591602001919060010190610402565b5b50905061042b919061042f565b5090565b5b80821115610448576000816000905550600101610430565b5090565b600061045f61045a846106a3565b61067e565b90508281526020810184848401111561047b5761047a61080d565b5b610486848285610705565b509392505050565b600082601f8301126104a3576104a2610808565b5b81356104b384826020860161044c565b91505092915050565b6000813590506104cb8161082d565b92915050565b6000602082840312156104e7576104e6610817565b5b600082013567ffffffffffffffff81111561050557610504610812565b5b6105118482850161048e565b91505092915050565b6000806040838503121561053157610530610817565b5b600083013567ffffffffffffffff81111561054f5761054e610812565b5b61055b8582860161048e565b925050602061056c858286016104bc565b9150509250929050565b60006020828403121561058c5761058b610817565b5b600061059a848285016104bc565b91505092915050565b60006105ae826106d4565b6105b881856106df565b93506105c8818560208601610714565b6105d18161081c565b840191505092915050565b60006105e7826106d4565b6105f181856106f0565b9350610601818560208601610714565b80840191505092915050565b610616816106fb565b82525050565b600061062882846105dc565b915081905092915050565b6000602082019050610648600083018461060d565b92915050565b6000604082019050610663600083018561060d565b818103602083015261067581846105a3565b90509392505050565b6000610688610699565b90506106948282610779565b919050565b6000604051905090565b600067ffffffffffffffff8211156106be576106bd6107d9565b5b6106c78261081c565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b83811015610732578082015181840152602081019050610717565b83811115610741576000848401525b50505050565b6000600282049050600182168061075f57607f821691505b60208210811415610773576107726107aa565b5b50919050565b6107828261081c565b810181811067ffffffffffffffff821117156107a1576107a06107d9565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610836816106fb565b811461084157600080fd5b5056fea26469706673582212203f89f92f64bbca433cec702db66d183c4e0dd29933e481692b0b31011b08a1f764736f6c63430008070033",
        chainId : 5777,
    }

    const sentTxResponse = await wallet.sendTransaction(tx);
    console.log(sentTxResponse);

}

main();
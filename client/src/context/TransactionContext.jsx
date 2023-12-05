import React, { useEffect,useState } from 'react';
import {ethers} from 'ethers';
import {contractABI,contractAddress} from'../utils/constants';

export const TransactionContext=React.createContext();

const {ethereum}=window;

const getEthereumContract=()=>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress,contractABI,signer);


    console.log({
        provider,
        signer,
        transactionContract
    })  
}

export const TransactionProvider=({children})=>{


const [CurrentAccount,setCurrentAccount]=useState("");

const [formData, setformData] = useState({addressTo:'',amount:'',keyword:'',message:''});


const [isLoading, setisLoading] = useState(false)
const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'));

const handleChange=(e,name)=>{
 setformData((prevstate)=>({ ...prevstate,[name]:e.target.value}))
}

const getAllTransactions=async ()=>{
    try {

        if(!ethereum) return alert("Please install MetaMask");
        const transactionContract= getEthereumContract();
       
        const availableTransaction =await transactionContract.getAllTransactions();
       
        console.log(availableTransaction);
    } catch (error) {
     console.log(error);   
    }
}
const checkIfWalletIsConnected=async()=>{
    try {
        if(!ethereum) return alert("Please install metamask");

        const accounts=await ethereum.request({method:'eth_accounts'});
    
        if(accounts.length){
            setCurrentAccount(accounts[0]);

            getAllTransactions();
        }else{
            console.log("No accounts found");
        }
    } catch (error) {
        console.log(error);
throw new Error("No ethereum object.")
    }

   
}

useEffect(()=>{
    checkIfWalletIsConnected();
},[]);





const checkIfTransactionsExist=async ()=>{


try {
    const transactionContract= getEthereumContract();
    const transactionCount =await transactionContract.getTransactionCount();
    // console.log("transactioncount ="+ transactionCount);
    
    window.localStorage.setItem("transactionCount",transactionCount);

} catch (error) {
    console.log(error);
}

}



const connectWallet= async ()=>{
    try{
        if(!ethereum) return alert("Please install metamsk");
    const accounts=await ethereum.request({method:'eth_requestAccounts'});

    setCurrentAccount(accounts[0]);
    }catch(error){
console.log(error);
throw new Error("No ethereum object.")
    }
}
const sendTransaction =async()=>{
    try{
        if(!ethereum) return alert("Please install metamsk");
    //get the data from the form
    const{addressTo,amount,keyword,message}=formData;
   const transactionContract= getEthereumContract();
const parseAmount=ethers.utils.parseEther(amount);

await ethereum.request({method:'eth_sendTransaction',
params:[{
    from:CurrentAccount,
    to:addressTo,
    gas:'0x5208',//2100 GWEI
    value:parseAmount._hex,
}
]

})
  



const transactionHash=await transactionContract.addToBlockchain(addressTo,parseAmount,message,keyword);
setisLoading(true);

console.log(`loading -${transactionHash.hash}`);
await transactionHash.wait();

setisLoading(false);
console.log(`success -${transactionHash.hash}`);

const transactionCount =await transactionContract.getTransactionCount();

settransactionCount(transactionCount.toNumber());

    }catch(error){
console.log(error);

throw new Error("No ethereum object.")
    }
}

useEffect(()=>{
    checkIfWalletIsConnected();
    checkIfTransactionsExist(); 
},[])
    return(
        <TransactionContext.Provider value={{connectWallet:connectWallet,CurrentAccount,formData,setformData,handleChange,sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}


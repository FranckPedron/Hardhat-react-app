import {Contract, ethers} from "ethers";
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import {useEffect, useState} from "react";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

    const [greeting, setGreetingValue] = useState();

    useEffect(() => {
        fetchGreeting();
    },[]);

    async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }

    async function fetchGreeting() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
            try {
                const data = await contract.greet();
                setGreetingValue(data);
            } catch (err) {
                console.log('Error: ', err);
            }
        }
    }

    async function setGreeting() {
        if (!greeting) return;
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(greeterAddress, Greeter.abi, signer);
            const transaction = await contract.setGreeting(greeting);
            setGreetingValue('');
            await transaction.wait();
            fetchGreeting();
        }
    }

    return (
        <div className="App">
            <p>{greeting}</p>
            <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
            <button onClick={setGreeting}>Set Greeting</button>
        </div>
    );
}

export default App;

import { useState } from 'react';
import './App.css';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "initialSupply",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const contractAddress = "0x9c50d8C29A686B5C30091A7F438955b19a9313be";

function App() {

  const [account, setAccount] = useState('');
  const [token, setToken] = useState(null);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [checkAddress, setCheckAddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const [isTransferring, setIsTransferring] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setWeb3(web3)

        const token = new web3.eth.Contract(contractAbi, contractAddress);
        setToken(token);

        const tokenName = await token.methods.name().call();
        const tokenSymbol = await token.methods.symbol().call();
        // const balance = await token.methods.balanceOf(accounts[0]).call();

        const rawBalance = await token.methods.balanceOf(accounts[0]).call();
        const formattedBalance = Web3.utils.fromWei(rawBalance, 'ether'); // works for 18 decimals
        setBalance(Number(formattedBalance).toFixed(2)); // shows up to 2 decimal places

        setName(tokenName);
        setSymbol(tokenSymbol);


      } catch (error) {
        console.error("User denied account access or error occurred");
      }
    } else {
      alert('Please install MetaMask!');
    }
  };


  const handleTransfer = async () => {
    // return
    setIsTransferring(true)
    if (token && recipient && amount) {
      try {
        const gasPrice = await web3.eth.getGasPrice();

        // convert amount from human readable to smallest unit
        // const amountToSend = (amount * (10 ** 18)).toString();
        const amountToSend = Web3.utils.toWei(amount.toString(), 'ether');


        await token.methods.transfer(recipient.trim(), amountToSend).send({
          from: account,
          gas: 100000,
          gasPrice,
        });

        alert(`Transferred ${amount} ${symbol} to ${recipient}`);
        setRecipient("")
        setAmount("")
      } catch (err) {
        console.error('Transfer failed:', err);
        alert('Transfer failed');
      }
      setIsTransferring(false)
    }
  };


  const checkTokenBalance = async (addressToCheck) => {
    try {
      if (!web3 || !token || !addressToCheck) {
        alert('Missing web3, token, or address');
        return;
      }

      const decimals = Number(await token.methods.decimals().call());
      const rawBalance = await token.methods.balanceOf(addressToCheck).call();

      const balanceBN = new BigNumber(rawBalance);
      const divisor = new BigNumber(10).pow(decimals);
      const formattedBalance = balanceBN.dividedBy(divisor).toFixed(4); // 4 decimals shown

      console.log(`Balance of ${addressToCheck}: ${formattedBalance} ${symbol}`);
      alert(`Balance: ${formattedBalance} ${symbol}`);
      return formattedBalance;
    } catch (error) {
      console.error('Failed to check balance:', error);
      alert('Error checking balance');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h2 className='text-danger'>EmergingTechGrid Token (ETG)</h2>
        {
          account ? (

            <div className="badge rounded-pill bg-danger p-3">
              {account.substring(0, 6)}...{account.slice(-4)}
            </div>
          ) : (
            <button className="btn btn-danger text-white" onClick={connectWallet}>
              Connect Wallet
            </button>
          )
        }
      </div>

      <div className="main-wrapper d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card glass-card text-center bg-transparent text-white">
                <h4 className="mb-3">{name} <span className="badge bg-secondary">{symbol}</span></h4>
                <p><strong>Contract Address:</strong> <span>{contractAddress}</span></p>
                <p><strong>Total Supply: </strong>100000.00</p>
                <p><strong>Balance: </strong>{balance || "00000"}</p>

                <hr className="text-white" />

                <h5 className="mt-4 mb-3">Transfer Tokens</h5>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter recipient address"
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                  className="form-control mb-3"
                  placeholder="Enter amount (ETG)"
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="any"
                />
                {/* <button className="btn btn-danger w-100"
                  onClick={handleTransfer}
                  disabled={!recipient || !amount}
                >Transfer Tokens</button> */}
                <button className="btn btn-danger w-100" onClick={handleTransfer} disabled={isTransferring || !recipient || !amount}>
                  {isTransferring ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Transferring...
                    </>
                  ) : (
                    'Transfer Tokens'
                  )}
                </button>


                <hr className="text-white" />

                <h5 className="mt-4 mb-3">Check Token Balance</h5>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter wallet address"
                    value={checkAddress}
                    onChange={(e) => setCheckAddress(e.target.value)}
                  />
                  <button className="btn btn-danger"
                    onClick={() => checkTokenBalance(checkAddress)}
                    disabled={!checkAddress}
                  >Check Balance</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

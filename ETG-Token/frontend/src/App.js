import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h2 className='text-danger'>EmergingTechGrid Token (ETG)</h2>
        <button className="btn btn-danger text-white">Connect Wallet</button>
      </div>

      <div className="main-wrapper d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card glass-card text-center bg-transparent text-white">
                <h4 className="mb-3">Emerging Tech Grid <span className="badge bg-secondary">ETG</span></h4>
                <p><strong>Contract Address:</strong> <span>0x96e3c5c12c...</span></p>
                <p><strong>Wallet Address:</strong> <span>0x3c2Bc7a5d...</span></p>
                <p><strong>Total Supply:</strong> 99650.00</p>

                <hr className="text-white" />

                <h5 className="mt-4 mb-3">Transfer Tokens</h5>
                <input type="text" className="form-control mb-2" placeholder="Enter recipient address" />
                <input type="text" className="form-control mb-3" placeholder="Enter amount (ETG)" />
                <button className="btn btn-danger w-100">Transfer Tokens</button>

                <hr className="text-white" />

                <h5 className="mt-4 mb-3">Check Token Balance</h5>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Enter wallet address" />
                  <button className="btn btn-danger">Check Balance</button>
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

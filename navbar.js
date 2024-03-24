// components: home, create account, login, deposit, withdraw, balance, all data

function NavBar(){
	return (
		<>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#" title="Return to landing page" id="home">Home</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>z
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item" title="Create a new account">
							<a className="nav-link" href="#/CreateAccount" id="create_account">Create Account</a>
						</li>
						<li className="nav-item" title="Use an existing account">
							<a className="nav-link" href="#/Login" id="login">Login</a>
						</li>
						<li className="nav-item" title="Deposit to the current account">
							<a className="nav-link" href="#/Deposit" id="deposit">Deposit</a>
						</li>
						<li className="nav-item" title="Withdraw from the current account">
							<a className="nav-link" href="#/Withdraw" id="withdraw">Withdraw</a>
						</li>
						<li className="nav-item" title="View recent transactions in the current account">
							<a className="nav-link" href="#/Transactions" id="transactions">Transactions</a>
						</li>
						<li className="nav-item" title="See all data stored">
							<a className="nav-link" href="#/AllData" id="all_data">All Data</a>
						</li>

					</ul>
				</div>
			</div>
		</nav>
		</>
	);
}
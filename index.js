function SinglePageApplication() {
	return (
		<>
			<HashRouter>
				<NavBar/>
				<UserContext.Provider value={
					{
						users: [
							{
								name: 'Sample Account',
								email: 'Sample Email',
								password: 'Sample Password',
								balance: 0,
								transactions: [
									'Initial Starting Balance: N/A',
									'Sample Transaction',
									'Sample Transaction'
								]
							}
						],
						currentUserIndex: -1
					}}>
					<Route path="/" 				exact component={Home} />
					<Route path="#/"				exact component={Home} />
					<Route path="/CreateAccount"	component={CreateAccount} />
					<Route path="/Login"			component={Login} />
					<Route path="/Deposit"			component={Deposit} />
					<Route path="/Withdraw"			component={Withdraw} />
					<Route path="/Transactions"		component={Transactions} />
					<Route path="/AllData"		 	component={AllData} />
				</UserContext.Provider>
			</HashRouter>
		</>
	)
}

ReactDOM.render(
	<SinglePageApplication/>,
	document.getElementById("root")
)
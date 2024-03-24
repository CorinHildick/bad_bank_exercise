function Transactions() {
	activatePage("transactions")
	const ctx = React.useContext(UserContext);

	if (ctx.currentUserIndex == -1) {
		return (
			<Card
				bgcolor="light"
				txtcolor="dark"
				header="Transactions"
				body={
					<>
						You currently are not in an account. Would you like to <a href="#/Login">log in</a> or <a href="#/CreateAccount">create an account</a>?
					</>
				}
			/>
		)
	}
	return (
		<>
			<h1>Transactions</h1>
			<Card 
				bgcolor="light"
				txtcolor="dark"
				header="Recent Transactions"
				body={(
					<>
						<ol>
							{ctx.users[ctx.currentUserIndex].transactions.toReversed().map((transaction) => {
								return (
									<li>{transaction}</li>
								)
							})}
						</ol>
					</>
				)}
			/>
		</>
	);
}
function AllData() {
	activatePage("all_data")
	const ctx = React.useContext(UserContext);
	return (
		<>
			<h1>All Data</h1>
			{
				(ctx.currentUserIndex != -1) &&
				(<>
					<h3>Current User</h3>
					<Card 
						bgcolor="light"
						txtcolor="dark"
						header={`User: ${ctx.users[ctx.currentUserIndex].name}`}
						text={(<><div>{`Email: ${ctx.users[ctx.currentUserIndex].email}`}</div><div>{`Password: ${ctx.users[ctx.currentUserIndex].password}`}</div></>)}
						body={(
							<>
								<div>{`Balance: ${ctx.users[ctx.currentUserIndex].balance}`}</div>
								<div>Transactions:</div>
								<ol>
									{ctx.users[ctx.currentUserIndex].transactions.map((transaction) => {
										return (
											<li>{transaction}</li>
										)
									})}
								</ol>
							</>
						)}
					/>
				</>)
			}
			<h3>All Users</h3>
			{ctx.users.map((user => {
				return (
					<Card 
					bgcolor="light"
					txtcolor="dark"
					header={`User: ${user.name}`}
					text={(<><div>{`Email: ${user.email}`}</div><div>{`Password: ${user.password}`}</div></>)}
					body={(
						<>
							<div>{`Balance: ${user.balance}`}</div>
							<div>Transactions:</div>
							<ol>
								{user.transactions.map((transaction) => {
									return (
										<li>{transaction}</li>
									)
								})}
							</ol>
						</>
					)}
					/>
				)
			}))}
		</>

	);
}
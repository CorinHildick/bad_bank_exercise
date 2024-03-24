function Deposit() {
	activatePage("deposit")
	const ctx = React.useContext(UserContext);
	return (
		<ModifyBalanceCard
			show = {true}
			isDeposit = {true}
			defaultText = "Deposit"

		/>
	);
}
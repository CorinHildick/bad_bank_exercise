function Withdraw() {
	activatePage("withdraw")
	const ctx = React.useContext(UserContext);
	return (
		<ModifyBalanceCard
			show = {true}
			isDeposit = {false}
			defaultText = "Withdraw"
		/>
	);
}
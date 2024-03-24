function CreateAccount() {
	activatePage("create_account")
	const ctx = React.useContext(UserContext);
	return (
		<AccountCard
			isCreate = {true}
			show = {true}
			defaultText = "Create Account"
			successButtonText = "Add another account"
		/>
	);
}
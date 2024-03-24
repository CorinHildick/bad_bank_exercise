function Login() {
	activatePage("login")
	const ctx = React.useContext(UserContext);
	if (ctx.currentUserIndex == -1) {
		return (
			<AccountCard
				isCreate = {false}
				show = {true}
				defaultText = "Login"
				successButtonText = "Log Out"
			/>
		)
	}
	else {
		return (
			<AccountCard
			isCreate = {false}
			show = {false}
			defaultText = "Login"
			successButtonText = "Log Out"
		/>
		)
	}
}
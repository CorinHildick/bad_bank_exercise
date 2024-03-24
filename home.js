function Home() {
	activatePage("home")
	const ctx = React.useContext(UserContext);
	return (
		<Card 
			bgcolor="light"
			txtcolor="dark"
			header="No Security Bank Landing Page"
			title="Welcome to the bank home page"
			text="You can hack this bank with ease"
			body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
		/>
	);
}
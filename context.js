const Route 		= ReactRouterDOM.Route;
const Link 			= ReactRouterDOM.Link;
const HashRouter	= ReactRouterDOM.HashRouter;

const UserContext	= React.createContext(null);

function Card(props) {
	function Classes(){
		const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
		const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
		return 'card mb-3 ' + bg + txt;
	}

	return (
		<div className={Classes()} style={{maxWidth: "18rem"}}>
			<div className="card-header">
				{props.header}
			</div>
			<div className="card-body">
				{props.title && (<h5 className="card-title">{props.title}</h5>)}
				{props.text &&(<div className="card-title">{props.text}</div>)}
				{props.body}
				{props.status && (<div id="createStatus">{props.status}</div>)}
			</div>
		</div>
	)
}

function AccountCard(props) {
	// This is a form component for all account management.
	// That means I use this for both the create account and login pages
	// The properties I input:
	//		Whether this is creating an account or logging in
	//		isCreate (boolean)
	//		whether to show the form or the completed form
	//		which I use on the login page when the user is already logged in
	//		show (boolean)
	//		and two strongs of text, which aren't strictly necessary and could be handled by isCreate

	const ctx = React.useContext(UserContext);
	
	const [show, setShow] 			= React.useState(props.show);
	const [status, setStatus] 		= React.useState('');
	const [name, setName] 			= React.useState('');
	const [email, setEmail] 		= React.useState('');
	const [password, setPassword] 	= React.useState('');

	function clearForm() {
		setName('');
		setEmail('');
		setPassword('');
		setShow(true);
		if (!props.isCreate) {
			ctx.currentUserIndex = -1
		}
		// the clearForm function gets called to either make a new account or log out of the existing account
		// If the user is on the login page, they just pressed the log out button
		// so I set the user index to no account
	}

	function validate(field, label){
		if (!field) {
			setStatus('Error: ' + label);
			setTimeout(() => setStatus(''), 3000);
			return false;
		}
		return true
	}

	function handleCreate() {
		console.log(name,email,password)
		if (!validate(name, 'name')) return;
		if (!validate(email, 'email')) return;
		if (!validate(password, 'password')) return;
		// I disabled the password length check for convenient testing
		// then nearly forgot to re-enable it
		if (password.length < 8) {
			setStatus('Error: Password must be 8 or more characters');
			setTimeout(() => setStatus(''), 3000);
			return;
		}
		ctx.currentUserIndex = ctx.users.length;
		ctx.users.push({name, email, password, balance:100, transactions:['Initial Starting Balance: $100']});
		setShow(false);
	}

	function handleLogin() {
		// This is a bit of spaghetti code, but we weren't expected to have a login function at all, so I think it's good enough
		let closestMatch = 0
		console.log(name,email,password)
		if (!validate(name, 'name')) return;
		if (!validate(email, 'email')) return;
		if (!validate(password, 'password')) return;
		for ( let i=0; i<ctx.users.length; i++) {
			console.log(`testing user ${i}: ${ctx.users[i].name}, ${ctx.users[i].email}, ${ctx.users[i].password}`)
			if (ctx.users[i].name == name) {
				console.log('name match')
				if (ctx.users[i].email == email) {
					if (ctx.users[i].password == password) {
						//name, email, and password match
						ctx.currentUserIndex = i
						setShow(false)
						setStatus('')
						return
					}
					else {	
						//name and email match
						closestMatch = 2
						setStatus('Password Error: Did you mean ' + ctx.users[i].password + '?');
						setTimeout(() => setStatus(''), 3000);
						}
					}
				else {
					//just name matches
					if (closestMatch <= 1) {
						closestMatch = 1
						setStatus('Email Error: Did you mean ' + ctx.users[i].email + '?');
						setTimeout(() => setStatus(''), 3000);
					}
				}
			}
			else{
				//no matches
				if (closestMatch == 0) {
					setStatus('Account Not Found');
					setTimeout(() => setStatus(''), 3000);
				}
			}

		}
	}

	return (
		// I use the same format for creating an account and logging in
		// I copied the tructure from the starter code for create account, but added several property-dependent bits
		<Card
			bgcolor="primary"
			header={props.defaultText}
			status={status}
			body={show ? (
				<>
					Name<br/>
					<input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
					Email Address<br/>
					<input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
					Password<br/>
					<input type="input" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>

					
					{(name || email || password) && (<button type="submit" className="btn btn-light" onClick={props.isCreate ? handleCreate : handleLogin}>{props.defaultText}</button>)}
				</>
			) : (
				<>
					<h5>{props.isCreate ? "Success" : "Logged in as " + (ctx.users[ctx.currentUserIndex].name ? ctx.users[ctx.currentUserIndex].name : name) }</h5>
					<button type="submit" className="btn btn-light" onClick={clearForm}>{props.successButtonText}</button>
				</>
			)}
		/>
	)
}

function ModifyBalanceCard(props) {
	// I used a different function to handle the transactions, instead of increasing the flexibility of the first.
	// This actually went much easier than handling the login information.
	const ctx = React.useContext(UserContext);

	if (ctx.currentUserIndex == -1) {
		return (
			<Card
				bgcolor="light"
				txtcolor="dark"
				header={props.defaultText}
				body={
					<>
						You currently are not in an account. Would you like to <a href="#/Login">log in</a> or <a href="#/CreateAccount">create an account</a>?
					</>
				}
			/>
		)
	}

	const [show, setShow] 			= React.useState(props.show);
	const [status, setStatus] 		= React.useState('');
	const [value, setValue] 		= React.useState('');

	function handleTransfer() {
		if (!validate(value, props.isDeposit)) return;
		if (props.isDeposit) {
			const newBalance = Number(ctx.users[ctx.currentUserIndex].balance) + Number(value)
			ctx.users[ctx.currentUserIndex].transactions.push(`Deposit $${value}. Total: $${newBalance}`)
			ctx.users[ctx.currentUserIndex].balance = newBalance
			setShow(false)
		}
		else {
			const newBalance = ctx.users[ctx.currentUserIndex].balance - value
			ctx.users[ctx.currentUserIndex].transactions.push(`Withdraw $${value}. Total: $${newBalance}`)
			ctx.users[ctx.currentUserIndex].balance = newBalance
			setShow(false)
		}
	}

	function validate(value, depositBoolean) {
		if (value == 0) {
			setStatus(`Error: Cannot ${depositBoolean ? "deposit" : "withdraw"} zero dollars`);
			setTimeout(() => setStatus(''), 3000);
			return false;
		}
		if (value < 0) {
			setStatus(`Error: Cannot ${depositBoolean ? "deposit" : "withdraw"} negative dollars`);
			setTimeout(() => setStatus(''), 3000);
			return false;
		}
		if (!depositBoolean && value > ctx.users[ctx.currentUserIndex].balance) {
			setStatus('Error: Cannot withdraw more than account total');
			setTimeout(() => setStatus(''), 3000);
			return false;
		}
		// Here's the check for whether this is a number or not. This one took me a bit to figure out.
		if (!Number.isFinite(Number(value))) {
			setStatus('Error: Not a Number');
			setTimeout(() => setStatus(''), 3000);
			return false;
		}
		return true
	}

	function resetForm() {
		setValue('')
		setShow(true)
	}
	
	return (
		// The reason checking whether the input was a number took me a while to check is pretty silly.
		// I had changed the input type from "text" to "number"
		// so if I had characters in there, there was no input at all
		// and the submit button didn't show up
		<Card
			bgcolor="light"
			txtcolor="dark"
			header={props.defaultText}
			status={status}
			body={show ? (
				<>
					<p>{`Current Balance: $${ctx.users[ctx.currentUserIndex].balance}`}</p>
					{`${props.defaultText} Amount: `}<br/>
					<input type="text" className="form-control" id="value" placeholder="Enter an amount" value={value} onChange={e => setValue(e.currentTarget.value)} /><br/>
					
					{(value) && (<button type="submit" className="btn btn-dark" onClick={handleTransfer}>{props.defaultText}</button>)}
				</>
			) : (
				<>
					{`Your ${props.isDeposit ? "deposit" : "withdrawal"} of ${value} was successful! Your current balance is $${ctx.users[ctx.currentUserIndex].balance}.`}
					<button type="submit" className="btn btn-dark" onClick={resetForm}>{`Make Another ${props.isDeposit ? "Deposit" : "Withdrawal"}`}</button>
				</>
			)}
		/>
	)
}

// here's how I toggled the active page in the navbar
// each page calls this function for itself
// it removes the last active link, then adds its own
function activatePage(page) {
	const navRemove = document.getElementsByClassName("active")[0];
	if (navRemove) {
		navRemove.classList.remove("active");
	};
	const navAdd = document.getElementById(page);
	if (navAdd) {
		navAdd.classList.add("active");
	}
}
const mailTemplates = {
	testEmail: {
		subject: 'Test email from INVESAFE!',
		text: 'Hi, this is a test mail.',
		html: 'Hi, this is a test mail.',
		links: []
	},
	activate: {
		subject: '<%=firstname%>, activate your account on INVESAFE!',
		text: 'Hello <%=firstname%>,\n' +
			'\n' +
			'You have registered to INVESAFE.\n' +
			'To activate your account, please copy the following link in your browser:\n' +
			'<%=link1%>\n' +
			'\n',
		html: 'Hello <%=firstname%>,<br/>' +
			'<br/>' +
			'You have registered to INVESAFE. <br/>' +
			'To activate your account, please select or copy the following link in your browser:<br/>' +
			'<a href="<%=link1%>" target="_blank"><%=link1%></a><br/>',
		links: ['<%=server%>/activeaccount?email=<%=email%>&hash=<%=hash%>']
	},
	welcome: {
		subject: '<%=firstname%>, welcome to INVESAFE!',
		text: 'Hello <%=firstname%>,\n' +
			'\n' +
			'Welcome to INVESAFE like an entrepreneur. Creativity IOT over all things.\n' +
			'\n' +
			'Boost your creativity and entrepreneur potential. Challenge yourself!.\n' +
			'Share your projects and get the support of mentors, investors and fans.\n' +
			'\n' +
			'Complete your data on your profile and post a first project!.\n' +
			'<%=link1%>\n' +
			'\n',
		html: 'Hello <%=firstname%>,<br/>' +
			'<br/>' +
			'Welcome to INVESAFE like an entrepreneur. Creativity IOT over all things. <br/>' +
			'<br/>' +
			'Boost your creativity and entrepreneur potential. Challenge yourself!.<br/>' +
			'Share your projects and get the support of mentors, investors and fans.<br/>' +
			'<br/>' +
			'Complete your data on your profile and post a first project!. <br/>' +
			'<a href="<%=link1%>" target="_blank"><%=link1%></a><br/>',
		links: ['<%=server%>/profile']
	},
	welcomeSite: {
		subject: '<%=firstname%>, welcome to INVESAFE!',
		text: 'Hello <%=firstname%>,\n' +
			'\n' +
			'Welcome to INVESAFE like a investor. Creativity IOT over all things.\n' +
			'\n' +
			'Increase your wealth by investing in tokenized assets.\n' +
			'\n' +
			'Complete your data on your profile and invest a first asset!.\n' +
			'<%=link1%>\n' +
			'\n',
		html: 'Hello <%=firstname%>,<br/>' +
			'<br/>' +
			'Welcome to INVESAFE like a investor. Creativity IOT over all things. <br/>' +
			'<br/>' +
			'Increase your wealth by investing in tokenized assets.<br/>' +
			'<br/>' +
			'Complete your data on your profile and invest a first asset!. <br/>' +
			'<a href="<%=link1%>" target="_blank"><%=link1%></a><br/>',
		links: ['<%=server%>/profile']
	},
	forgotPass: {
		subject: '<%=name%>, reset your INVESAFE password',
		text: 'Hello <%=name%>, forgot your password?.\n' +
			'\n' +
			'We got a request to change your password.\n' +
			'If you want to reset your password, please select or copy the following link in your browser:\n' +
			'<%=link1%>\n' +
			'\n' +
			'If you don\'t want to reset your password, you can ignore this email.\n',
		html: 'Hello <%=name%>, forgot your password?.<br/>' +
			'<br/>' +
			'We got a request to change your password.<br/>' +
			'If you want to reset your password, please select or copy the following link in your browser:<br/>' +
			'<a href="<%=link1%>" target="_blank"><%=link1%></a><br/>' +
			'<br/>' +
			'If you don\'t want to reset your password, you can ignore this email.<br/>',
		links: ['<%=server%>/changepass?modal=changepass&email=<%=email%>&hash=<%=hash%>']
	},
	contactUsProject: {
		subject: 'INVESTOR [<%=invId%>] to invest in project <%=proId%>',
		text: 'Hello Guys,\n' +
			'\n' +
			'[<%=invId%>] <%=invFullName%> interested to invest in this project:,\n' +
			'[<%=proId%>] <%=projectName%>,\n' +
			'\n' +
			'Your message:\n' +
			'<%=invMessage%>\n' +
			'<%=invEmail%>\n',
		html: 'Hello Guys,<br/>' +
			'<br/>' +
			'[<%=invId%>] <%=invFullName%> interested to invest in this project:,<br/>' +
			'[<%=proId%>] <%=projectName%>,<br/>' +
			'<br/>' +
			'Your message:<br/>' +
			'<%=invMessage%><br/>' +
			'<%=invEmail%>\n',
		email: 'contact@invesafe.com'
	},
	askOwnerProject: {
		subject: '<%=askName%> asked you in project <%=proId%>',
		text: 'Hello <%=ownerName%>,\n' +
			'\n' +
			'<%=askName%> asked you in this project:\n' +
			'[<%=proId%>] <%=projectName%>,\n' +
			'\n' +
			'<%=question%>\n' +
			'\n' +
			'Go to your panel to Answer.',
		html: 'Hello <%=ownerName%>,<br/>' +
			'<br/>' +
			'<%=askName%> asked you in this project:<br/>' +
			'[<%=proId%>] <%=projectName%>,<br/>' +
			'<br/>' +
			'<%=question%><br/>' +
			'<br/>' +
			'Go to your panel to Answer.'
	},
	answerOwnerProject: {
		subject: '<%=ownerName%> answered you in project <%=proId%>',
		text: 'Hello <%=askName%>,\n' +
			'\n' +
			'<%=ownerName%> answered you in this project:\n' +
			'[<%=proId%>] <%=projectName%>,\n' +
			'\n' +
			'<%=answer%>\n' +
			'\n' +
			'Go to Project <%=proId%>\n' +
			'<%=link1%>',
		html: 'Hello <%=askName%>,<br/>' +
			'<br/>' +
			'<%=ownerName%> answered you in this project:<br/>' +
			'[<%=proId%>] <%=projectName%>,<br/>' +
			'<br/>' +
			'<%=answer%><br/>' +
			'<br/>' +
			'Go to Project <%=proId%><br/>' +
			'<a href="<%=link1%>" target="_blank"><%=link1%></a>',
		links: ['<%=server%>/project/<%=proId%>']
	},
	contactUsEvent: {
		subject: 'Contact from INVESAFE for your event',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'<%=fullname%> sent you this message for the event <%=eventName%>,\n' +
			'\n' +
			'<%=message%>\n' +
			'\n' +
			'Please contact <%=fullname%> at email <%=emailContact%>.\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'<%=fullname%> sent you this message for the event <%=eventName%>,<br/>' +
			'<br/>' +
			'<%=message%><br/>' +
			'<br/>' +
			'Please contact <%=fullname%> at email <%=emailContact%>.<br/>'
	},
	postEvent: {
		subject: 'Event <%=eventName%> to review!',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'Your Event:\n' +
			'<%=eventName%>\n' +
			'\n' +
			'Is under review by the invesafe team.\n' +
			'You will be notified by email when approved.\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'Your Event:<br/>' +
			'<%=eventName%><br/>' +
			'<br/>' +
			'Is under review by the invesafe team.<br/>' +
			'You will be notified by email when approved.<br/>'
	},
	newEvent: {
		subject: 'Event <%=eventName%> to review!',
		text: 'Hello Guys,\n' +
			'\n' +
			'New Event to review:\n' +
			'<%=eventName%>\n',
		html: 'Hello Guys,<br/>' +
			'<br/>' +
			'New Event to review:<br/>' +
			'<%=eventName%><br/>',
		email: 'contact@invesafe.com'
	},
	approvedEvent: {
		subject: 'Event <%=eventName%> Approved!',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'Your Event:\n' +
			'<%=eventName%>\n' +
			'\n' +
			'Was approved by the invesafe team.\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'Your Event:<br/>' +
			'<%=eventName%><br/>' +
			'<br/>' +
			'Was approved by the invesafe team.<br/>'
	},
	contactUsDeveloper: {
		subject: 'Contact from developer to invest',
		text: 'Name: <%=name%> - Email: <%=email%> - Phone: <%=phone%> - Mensagge: <%=message%>',
		html: 'Name: <%=name%><br/>Email: <%=email%><br/>Phone: <%=phone%><br/>Mensagge: <%=message%>',
		email: 'contact@invesafe.com'
	},
	contactUsSite: {
		subject: 'Contact from site',
		text: 'Name: <%=name%> - Email: <%=email%> - Subject: <%=subject%> - Mensagge: <%=message%>',
		html: 'Name: <%=name%><br/>Email: <%=email%><br/>Subject: <%=subject%><br/>Mensagge: <%=message%>',
		email: 'contact@invesafe.com'
	},
	toApproveProject: {
		subject: 'Project ID <%=proId%> to review',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'Your project ID <%=proId%>,\n' +
			'<%=projectName%>,\n' +
			'\n' +
			'Is under review by the invesafe team.\n' +
			'You will be notified by email when approved.\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'Your project ID <%=proId%>,<br/>' +
			'<%=projectName%>,<br/>' +
			'<br/>' +
			'Is under review by the invesafe team.<br/>' +
			'You will be notified by email when approved.<br/>'
	},
	approveProject: {
		subject: 'Project ID <%=proId%> Approved !',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'Your project ID <%=proId%>,\n' +
			'<%=projectName%>,\n' +
			'\n' +
			'Was approved by the invesafe team. Good job!.\n' +
			'Share your projects and increase your visibility.\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'Your project ID <%=proId%>,<br/>' +
			'<%=projectName%>,<br/>' +
			'<br/>' +
			'Was approved by the invesafe team. Good job!.<br/>' +
			'Share your projects and increase your visibility.<br/>'
	},
	denyProject: {
		subject: 'Project ID <%=proId%> Rejected',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'Your project ID <%=proId%>,\n' +
			'<%=projectName%>,\n' +
			'\n' +
			'Was rejected by the invesafe team.\n' +
			'Please review and try again !\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'Your project ID <%=proId%>,<br/>' +
			'<%=projectName%>,<br/>' +
			'<br/>' +
			'Was rejected by the invesafe team.<br/>' +
			'Please review and try again !<br/>'
	},
	needSponsorMyProject: {
		subject: 'Mentor my project on invesafe',
		text: 'Hello,\n' +
			'\n' +
			'You are invited to mentor a project on invesafe:\n' +
			'<%=proId%> - <%=projectName%>\n' +
			'\n' +
			'invesafe loaded the project and wrote to you:\n' +
			'\n' +
			'<%-message%>\n' +
			'\n' +
			'Go to login <%=link1%> or register <%=link2%> to sponsor the project on invesafe.\n',
		html: 'Hello,<br/>' +
			'<br/>' +
			'You are invited to mentor a project on invesafe:<br/>' +
			'<%=proId%> - <%=projectName%><br/>' +
			'<br/>' +
			'invesafe loaded the project and wrote to you:<br/>' +
			'<br/>' +
			'<i><%-message%></i><br/>' +
			'<br/>' +
			'Go to login <a href="<%=link1%>" target="_blank"><%=link1%></a> or register <a href="<%=link2%>" target="_blank"><%=link2%></a> to sponsor the project on invesafe.<br/>',
		links: ['<%=server%>/login', '<%=server%>/sign-up?type=2&email=<%=email%>']
	},
	dealBuyer: {
		subject: 'Congratulations! You bought on invesafe.',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'You bought in this project:,\n' +
			'[<%=proId%>] <%=projectName%>,\n' +
			'\n' +
			'We bring you the information of seller to contact him and coordinate payment and shipping:\n' +
			'Full Name: <%=sellerName%>\n' +
			'Country: <%=sellerCountry%>\n' +
			'City: <%=sellerCity%>\n' +
			'Email: <%=sellerEmail%>\n' +
			'Phone: <%=sellerPhone%>\n' +
			'\n' +
			'Enjoy your purchase !\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'You bought in this project:,<br/>' +
			'[<%=proId%>] <%=projectName%>,<br/>' +
			'<br/>' +
			'We bring you the information of seller to contact him and coordinate payment and shipping:<br/>' +
			'Full Name: <%=sellerName%><br/>' +
			'Country: <%=sellerCountry%><br/>' +
			'City: <%=sellerCity%><br/>' +
			'Email: <%=sellerEmail%><br/>' +
			'Phone: <%=sellerPhone%><br/>' +
			'<br/>' +
			'Enjoy your purchase !<br/>'
	},
	dealSeller: {
		subject: 'Congratulations! You sold on invesafe.',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'You sold in this project:,\n' +
			'[<%=proId%>] <%=projectName%>,\n' +
			'\n' +
			'We bring you the information of buyer to contact him and coordinate payment and shipping:\n' +
			'Full Name: <%=buyerName%>\n' +
			'Country: <%=buyerCountry%>\n' +
			'City: <%=buyerCity%>\n' +
			'Email: <%=buyerEmail%>\n' +
			'Phone: <%=buyerPhone%>\n' +
			'\n' +
			'Enjoy your Sale !\n' +
			'invesafe doesn\'t charge sales commissions, but receives DONATIONS.',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'You sold in this project:,<br/>' +
			'[<%=proId%>] <%=projectName%>,<br/>' +
			'<br/>' +
			'We bring you the information of buyer to contact him and coordinate payment and shipping:<br/>' +
			'Full Name: <%=buyerName%><br/>' +
			'Country: <%=buyerCountry%><br/>' +
			'City: <%=buyerCity%><br/>' +
			'Email: <%=buyerEmail%><br/>' +
			'Phone: <%=buyerPhone%><br/>' +
			'<br/>' +
			'Enjoy your Sale !<br/>' +
			'invesafe doesn\'t charge sales commissions, but receives DONATIONS.'
	},
	thanksSuscribe: {
		subject: 'Subscribe to INVESAFE!',
		text: 'You are subscribed to the invesafe newsletter!',
		html: 'You are subscribed to the invesafe newsletter!'
	},
	draftProject: {
		subject: 'Project ID <%=proId%> saved as Draft',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'Your project ID <%=proId%>,\n' +
			'<%=projectName%>,\n' +
			'\n' +
			'Was saved as Draft.\n' +
			'Remember to complete and post!\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'Your project ID <%=proId%>,<br/>' +
			'<%=projectName%>,<br/>' +
			'<br/>' +
			'Was saved as Draft. <br/>' +
			'Remember to complete and post! <br/>'
	},
	projectMentored: {
		subject: 'Your project ID <%=proId%> has a new mentor!',
		text: 'Hello <%=name%>,\n' +
			'\n' +
			'Your project:\n' +
			'ID <%=proId%>,\n' +
			'<%=projectName%>,\n' +
			'\n' +
			'Was accepted by your mentor:\n' +
			'<%=mentorBusinessName%>,\n' +
			'\n' +
			'Congratulations!\n',
		html: 'Hello <%=name%>,<br/>' +
			'<br/>' +
			'Your project: <br/>' +
			'ID <%=proId%>,<br/>' +
			'<%=projectName%>,<br/>' +
			'<br/>' +
			'Was accepted by your mentor: <br/>' +
			'<%=mentorBusinessName%>,<br/>' +
			'<br/>' +
			'Congratulations! <br/>'
	}
};

module.exports = mailTemplates;

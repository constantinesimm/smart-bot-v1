let str = `mongodb+srv://mb_admin:<pass>@cv-zj4vp.mongodb.net/messager_bots?retryWrites=true&w=majority`
const AuthService = require('../../modules/users/services/auth');
const mongoose = require('mongoose');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
process.env.NODE_ENV = 'production';

const user = { email: '', role: 'super' };

mongoose
	.connect(str, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false
	})
	.then(() => {
		console.info('♦♦♦♦♦ Database(mongoDB) connected ♦♦♦♦♦');
		
		const email = () => new Promise(resolve => {
			rl.question('Type your email > ', (answer) => {
				user.email = answer;
				resolve();
			})
		});
		
		const main = async () => {
			await email();
			AuthService.registerRequest(user)
				.then(response => {
					console.log(response.message);
					rl.close();
					process.exit(0);
				})
				.catch(error => {
					console.log(error.message);
					process.exit(1);
				});
		};
		
		main();
	})
	.catch(error => {
		console.error(`♦♦♦♦♦ Database(mongoDB) error - ${ error.message } ♦♦♦♦♦`)
		process.exit(1);
	});


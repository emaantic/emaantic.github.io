const username = document.getElementById('username');
const searchBtn = document.getElementById('search');
const errorUsername = document.getElementById('error');
const results = document.getElementById('results');


const numberToMonth = (number) => {
	const calendar = [
		'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	];

	if (number >= 1 && number <= 12) {
		return calendar[number - 1];
	}

}
const getUser = async (username) => {
	try {
		const url = `https://api.github.com/users/${username}`;
		const response = await (await (fetch(url))).json();

		if (response.message === 'Not Found') {
			errorUsername.insertAdjacentHTML("beforeend", 'Invalid username');
		} else {

			const name = response.name ? response.name : "Not Provided";
			const username = response.login;
			const repositories = response.public_repos ? response.followers : 0;
			const followers = response.followers ? response.followers : 0;
			const following = response.following ? response.following : 0;
			const company = response.company ? response.company : "Not Provided";
			const bio = response.bio ? response.bio : "No Bio";
			const email = response.email ? response.email : "No Email";
			const location = response.location ? response.location : "No Location";
			const blog = response.blog ? response.blog : "No Blog";


			const date_created = response.created_at.split('T')[0];


			const year = date_created.split('-')[0];
			let month = date_created.split('-')[1];
			month = numberToMonth(Number(month));
			const day = date_created.split('-')[2];


			const card = `
				<h2 class="p-bold-fs-24 mt-6 mb-4" style="color: #FCB076">Results:</h2>
				<article class="card">
					<div class="d-flex g-4">
						<div>
							<img class="avatar" src="https://github.com/${username}.png" alt="avatar">
						</div>
						<div>                                                
							<div class="d-flex align-center g-2"> 
								<div class="icon-container">             
									<img src="./icon/icon_clock.svg" alt=" "class="icon">
								</div>                            
								<p>Joined ${day}. ${month} ${year}</p>                              
							</div>
							<div>
								<p class="p-bold-fs-24">${name}</p>    
							</div>    
							<div>
								<p class="p-bold-fs-24" style="color: #FCB076">${username}</p>    
							</div>                                            
						</div>	
					</div>
					<div class="inner-card d-flex row justify-content-between">  
							<div>
									<p class="p-bold-fs-24">${repositories}</p> 
									<p class="p-bold-fs-24">Repositories</p>     
							</div>  
							<div>
									<p class="p-bold-fs-24">${followers}</p>
									<p class="p-bold-fs-24">Followers</p>     
							</div> 
							<div>
									<p class="p-bold-fs-24">${following}</p>   
									<p class="p-bold-fs-24">Following</p>      
							</div> 
					</div>
					<div class="d-flex align-center g-3">
						<div class="icon-container">
							<img src="./icon/icon_building.svg" alt="">
						</div> 
						<p class=${company === 'Not Provided' ? '"text-muted"' : '""'}>${company}</p> 
					</div>
					<div class="d-flex">
						<div style="width: 50%">
							<div class="d-flex align-center g-3">
								<div class="icon-container">
									<img src="./icon/icon_id.svg " alt="" class="icon"> 
								</div>
								<p class=${bio === 'No Bio' ? '"text-muted"' : '""'}>${bio}</p>
							</div>
							<div class="d-flex align-center g-3">
								<div class="icon-container">
									<img src="./icon/icon_email.svg" alt="" class="icon">
								</div> 
								<p class=${email === 'No Email' ? '"text-muted"' : '""'}>${email}</p>
							</div>
						</div>                        
						<div style="width: 50%">
							<div class="d-flex align-center g-3">
								<div class="icon-container">
									<img src="./icon/icon_location_pin.svg " alt="" class="icon"> 
								</div>
								<p class=${location === 'No Location' ? '"text-muted"' : '""'}>${location}</p>
							</div>
							<div class="d-flex align-center g-3">
								<div class="icon-container">
									<img src="./icon/icon_link.svg" alt="" class="icon"> 
								</div>
								<p class=${blog === 'No Blog' ? '"text-muted"' : '""'}>${blog}</p>
							</div>                    
						</div>
					</div>            
				</article>        
      `
			results.insertAdjacentHTML("beforeend", card);
		}
	} catch (err) {
		errorUsername.innerHTML = 'Something went wrong';
	}
}

const onSearch = () => {

	results.innerHTML = '';
	errorUsername.innerHTML = '';

	if (username.value === '') {
		errorUsername.insertAdjacentHTML("beforeend", 'Please enter username');
	} else {
		getUser(username.value);
	}

}


const onKeyPress = (e) => {

	if (e.key === 'Enter') {
		onSearch();
	}

}

searchBtn.addEventListener('click', onSearch);
username.addEventListener('keypress', onKeyPress);
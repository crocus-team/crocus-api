
# Crocus Backend

Crocus allows you to keep a to-do list online and shared on different platforms.

## API Roadmap
You can follow the project progress on this list.
- **General**
	- [x] HTTP Server
	- [x] Database Connect
	- [x] Middlewares
	- [x] Error Handling
	- [ ] E-mail Template
	- [ ] E-mail Sender on SMTP
- **Models**
	- [x] User: *name, surname, email, password, photo, create_date*
	- [x] List: *name, color, owner_user, shared_users*
	- [x] Task: *title, content, create_date, expire_date, complate, list*
	- [x] Share: *sender, receiver, list, status, sending_date*
- **Routes/Controllers**
	- Auth `[/auth]`
		- [x] Register *(post)* `[/register]`
		- [x] Login *(post)* `[/login]`
		- [x] Logout *(get)* `[/logout]`
		- [x] Check Auth *(get, protect)* `[/check]`
		- [ ] Forgot Password *(post)* `[/forgotpassword]`
	- User `[/user]`
		- [x] Update Details *(put, protect)* `[/details]`
		- [x] Update Password *(put, protect)* `[/password]`
		- [x] Update Profile Photo *(put, protect)* `[/photo]`
	- List `[/list]`
		- [x] My Lists *(get, protect)* `[/]`
		- [x] Add List *(post, protect)* `[/]`
		- [x] List Details with Tasks *(get, protect)* `[/:listId]`
		- [x] Update List Details *(put, protect)* `[/:listId]`
		- [x] Delete List *(delete, protect)* `[/:listId]`
		- [x] Remove User from List *(delete, protect)* `[/:listId/:userId]`
		- [ ] Sended Requests for List *(get, protect)* `[/:listId/requests]`
	- Task `[/task]`
		- [x] My All Tasks *(get, protect)* `[/]`
		- [x] Add Task *(post, protect)* `[/]`
		- [x] Task Details *(get, protect)* `[/:taskId]`
		- [x] Update Task *(put, protect)* `[/:taskId]`
		- [x] Detele Task *(delete, protect)* `[/:taskId]`
		- [x] List Upcoming Tasks *(get, protect)* `[/upcoming]`
	- Share `[/share]`
		- [x] List Requests *(get, protect)* `[/]`
		- [x] Send Request *(post, protect)* `[/]`
		- [x] Reply Request *(put, protect)* `[/:requestId]`
		- [x] Delete Sended Request *(delete, protect)* `[/:requestId]`
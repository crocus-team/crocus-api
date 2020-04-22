
# Crocus Backend

Crocus allows you to keep a to-do list online and shared on different platforms.

## API Roadmap
You can follow the project progress on this list.
- **General**
	- [x] HTTP Server
	- [x] Database Connect
	- [x] Middlewares
	- [x] Error Handling
- **Models**
	- [x] User: *name, surname, email, password, photo, create_date*
	- [x] List: *name, color, owner_user, shared_users*
	- [x] Task: *title, content, create_date, expire_date, list*
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
		- [ ] Delete List *(delete, protect)* `[/:listId]`
		- [ ] Remove User from List *(delete, protect)* `[/:listId/:userId]`
	- Task `[/task]`
		- [ ] My All Tasks *(get, protect)* `[/]`
		- [ ] Add Task *(post, protect)* `[/]`
		- [ ] Task Details *(get, protect)* `[/:taskId]`
		- [ ] Update Task *(put, protect)* `[/:taskId]`
		- [ ] Detele Task *(delete, protect)* `[/:taskId]`
		- [ ] List Upcoming Tasks *(get, protect)* `[/upcoming]`
	- Share `[/share]`
		- [ ] List Requests *(get, protect)* `[/]`
		- [ ] Send Request *(post, protect)* `[/]`
		- [ ] Reply Request *(post, protect)* `[/:requestId]`
		- [ ] Delete Sended Request *(delete, protect)* `[/:requestId]`
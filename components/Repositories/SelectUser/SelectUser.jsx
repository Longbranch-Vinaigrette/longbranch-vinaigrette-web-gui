export default function SelectUser({ args, ...allArgs }) {
	const {
		users,
		selectedUser,
		setSelectedUser,
		userRepositories,
		updateRepository,
	} = args;

	return (
		<div>
			<div>
				<h4>Selected user {selectedUser}</h4>
			</div>
			<table>
				<tbody>
					<tr>
						<th>Username</th>
						<th>Selected</th>
						<th>Select</th>
					</tr>

					{/* Create elements for every repository/app */}
					{users &&
						users.map((user, index) => {
							return (
								<tr>
									<th>{user}</th>
									<th>
										{(selectedUser == user && (
											<p className="success" style={{ margin: "0px" }}>
												Yes
											</p>
										)) || (
											<p className="danger" style={{ margin: "0px" }}>
												No
											</p>
										)}
									</th>
									<th>
										<button onClick={(e) => setSelectedUser(user)}>
											Select
										</button>
									</th>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

const Users = ({ users, setUsers, setIsEditing, setUserToEdit }) => {
	if (users.length === 0) return <h1>No hay usuarios</h1>;

	return (
		<div>
			{users.map(user => (
				<div key={user._id}>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<button onClick={() => deleteUser(user._id, setUsers)}>
						Borrar
					</button>
					<button
						onClick={() => {
							setIsEditing(true);
							setUserToEdit(user);
						}}
					>
						Editar
					</button>
				</div>
			))}
		</div>
	);
};

const deleteUser = async (id, setUsers) => {
	const response = await fetch(`http://localhost:3000/api/users/${id}`, {
		method: 'DELETE'
	});
	const data = await response.json();
	setUsers(data);
};

export default Users;
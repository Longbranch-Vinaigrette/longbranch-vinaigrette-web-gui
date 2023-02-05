from src.submodules.dev_tools_utils.local_repository_manager import LocalRepositoryManager

# Here I will enable camel case because I'm tired of not
# being able to xd
repManager = LocalRepositoryManager()

# Get users
localUsers = repManager.get_users()

print("Users found: ", localUsers)

# This will be returned in the response
DEVTOOLS_RESULT = localUsers

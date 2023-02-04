from src.submodules.local_repository_manager import LocalRepositoryManager

# Here I will enable camel case because I'm tired of not
# being able to xd
repManager = LocalRepositoryManager()

# This will be returned in the response
DEVTOOLS_RESULT = repManager.get_users()

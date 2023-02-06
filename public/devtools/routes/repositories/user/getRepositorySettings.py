from src.submodules.dev_tools_utils.dbs.RepositorySettingsTable import RepositorySettingsTable

# Create settings table
settings = RepositorySettingsTable()

print("Dependency 1: ", DEP_1)

# Get user repositories
userRepositories = settings.get_user_repositories(DEP_1)

# This will be returned in the response
DEVTOOLS_RESULT = userRepositories

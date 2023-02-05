from src.submodules.dev_tools_utils.dbs.RepositorySettingsTable import RepositorySettingsTable

settings = RepositorySettingsTable()
userRepositories = settings.get_user_repositories(DEVTOOLS_ARG_1)

# This will be returned in the response
DEVTOOLS_RESULT = userRepositories

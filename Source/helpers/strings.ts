/* tslint:disable:variable-name */
export class Strings {
	static ViewYourPinnedQuery = "View your pinned work item query results.";

	static BrowseYourPullRequests = "Browse your pull requests.";
	static BrowseAdditionalWorkItems = "Browse additional work items...";
	static BrowseAdditionalWorkItemsDescription =
		"Choose this item to see all query results in your web browser";
	static FolderNotOpened =
		"You must open a repository folder in order to use the Azure Repos extension.";
	static NavigateToBuildSummary = "Click to view build";
	static NavigateToTeamServicesWebSite =
		"Click to view your team project website.";
	static NoAccessTokenFound =
		"A personal access token for this repository hosted on Azure DevOps Services was not found in your local user settings.";
	static NoAccessTokenLearnMoreRunSignin =
		"You are not connected to Azure DevOps Services (%s). Select 'Learn more...' and then run the 'team signin' command.";
	static NoAccessTokenRunSignin =
		"You are not connected to Azure DevOps Services (%s). Please run the 'team signin' command.";
	static NoTeamServerCredentialsRunSignin =
		"You are not connected to a Team Foundation Server. Please run the 'team signin' command.";
	static NoBuildsFound =
		"No builds were found for this repository and branch. Click to view your team project's build definitions page.";
	static NoTfvcBuildsFound =
		"No builds were found for this repository. Click to view your team project's build definitions page.";
	static NoRepoInformation =
		"No Azure DevOps Services or Team Foundation Server repository configuration was found. Ensure you've opened a folder that contains a repository.";
	static NoSourceFileForBlame =
		"A source file must be opened to show blame information.";
	static UserMustSignIn =
		"You are signed out. Please run the 'team signin' command.";

	static DeviceFlowAuthenticatingToTeamServices =
		"Authenticating to Azure DevOps Services (%s)...";
	static DeviceFlowCopyCode =
		"Copy this code and then press Enter to start the authentication process";
	static DeviceFlowManualPrompt =
		"Provide an access token manually (current experience)";
	static DeviceFlowPrompt =
		"Authenticate and get an access token automatically (new experience)";
	static DeviceFlowPlaceholder =
		"Choose your method of authenticating to Azure DevOps Services...";
	static ErrorRequestingToken =
		"An error occurred requesting a personal access token for %s.";

	static SendAFrown = "Send a Frown";
	static SendASmile = "Send a Smile";
	static SendFeedback = "Send us feedback about the Azure Repos extension!";
	static SendFeedbackPrompt = "Enter your feedback here (1000 char limit)";
	static NoFeedbackSent = "No feedback was sent.";
	static ThanksForFeedback = "Thanks for sending feedback!";
	static LearnMore = "Learn More...";
	static LearnMoreAboutTfvc = "TFVC Support...";
	static MoreDetails = "More Details...";
	static SetupTfvcSupport = "Set Up TFVC Support...";
	static ShowMe = "Show Me!";
	static VS2015Update3CSR = "Get Latest VS 2015 Update";
	static DontShowAgain = "Don't Show Again";

	static ChoosePullRequest = "Choose a pull request";
	static ChooseWorkItem = "Choose a work item";
	static ChooseWorkItemQuery = "Choose a work item query";
	static ChooseWorkItemType = "Choose a work item type";
	static ClickToRetryConnection = "Click to retry.";

	static ProvideAccessToken =
		"Provide the personal access token for your organization";
	static ProvidePassword = "Provide the password for username";
	static ProvideUsername = "Provide the username for server";

	static UnsupportedWitServerVersion =
		"Work Item Tracking (WIT) functionality is disabled. WIT functionality requires TFS version 2015 Update 2 or later.";
	static UnsupportedServerVersion =
		"The Azure Repos extension only supports TFS version 2015 Update 2 or later. Please verify your TFS server version.";
	static UnableToRemoveCredentials =
		"Unable to remove credentials for this host. You may need to remove them manually. Host: ";
	static UnableToStoreCredentials =
		"Unable to store credentials for this host. Host: ";

	static UnableToValidateTeamServicesCollection =
		"Unable to validate the Azure DevOps Services collection.";
	static UnableToValidateCollectionAssumingDefaultCollection =
		"Unable to validate the collection assuming 'DefaultCollection'.";

	//Status codes
	static StatusCode401 =
		"Unauthorized. Check your authentication credentials and try again.";
	static StatusCodeOffline =
		"It appears Visual Studio Code is offline. Please connect and try again.";
	static ProxyUnreachable =
		"It appears the configured proxy is not reachable. Please check your connection and try again.";

	// TFVC messages/errors
	static ChooseItemQuickPickPlaceHolder = "Choose a file to open it.";
	static NotAGitRepository =
		"The open folder is not a Git repository. Please check the folder location and try again.";
	static NotATfvcRepository =
		"The open folder is not a TFVC repository. Please check the folder location and try again.";
	static NotAnEnuTfCommandLine =
		"It appears you have configured a non-English version of the TF executable. Please ensure an English version is properly configured.";
	static TokenNotAllScopes =
		"The personal access token provided does not have All Scopes. All Scopes is required for TFVC support.";
	static TfvcLocationMissingError =
		"The path to the TFVC command line (including filename) was not found in the user settings. Please set this value (tfvc.location) and try again.";
	static TfMissingError =
		"Unable to find the TF executable. Please ensure TF is installed and the path specified contains the filename.";
	static TfInitializeFailureError =
		"Unable to initialize the TF executable. Please verify the installation of Java and ensure it is in the PATH.";
	static TfExecFailedError =
		"Execution of the TFVC command line failed unexpectedly.";
	static TfVersionWarning =
		"The configured version of TF does not meet the minimum version. You may run into errors or limitations with certain commands until you upgrade. Minimum version: ";
	static TfNoPendingChanges = "There are no matching pending changes.";
	static TfServerWorkspace =
		"It appears you are using a Server workspace. Currently, TFVC support is limited to Local workspaces.";
	static ClcCannotAccessWorkspace =
		"It appears you are using the TEE CLC and are unable to access an existing workspace. The TFVC SCM Provider cannot be initialized. Click 'More details...' to learn more.";
	static UndoChanges = "Undo Changes";
	static DeleteFile = "Delete File";
	static NoChangesToCheckin =
		"There are no changes to check in. Changes must be added to the 'Included' section to be checked in.";
	static NoChangesToUndo = "There are no changes to undo.";
	static AllFilesUpToDate = "All files are up to date.";
	static CommandRequiresFileContext =
		"This command requires a file context and can only be executed from the TFVC viewlet window.";
	static CommandRequiresExplorerContext =
		"This command requires a file context and can only be executed from the Explorer window.";
	static RenamePrompt = "Provide the new name for the file.";
	static NoMatchesFound = "No items match any of the file paths provided.";
	static NoTeamProjectFound =
		"No team project found for this repository. Build and Work Item functionality has been disabled.";
	static NoWorkspaceMappings =
		"Could not find a workspace with mappings (e.g., not a TFVC repository, wrong version of TF is being used).";
	static ShowTfvcOutput = "Show TFVC Output";

	// TFVC viewlet Strings
	static ExcludedGroupName = "Excluded changes";
	static IncludedGroupName = "Included changes";
	static ConflictsGroupName = "Conflicting changes";

	// TFVC Sync Types
	static SyncTypeConflict = "Conflict";
	static SyncTypeDeleted = "Deleted";
	static SyncTypeError = "Error";
	static SyncTypeNew = "New";
	static SyncTypeUpdated = "Updated";
	static SyncTypeWarning = "Warning";

	// TFVC Conflict Titles
	static ConflictAlreadyDeleted = "ALREADY DELETED";
	static ConflictAlreadyExists = "ALREADY EXISTS";
	static ConflictDeletedLocally = "DELETED LOCALLY";

	// TFVC AutoResolveType Strings
	static AutoResolveTypeAutoMerge = "Auto Merge";
	static AutoResolveTypeDeleteConflict = "Delete Conflict";
	static AutoResolveTypeKeepYours = "Keep Yours";
	static AutoResolveTypeKeepYoursRenameTheirs = "Keep Yours Rename Theirs";
	static AutoResolveTypeOverwriteLocal = "Overwrite Local";
	static AutoResolveTypeTakeTheirs = "Take Theirs";
}
/* tslint:enable:variable-name */

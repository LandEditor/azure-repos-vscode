/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* tslint:disable:variable-name */
export class Constants {
	static ExtensionName = "team";
	static ExtensionUserAgentName = "AzureReposVSCode";
	static ExtensionVersion = "1.161.1";
	static OAuth = "OAuth";
	static TokenLearnMoreUrl = "https://aka.ms/gtgzt4";
	static TokenShowMeUrl = "https://aka.ms/o2wkmo";
	static ReadmeLearnMoreUrl = "https://aka.ms/jkapah";
	static FarewellLearnMoreUrl = "https://aka.ms/AA9k2vv";
	static TfvcLearnMoreUrl =
		"https://github.com/Microsoft/azure-repos-vscode/blob/master/TFVC_README.md#quick-start";
	static ServerWorkspaceUrl =
		"https://github.com/Microsoft/azure-repos-vscode/blob/master/TFVC_README.md#what-is-the-difference-between-a-local-and-server-workspace-how-can-i-tell-which-one-im-working-with";
	static VS2015U3CSRUrl =
		"https://msdn.microsoft.com/en-us/library/mt752379.aspx";
	static WorkspaceNotDetectedByClcUrl =
		"https://github.com/Microsoft/azure-repos-vscode/blob/master/TFVC_README.md#using-the-tee-clc-i-am-unable-to-access-an-existing-local-workspace-what-can-i-do";
	static NonEnuTfExeConfiguredUrl =
		"https://github.com/Microsoft/azure-repos-vscode/blob/master/TFVC_README.md#i-received-the-it-appears-you-have-configured-a-non-english-version-of-the-tf-executable-please-ensure-an-english-version-is-properly-configured-error-message-after-configuring-tfexe-how-can-i-get-the-extension-to-work-properly";
}

export class CommandNames {
	static CommandPrefix = `${Constants.ExtensionName}.`;
	static AssociateWorkItems =
		`${CommandNames.CommandPrefix}AssociateWorkItems`;
	static GetPullRequests = `${CommandNames.CommandPrefix}GetPullRequests`;
	static OpenBlamePage = `${CommandNames.CommandPrefix}OpenBlamePage`;
	static OpenBuildSummaryPage =
		`${CommandNames.CommandPrefix}OpenBuildSummaryPage`;
	static OpenFileHistory = `${CommandNames.CommandPrefix}OpenFileHistory`;
	static OpenNewBug = `${CommandNames.CommandPrefix}OpenNewBug`;
	static OpenNewTask = `${CommandNames.CommandPrefix}OpenNewTask`;
	static OpenNewPullRequest =
		`${CommandNames.CommandPrefix}OpenNewPullRequest`;
	static OpenNewWorkItem = `${CommandNames.CommandPrefix}OpenNewWorkItem`;
	static OpenTeamSite = `${CommandNames.CommandPrefix}OpenTeamSite`;
	static RefreshPollingStatus =
		`${CommandNames.CommandPrefix}RefreshPollingStatus`;
	static Reinitialize = `${CommandNames.CommandPrefix}Reinitialize`;
	static SendFeedback = `${CommandNames.CommandPrefix}SendFeedback`;
	static Signin = `${CommandNames.CommandPrefix}Signin`;
	static Signout = `${CommandNames.CommandPrefix}Signout`;
	static ViewWorkItemQueries =
		`${CommandNames.CommandPrefix}ViewWorkItemQueries`;
	static ViewWorkItems = `${CommandNames.CommandPrefix}ViewWorkItems`;
	static ViewPinnedQueryWorkItems =
		`${CommandNames.CommandPrefix}ViewPinnedQueryWorkItems`;
}

export class DeviceFlowConstants {
	static ManualOption = "manual";
	static DeviceFlowOption = "deviceflow";
	static ClientId = "97877f11-0fc6-4aee-b1ff-febb0519dd00";
	static RedirectUri = "https://java.visualstudio.com";
}

export class TfvcCommandNames {
	static CommandPrefix = "tfvc.";
	static Checkin = `${TfvcCommandNames.CommandPrefix}Checkin`;
	static Delete = `${TfvcCommandNames.CommandPrefix}Delete`;
	static Exclude = `${TfvcCommandNames.CommandPrefix}Exclude`;
	static ExcludeAll = `${TfvcCommandNames.CommandPrefix}ExcludeAll`;
	static Include = `${TfvcCommandNames.CommandPrefix}Include`;
	static IncludeAll = `${TfvcCommandNames.CommandPrefix}IncludeAll`;
	static Open = `${TfvcCommandNames.CommandPrefix}Open`;
	static OpenDiff = `${TfvcCommandNames.CommandPrefix}OpenDiff`;
	static OpenFile = `${TfvcCommandNames.CommandPrefix}OpenFile`;
	static Refresh = `${TfvcCommandNames.CommandPrefix}Refresh`;
	static Rename = `${TfvcCommandNames.CommandPrefix}Rename`;
	static ResolveKeepYours =
		`${TfvcCommandNames.CommandPrefix}ResolveKeepYours`;
	static ResolveTakeTheirs =
		`${TfvcCommandNames.CommandPrefix}ResolveTakeTheirs`;
	static ShowOutput = `${TfvcCommandNames.CommandPrefix}ShowOutput`;
	static Sync = `${TfvcCommandNames.CommandPrefix}Sync`;
	static Undo = `${TfvcCommandNames.CommandPrefix}Undo`;
	static UndoAll = `${TfvcCommandNames.CommandPrefix}UndoAll`;
}

export class SettingNames {
	static SettingsPrefix = `${Constants.ExtensionName}.`;
	static PinnedQueries = `${SettingNames.SettingsPrefix}pinnedQueries`;
	static AccessTokens = `${SettingNames.SettingsPrefix}accessTokens`;
	static LoggingPrefix = `${SettingNames.SettingsPrefix}logging.`;
	static LoggingLevel = `${SettingNames.LoggingPrefix}level`;
	static PollingInterval = `${SettingNames.SettingsPrefix}pollingInterval`;
	static AppInsights = `${SettingNames.SettingsPrefix}appInsights.`;
	static AppInsightsEnabled = `${SettingNames.AppInsights}enabled`;
	static AppInsightsKey = `${SettingNames.AppInsights}key`;
	static RemoteUrl = `${SettingNames.SettingsPrefix}remoteUrl`;
	static TeamProject = `${SettingNames.SettingsPrefix}teamProject`;
	static BuildDefinitionId =
		`${SettingNames.SettingsPrefix}buildDefinitionId`;
	static ShowWelcomeMessage =
		`${SettingNames.SettingsPrefix}showWelcomeMessage`;
	static ShowFarewellMessage =
		`${SettingNames.SettingsPrefix}showFarewellMessage`;
}

export class TelemetryEvents {
	static TelemetryPrefix = `${Constants.ExtensionName}/`;
	static AssociateWorkItems =
		`${TelemetryEvents.TelemetryPrefix}associateworkitems`;
	static DeviceFlowCanceled =
		`${TelemetryEvents.TelemetryPrefix}deviceflowcanceled`;
	static DeviceFlowFailed =
		`${TelemetryEvents.TelemetryPrefix}deviceflowfailed`;
	static DeviceFlowPat = `${TelemetryEvents.TelemetryPrefix}deviceflowpat`;
	static ExternalRepository =
		`${TelemetryEvents.TelemetryPrefix}externalrepo`;
	static FarewellLearnMoreClick =
		`${TelemetryEvents.TelemetryPrefix}farewelllearnmoreclick`;
	static Installed = `${TelemetryEvents.TelemetryPrefix}installed`;
	static ManualPat = `${TelemetryEvents.TelemetryPrefix}manualpat`;
	static OpenAdditionalQueryResults =
		`${TelemetryEvents.TelemetryPrefix}openaddlqueryresults`;
	static OpenBlamePage = `${TelemetryEvents.TelemetryPrefix}openblame`;
	static OpenBuildSummaryPage =
		`${TelemetryEvents.TelemetryPrefix}openbuildsummary`;
	static OpenFileHistory =
		`${TelemetryEvents.TelemetryPrefix}openfilehistory`;
	static OpenNewTask = `${TelemetryEvents.TelemetryPrefix}opennewtask`;
	static OpenNewBug = `${TelemetryEvents.TelemetryPrefix}opennewbug`;
	static OpenNewPullRequest =
		`${TelemetryEvents.TelemetryPrefix}opennewpullrequest`;
	static OpenNewWorkItem =
		`${TelemetryEvents.TelemetryPrefix}opennewworkitem`;
	static OpenRepositoryHistory =
		`${TelemetryEvents.TelemetryPrefix}openrepohistory`;
	static OpenTeamSite =
		`${TelemetryEvents.TelemetryPrefix}openteamprojectweb`;
	static ReadmeLearnMoreClick =
		`${TelemetryEvents.TelemetryPrefix}readmelearnmoreclick`;
	static SendAFrown = `${TelemetryEvents.TelemetryPrefix}sendafrown`;
	static SendASmile = `${TelemetryEvents.TelemetryPrefix}sendasmile`;
	static ShowMyWorkItemQueries =
		`${TelemetryEvents.TelemetryPrefix}showmyworkitemqueries`;
	static StartUp = `${TelemetryEvents.TelemetryPrefix}startup`;
	static TokenLearnMoreClick =
		`${TelemetryEvents.TelemetryPrefix}tokenlearnmoreclick`;
	static TokenShowMeClick =
		`${TelemetryEvents.TelemetryPrefix}tokenshowmeclick`;
	static UnsupportedServerVersion =
		`${TelemetryEvents.TelemetryPrefix}unsupportedversion`;
	static UnsupportedWitServerVersion =
		`${TelemetryEvents.TelemetryPrefix}unsupportedwitversion`;
	static ViewPullRequest =
		`${TelemetryEvents.TelemetryPrefix}viewpullrequest`;
	static ViewPullRequests =
		`${TelemetryEvents.TelemetryPrefix}viewpullrequests`;
	static ViewMyWorkItems =
		`${TelemetryEvents.TelemetryPrefix}viewmyworkitems`;
	static ViewPinnedQueryWorkItems =
		`${TelemetryEvents.TelemetryPrefix}viewpinnedqueryworkitems`;
	static ViewWorkItem = `${TelemetryEvents.TelemetryPrefix}viewworkitem`;
	static ViewWorkItems = `${TelemetryEvents.TelemetryPrefix}viewworkitems`;
	static VS2015U3CSR = `${TelemetryEvents.TelemetryPrefix}vs2015u3csr`;
	static WelcomeLearnMoreClick =
		`${TelemetryEvents.TelemetryPrefix}welcomelearnmoreclick`;
}

//Don't export this class. TfvcTelemetryEvents is the only one which should be used when sending telemetry
class TfvcBaseTelemetryEvents {
	static TelemetryPrefix = "tfvc/";
	static Clc = `${TfvcBaseTelemetryEvents.TelemetryPrefix}clc`;
	static Exe = `${TfvcBaseTelemetryEvents.TelemetryPrefix}exe`;
	static Add = "add";
	static Checkin = "checkin";
	static Configured = "configured";
	static Connected = "connected";
	static Delete = "delete";
	static GetFileContent = "getfilecontent";
	static LearnMoreClick = "learnmoreclick";
	static NameAndContentConflict = "nameandcontentconflict";
	static NonEnuConfiguredMoreDetails = "nonenuconfiguredmoredetails";
	static OpenFileHistory = "openfilehistory";
	static OpenRepositoryHistory = "openrepohistory";
	static RenameConflict = "renameconflict";
	static Rename = "rename";
	static ResolveConflicts = "resolveconflicts";
	static RestrictWorkspace = "restrictworkspace";
	static StartUp = "startup";
	static Sync = "sync";
	static Undo = "undo";
	static UndoAll = "undoall";
	static WorkspaceAccessError = "workspaceaccesserror";
}

export class TfvcTelemetryEvents {
	static UsingClc: string = TfvcBaseTelemetryEvents.Clc;
	static UsingExe: string = TfvcBaseTelemetryEvents.Exe;
	static LearnMoreClick: string =
		TfvcBaseTelemetryEvents.TelemetryPrefix +
		TfvcBaseTelemetryEvents.LearnMoreClick;
	static NameAndContentConflict: string =
		TfvcBaseTelemetryEvents.TelemetryPrefix +
		TfvcBaseTelemetryEvents.NameAndContentConflict;
	static OpenFileHistory: string =
		TfvcBaseTelemetryEvents.TelemetryPrefix +
		TfvcBaseTelemetryEvents.OpenFileHistory;
	static OpenRepositoryHistory: string =
		TfvcBaseTelemetryEvents.TelemetryPrefix +
		TfvcBaseTelemetryEvents.OpenRepositoryHistory;
	static RenameConflict: string =
		TfvcBaseTelemetryEvents.TelemetryPrefix +
		TfvcBaseTelemetryEvents.RenameConflict;
	static RestrictWorkspace: string =
		TfvcBaseTelemetryEvents.TelemetryPrefix +
		TfvcBaseTelemetryEvents.RestrictWorkspace;
	static StartUp: string =
		TfvcBaseTelemetryEvents.TelemetryPrefix +
		TfvcBaseTelemetryEvents.StartUp;
	static SetupTfvcSupportClick =
		`${TfvcBaseTelemetryEvents.TelemetryPrefix}setuptfvcsupportclick`;
	//Begin tooling-specific telemetry (tf.exe or CLC)
	static ClcConfigured =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.Configured}`;
	static ExeConfigured =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.Configured}`;
	static ClcConnected =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.Connected}`;
	static ExeConnected =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.Connected}`;
	static AddExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.Add}`;
	static AddClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.Add}`;
	static CheckinExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.Checkin}`;
	static CheckinClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.Checkin}`;
	static DeleteExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.Delete}`;
	static DeleteClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.Delete}`;
	static GetFileContentExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.GetFileContent}`;
	static GetFileContentClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.GetFileContent}`;
	static RenameExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.Rename}`;
	static RenameClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.Rename}`;
	static ResolveConflictsExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.ResolveConflicts}`;
	static ResolveConflictsClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.ResolveConflicts}`;
	static SyncExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.Sync}`;
	static SyncClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.Sync}`;
	static UndoExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.Undo}`;
	static UndoClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.Undo}`;
	static UndoAllExe =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.UndoAll}`;
	static UndoAllClc =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.UndoAll}`;
	static ClcCannotAccessWorkspace =
		`${TfvcTelemetryEvents.UsingClc}-${TfvcBaseTelemetryEvents.WorkspaceAccessError}`;
	static ExeNonEnuConfiguredMoreDetails =
		`${TfvcTelemetryEvents.UsingExe}-${TfvcBaseTelemetryEvents.NonEnuConfiguredMoreDetails}`;
}

export class WellKnownRepositoryTypes {
	static TfsGit = "TfsGit";
}

export class WitQueries {
	static MyWorkItems: string =
		"select [System.Id], [System.WorkItemType], [System.Title], [System.State] " +
		"from WorkItems where [System.TeamProject] = @project and " +
		"[System.WorkItemType] <> '' and [System.AssignedTo] = @Me order by [System.ChangedDate] desc";
}

export class WitTypes {
	static Bug = "Bug";
	static Task = "Task";
}

export enum MessageTypes {
	Error = 0,
	Warn = 1,
	Info = 2,
}
/* tslint:enable:variable-name */

export interface LatestDownload {
	res: string;
	magnet: string;
}

export interface LatestAnimeEntry {
	time: string;
	release_date: string;
	show: string;
	episode: string;
	downloads: LatestDownload[];
	xdcc: string;
	image_url: string;
	page: string;
}

export interface LatestResponse {
	[title: string]: LatestAnimeEntry;
}

export interface ShowInfoDownload {
	res: string;
	torrent: string;
	magnet: string;
	xdcc: string;
}

export interface ShowInfoAnimeEntry {
	time: string;
	release_date: string;
	show: string;
	episode: string;
	downloads: ShowInfoDownload[];
}

export interface ShowInfoSection {
	[title: string]: ShowInfoAnimeEntry;
}

export interface ShowInfoResponse {
	batch: ShowInfoSection;
	episode: ShowInfoSection;
}

export interface ScheduleEntry {
	title: string;
	page: string;
	image_url: string;
	time: string;
}

export interface ScheduleDays {
	Monday: ScheduleEntry[];
	Tuesday: ScheduleEntry[];
	Wednesday: ScheduleEntry[];
	Thursday: ScheduleEntry[];
	Friday: ScheduleEntry[];
	Saturday: ScheduleEntry[];
	Sunday: ScheduleEntry[];
}

export interface ScheduleResponse {
	tz: string;
	schedule: ScheduleDays;
}

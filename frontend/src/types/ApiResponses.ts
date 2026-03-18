export interface AiringResponseItem {
	id: number;
	anime_id: number;
	anime_title: string;
	anime_session: string;
	episode: number;
	episode2: number;
	edition: string;
	fansub: string;
	snapshot: string;
	disc: string;
	session: string;
	filler: number;
	created_at: string;
	completed: number;
}

export interface AiringResponse {
	total: number;
	per_page: number;
	current_page: number;
	last_page: number;
	next_page_url: string | null;
	prev_page_url: string | null;
	from: number;
	to: number;
	data: AiringResponseItem[];
}

export interface SearchResponseItem {
	id: number;
	title: string;
	type: string;
	episodes: number;
	status: string;
	season: string;
	year: number;
	score: number;
	poster: string;
	session: string;
}

export interface SearchResponse {
	total: number;
	per_page: number;
	current_page: number;
	last_page: number;
	from: number;
	to: number;
	data: SearchResponseItem[];
}

export interface EpisodesResponseItem {
	id: number;
	anime_id: number;
	episode: number;
	episode2: number;
	edition: string;
	title: string;
	snapshot: string;
	disc: string;
	audio: string;
	duration: string;
	session: string;
	filler: number;
	created_at: string;
}

export interface EpisodesResponse {
	total: number;
	per_page: number;
	current_page: number;
	last_page: number;
	next_page_url: string | null;
	prev_page_url: string | null;
	from: number;
	to: number;
	data: EpisodesResponseItem[];
}

export type Mode = "release" | "airing" | "search"
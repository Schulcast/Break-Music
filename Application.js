export class Application {
	/** @readonly */
	static songs = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3']

	/** @readonly */
	static breaks = new Array(
		{ start: [7, 15], end: [7, 45] },
		{ start: [9, 15], end: [9, 30] },
		{ start: [11, 0], end: [11, 30] },
		{ start: [13, 0], end: [13, 30] },
		{ start: [1, 10], end: [1, 56] },
		{ start: [15, 0], end: [15, 15] },
		{ start: [18, 0], end: [18, 40] },
	)

	static initialize() {
		new this()
	}

	/** @readonly @returns {HTMLAudioElement} */
	static get audioElement() { return document.querySelector('audio') }

	/** @readonly @returns {HTMLAnchorElement} */
	static get anchorElement() { return document.querySelector('a') }

	constructor() {
		this.update()
		setInterval(() => this.update(), 1000)
	}

	playlist = []

	get isBreak() {
		const now = new Date()
		const hour = now.getHours()
		const minutes = now.getMinutes()
		return Application.breaks.some(br => (hour >= br.start[0] && minutes >= br.start[1]) && (hour <= br.end[0] && minutes < br.end[1]))
	}

	update() {
		document.body.className = this.isBreak ? 'break' : 'class'
		Application.anchorElement.innerText = this.isBreak ? 'Pause' : 'Unterricht'
		this.shuffleSong()
	}

	wasBreak = false
	shuffleSong() {
		if (this.wasBreak === this.isBreak)
			return

		this.wasBreak = this.isBreak

		if (this.playlist.length === 0) {
			this.playlist = [...Application.songs]
		}

		const getNextSong = () => {
			const index = Math.floor(Math.random() * this.playlist.length)
			const song = this.playlist[index]
			this.playlist.splice(index, 1)
			return `musics/${song}`
		}

		Application.audioElement.src = getNextSong()
		Application.audioElement.load()
		Application.audioElement.play()
		Application.audioElement.onended = () => this.shuffleSong()
	}
}
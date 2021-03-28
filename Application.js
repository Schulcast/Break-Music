export class Application {
	breaks = new Array(
		{ start: [7, 15], end: [7, 45] },
		{ start: [9, 15], end: [9, 30] },
		{ start: [11, 0], end: [11, 30] },
		{ start: [13, 0], end: [13, 30] },
		{ start: [1, 10], end: [1, 56] },
		{ start: [15, 0], end: [15, 15] }
	)
	songs = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3']
	playlist = []
	currentIsBreakState

	static initialize() {
		new this()
	}

	constructor() {
		setInterval(() => this.updateState(), 1000)
	}

	updateState() {
		if (this.currentIsBreakState === this.isBreak)
			return

		this.currentIsBreakState = this.isBreak

		document.body.classList = this.isBreak ? 'break' : 'class'

		const stateElement = document.querySelector('a')
		stateElement.innerText = this.isBreak ? 'Pause' : 'Unterricht'

		const audioElement = document.querySelector('audio')
		this.playSong(audioElement)
	}

	get nextSong() {
		if (this.playlist.length === 0) {
			this.playlist = [...this.songs]
		}
		const index = Math.floor(Math.random() * this.playlist.length)
		const song = this.playlist[index]
		this.playlist.splice(index, 1)
		return `musics/${song}`
	}

	playSong(audioElement) {
		if (this.isBreak === false) {
			audioElement.src = null
			return
		}

		audioElement.src = this.nextSong
		audioElement.load()
		audioElement.play()

		audioElement.onended = () => {
			audioElement.src = this.nextSong
			audioElement.load()
			audioElement.play()
		}
	}

	get isBreak() {
		const now = new Date()
		const hour = now.getHours()
		const minutes = now.getMinutes()
		return this.breaks.some(br => (hour >= br.start[0] && minutes >= br.start[1]) && (hour <= br.end[0] && minutes < br.end[1]))
	}
}
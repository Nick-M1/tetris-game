export {default as GAME_OVER_AUDIO} from '../assets/audio/GameOverAudio.mp3';
export {default as ROW_CLEARED_AUDIO} from '../assets/audio/RowCleared.mp3';
export {default as PIECE_DROPPED_AUDIO} from '../assets/audio/PieceDropped.mp3';

import THEME_SONG_1_AUDIO from '../assets/audio/ThemeSong1.mp3';
import THEME_SONG_2_AUDIO from '../assets/audio/ThemeSong2.mp3';
import THEME_SONG_3_AUDIO from '../assets/audio/ThemeSong3.mp3';
import THEME_SONG_4_AUDIO from '../assets/audio/ThemeSong4.mp3';

const themeSongs = [THEME_SONG_1_AUDIO, THEME_SONG_2_AUDIO, THEME_SONG_3_AUDIO, THEME_SONG_4_AUDIO]

export function getRandomThemeSong() {
    return themeSongs[Math.floor(Math.random() * themeSongs.length)];
}
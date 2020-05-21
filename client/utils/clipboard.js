import Vue from 'vue';
import Clipboard from 'clipboard';

function clipboardSuccess() {
	Vue.prototype.$notify({
		message: 'Успешно скопировано!',
		type: 'success',
		duration: 3000
	});
}

function clipboardError() {
	Vue.prototype.$notify({
		message: 'Ошибка копирования!',
		type: 'error',
		duration: 3000
	});
}

export default function handleClipboard(text, event) {
	console.log(text, event, event.target)
	const clipboard = new Clipboard(event.target, {
		text: () => text
	});
	
	clipboard.on('success', () => {
		clipboardSuccess();
		clipboard.destroy();
	});
	
	clipboard.on('error', () => {
		clipboardError();
		clipboard.destroy();
	});
	
	clipboard.onClick(event);
};
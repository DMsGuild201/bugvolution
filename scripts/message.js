export default class AbstractMessage {
	static loadPlayerForToken(token) {
		return game.users.get(token);
	}
	/**
	 * Load the appropriate actor for a given message, leveraging token or actor or actor search.
	 * @param {*} speaker
	 */
	static loadActorForChatMessage(messageData) {
		const speaker = messageData.message.speaker;
		let actor;
		if (speaker.token) {
			actor = game.actors.tokens[speaker.token];
		}
		if (!actor) {
			actor = game.actors.get(speaker.actor);
		}
		if (!actor) {
			game.actors.forEach((value) => {
				if (value.name === speaker.alias) {
					actor = value;
				}
			});
		}
		return actor;
	}

	/**
	 * @param {*} actor
	 */
	static getChatTokenImage(actor) {
		if (actor) return actor.token ? actor.token.data.img : actor.data.token.img;
		return "";
	}

	static getWhisperTargets(names, speaker) {
		if (typeof names === "string" && names.localeCompare(speaker) !== 0) {
			return ` (To ${names})`;
		}
		if (names && names.join) {
			const namesString = names.filter((name) => name.localeCompare(speaker) === 0).join();
			return ` (To ${namesString})`;
		}
		return "";
	}

	static _addClass = (html, className) => {
		html.addClass(className);
	};

	static _warn = (content) => {
		console.warn(`MESSAGE GROUPING | ${content}`);
	};
}
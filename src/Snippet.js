class Snippet {
	static createDefault = () => new Snippet('snippetName', 'snippetPrefix', 'snippetDescription', 'snippetBody')

	clone = () => new Snippet(
		this.name, this.prefix, this.description, this.body, [...this.placeholders],
	)

	update = (obj) => { Object.keys(obj).forEach((key) => { this[key] = obj[key] || this[key]; }); }

	compareTo = snippet => this.name === snippet.name
		&& this.prefix === snippet.prefix
		&& this.description === snippet.description

		&& this.body === snippet.body
		&& this.placeholders.length === snippet.placeholders.length
		&& this.placeholders
			.sort()
			.every((value, index) => value === snippet.placeholders.sort()[index])

	parseBody = () => {
		const placeholderRegex = /\${[0-9]*:[a-zA-Z]*}/gm;
		const placeholders = [];

		const parsedBody = this.body.replace(placeholderRegex, (match) => {
			const index = match.slice('${'.length, match.indexOf(':'));
			const placeholder = match.slice(match.indexOf(':') + 1).slice(0, -1);

			placeholders[index - 1] = placeholder;
			return placeholder;
		});

		this.body = parsedBody;
		this.placeholders = [...new Set(placeholders)];
	}

	export = () => {
		let { body } = this;

		this.placeholders = this.placeholders.filter(placeholder => placeholder.length > 0);

		this.placeholders.forEach((element, index) => {
			body = body.replace(new RegExp(`${element}`, 'mg'), `\${${index + 1}:${element}}`);
		});

		body = body
			.replace(/\\/g, '\\\\')
			.replace(/"/g, '\\"')
			.split('\n')
			.join('",\n\t\t"');

		return `"${this.name}": {\n\t"prefix": "${this.prefix}",\n\t"body": [\n\t\t"${body}"\n\t],\n\t"description": "${this.description}"\n}`;
	}

	constructor(name, prefix, description, body, placeholders = []) {
		this.name = name;
		this.prefix = prefix;
		this.description = description;

		this.body = body;
		this.placeholders = placeholders;
	}
}

export { Snippet };

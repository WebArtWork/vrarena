import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'times'
})
export class TimesPipe implements PipeTransform {
	transform(times: string[]): string {
		if (!times || times.length === 0) return '';

		const ranges = times.map((t) => t.split(' - '));

		let merged: string[][] = [ranges[0]];

		for (let i = 1; i < ranges.length; i++) {
			const prevEnd = merged[merged.length - 1][1];
			const currStart = ranges[i][0];

			if (prevEnd === currStart) {
				// Merge ranges
				merged[merged.length - 1][1] = ranges[i][1];
			} else {
				// Start a new range
				merged.push(ranges[i]);
			}
		}

		return merged.map((range) => range.join(' - ')).join(', ');
	}
}

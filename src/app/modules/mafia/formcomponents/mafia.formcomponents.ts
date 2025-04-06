export const mafiaFormComponents = {
	formId: 'mafia',
	title: 'Mafia',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill mafia title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill mafia description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}

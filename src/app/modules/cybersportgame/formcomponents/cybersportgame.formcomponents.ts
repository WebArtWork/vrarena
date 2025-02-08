export const cybersportgameFormComponents = {
	formId: 'cybersportgame',
	title: 'Cybersportgame',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill cybersportgame title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill cybersportgame description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Select',
			key: 'type',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill cybersportgame type'
				},
				{
					name: 'Label',
					value: 'Type'
				},
				{
					name: 'Items',
					value: [
						'FPS',
						'RPG',
						'Puzzle',
						'Sports',
						'Adventure',
						'Horror',
						'Simulation',
						'Strategy',
						'Other'
					]
				}
			]
		},
		{
			name: 'Number',
			key: 'playersMin',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill players min'
				},
				{
					name: 'Label',
					value: 'Players min'
				}
			]
		},
		{
			name: 'Number',
			key: 'playersMax',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill players max'
				},
				{
					name: 'Label',
					value: 'Players max'
				}
			]
		},
		{
			name: 'Number',
			key: 'duration',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill duration in minutes'
				},
				{
					name: 'Label',
					value: 'Duration'
				}
			]
		},
		{
			name: 'Number',
			key: 'ageRating',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill age rating'
				},
				{
					name: 'Label',
					value: 'Age rating'
				}
			]
		},
		{
			name: 'Select',
			key: 'platform',
			fields: [
				{
					name: 'Placeholder',
					value: 'select platform'
				},
				{
					name: 'Label',
					value: 'Platform'
				},
				{
					name: 'Items',
					value: ['Quest 3', 'PCVR', 'Cross-platform']
				}
			]
		},
		{
			name: 'Select',
			key: 'difficulty',
			fields: [
				{
					name: 'Placeholder',
					value: 'select difficulty'
				},
				{
					name: 'Label',
					value: 'Difficulty'
				},
				{
					name: 'Items',
					value: ['Easy', 'Medium', 'Hard']
				}
			]
		},
		{
			name: 'Photo',
			key: 'image',
			fields: [
				{
					name: 'Label',
					value: 'Image'
				}
			]
		},
		{
			name: 'Text',
			key: 'trailer',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill trailer'
				},
				{
					name: 'Label',
					value: 'Trailer'
				}
			]
		},
		{
			name: 'Number',
			key: 'price',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill price'
				},
				{
					name: 'Label',
					value: 'Price'
				}
			]
		},
		{
			name: 'Date',
			key: 'releaseDate',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill release date'
				},
				{
					name: 'Label',
					value: 'Release date'
				}
			]
		},
		{
			name: 'Text',
			key: 'developer',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill developer'
				},
				{
					name: 'Label',
					value: 'Developer'
				}
			]
		}
	]
};
